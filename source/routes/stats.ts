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
        let app = apps.find((app) => app.name.toLowerCase().replaceAll(' ', '') == name)
        if (app == undefined) {
            return reply.send({
                status: false,
                message: 'App does not exist.',
                code: 404
            })
        }
        // send to handler
        reply.send({downloads: getStat(app)})
    })

    // move to next route
    next()
}
