import axios from "axios";
import {EmbedBuilder} from "discord.js";
import weatherImages from "../assets/embed/weatherImages.js";

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
        const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,snowfall_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=GMT`);
        const data = result.data;
        console.log(`rain length ${data.daily.rain_sum[0].toString().length}`);

        const precip = data.daily.precipitation_sum[0].toString().length === 1? data.daily.precipitation_sum[0]: data.daily.precipitation_sum[0].toString().split(".")[1];
        const rain = data.daily.rain_sum[0].toString().length === 1? data.daily.rain_sum[0]: data.daily.rain_sum[0].toString().split(".")[1];
        const snow = data.daily.snowfall_sum[0].toString().length === 1? data.daily.snowfall_sum[0]: data.daily.snowfall_sum[0].toString().split(".")[1]
        let embedimage;

        if(data.daily.temperature_2m_max[0] > 15){
            embedimage = weatherImages.warm[0];
        } else if(data.daily.temperature_2m_max[0] < 5){
            embedimage = weatherImages.cold[0];
        } else{
            embedimage = weatherImages.sun[0];
        }

        if(rain > 0){
            embedimage = weatherImages.rain[0];
        } else if(snow > 0) {
            embedimage = weatherImages.snow[0];
        }

        const weatherEmbed = new EmbedBuilder()
            .setDescription(`weather in ${name}`)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Day', value: `${data.daily.time[0]}`, inline: true },
                { name: 'Max Temperature', value: `${data.daily.temperature_2m_max[0]}°C`, inline: true },
                { name: 'Min Temperature', value: `${data.daily.temperature_2m_min[0]}°C`, inline: true },
                { name: 'Feels like', value: `${data.daily.apparent_temperature_min[0]}°C`, inline: true },
                { name: 'precipitation', value: `${precip}%`, inline: true },
                { name: 'rain', value: `${rain}%`, inline: true },
                { name: 'snow', value: `${snow}%`, inline: true },
            )
            .setImage(embedimage)
        interaction.reply({embeds: [weatherEmbed]});

    }
}

export default WeatherRequestMethods;