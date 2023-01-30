import pkg from "mongoose";
const {Schema, model} = pkg;

const ServerInfoModel = new Schema({
    serverId: {
      type: String
    },
    reactions: {
        type: Boolean
    },
    privateVoice: {
        type: String
    },
    verificationChannel: {
        type: String
    },
    unverifiedroleID: {
        type: String
    }
})

export default model("Serverinfo", ServerInfoModel);