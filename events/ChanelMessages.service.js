class ChanelMessagesService{
    static async clearAll(client, message){ // sometimes server crashes, I have to find out why
        try{
            const role = message.member.roles.cache.find((role) => {
                return role.name === "Админ"
            })
            if(role){
                message.channel.messages.fetch().then((results) => {
                    message.channel.bulkDelete(15, true);
                })
            } else{
                message.reply("you don't have permission fot this action, Admin role is required")
            }
        } catch(e){
            console.error("error", e);
        }
    }
}

export default ChanelMessagesService;