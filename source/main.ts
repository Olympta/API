// imports
import { installRoute } from './routes/installs.js'
import { statusRoute } from './routes/status.js'
import fastify from 'fastify'
import pino from 'pino'

// create server
const app = fastify()
const port = 8543

app.all('/*', (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*')
    reply.header('Access-Control-Allow-Headers', 'X-Requested-With')
})

app.register(installRoute)
//app.register(statusRoute)

// start server
app.listen({ port: port, host: '0.0.0.0' }).then(() => {
    pino().info(`Server is now running on port ${port}.`)
})
