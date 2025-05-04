/** @type {import("../../dist/index.mjs")} */
import * as module from "/index.mjs"
console.dir(module)
Object.defineProperty(window,"module",{value: module})