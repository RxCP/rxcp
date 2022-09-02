/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ view }) => {
  return view.render('home')
})

/**
 * Global scope
 */
Route.group(() => {
  // Guest / Unauthenticated / Public
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
    Route.post('logout', async ({ auth }) => {
      await auth.use('api').revoke()
      return {
        revoked: true,
      }
    })
    Route.post('reset-password', 'UserController.resetPassword')
    Route.post('verify-reset-password', 'UserController.verifyTokenResetPass')
  }).middleware('throttle:10reqMin')

  // Authenticated
  Route.group(() => {
    // Logged-in user
    Route.get('me', 'UserController.index')
    Route.patch('me', 'UserController.patch')
    Route.put('me/update-email', 'UserController.updateEmail')
    Route.put('me/change-password', 'UserController.changePass')
  }).middleware('auth')
})
  .prefix('/api')
  .middleware('throttle:global')

/**
 * Client
 */
import './routes/client'

/**
 * Admin
 */
import './routes/admin'
