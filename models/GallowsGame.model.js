import pkg from "mongoose";
const {Schema, model} = pkg;

const GallowsGameModel = new Schema({
    serverId: {
        type: String
    },
    ChannelId: {
      type: String
    },
    masterId: {
        type: String
    },
    chosenWord:{
        type: Object
    },
    usedLetters:{
        type: Array
    }
})

export default model("GallowsGame", GallowsGameModel);