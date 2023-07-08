import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rolesPermissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('roleId').notNullable()
      table.bigInteger('permissionId').notNullable()
      table.foreign('roleId').references('roles.id').onDelete('CASCADE')
      table.foreign('permissionId').references('permissions.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
