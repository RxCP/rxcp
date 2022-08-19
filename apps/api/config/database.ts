/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      seeders: {
        paths: ['./database/seeders/MainSeeder'],
      },
      healthCheck: false,
      debug: false,
    },
    ragnarok: {
      client: 'mysql',
      connection: {
        host: Env.get('RAGNAROK_HOST'),
        port: Env.get('RAGNAROK_PORT'),
        user: Env.get('RAGNAROK_USER'),
        password: Env.get('RAGNAROK_PASSWORD', ''),
        database: Env.get('RAGNAROK_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['./database/ragnarok/migrations'],
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
