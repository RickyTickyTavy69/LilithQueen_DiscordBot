import pkg from "mongoose";
const {Schema, model} = pkg;

const WordsGameModel = new Schema({
    serverId: {
        type: String,
        required: true,
        unique: true,
    },
    gameActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    channelId: {
        type: String,
        unique: true,
    },
    usedWords: {
        type: Array,
        required: true,
        default: [],
    },
    players: {
        type: Array,
        required: true,
        default: [],
    },
    winner: {
        type: String,
    }

})

export default model("wordsChannel", WordsGameModel);