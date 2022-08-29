import Database from '@ioc:Adonis/Lucid/Database'
import Server from 'App/Models/Server'
import isPortReachable from 'is-port-reachable'

export default class ServerController {
  /**
   * Server info
   */
  public async index() {
    const roCon = Database.connection('ragnarok')

    // Get server info
    const accounts = await roCon.from('login').count('* as total')
    const characters = await roCon.from('char').count('* as total')
    const guilds = await roCon.from('guild').count('* as total')
    const parties = await roCon.from('party').count('* as total')
    const zenies = await roCon.from('char').sum('zeny as total')

    // Check server status
    let serverStatus = {}
    const serverSettings = await Server.query()
      .where('id', 1)
      .preload('settings', (settingsQuery) => {
        settingsQuery.whereIn('name', ['login', 'char', 'map'])
      })
      .first()

    for (const server of serverSettings?.settings || []) {
      const serverValue = JSON.parse(server?.value || '{}')
      serverStatus = {
        ...serverStatus,
        ...{
          [server.name]: await this.getServerStatus(serverValue?.port, serverValue?.host),
        },
      }
    }

    return {
      data: {
        info: {
          total_accounts: accounts[0]?.total,
          total_characters: characters[0]?.total,
          total_guilds: guilds[0]?.total,
          total_parties: parties[0]?.total,
          total_zeny: zenies[0]?.total,
        },
        status: {
          ...serverStatus,
        },
      },
    }
  }

  private async getServerStatus(port: number, host: string) {
    return (await isPortReachable(port, { host })) ? 'online' : 'offline'
  }
}
