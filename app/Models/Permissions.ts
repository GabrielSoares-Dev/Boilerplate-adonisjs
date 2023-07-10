import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  ModelQueryBuilderContract,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Roles from 'App/Models/Roles'

export default class Permissions extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({
    autoCreate: true,
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (value) => value.toFormat('dd/MM/yyyy HH:mm:ss'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'updatedAt',
  })
  public updatedAt: DateTime

  @column.dateTime({ columnName: 'deletedAt', serializeAs: null })
  public deletedAt: DateTime

  @manyToMany(() => Roles, {
    pivotTable: 'rolesPermissions',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'permissionId',
    pivotRelatedForeignKey: 'roleId',
  })
  public roles: ManyToMany<typeof Roles>

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Permissions>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Permissions>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
