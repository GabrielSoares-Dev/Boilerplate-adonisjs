import type { Permissions } from "Config/permissions"

export const checkHasPermission = async (expectedPermission: Permissions,permissions:Permissions[]) => {
  return permissions.includes(expectedPermission)
}