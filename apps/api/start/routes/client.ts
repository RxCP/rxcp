import Route from '@ioc:Adonis/Core/Route'

/**
 * Client
 */
Route.group(() => {
  // Ragnarok server
  Route.get('server', 'ServerController.index').middleware('throttle:100reqMin')
  Route.get('server/info', 'ServerController.index').middleware('throttle:100reqMin')

  Route.group(() => {
    // Account
    Route.get('accounts', 'AccountsController.index')
    Route.get('accounts/:id', 'AccountsController.show')
    Route.post('accounts', 'AccountsController.create')
    Route.put('accounts/:id', 'AccountsController.update')
    Route.get('accounts/:id/characters', 'AccountsController.getCharacters')
  }).middleware('auth')
})
  .prefix('/api')
  .middleware('throttle:global')
