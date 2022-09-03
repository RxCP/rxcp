import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

// For debugging queries
// Disabled by default
Event.on('db:query', Database.prettyPrint)
// When user reset their password
Event.on('user:reset-password', 'User.onResetPass')
