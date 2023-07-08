import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('email', 150).notNullable().unique()
      table.string('phoneNumber', 15).notNullable()
      table.string('password').notNullable()
      table.string('roleName').notNullable()
      table.bigInteger('roleId').notNullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
      table.foreign('roleId').references('roles.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
