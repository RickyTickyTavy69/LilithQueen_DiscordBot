import pkg from "mongoose";
const {Schema, model} = pkg;

const ServerInfoModel = new Schema({
    reactions: {
        type: Boolean
    }
})

export default model("Serverinfo", ServerInfoModel);