import { initServerStatus } from 'App/Services/ServerStatus'
import Ws from 'App/Services/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  const server = await initServerStatus()

  socket.emit('test-socket', { hello: 'world' })

  socket.on('my other event', (data) => {
    console.log(data)
  })

  setInterval(async () => {
    socket.emit('server-status', await server.status())
  }, 1000)
})
