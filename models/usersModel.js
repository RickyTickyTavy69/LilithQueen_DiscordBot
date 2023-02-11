import pkg from "mongoose";
const {Schema, model} = pkg;

const UsersModel = new Schema({
    serverId: {
        type: String
    },
    users: {
        type: Array /*<User>*/
    }
})

export default model("Users", UsersModel);

/*
* type User = {
*    roles: Array<string>
*    id: string
*    nickname: string
*    cash: string
* }
*
*
* */