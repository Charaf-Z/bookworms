import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function auth() {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.auth, true, target, key);
  };
}
