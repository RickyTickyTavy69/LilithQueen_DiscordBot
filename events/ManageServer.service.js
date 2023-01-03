import WelcomeModel from "../models/welcome.model.js";

class ManageServerService{


    static async setWelcome(message, args){
        const {member, channelId, content, guild} = message;
        const argsString = args.join(" ");
        const username = member.user.username;
        const role = message.member.roles.cache.find((role) => {
            return role.name === "Админ"
        })
        if(!role){
            message.reply(`you don't have permission to run this command, ${username}. Admin role required`);
            return;
        }
        try{
            console.log("message", message);
            const existingWelcome = WelcomeModel.findOne({id: guild.id});
            if(existingWelcome){
                console.log("exists, updating welcome...");
                await WelcomeModel.findOneAndUpdate({id: guild.id}, {text: argsString});
                console.log("updated welcome");
            } else{
                const welcome = new WelcomeModel({
                    id : guild.id,
                    chanelId: channelId,
                    text: argsString,
                });
                const result = await welcome.save();
                console.log(result);
            }
        } catch(e){
            console.error("error", e);
        }
    }
}

export default ManageServerService;