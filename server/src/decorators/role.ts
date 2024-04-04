import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function role(roleName: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.role, roleName, target, key);
  };
}
