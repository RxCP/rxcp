import Database from '@ioc:Adonis/Lucid/Database'
import Setting from 'App/Models/Setting'
import isPortReachable from 'is-port-reachable'

export default class ServerController {
  /**
   * Server info
   */
  public async index() {
    const roCon = Database.connection('ragnarok')
    const accounts = await roCon.from('login').count('* as total')
    const characters = await roCon.from('char').count('* as total')
    const guilds = await roCon.from('guild').count('* as total')
    const parties = await roCon.from('party').count('* as total')
    const zenies = await roCon.from('char').sum('zeny as total')

    const serverStatus = {
      login: await this.getServerStatus('server_login'),
      char: await this.getServerStatus('server_char'),
      map: await this.getServerStatus('server_map'),
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
          login: (serverStatus.login && 'online') || 'offline',
          char: (serverStatus.char && 'online') || 'offline',
          map: (serverStatus.map && 'online') || 'offline',
        },
      },
    }
  }

  private async getServerStatus(settingName: string = '') {
    const serverSettings = await Setting.query().select('value').where('name', settingName).first()
    const serverValue = JSON.parse(serverSettings?.value || '{}')

    return await isPortReachable(serverValue?.port, { host: serverValue?.host })
  }
}
