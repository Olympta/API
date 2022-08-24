// imports
import { getApps } from '../utils/app.js'
import { getStat } from '../utils/stats.js'
import { FastifyRequest, FastifyReply } from 'fastify'

// declare info route
export const statsRoute = (fastify, opts, next) => {
    // endpoint to install app without version
    fastify.get('/stats/:appName', async (request: FastifyRequest, reply: FastifyReply) => {
        // get name from parameters
        let name = request.params['appName']
        // get apps
        let apps = await getApps()
        // find app
        let app = apps.filter(app => app.name.toLowerCase().replaceAll(' ', '') === name.toLowerCase().replaceAll(' ', ''))
        // make sure app exists
        if (app[0] == undefined) {
            return reply.send({
                status: false,
                message: 'App does not exist.',
                code: 404
            })
        }
        // send to handler
        reply.send({downloads: getStat(app[0])})
    })

    // move to next route
    next()
}
