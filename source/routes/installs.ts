// imports
import { getPlistVersion, getPlistNoVersion, handleVersion, handleNoVersion } from '../utils/installs.js'
import { FastifyRequest, FastifyReply } from 'fastify'

// declare install route
export const installRoute = (fastify, opts, next) => {
    // endpoint to install app without version
    fastify.get('/install/:appName', async (request: FastifyRequest, reply: FastifyReply) => {
        // get name from parameters
        let name = request.params['appName']
        // send to handler
        await handleNoVersion(name, request, reply)
    })

    // endpoint to get app plist without version
    fastify.get('/plist/:appName', async (request: FastifyRequest, reply: FastifyReply) => {
        // get name from parameters
        let name = request.params['appName']
        // send to handler
        return reply.send({
            status: true,
            message: await getPlistNoVersion(name, request, reply),
            code: 200
        })
    })

    // endpoint to install app with version
    fastify.get('/install/:appName/:appVersion', async (request: FastifyRequest, reply: FastifyReply) => {
        // get name and version from parameters
        let name = request.params['appName'],
            version = request.params['appVersion']
        // send to handler
        await handleVersion(name, version, request, reply)
    })

    // endpoint to get app plist with version
    fastify.get('/plist/:appName/:appVersion', async (request: FastifyRequest, reply: FastifyReply) => {
        // get name from parameters
        let name = request.params['appName'],
            version = request.params['appVersion']
        // send to handler
        return reply.send({
            status: true,
            message: await getPlistVersion(name, version, request, reply),
            code: 200
        })
    })

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
