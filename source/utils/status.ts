// imports
import { execSync } from 'child_process'
import { performance } from 'perf_hooks'
import pino from 'pino'
// define app cache object
let infoCache = { lastUpdate: 0, info: {} }

/**
 * Fetch the info from the cert checker script.
 * @returns JSON object that the status command returns
 **/
let fetchInfo = () => {
    try {
        // get time (for cache)
        let time = performance.now()
        // compare time to last update
        if (infoCache.lastUpdate == 0 || time - infoCache.lastUpdate > 300000) {
            // check if apps haven't been initialized
            if (infoCache.info == {}) {
                pino().info('Starting certificate cache.')
            }
            let stdout = execSync(
                'node ./certcheck/index.js /var/cert --json'
            )
            infoCache.lastUpdate = time
            infoCache.info = JSON.parse(stdout.toString())
        }
        return infoCache.info
    } catch (e) {
        pino().error(
            `Failed to fetch certificate info. (f:fetchInfo,n:utils/status.ts) (${e})`
        )
    }
}

/**
 * Get the status of the current certificate.
 * @returns {boolean} True if the certificate is valid, false otherwise
 **/
export const status = (): boolean => {
    try {
        let output = fetchInfo()
        return output['status']
    } catch (e) {
        pino().error(
            `Failed to get certificate status. (f:status,n:utils/status.ts) (${e})`
        )
    }
}

/**
 * Get the information of the current certificate.
 * @returns Object containing the info of the current certificate
 **/
export const info = () => {
    try {
        return fetchInfo()
    } catch (e) {
        pino().error(
            `Failed to pass certificate information. (f:info,n:utils/status.ts) (${e})`
        )
    }
}
