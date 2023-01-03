import pkg from "mongoose";
const {Schema, model} = pkg;

const WelcomeSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    chanelId: {
        type: String,
        unique: true,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})

export default model("Welcome", WelcomeSchema);