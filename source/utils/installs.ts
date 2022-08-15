// imports
import { getApps, App } from './app.js'
import { FastifyRequest, FastifyReply } from 'fastify'
import pino from 'pino'

// define redirect URI so we don't have to constantly retype it
let redirectURI =
    'itms-services://?action=download-manifest&url=https://jailbreaks.app/cdn/plists/'

/**
 * Function to easily extract the version from the request UserAgent.
 * @param   {FastifyRequest} request Request object (from fastify)
 * @returns {number}                 iOS version number
 **/
let vers = (request: FastifyRequest): number => {
    try {
        // get useragent from request
        let useragent = request.headers['user-agent']
        // check if the user is on a mobile device
        if (!useragent.includes('Mobile')) {
            return 0
        } else {
            // perform regex magic and replace matches on version number
            return Number(
                request.headers['user-agent']
                    .match(/OS (\d)?\d_\d(_\d)?/i)[0]
                    .split('_')[0]
                    .replace('OS ', '')
            )
        }
    } catch (e) {
        pino().error(
            `Failed to retrieve OS version. (f:vers,n:utils/installs.ts) (${e})`
        )
    }
}

/**
 * Format version string to match universal standards.
 * @param   {string} tf String to format
 * @returns {string}    Formatted string
 **/
let formatVersion = (tf: string): string => {
    try {
        // format the string and send it out
        return tf.replace('v', '').replaceAll('.', '')
    } catch (e) {
        pino().error(
            `Failed to format version number. (f:formatVersion,n:utils/installs.ts) (${e})`
        )
    }
}

/**
 * Install an app that the user didn't specify a version for.
 * @param {string}         name    Name of the app to install
 * @param {FastifyRequest} request Request object (from fastify)
 * @param {FastifyReply}   reply   Reply object (from fastify)
 **/
export const handleNoVersion = (
    name: string,
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        // define the variables we'll reassign later
        let app: App
        let plistName = ''
        // get the version of the user's device
        let version = vers(request)
        // exit if the user is on an unsupported device
        if (version == 0) {
            return reply.send({
                status: false,
                message: 'Could not install.',
                code: 404
            })
        }
        // get the apps from the cache or from the server
        getApps().then((apps) => {
            // loop through the apps searching for the one we were told to find
            for (let appobj of apps) {
                if (appobj.name.toLowerCase() == name.toLowerCase())
                    app = appobj
            }
            // if we couldn't find the app, exit
            if (app == undefined)
                return reply.send({
                    status: false,
                    message: 'Page not found.',
                    code: 404
                })
            // do some fixes because some apps are weird
            if (app.name == 'Chimera') {
                if (version < 12.2) {
                    plistName += 'Chimera120.plist'
                } else {
                    plistName += 'Chimera122.plist'
                }
            } else if (app.name == 'Home Depot') {
                if (version < 9.0) {
                    plistName += 'HomeDepot8.plist'
                } else {
                    plistName += 'HomeDepot9.plist'
                }
            } else {
                plistName += `${app.plist}.plist`
            }
            // install the app
            return reply.redirect(redirectURI + plistName)
        })
    } catch (e) {
        pino().error(
            `Failed to install '${name}'. (f:handleNoVersion,n:utils/installs.ts) (${e})`
        )
    }
}

/**
 * Install an app that the user specified a version for.
 * @param {string}         name    Name of the app to install
 * @param {string}         version Version of the app to install
 * @param {FastifyRequest} request Request object (from fastify)
 * @param {FastifyReply}   reply   Reply object (from fastify)
 **/
export const handleVersion = (
    name: string,
    appvers: string,
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        // define the variable we'll reassign later
        let app: App
        // get the version of the user's device
        let version = vers(request)
        // exit if the user is on an unsupported device
        if (version == 0) {
            return reply.send({
                status: false,
                message: 'Could not install.',
                code: 404
            })
        }
        // get the apps from the cache or from the server
        getApps().then((apps) => {
            // loop through the apps searching for the one we were told to find
            for (let appobj of apps) {
                if (appobj.name.toLowerCase() == name.toLowerCase())
                    app = appobj
            }
            // if we couldn't find the app, exit
            if (app == undefined)
                return reply.send({
                    status: false,
                    message: 'Page not found.',
                    code: 404
                })
            // start the factory for version numbers
            let versionsFormatted = [formatVersion(app.latest_version)]
            // add the versions that we let the user install to the pipeline
            for (let v of app.other_versions) {
                versionsFormatted.push(formatVersion(v))
            }
            // if we couldn't find the version, exit
            if (!versionsFormatted.includes(formatVersion(appvers))) {
                return reply.send({
                    status: false,
                    message: 'Version does not exist.',
                    code: 404
                })
            }
            // install the app
            return reply.redirect(
                redirectURI + app.plist + formatVersion(appvers)
            )
        })
    } catch (e) {
        pino().error(
            `Failed to install '${name}' with specified version '${appvers}.' (f:handleVersion,n:utils/installs.ts) (${e})`
        )
    }
}
