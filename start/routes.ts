import Route from '@ioc:Adonis/Core/Route'

Route.get('/health', 'HealthController.health')

Route.group(() => {
  //not logged routes
  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
    }).prefix('auth')

    Route.group(() => {
      Route.post('/create', 'UsersController.store')
      // Route.post('/valid-email', 'UsersController.validEmail')
      // Route.post('/valid-zipcode', 'UsersController.validZipCode')
    }).prefix('users')
  }).middleware('basicAuth')

  // Route.group(() => {
  //   Route.group(() => {
  //     Route.post('/create', 'PermissionsController.store').middleware(
  //       'permission:PermissionPolicy,createPermission'
  //     )
  //   }).prefix('permissions')
  //   Route.group(() => {
  //     Route.post('/create', 'RolesController.store').middleware('permission:RolePolicy,createRole')
  //     Route.post('/sync-roles-permissions', 'RolesController.syncPermissionsAndRoles').middleware(
  //       'permission:RolePolicy,syncRolesPermissions'
  //     )
  //   }).prefix('roles')
  //   Route.group(() => {
  //     Route.get('/me', 'AuthController.me')
  //     Route.post('/logout', 'AuthController.logout')
  //   }).prefix('auth')
  // }).middleware('auth')
}).prefix('v1')
