const apicallingmodule = require('./apicalling')
var as = require('./RabbitMq/ConnectionFactory')
var amqp = require('amqplib/callback_api');



console.log('This is Entry Class')
var app = require('express')();
var cors = require('cors');
var http = require('http').Server(app);
var fs = require('fs');
const PropertiesReader = require('properties-reader');
const apicalling = require('./apicalling');
const prop = PropertiesReader('app.properties');
getProperty = (pty) => { return prop.get(pty); }
console.log(getProperty('server.port'))
console.log(getProperty('server.ip'))
serverIp = getProperty('server.ip');
app.use(cors());
var io = require('socket.io')(http, {
  cors: {
    origin: "*"
  }

});
var VehcilenoVsReceivedSIdata = [];

class entrySocket {
    constructor() {
      io.on('connection', function (socket) {

        /**********************rabiit mq listener******************************** */


        amqp.connect('amqp://guest:guest@127.0.0.1', function (error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function (error1, channel) {
            if (error1) {
              throw error1;
            }
            var SI_MESSAGES_QUEUE = 'SI';
            var SI_WCM_READER_DATA_QUEUE = 'SI';
            var IVA_MESSAGE_QUEUE = 'IVA';
            var DA_WCM_CALCULATED_AUTO_TRIP_QUEUE = 'DA';
            var SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE = 'SI';
            var SI_WCM_DA_SMART_BIN_ALERT_QUEUE = 'SI';


            channel.assertQueue(SI_MESSAGES, {
              durable: false
            });

            channel.assertQueue(SI_WCM_READER_DATA_QUEUE, {
              durable: false
            });

            channel.assertQueue(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE, {
              durable: false
            });
            channel.assertQueue(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE, {
              durable: false
            });

            channel.assertQueue(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE, {
              durable: false
            });

            channel.assertQueue(SI_WCM_DA_SMART_BIN_ALERT_QUEUE, {
              durable: false
            });

            console.log(" [*] Waiting for messages ");

            channel.consume(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE, async function (msg) {
              console.log(" [x] Received %s", msg.content.toString());
              var IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
              console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.msgId);
              console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.cameraName);
              console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageName);
              console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageURL);
              var tagId = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
              var fetchedjson = await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId);
              var WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA = { "msgId": IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.msgId, "cameraName": IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.cameraName, "imageName": IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageName, "imageURL": IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageURL };
              // socket.on("connect", () => 
              // {

              io.sockets.emit("WCM_WVM_FACE_DETECTED_ON_BLACKSPOT ", WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA);

              // });





            }, {
              noAck: true
            });



            channel.consume(SI_MESSAGES_QUEUE, async function (msg) {
              console.log(" [x] Received %s", msg.content.toString());
              var SI_WCM_READER_DATA_QUEUE_MESSAGE = JSON.parse(msg.content.toString());

              var SI_MESSAGE = JSON.parse(msg.content.toString());
              var msgId = SI_MESSAGE.msgId;
              if (msgId == 18) {
                console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId);
                console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.rfidReaderId);
                console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId);
                var tagId = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
                var fetchedjson = await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId, serverIp);
                console.log("fetchedjson--------------------->", fetchedjson);
                console.log(fetchedjson.nodeType);
                console.log(fetchedjson.nodeId);
                console.log(fetchedjson.wardId);
                console.log(fetchedjson.driverMobNo);
                console.log(fetchedjson.citizenMobNo);
                console.log(fetchedjson.tripId);
                console.log(fetchedjson.driverId);

                var putBody = { "zoneId": "", "wardId": fetchedjson.wardId, "nodeType": fetchedjson.nodeType, "nodeId": fetchedjson.nodeId, "nodeStatus": 2, "collectionTime": "", "ImeiNo": SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId };
                var WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId, "wardId": fetchedjson.wardId, "nodeType": fetchedjson.nodeType, "nodeId": fetchedjson.nodeId, "nodeStatus": 2 };
                var WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId, "wardId": fetchedjson.wardId, "nodeType": fetchedjson.nodeType, "nodeId": fetchedjson.nodeId, "nodeStatus": "" };
                var WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId, "wardId": fetchedjson.wardId, "nodeType": fetchedjson.nodeType, "nodeId": fetchedjson.nodeId, "nodeStatus": "", "driverId": fetchedjson.driverId, "mobileNo": fetchedjson.driverMobNo };
                console.log(putBody);
                try {
                  await apicallingmodule.callingUpdatingNodeDetailsUpdateApi(putBody, serverIp);
                }
                catch (e) {
                  console.log('exception in callingUpdatingNodeDetailsUpdateApi api');
                  
                }
                //   await apicallingmodule.WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA);
                //   await apicallingmodule.WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA);

                // socket.on("connect", () => 
                // {

                io.sockets.emit("WCM_WVM_COLLECTION_STATUS_OF_NODE", WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA);
              }

              if (msgId == 20) {
                console.log(SI_MESSAGE.msgId);
                console.log(SI_MESSAGE.data);
                
                var jsonArray = new Array();
                var jsonArray = SI_MESSAGE.data;;
                for (i = 0; i < jsonArray.length; i++) {
                  var individualjson = jsonArray[i];
                  console.log(individualjson.ImeiNo);
                  console.log(individualjson.Transaction_Date);
                  console.log(individualjson.TagId);
                  var tagId = individualjson.TagId;
                  var putBody;
                  var WCM_WVM_UHF_COLLECTION_STATUS_OF_NODE_DATA;
                  try {
                    fetchedjsonapi = await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId, serverIp);
                    console.log("fetchedjson--------------------->", fetchedjson);
                    console.log(fetchedjsonapi.nodeType);
                    console.log(fetchedjsonapi.nodeId);
                    console.log(fetchedjsonapi.wardId);
                    console.log(fetchedjsonapi.driverMobNo);
                    console.log(fetchedjsonapi.citizenMobNo);
                    console.log(fetchedjsonapi.tripId);
                    console.log(fetchedjsonapi.driverId);
                     putBody = { "zoneId": "", "wardId": fetchedjsonapi.wardId, "nodeType": fetchedjsonapi.nodeType, "nodeId": fetchedjsonapi.nodeId, "nodeStatus": 2, "collectionTime": individualjson.Transaction_Date, "ImeiNo": individualjson.tagId };
                     WCM_WVM_UHF_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": individualjson.msgId, "wardId": fetchedjsonapi.wardId, "nodeType": fetchedjsonapi.nodeType, "nodeId": fetchedjsonapi.nodeId, "nodeStatus": 2, "driverId": fetchedjsonapi.driverId, "mobileNo": fetchedjsonapi.driverMobNo };
                  }
                  catch (e) {
                    console.log("error in calling NodeDetailsFetchingApiForGivenTagId");
                  }

            
                 
                  try {
                    await apicallingmodule.callingUpdatingNodeDetailsUpdateApi(putBody, serverIp);
                  }
                  catch (e) {
                    console.log('exception in callingUpdatingNodeDetailsUpdateApi api');
                  }
                  io.sockets.emit("WCM_WVM_UHF_COLLECTION_STATUS_OF_NODE", WCM_WVM_UHF_COLLECTION_STATUS_OF_NODE_DATA);

                }

               
              }
              if (msgId == 16) {
                console.log(" [x] Received %s", msg.content.toString());
                var SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
                console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId);
                console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result);
                var result = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;

                var WCM_WVM_CAMERA_DETAILS_UPDATED_DATA = { "msgId": SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId, "result": SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result };


                io.sockets.emit("WCM_WVM_CAMERA_DETAILS_UPDATED", WCM_WVM_CAMERA_DETAILS_UPDATED_DATA);
              }
              if (msgId == 17) {
                console.log(" [x] Received %s", msg.content.toString());
                var SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
                console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId);
                console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName);
                console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel);

                var putBody = { "smartBinName": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "garbageLevel": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel };
                // var putBody = { "smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "capacity":200, "batteryLife":4, "solarBased":1, "startBinPointLat":21.11, "startBinPointLong":72.11, "gpsEnabled":1, "contactNo":"9988776655", "zoneId":1, "wardId":1, "muhallaNme":"M1", "address":"ghaziabad", "capacityAlert":0, "alertDateTime":"", "binTemp":0, "nodeStatus":0 , "tripEnabled":0, "tripId":0, "garbageCollectionTimeStamp":"", "qrCode":"sfdf323", "issueStatus":1, "garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel, "alertTimeStmp":""};
                // var fetchedjson = await apicallingmodule.callingeditSmartBinApi(putBody); 
                var fetchedjson = await apicallingmodule.callingsetSmartBinGarbageLevelApi(putBody, serverIp);

                var WCM_WVM_SMART_BIN_ALERT_DATA = { "msgId": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId, "smartBinName": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "garbageLevel": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel };
                var WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA = { "msgId": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId, "smartBinName": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "garbageLevel": SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel };
                // socket.on("connect", () => 
                // {

                io.sockets.emit("WCM_WVM_SMART_BIN_ALERT ", WCM_WVM_SMART_BIN_ALERT_DATA);
                io.sockets.emit("WCM_DRIVER_MOBILE_SMART_BIN_ALERT", WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA);
              }
              if (msgId == 9) {
                console.log(SI_MESSAGE.msgId);
                console.log(SI_MESSAGE.communityPointName);
                console.log(SI_MESSAGE.arrivalInMin);
                var community_point_name = SI_MESSAGE.communityPointName;
                var fetchedJsonArray = await apicallingmodule.callingGetListOfUserForCommunityPointApi(community_point_name, serverIp);
                var jsonArray = new Array();
                jsonArray = fetchedJsonArray;



              }


              if(msgId == 21)
              {
                console.log(SI_MESSAGE.msgId);
                console.log(SI_MESSAGE.Imei);
                console.log(SI_MESSAGE.Speed);
                console.log(SI_MESSAGE.Lat);
                console.log(SI_MESSAGE.Lng);
                console.log(SI_MESSAGE.Odo);
                console.log(SI_MESSAGE.msgId);
                console.log(SI_MESSAGE.Iggnition);
                console.log(SI_MESSAGE.Ipower);
                console.log(SI_MESSAGE.dateTime);
                var gps_tracker_id = SI_MESSAGE.Imei;
                var fetchedjson;
               
                
                try
                {
                 fetchedjson = await apicallingmodule.callingVehicleInfoApiForGivenTrackerId(gps_tracker_id,serverIp);
                 console.log(fetchedjson.vehicleNo);
                 console.log(fetchedjson.wardId);
                 VehcilenoVsReceivedSIdata[fetchedjson.vehicleNo] = SI_MESSAGE;
                }

                catch(e)
                {
                  console.log("error in calling api VehicleInfoApiForGivenTrackerId");
                  console.log(e);
                  VehcilenoVsReceivedSIdata[fetchedjson.vehicleNo] = SI_MESSAGE;//vehicle to be hardcoded
                }
                var putbodyforpostfirstreceiveddata = {"vehicleNo":fetchedjson.vehicleNo, "Speed":SI_MESSAGE.Speed, "Lat":SI_MESSAGE.Lat, "Lng":SI_MESSAGE.Lng,"Odo":SI_MESSAGE.Odo,"Iggnition":SI_MESSAGE.Iggnition, "Ipower":SI_MESSAGE.Ipower,"dateTime":SI_MESSAGE.dateTime};
               // var putbodyforUpdateVehiclePerformance = { "vehicleNo" :"XYZ","totalRunningKms":17,"idleHours":1,"standByHours":0,"dateTimeStamp":"" }
  
                if(false)//SI_MESSAGE.dateTime==""
                {
                  
                  var fetchedJsonForLocationPost = await apicallingmodule.callingapiAddGPSData(putbodyforpostfirstreceiveddata,serverIp);
                 // var fetchedJsonForUpdateVehiclePerformanceData = await apicalling.callingapiUpdateVehiclePerformanceData(putbodyforUpdateVehiclePerformance,fetchedjson.vehicleNo,serverIp);
                  console.log(fetchedJsonForLocationPost);
                  console.log(fetchedJsonForUpdateVehiclePerformanceData);
                  
                }
                if(true)//conditiom for when vehicle needs to be updated
                {
                  try{
                  var fetchedJsonForLocationPost = await apicallingmodule.callingapiAddGPSData(putbodyforpostfirstreceiveddata,serverIp);
                  console.log(fetchedJsonForLocationPost);
                  }
                  catch(e)
                  {
                       console.log("error in AddGPSData api");
                  }
                  try
                  {
                //  var fetchedJsonForUpdateVehiclePerformanceData = await apicalling.callingapiUpdateVehiclePerformanceData(putbodyforUpdateVehiclePerformance,fetchedjson.vehicleNo,serverIp);
                  //console.log(fetchedJsonForUpdateVehiclePerformanceData);
                  }
                  catch(e)
                  {
                    console.log("error in UpdateVehiclePerformanceData api");
                  }
  
                }
                // socket.on('WVM_WCM_GPS_DATA_REQ', function (data) {

                //   console.log(data.VehicleNo);
                //   console.log(data.loginUser);
                //   console.log(data.ReqStatus);
                //   if(VehcilenoVsReceivedSIdata[fetchedjson.vehicleNo]!=null)
                //   {
                //     var receivedSIdataAgainstVechileNo = VehcilenoVsReceivedSIdata[fetchedjson.vehicleNo]; 
                //     var WCM_WVM_GPS_DATA_RESP_MESSAGE = {"VehicleNo":data.VehicleNo,"Speed":receivedSIdataAgainstVechileNo.Speed,"Lat":receivedSIdataAgainstVechileNo.Lat,"Lng":receivedSIdataAgainstVechileNo.Lng,"Odo":receivedSIdataAgainstVechileNo.Odo,"Iggnition":receivedSIdataAgainstVechileNo.Iggnition};
                //     var event = "WCM_WVM_GPS_DATA_RESP_" + data.loginUser;
                //     io.sockets.emit(event, WCM_WVM_GPS_DATA_RESP_MESSAGE );
                //   }
                  
        
        
                // });

              }

              // });





            }, {
              noAck: true
            });










            channel.consume(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE, async function (msg) {
              console.log(" [x] Received %s", msg.content.toString());
              var DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
              console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.msgId);
              console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.wardNo);
              console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks);
              var remarks = DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks;

              var WCM_WVM_CALCULATED_AUTO_TRIP_DATA = { "msgId": DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.msgId, "wardNo": DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.wardNo, "remarks": DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks };


              io.sockets.emit("WCM_WVM_CALCULATED_AUTO_TRIP", WCM_WVM_CALCULATED_AUTO_TRIP_DATA);







            }, {
              noAck: true
            });


            channel.consume(IVA_MESSAGE_QUEUE, async function (msg) {
              console.log(" [x] Received %s", msg.content.toString());
              var IVA_MESSAGE  = JSON.parse(msg.content.toString());
              var msgId = IVA_MESSAGE.msgId;
              if(msgId==12)
              {
              console.log(IVA_MESSAGE.msgId);
              console.log(IVA_MESSAGE.cameraName);
              console.log(IVA_MESSAGE.zoneId);
              console.log(IVA_MESSAGE.wardId);
              console.log(IVA_MESSAGE.muhallaName);
              console.log(IVA_MESSAGE.wasteClassification);
              console.log(IVA_MESSAGE.personFlag);
              var WCM_WVM_WASTE_CLASSIFICATION_ON_BLACK_SPOT_DATA = { "msgId": IVA_MESSAGE.msgId, "cameraName": IVA_MESSAGE.cameraName, "zoneId": IVA_MESSAGE.zoneId,"wardId":IVA_MESSAGE.wardId,"muhallaName":IVA_MESSAGE.muhallaName,"wasteClassification":IVA_MESSAGE.wasteClassification,"personFlag": IVA_MESSAGE.personFlag};
              io.sockets.emit("WCM_WVM_WASTE_CLASSIFICATION_ON_BLACK_SPOT", WCM_WVM_WASTE_CLASSIFICATION_ON_BLACK_SPOT_DATA);
              }
              if(msgId==13)
              {
                console.log(IVA_MESSAGE.msgId);
                console.log(IVA_MESSAGE.cameraName);
                console.log(IVA_MESSAGE.imageName);
                console.log(IVA_MESSAGE.imageURL);
                var WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA = { "msgId": IVA_MESSAGE.msgId, "cameraName": IVA_MESSAGE.cameraName, "imageName": IVA_MESSAGE.imageName,"imageURL":IVA_MESSAGE.imageURL};
              io.sockets.emit("WCM_WVM_FACE_DETECTED_ON_BLACKSPOT",WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA);

              }

            }, {
              noAck: true
            });




          });
        });



        /**********************rabiit mq listener******************************** */

        console.log('A user connected');
        var address = socket.handshake.address;
        console.log("New Connection :- " + address);


        socket.on('MESSAGE_FROM_DISPLAY', function (data) {

          console.log(data.msgId);
          console.log(data.tripId);
          console.log(data.driverId);
          apicallingmodule.callingDemoApi();
          var event = "MESSAGE_FOR_ID_" + data.tripId;
          io.sockets.emit(event, data);
          console.log(event);


        });

        socket.on('MOBILE_APP_WCM_SEND_VAHICLE_ARRIVAL_TRIGGER', async function (data) {

          console.log(data.msgId);
          console.log(data.communityPointName);
          console.log(data.arrivalInMin);

          // var fetchedarray = await apicallingmodule.callingPlayerIdFetchingApi(data.communityPointName);
          //console.log("the fetched array from api is "+ fetchedarray );
          //apicallingmodule.callingNotificationSendingApi(fetchedarray);
          // io.sockets.emit('WCM_MOBILE2_SEND_VEHICLE_ARRIVAL_NOTIFY',data);

        });



        socket.on('WVM_WCM_GPS_DATA_REQ', function (data) {

          console.log(data.VehicleNo);
          console.log(data.loginUser);
          console.log(data.ReqStatus);
          var event = "WCM_WVM_GPS_DATA_RESP_" + data.loginUser;
          if(VehcilenoVsReceivedSIdata[data.VehicleNo]!=undefined)
          {
            var receivedSIdataAgainstVechileNo = VehcilenoVsReceivedSIdata[data.VehicleNo]; 
            var WCM_WVM_GPS_DATA_RESP_MESSAGE = {"VehicleNo":data.VehicleNo,"Speed":receivedSIdataAgainstVechileNo.Speed,"Lat":receivedSIdataAgainstVechileNo.Lat,"Lng":receivedSIdataAgainstVechileNo.Lng,"Odo":receivedSIdataAgainstVechileNo.Odo,"Iggnition":receivedSIdataAgainstVechileNo.Iggnition};
            io.sockets.emit(event, WCM_WVM_GPS_DATA_RESP_MESSAGE );
          }
          else
          {
              console.log("given vehicle numver has not been received");
              io.sockets.emit(event,"given vehicle does not exist");
          }
          


        });



        socket.on('WVM_WCM_ISSUE_STATUS_UPDATE', async function (data) {

          console.log(data.msgId);
          console.log(data.issueType);
          console.log(data.issueId);
          console.log(data.issueStatus);
          console.log(data.mobNo);
          var WCM_MOBILE_ISSUE_STATUS_UPDATE_BODY = { "issueType": data.issueType, "issueId": data.issueId, "issueStatus": data.issueStatus };
          var fetchedarray = await apicallingmodule.callingPlayerIdFetchingFromMobileNoApi(data.mobNo, serverIp);
          console.log("the fetched array from api is " + fetchedarray);
          apicallingmodule.callingNotificationSendingApiForIssueStatusUpdate(fetchedarray, WCM_MOBILE_ISSUE_STATUS_UPDATE_BODY);


        });

        socket.on('WVM_WCM_TRIP_ASSIGNMENT_ALERT', function (data) {

          console.log(data.msgId);
          console.log(data.tripId);
          console.log(data.driverId);

          apicallingmodule.callingNotificationSendingApi();
          io.sockets.emit('WCM_MOBILE_TRIP_ASSIGNMENT_ALERT', data);

        });


        socket.on('WVM_WCM_TRIP_UPDATE_ALERT', function (data) {


          console.log(data.msgId);
          console.log(data.tripId);
          console.log(data.driverId);
          console.log(data.mobileNo);
          var WCM_MOBILE_TRIP_ASSIGNMENT_ALERT_BODY = { "msgId": data.msgId, "tripId": data.tripId, "driverId": data.driverId, "mobileNo": data.mobileNo };

          // var fetchedplayeridarray = await apicallingmodule.callingPlayerIdFetchingFromMobileNoApi(data.mobNo);
          apicallingmodule.callingNotificationSendingApiForTripUpdateAlert(fetchedplayeridarray, WCM_MOBILE_TRIP_ASSIGNMENT_ALERT_BODY);


        });


        socket.on('MOBILE1_WCM_COLLECTION_STATUS_OF_NODE', function (data) {

          console.log(data.msgId);
          console.log(data.mobileNo);
          console.log(data.nodeType);
          console.log(data.nodeId);
          console.log(data.nodeStatus);
          console.log(data.wardId);
          var WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": data.msgId, "wardId": data.wardId, "nodeType": data.nodeType, "nodeId": data.nodeId, "nodeStatus": data.nodeStatus };
          var WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA = { "msgId": data.msgId, "nodeType": data.nodeType, "nodeStatus": data.nodeStatus, "wardId": data.wardId };
          io.sockets.emit('WCM_WVM_COLLECTION_STATUS_OF_NODE', WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA);
          apicallingmodule.WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified, WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA);
          //notification to be sent

        });



        socket.on('MOBILE_WCM_ISSUE_REGISTERATION_ALERT', function (data) {

          console.log(data.msgId);
          console.log(data.issueType);
          console.log(data.issueId);
          console.log(data.nodeId);
          console.log(data.wardNo);
          console.log(data.zoneId);
          io.sockets.emit('WCM_WVM_ISSUE_REGISTERATION_ALERT', data);

        });

        socket.on('MOBILE_WCM_ISSUE_DELETE_ALERT', function (data) {
          //structure which will be received is not specified  
          console.log(data.msgId);
          console.log(data.mobileNo);
          console.log(data.nodeType);
          console.log(data.nodeId);
          console.log(data.nodeStatus);
          //web in charge have to be updated but action not clearly specified
          // io.sockets.emit('WCM_WVM_ISSUE_DELETE_ALERT',data);

        });


        socket.on('WVM_WCM_CALCULATE_AUTO_TRIP', function (data) {

          console.log(data.msgId);
          console.log(data.wardNo);
          var WCM_DA_CALCULATE_AUTO_TRIP_MESSAGE = { "msgId": data.msgId, "wardNo": data.wardNo };
          mqsender.sender('WCM', Buffer.from(JSON.stringify(WCM_DA_CALCULATE_AUTO_TRIP_MESSAGE)))

        });

        socket.on('WVM_WCM_FETCH_CAMERA_DETAILS', function (data) {

          console.log(data.msgId);

          var WCM_SI_FETCH_CAMERA_DETAILS = { "msgId": data.msgId };
          mqsender.sender('WCM', Buffer.from(JSON.stringify(WCM_SI_FETCH_CAMERA_DETAILS)));

        });


        socket.on('SI_WCM_ BLUE_FORCE_TRACKING_DATA', function (data) {

          console.log(data.msgId);
          console.log(data.Imei);
          console.log(data.Speed);
          console.log(data.Lat);
          console.log(data.Lng);
          console.log(data.Odo);
          console.log(data.Iggnition);
          console.log(data.Ipower);
          var gps_tracker_id = data.Imei;
          try {
            var fetchedjson = await apicallingmodule.callingVehicleInfoApiForGivenTrackerId(gps_tracker_id, serverIp);
          }
          catch (e) {
            console.log("error in callingVehicleInfoApiForGivenTrackerId api");
          }

          console.log("fetched_json--------------------->", fetchedjson);
          console.log(fetchedjson.vehicleNo);
          console.log(fetchedjson.wardId);
          putbody = { "vehicleNo": fetchedjson.vehicleNo, "Speed": data.Speed, "Lat": data.Lat, "Lng": data.Lng, "Odo": data.Odo, "Iggnition": data.Iggnition, "Ipower": data.Ipower, "date": "" };
          try {
            var post_result = await apicallingmodule.callingAddVehicleGpsLocation(putbody, serverIp);
          }
          catch (e) {
            console.log("error in callingAddVehicleGpsLocation location");
          }

          console.log(post_result);

        });







        socket.on('disconnect', function () {
          console.log('A user disconnected ' + address);
        });
      });



      http.listen(8088, function () {
        console.log('listening on *:8088');
      });

    }
}
module.exports = new entrySocket();



// http.listen(process.argv[2], function() {
//     console.log('listening on *:==> ' + http.address().port);
// });


