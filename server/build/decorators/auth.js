"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
function auth() {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.auth, true, target, key);
    };
}
exports.auth = auth;
