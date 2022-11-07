import Server from 'App/Models/Server'
import isPortReachable from 'is-port-reachable'

export async function getServerStatus(port: number, host: string) {
  return (await isPortReachable(port, { host })) ? 'online' : 'offline'
}

export async function initServerStatus() {
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

      for (const server of serverSettings?.settings || []) {
        const serverValue = JSON.parse(server?.value || '{}')
        serverStatus = {
          ...serverStatus,
          ...{
            [server.name]: {
              port: serverValue?.port,
              status: await getServerStatus(serverValue?.port, serverValue?.host),
            },
          },
        }
      }

      return serverStatus
    },
  }
}
