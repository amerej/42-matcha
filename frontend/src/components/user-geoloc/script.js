import axios from "axios";

const ipInfoToken = process.env.VUE_APP_IP_INFO_TOKEN;

export default {
  data() {
    return {};
  },
  created() {
    try {
      let getUserLoc = async () => {
        const result = await axios({
          url: "http://ipinfo.io?token=" + ipInfoToken,
          method: "GET"
        });
        const location = result.data.loc.split(",");
        this.latitude = location[0];
        this.longitude = location[1];
        var infopos = "By Ip Position déterminée :\n";
        infopos += "Latitude : " + this.latitude + "\n";
        infopos += "Longitude: " + this.longitude + "\n";
        console.log(infopos);
      };
      let userPosition = position => {
        var infopos = "By GeoLoc Position déterminée :\n";
        infopos += "Latitude : " + position.coords.latitude + "\n";
        infopos += "Longitude: " + position.coords.longitude + "\n";
        console.log(infopos);
      };
      let errorCallback = async error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("L'utilisateur n'a pas autorisé l'accès à sa position");
            getUserLoc();
            break;
          case error.POSITION_UNAVAILABLE:
            console.log(
              "L'emplacement de l'utilisateur n'a pas pu être déterminé"
            );
            break;
          case error.TIMEOUT:
            console.log("Le service n'a pas répondu à temps");
            break;
        }
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userPosition, errorCallback);
      } else {
        console.log(
          "Votre navigateur ne prend pas en compte la géolocalisation"
        );
        getUserLoc();
      }
    } catch (e) {
      console.log(e);
    }
  }
};
