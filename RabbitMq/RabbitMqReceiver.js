var amqp = require('amqplib/callback_api');
const apicallingmodule = require('../apicalling')
var app = require('express')();
var cors = require('cors');
var http = require('http').Server(app);
app.use(cors());
var io = require('socket.io')(http,{
    cors: {
          origin:"*"
    }
    
    });
    var io = require('socket.io-client');
   
   const socket = io("ws://172.22.7.105:8085");
  
amqp.connect('amqp://guest:guest@127.0.0.1', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var SI_WCM_READER_DATA_QUEUE = 'SI';
        var IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE = 'IVA';
        var DA_WCM_CALCULATED_AUTO_TRIP_QUEUE = 'DA';
        var SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE = 'SI';
        var SI_WCM_DA_SMART_BIN_ALERT_QUEUE = 'SI';
        

        channel.assertQueue(SI_WCM_READER_DATA_QUEUE, {
            durable: false
        });

        channel.assertQueue(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE, {
            durable: false
        });
        channel.assertQueue(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE, {
            durable: false
        });
/*
        channel.assertQueue(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE, {
            durable: false
        });

        channel.assertQueue(SI_WCM_DA_SMART_BIN_ALERT_QUEUE, {
            durable: false
        });
*/

        console.log(" [*] Waiting for messages " );

        channel.consume(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE, async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
            console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.msgId);
            console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.cameraName);
            console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageName);
            console.log(IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageURL);
            var tagId = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
            var fetchedjson = await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId); 
            var WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA = {"msgId":IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.msgId,"cameraName":IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.cameraName,"imageName":IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageName,"imageURL":IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE_MESSAGE.imageURL};
            socket.on("connect", () => 
            {
                console.log("connected....... ")
                socket.emit("WCM_WVM_FACE_DETECTED_ON_BLACKSPOT ",WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA) ;
                
            });
           

            

            
        }, {
            noAck: true
        });

        channel.consume(SI_WCM_READER_DATA_QUEUE, async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var SI_WCM_READER_DATA_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId);
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.rfidReaderId);
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId);
            var tagId = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
            var fetchedjson =  await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId); 
            console.log("fetched_json------------->",fetchedjson);
            console.log(fetchedjson.nodeType) ;
            console.log(fetchedjson.nodeId) ;
            console.log(fetchedjson.wardId) ;
            console.log(fetchedjson.driverMobNo) ;
            console.log(fetchedjson.citizenMobNo) ;
            console.log(fetchedjson.tripId) ;
            console.log(fetchedjson.driverId);
            var putBody = {"zoneId":"","wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":"","collectionTime":""};
            var WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":""};
            var WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":""};
            var WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":"","driverId":fetchedjson.driverId,"mobileNo": fetchedjson.driverMobNo};
            await apicallingmodule.callingUpdatingNodeDetailsUpdateApi(putBody);
            console.log("node updated");
         //   await apicallingmodule.WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA);
         //   await apicallingmodule.WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA);
           
            socket.on("connect", () => 
            {
                console.log("connected............");
                socket.emit("WCM_WVM_COLLECTION_STATUS_OF_NODE",WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA);
                console.log("notification sent on socket");
                
            });
           

            

            
        }, {
            noAck: true
        });


        channel.consume(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE,async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
            console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.msgId);
            console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.wardNo);
            console.log(DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks);
            var remarks = DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks;
          
            var WCM_WVM_CALCULATED_AUTO_TRIP_DATA = {"msgId":DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.msgId,"wardNo":DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.wardNo,"remarks":DA_WCM_CALCULATED_AUTO_TRIP_QUEUE_MESSAGE.remarks};
            socket.on("connect", () => 
            {
                
                socket.emit("WCM_WVM_CALCULATED_AUTO_TRIP",WCM_WVM_CALCULATED_AUTO_TRIP_DATA) ;
                
            });
           

            

            
        }, {
            noAck: true
        });


       /* channel.consume(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE, async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
            console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId);
            console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result);
            var result = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
          
            var WCM_WVM_CAMERA_DETAILS_UPDATED_DATA = {"msgId":SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId,"result":SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result};
            socket.on("connect", () => 
            {
                
                socket.emit("WCM_WVM_CAMERA_ DETAILS_UPDATED",WCM_WVM_CAMERA_DETAILS_UPDATED_DATA) ;
                
            });
           

            

            
        }, {
            noAck: true
        });*/

      /*  channel.consume(SI_WCM_DA_SMART_BIN_ALERT_QUEUE, async function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
            console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId);
            console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName);
            console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel);
            
            var putBody = { "smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "capacity":200, "batteryLife":4, "solarBased":1, "startBinPointLat":21.11, "startBinPointLong":72.11, "gpsEnabled":1, "contactNo":"9988776655", "zoneId":1, "wardId":1, "muhallaNme":"M1", "address":"ghaziabad", "capacityAlert":0, "alertDateTime":"", "binTemp":0, "nodeStatus":0 , "tripEnabled":0, "tripId":0, "garbageCollectionTimeStamp":"", "qrCode":"sfdf323", "issueStatus":1, "garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel, "alertTimeStmp":""};
            var fetchedjson = await apicallingmodule.callingeditSmartBinApi(putBody); 
            var WCM_WVM_SMART_BIN_ALERT_DATA = {"msgId":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId,"smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName,"garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel};
            var WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA = {"msgId":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId,"smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName,"garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel};
            socket.on("connect", () => 
            {
                
                socket.emit("WCM_WVM_SMART_BIN_ALERT ",WCM_WVM_SMART_BIN_ALERT_DATA) ;
                socket.emit("WCM_DRIVER_MOBILE_SMART_BIN_ALERT",WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA) ;
                
            });
           

            

            
        }, {
            noAck: true
        });*/
    });
});