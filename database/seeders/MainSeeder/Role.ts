import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: 'Super Admin',
        code: 'SUPERADMIN',
        description:
          'A Super Administrator is a user who has complete access to all objects, folders, role templates, and groups in the system',
      },
      {
        name: 'Editor',
        code: 'EDITOR',
        description: 'The Editor only manage the content and pages.',
      },
      {
        name: 'Game Master',
        code: 'GAME_MASTER',
        description: 'The Game Master of the game',
      },
      {
        name: 'Player',
        code: 'PLAYER',
        description: 'The Player of the game',
      },
    ])
  }
}
