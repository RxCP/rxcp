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

// Global
Route.group(() => {
  // Guest
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.post('logout', async ({ auth }) => {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  })

  // Authenticated
  Route.group(() => {
    // Me
    Route.get('me', ({ auth }) => {
      return {
        data: auth.use('api').user,
      }
    })
    Route.patch('me', 'UserController.patch')
    Route.put('me/update-email', 'UserController.updateEmail')
  }).middleware('auth')
}).prefix('/api')

// Admin
Route.group(() => {
  // Authenticated routes
  Route.group(() => {
    // Users
    Route.get('users', 'UsersController.index')
    Route.get('users/:id', 'UsersController.show')
    // Roles
    Route.get('roles', 'RolesController.index')
    Route.get('roles/:id/permissions', 'RolesController.getPermissions')
    // Permissions
    Route.get('permissions', 'PermissionsController.index')
    // Accounts
    Route.get('accounts', 'AccountsController.index')
    Route.get('accounts/:id', 'AccountsController.find')
    Route.get('accounts/:id/characters', 'AccountsController.getCharacters')
    Route.post('accounts', 'AccountsController.create')
    Route.put('accounts/:id', 'AccountsController.update')
    Route.delete('accounts/:id', 'AccountsController.destroy')
    // Characters
    Route.get('characters', 'CharactersController.index')
    Route.get('characters/:id', 'CharactersController.find')
    Route.get('characters/:id/account', 'CharactersController.getAccount')
  }).prefix('/api')
})
  .prefix('/admin')
  .middleware('auth')
