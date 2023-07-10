import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  ModelQueryBuilderContract,
  beforeSave,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Permissions from './Permissions'

export default class Roles extends BaseModel {
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

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Roles>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Roles>) {
    query.whereNull('deletedAt')
  }
  @manyToMany(() => Permissions, {
    pivotTable: 'rolesPermissions',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'roleId',
    pivotRelatedForeignKey: 'permissionId',
    pivotColumns: ['roleId'],
  })
  public permissions: ManyToMany<typeof Permissions>

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
  @beforeSave()
  public static async uppercaseName(roles: Roles) {
    if (roles.$dirty.name) {
      roles.name = roles.name.toUpperCase()
    }
  }
}
