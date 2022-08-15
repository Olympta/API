// imports
import { FastifyRequest, FastifyReply } from 'fastify'
import { status, info } from '../utils/status.js'

// declare status route
export const statusRoute = (fastify, opts, next) => {
    // status endpoint
    fastify.get('/status', (request: FastifyRequest, reply: FastifyReply) => {
        // send status from method
        reply.send({ status: status() })
    })

    // cert info endpoint
    fastify.get('/info', (request: FastifyRequest, reply: FastifyReply) => {
        // send info from method
        reply.send(info())
    })

    // move to next route
    next()
}
