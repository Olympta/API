// imports
import { handleVersion, handleNoVersion } from '../utils/installs.js'
import { FastifyRequest, FastifyReply } from 'fastify'

// declare install route
export const installRoute = (fastify, opts, next) => {
    // endpoint to install app without version
    fastify.get('/install/:appName', (request: FastifyRequest, reply: FastifyReply) => {
            // get name from parameters
            let name = request.params['appName']
            // send to handler
            handleNoVersion(name, request, reply)
        }
    )

    // endpoint to install app with version
    fastify.get('/install/:appName/:appVersion', (request: FastifyRequest, reply: FastifyReply) => {
            // get name and version from parameters
            let name = request.params['appName'],
                version = request.params['appVersion']
            // send to handler
            handleVersion(name, version, request, reply)
        }
    )

    // just for TrollHelper
    fastify.get('/troll', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.redirect("itms-services://?action=download-manifest&url=https://jailbreaks.app/cdn/plists/TrollHelper.plist");
    })
    fastify.get('/troll64e', (request: FastifyRequest, reply: FastifyReply) => {
        return reply.redirect("itms-services://?action=download-manifest&url=https://jailbreaks.app/cdn/plists/TrollHelper64e.plist");
    })

    // move to next route
    next()
}
