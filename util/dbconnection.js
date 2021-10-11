import mongoose from "mongoose"
import {config} from "../config/development.js"

export const connect = (url = config.databaseURL, opts = {}) => {
    return mongoose.connect(url);
}
