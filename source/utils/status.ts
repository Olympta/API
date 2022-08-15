// imports
import { execSync } from 'child_process'
import pino from 'pino'

/**
 * Fetch the info from the cert checker script.
 * @returns JSON object that the status command returns
 **/
let fetchInfo = () => {
    try {
        let stdout = execSync('node ./certcheck/index.js /var/www/html/jailbreaks.app/public_html --json')
        return JSON.parse(stdout.toString())
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
