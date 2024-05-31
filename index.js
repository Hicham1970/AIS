import WebSocket from "ws";
const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
const API_KEY = process.env.AISSTREAM_API_KEY;
socket.addEventListener("open", (_) => {
  const subscriptionMessage = {
    APIkey: "5c0ad18372ae890bb87095428fb228f99b1c3615",
    BoundingBoxes: [[[-180, -90], (2)[(180, 90)]]],
  };
  console.log(JSON.stringify(subscriptionMessage));
  socket.send(JSON.stringify(subscriptionMessage));
});
/*TODO  je dois limiter la recherche de navire a ma region géographique , 
et je dois faire une boucle pour chaque navire et afficher les informations sur le navire de la region
Et si je choisit une poignée de cargo vessel , ça sera beaucoup mieux.
*/
socket.addEventListener("error", (event) => {
  console.log(event);
});

socket.addEventListener("message", (event) => {
  let aisMessage = JSON.parse(event.data);
  if (aisMessage["MessageType"] === "PositionReport") {
    let positionReport = aisMessage["Message"]["PositionReport"];
    // console.log(positionReport);
    // let metaDataReport = aisMessage["MetaData"];
    // console.log(metaDataReport);
    // console.log(
    //   `ShipId: ${positionReport["UserID"]} Latitude: ${positionReport["Latitude"]} Longitude: ${positionReport["Longitude"]}`
    // );
  }
  if (aisMessage["MessageType"] === "ShipStaticData") {
    let ShipStaticData = aisMessage["Message"]["ShipStaticData"];
    // console.log(ShipStaticData);
    console.log(
      `Name :${ShipStaticData["Name"]}   ShipCallSign : ${ShipStaticData["CallSign"]} --- Destination : ${ShipStaticData["Destination"]} --- IMO : ${ShipStaticData["ImoNumber"]} --- MaximumStaticDraft:${ShipStaticData["MaximumStaticDraught"]} --- ETA : ${ShipStaticData["Eta"]["Day"]}/${ShipStaticData["Eta"]["Month"]} at ${ShipStaticData["Eta"]["Hour"]}:${ShipStaticData["Eta"]["Minute"]} Minutes`
    );
  }
});
