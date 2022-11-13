import { ServerStatusSocket } from 'App/Services/ServerStatus'
import Ws from 'App/Services/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  // For testing
  socket.emit('test-socket', { hello: 'world' })
  socket.on('my other event', (data) => {
    console.log(data)
  })
  // End for testing

  // Start
  ServerStatusSocket(socket)
})
