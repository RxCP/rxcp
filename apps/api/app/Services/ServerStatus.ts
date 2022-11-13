import Config from '@ioc:Adonis/Core/Config'
import Character from 'App/Models/Character'
import Server from 'App/Models/Server'
import isPortReachable from 'is-port-reachable'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export async function getServerPortStatus(port: number, host: string) {
  return (await isPortReachable(port, { host })) ? 'online' : 'offline'
}

export async function getServerStatus() {
  const serverSettings = await Server.query()
    .where('id', 1)
    .preload('settings', (settingsQuery) => {
      settingsQuery.whereIn('name', ['login', 'char', 'map'])
    })
    .first()

  return {
    settings: serverSettings,
    status: async () => {
      let serverStatus = {}

      const playersOnline = await Character.query()
        .count('*', 'players_online')
        .where('online', '>', 0)
        .first()

      for (const server of serverSettings?.settings || []) {
        const serverValue = JSON.parse(server?.value || '{}')
        serverStatus = {
          ...serverStatus,
          ...{
            [server.name]: {
              status: await getServerPortStatus(serverValue?.port, serverValue?.host),
            },
          },
        }
      }

      return {
        ...serverStatus,
        ...{
          online: playersOnline?.$extras.players_online || 0,
        },
      }
    },
  }
}

export async function ServerStatusSocket(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  const server = await getServerStatus()
  const refreshTime = Config.get('ragnarok.server.statusRefreshTimeMs', 1000)
  let emitServerStatusTimer: string | number | NodeJS.Timeout | undefined

  async function emitServerStatus() {
    console.log('emitServerStatus')
    socket.emit('server-status', await server.status())
    emitServerStatusTimer = setTimeout(emitServerStatus, refreshTime)
  }

  // clear timer
  socket.on('disconnect', function () {
    console.log('disconnect')
    clearTimeout(emitServerStatusTimer)
  })

  emitServerStatus()
}
