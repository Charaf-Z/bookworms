"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
function requestSchema(schema) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.schema, schema, target, key);
    };
}
exports.requestSchema = requestSchema;
