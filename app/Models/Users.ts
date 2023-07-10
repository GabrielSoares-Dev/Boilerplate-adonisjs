import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeSave,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Roles from 'App/Models/Roles'

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    columnName: 'phoneNumber',
    serializeAs: 'phoneNumber',
  })
  public phoneNumber: string

  @column()
  public email: string

  @column({
    serializeAs: null,
  })
  public password: string

  @column({
    columnName: 'roleName',
    serializeAs: 'roleName',
  })
  public roleName: string

  @column({
    columnName: 'roleId',
    serializeAs: null,
  })
  public roleId: number

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

  @hasOne(() => Roles, {
    localKey: 'roleId',
    foreignKey: 'id',
  })
  public role: HasOne<typeof Roles>

  @beforeSave()
  public static async encryptPassword(user: Users) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Users>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Users>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
