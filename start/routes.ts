import Route from '@ioc:Adonis/Core/Route'

Route.get('/health', 'HealthController.health')
Route.group(() => {
  //not logged
  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
    }).prefix('auth')

    Route.group(() => {
      Route.post('/create', 'UsersController.store')
      Route.post('/valid-email', 'UsersController.validEmail')
    }).prefix('users')
  }).middleware('basicAuth')

  //logged
  Route.group(() => {
    Route.group(() => {
      Route.post('/create', 'PermissionsController.store').middleware('permission:createPermission')
    }).prefix('permissions')
    Route.group(() => {
      Route.post('/create', 'RolesController.store').middleware('permission:createRole')
      Route.post('/sync-roles-permissions', 'RolesController.syncPermissionsAndRoles').middleware(
        'permission:syncRolesPermissions'
      )
    }).prefix('roles')
    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).prefix('auth')
  }).middleware('auth')
}).prefix('v1')
