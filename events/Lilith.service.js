class LilithService{

    constructor() {}

    static reactions = ["❤", "🔥", "👅", "😋", "💋", "😘", "🤟🏻", "🤟🏾", "🍓", "🍑", "🌈", "🎉", "🍉", "✅"];
    static words = [["мужчина", "мужик", "парень", "мужику", "мужика", "мужиком", "мужчиной", "мужчину", "мужчине", "парню", "парнем", "парня"], ["кровь", "вампиры", "кровью", "месячные"]];
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
            if(random2 === 3 || random2 === 6) {
                setTimeout(() => {
                    message.react(this.reactions[random]);
                }, 5000);
            }
        }
    }

    static async stopReact(){
        this.reaction = false;
    }

    static async responde(message){
        console.log("checking for response")


        for (let i = 0; i < this.words[0].length; i++) {
            if (message.content.includes(this.words[0][i])){
                message.channel.send("мужло на колени!");
                break
            }
        }

        for (let i = 0; i < this.words[1].length; i++) {
            if (message.content.includes(this.words[1][i])){
                message.channel.send("🩸Я прочитала, что вампиры обожают месячные в полнолуние! Главное чтобы это была молодая девушка, её кровь свежая и нежная✨ Тогда они получают неограниченную силу и могут убить любого. Теперь хочу выпить свои месячные, вдруг я тоже скрытая вампирка? Если кто-то хочет, можете поделиться своими месячными🌹 Господи, я же тогда смогу контролировать кровь мужиков и взорву им хуй от большого напора крови🌚");
                break
            }
        }

    }
}

export default LilithService;