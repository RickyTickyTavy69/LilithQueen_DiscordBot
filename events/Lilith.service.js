class LilithService{

    constructor() {}

    static reactions = ["❤", "🍩", "🧉", "🔥", "👅", "😋", "💋", "😘", "🤟🏻", "🤟🏾", "🍓", "🍑", "🌈", "🎉", "🍉", "✅", "🥷", "🎩", "💫", "🦩", "🌸"];
    static reaction = true;

    static async updateStatus(args, message, client){
        const argsString = args.join(" ");
        console.log("update", argsString);
        client.user.setActivity(argsString);
    }

    static async react(message){
        if(this.reaction){
            const random = Math.floor(+(Math.random() * 13));
            const random2 = Math.floor(+(Math.random() * 11));
            if(random2 === 3) {
                setTimeout(() => {
                    message.react(this.reactions[random]);
                }, 5000);
            }
        }
    }

    static async stopReact(){
        this.reaction = false;
    }
}

export default LilithService;