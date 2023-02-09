import axios from "axios";
import {EmbedBuilder} from "discord.js";

class WeatherRequestMethods{
    static async getLocation(name, interaction){
        try{
            const result = await axios.get(`http://api.positionstack.com/v1/forward?access_key=d97b984a15c1a4153a5ca201565fbce4&query=${name}`);
            console.log("result is...", result.data);
            const lat = result.data.data[0].latitude.toFixed(4);
            const long = result.data.data[0].longitude.toFixed(4);
            return {lat, long};
        } catch(e){
            interaction.reply({content: "an error while looking up the location. Please enter another location.", ephemeral: true});
        }
    }

    static async sendTemperatureEmbed(lat, long, name, interaction){
        console.log(`lat is ${lat}, long is ${long}`);
        const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,showers_sum,snowfall_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=GMT`);
        const data = result.data;
        const weatherEmbed = new EmbedBuilder()
            .setDescription(`weather in ${name}`)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Day', value: `${data.daily.time[0]}`, inline: true },
                { name: 'Max Temperature', value: `${data.daily.temperature_2m_max[0]}°C`, inline: true },
                { name: 'Min Temperature', value: `${data.daily.temperature_2m_min[0]}°C`, inline: true },
                { name: 'Feels like', value: `${data.daily.apparent_temperature_min[0]}°C`, inline: true },
                { name: 'precipitation', value: `${data.daily.precipitation_sum[0].split(".")[1]}%`, inline: true },
                { name: 'rain', value: `${data.showers_sum[0].split(".")[1]}%`, inline: true },
                { name: 'snow', value: `${data.nowfall_sum[0].split(".")[1]}%`, inline: true },
            )
            .setImage("https://media.tenor.com/vF6R4JjcGzsAAAAC/weather-sunnyday.gif")
        interaction.reply({embeds: [weatherEmbed]});

    }
}

export default WeatherRequestMethods;