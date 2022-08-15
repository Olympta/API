// imports
import { getApps, App } from './app.js'
import { FastifyRequest, FastifyReply } from 'fastify'
import pino from 'pino'

/**
 * Fetch info of a specific app.
 * @param {string}         name    Name of the app to fetch info for
 * @param {FastifyRequest} request Request object (from fastify)
 * @param {FastifyReply}   reply   Reply object (from fastify)
 **/
export const appInfo = (
    name: string,
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        // define the variables we'll reassign later
        let app: App
        // get the apps from the cache or from the server
        getApps().then((apps) => {
            // loop through the apps searching for the one we were told to find
            for (let appobj of apps) {
                if (appobj.name.toLowerCase().replaceAll(' ', '') == name.toLowerCase().replaceAll(' ', ''))
                    app = appobj
            }
            // if we couldn't find the app, exit
            if (app == undefined)
                return reply.send({
                    status: false,
                    message: 'Page not found.',
                    code: 404
                })
            return reply.send(app)
        })
    } catch (e) {
        pino().error(
            `Failed to fetch info for '${name}'. (f:appInfo,n:utils/info.ts) (${e})`
        )
    }
}

/**
 * Fetch info of all apps
 * @param {FastifyRequest} request Request object (from fastify)
 * @param {FastifyReply}   reply   Reply object (from fastify)
 **/
export const allInfo = (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        // get apps
        getApps().then((apps) => {
            return reply.send(apps)
        })
    } catch (e) {
        pino().error(
            `Failed to fetch info for all apps. (f:allInfo,n:utils/info.ts) (${e})`
        )
    }
}