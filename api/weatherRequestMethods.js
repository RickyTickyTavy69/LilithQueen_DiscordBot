import axios from "axios";

class WeatherRequestMethods{
    static async getLocation(name, interaction){
        try{
            const result = await axios.get(`http://api.positionstack.com/v1/forward?access_key=d97b984a15c1a4153a5ca201565fbce4&query=${name}`);
            const lat = result.data.latitude.toFixed(4);
            const long = result.data.longitude.toFixed(4);
            return {lat, long};
        } catch(e){
            interaction.reply({content: "an error while looking up the location. Please enter another location.", ephemeral: true});
        }
    }
}

export default WeatherRequestMethods;