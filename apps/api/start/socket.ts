import Config from '@ioc:Adonis/Core/Config'
import { initServerStatus } from 'App/Services/ServerStatus'
import Ws from 'App/Services/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  const server = await initServerStatus()
  const refreshTime = Config.get('ragnarok.server.statusRefreshTimeMs', 1000)
  let emitServerStatusTimer

  socket.emit('test-socket', { hello: 'world' })

  socket.on('my other event', (data) => {
    console.log(data)
  })

  // Server status
  async function emitServerStatus() {
    socket.emit('server-status', await server.status())
    emitServerStatusTimer = setTimeout(emitServerStatus, refreshTime)
  }
  // clear timer
  socket.on('disconnect', function () {
    clearTimeout(emitServerStatusTimer)
  })

  emitServerStatus()
})
