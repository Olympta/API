// imports
import { appInfo, allInfo } from '../utils/info.js'
import { FastifyRequest, FastifyReply } from 'fastify'

// declare info route
export const infoRoute = (fastify, opts, next) => {
    // endpoint to install app without version
    fastify.get('/appinfo/:appName', (request: FastifyRequest, reply: FastifyReply) => {
        // get name from parameters
        let name = request.params['appName']
        // send to handler
        appInfo(name, request, reply)
    }
    )

    // endpoint to install app with version
    fastify.get('/appinfo/all', (request: FastifyRequest, reply: FastifyReply) => {
        // send to handler
        allInfo(request, reply)
    }
    )

    // move to next route
    next()
}
