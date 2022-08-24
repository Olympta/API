// imports
import { infoRoute } from './routes/info.js'
import { installRoute } from './routes/installs.js'
import { statsRoute } from './routes/stats.js'
import { statusRoute } from './routes/status.js'
import cors from '@fastify/cors'
import fastify from 'fastify'
import pino from 'pino'

// create server
const app = fastify()
const port = 8543
// cors
app.register(cors, {'origin': true})

app.register(infoRoute)
app.register(installRoute)
app.register(statsRoute)
app.register(statusRoute)

// start server
app.listen({ port: port, host: '0.0.0.0' }).then(() => {
    pino().info(`Server is now running on port ${port}.`)
})
