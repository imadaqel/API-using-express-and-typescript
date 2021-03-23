"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = __importDefault(require("./category"));
var server = category_1.default.listen(category_1.default.get("port"), function () {
    console.log("app is running");
});
