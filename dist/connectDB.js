"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/test";
    try {
        mongoose_1.default.connect(mongo_url);
        console.log("Connection to database succesfull.");
    }
    catch (_a) {
        console.log("Error connecting to database.");
    }
}
