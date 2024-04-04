import "reflect-metadata";
import { z } from "zod";
import { MetadataKeys } from "./MetadataKeys";

export function requestSchema<RSchema>(schema: z.Schema<RSchema>) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.schema, schema, target, key);
  };
}
