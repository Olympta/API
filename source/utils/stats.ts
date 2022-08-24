// imports
import { getApps, App } from './app.js'
import { FastifyRequest, FastifyReply } from 'fastify'
import fs from 'fs'
import pino from 'pino'

const getStats = () => {
    try {
        if (!fs.existsSync('./data/stats.json')) {
            if (!fs.existsSync('./data')) fs.mkdirSync('./data')
            fs.writeFileSync('./data/stats.json', '{}')
            return {}
        } else {
            return JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'))
        }
    } catch (e) {
        pino().error(`Failed to fetch stats. (f:getStats,n:utils/stats.ts) (${e})`)
    }
}

/**
 * Write download stats for any app.
 * @param {App} app App to write stats for
 **/
export const writeStat = (app: App) => { 
    try {
        let stats = getStats()
        if (stats[app.name] == undefined) {
            stats[app.name] = 1
        } else {
            stats[app.name] += 1
        }
        fs.writeFileSync('./data/stats.json', JSON.stringify(stats))
    } catch (e) {
        pino().error(`Failed to write stat for '${app.name}.' (f:writeStat,n:utils/stats.ts) (${e})`)
    }
}

/**
 * Get download stats of any app.
 * @param   {App}    app App to get stats for
 * @returns {number}     Number of times the app has been used
 **/
export const getStat = (app: App): number => {
    try {
        let stats = getStats()
        if (stats[app.name] == undefined) {
            stats[app.name] = 0
            fs.writeFileSync('./data/stats.json', JSON.stringify(stats))
            return 0
        } else {
            return Number(stats[app.name])
        }
    } catch (e) {
        pino().error(`Failed to fetch stat for '${app.name}.' (f:getStat,n:utils/stats.ts) (${e})`)
    }
}