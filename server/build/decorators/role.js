"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
function role(roleName) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.role, roleName, target, key);
    };
}
exports.role = role;
