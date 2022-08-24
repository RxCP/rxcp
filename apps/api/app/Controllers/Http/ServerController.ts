import Database from '@ioc:Adonis/Lucid/Database'

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
          login: 'online',
          char: 'online',
          map: 'online',
        },
      },
    }
  }
}
