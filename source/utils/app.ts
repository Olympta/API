// imports
import axios from 'axios'
import { performance } from 'perf_hooks'
import pino from 'pino'

// define json url
const URL = 'https://jailbreaks.app/json/apps.json'
// define app cache object
let appsCache = { lastUpdate: 0, apps: [] }

// app class
export class App {
    name: string
    icon: string
    plist: string
    developer: string
    featured: boolean
    latest_version: string
    other_versions: string[]
    description: string
    short_description: string
    category: string
    constructor(app: any) {
        this.name = app['name']
        this.icon = app['icon']
        this.plist = app['plist']
        this.developer = app['dev']
        this.featured = app['featured']
        this.latest_version = app['version']
        this.other_versions = app['other_versions']
        this.description = app['description']
        this.short_description = app['short-description']
        this.category = app['category']
    }
}

/**
 * Method to get the apps from the cache or from the server
 * @returns {Promise<App[]>} JSON array of all apps on the site
 **/
export const getApps = async (): Promise<App[]> => {
    try {
        // get time (for cache)
        let time = performance.now()
        // compare time to last update
        if (appsCache.lastUpdate == 0 || time - appsCache.lastUpdate > 300000) {
            // check if apps haven't been initialized
            if (appsCache.apps.length == 0) {
                pino().info('Starting app cache.')
            }
            // get app JSON
            return await axios
                .request({
                    method: 'get',
                    url: URL
                })
                .then(async (response) => {
                    // set cache time
                    appsCache.lastUpdate = time
                    // map through apps
                    return await Promise.all(
                        response.data.map((app) => {
                            // assign app to object
                            let appobj = new App(app)
                            // put object into the cache
                            appsCache['apps'].push(appobj)
                            // return object
                            return appobj
                        })
                    )
                })
        }
        // return cached apps
        return appsCache['apps']
    } catch (e) {
        pino().error(
            `Failed to retrieve apps. (f:getApps,n:utils/app.ts) (${e})`
        )
    }
}
