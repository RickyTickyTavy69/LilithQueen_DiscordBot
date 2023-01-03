class LilithService{

    constructor() {}

    static reactions = ["❤", "🔥", "👅", "😋", "💋", "😘", "🤟🏻", "🤟🏾", "🍓", "🍑", "🌈", "🎉", "🍉", "✅"];

    static async updateStatus(args, message, client){
        const argsString = args.join(" ");
        console.log("update", argsString);
        client.user.setActivity(argsString);
    }

    static async react(message){
        const random = Math.floor(+(Math.random() * 13));
        const random2 = Math.floor(+(Math.random() * 11));
        if(random2 === 3 || random2 === 6 || random2 === 9 || random2 === 1) {
            setTimeout(() => {
                message.react(this.reactions[random]);
            }, 5000);
        }
    }
}

export default LilithService;