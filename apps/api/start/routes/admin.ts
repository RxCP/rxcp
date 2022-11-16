import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

/**
 * Admin
 */
Route.group(() => {
  // Health check
  Route.get('health', async ({ response }) => {
    const report = await HealthCheck.getReport()
    return report.healthy ? response.ok(report) : response.badRequest(report)
  })

  Route.group(() => {
    // Email
    Route.post('test-email-connection', 'MailController.testConnection')
    // Users
    Route.get('users', 'UsersController.index')
    Route.get('users/total', 'UsersController.total')
    Route.get('users/archived', 'UsersController.archived')
    Route.get('users/:id', 'UsersController.show')
    Route.post('users', 'UsersController.create')
    Route.post('users/restore', 'UsersController.restore')
    Route.put('users/:id', 'UsersController.update')
    Route.delete('users/:id', 'UsersController.archive')
    Route.delete('users/:id/permanent', 'UsersController.delete')
    Route.delete('cache/users', 'UsersController.clearAllCache')
    Route.delete('cache/users/:id', 'UsersController.clearOneCache')
    // Roles
    Route.get('roles', 'RolesController.index')
    Route.get('roles/:id/permissions', 'RolesController.getPermissions')
    // Permissions
    Route.get('permissions', 'PermissionsController.index')
    // Accounts
    Route.get('accounts', 'AccountsController.index')
    Route.get('accounts/:id', 'AccountsController.show')
    Route.get('accounts/:id/characters', 'AccountsController.getCharacters')
    Route.post('accounts', 'AccountsController.create')
    Route.put('accounts/:id', 'AccountsController.update')
    Route.delete('accounts/:id', 'AccountsController.destroy')
    // Characters
    Route.get('characters', 'CharactersController.index')
    Route.get('characters/:id', 'CharactersController.show')
    Route.get('characters/:id/account', 'CharactersController.getAccount')
    // Guilds
    Route.get('guilds', 'GuildsController.index')
    Route.get('guilds/:id', 'GuildsController.show')
    // Shop
    Route.get('products', 'Shop/ProductsController.index')
    Route.get('products/archived', 'Shop/ProductsController.archived')
    Route.get('products/:id', 'Shop/ProductsController.show')
    Route.post('products', 'Shop/ProductsController.create')
    Route.post('products/restore', 'Shop/ProductsController.restore')
    Route.delete('products/:id', 'Shop/ProductsController.archive')
    Route.delete('cache/products', 'Shop/ProductsController.clearAllCache')
    Route.delete('cache/products/:id', 'Shop/ProductsController.clearOneCache')
  }).namespace('App/Controllers/Http/Admin')
})
  .prefix('/admin/api')
  .middleware('auth')
  .middleware('throttle:global')
