const apicallingmodule = require('./apicalling')
var as = require('./RabbitMq/ConnectionFactory')
var amqp = require('amqplib/callback_api');

console.log('This is Entry Class')
var app = require('express')();
var cors = require('cors');
var http = require('http').Server(app);
app.use(cors());

var io = require('socket.io')(http,{
cors: {
      origin:"*"
}

});

class entrySocket
{ constructor(){
  io.on('connection',  function(socket) {

/**********************rabiit mq listener******************************** */


amqp.connect('amqp://guest:guest@127.0.0.1', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var SI_MESSAGES = 'SI';
        var SI_WCM_READER_DATA_QUEUE = 'SI';
        var IVA_WCM_FACE_DETECTED_ON_BLACK_SPOT_QUEUE = 'IVA';
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
            // socket.on("connect", () => 
            // {
                
                io.sockets.emit("WCM_WVM_FACE_DETECTED_ON_BLACKSPOT ",WCM_WVM_FACE_DETECTED_ON_BLACKSPOT_DATA) ;
                
           // });
           

            

            
        }, {
            noAck: true
        });


     
        channel.consume(SI_MESSAGES, async function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
          var SI_WCM_READER_DATA_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
          
          var SI_MESSAGE = JSON.parse(msg.content.toString());
          var msgId = SI_MESSAGE.msgId;
          if(msgId==18)
          {
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId);
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.rfidReaderId);
            console.log(SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId);
          var tagId = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
          var fetchedjson = await apicallingmodule.callingNodeDetailsFetchingApiForGivenTagId(tagId); 
          console.log("fetchedjson--------------------->",fetchedjson);
          console.log(fetchedjson.nodeType) ;
          console.log(fetchedjson.nodeId) ;
          console.log(fetchedjson.wardId) ;
          console.log(fetchedjson.driverMobNo) ;
          console.log(fetchedjson.citizenMobNo) ;
          console.log(fetchedjson.tripId) ;
          console.log(fetchedjson.driverId);
         
         var putBody = {"zoneId":"","wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":2,"collectionTime":"","ImeiNo":SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId};
          var WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":2};
          var WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":""};
          var WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":SI_WCM_READER_DATA_QUEUE_MESSAGE.msgId,"wardId":fetchedjson.wardId,"nodeType":fetchedjson.nodeType,"nodeId":fetchedjson.nodeId,"nodeStatus":"","driverId":fetchedjson.driverId,"mobileNo": fetchedjson.driverMobNo};
          console.log(putBody);
          try{
          await apicallingmodule.callingUpdatingNodeDetailsUpdateApi(putBody);
          }
          catch(e)
          {
            console.log('exception in callingUpdatingNodeDetailsUpdateApi api');
          }
       //   await apicallingmodule.WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA);
       //   await apicallingmodule.WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_DATA);
         
          // socket.on("connect", () => 
          // {
              
            io.sockets.emit("WCM_WVM_COLLECTION_STATUS_OF_NODE",WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA);
        }
        if(msgId==16)
        {
          console.log(" [x] Received %s", msg.content.toString());
          var SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
          console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId);
          console.log(SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result);
          var result = SI_WCM_READER_DATA_QUEUE_MESSAGE.tagId;
        
          var WCM_WVM_CAMERA_DETAILS_UPDATED_DATA = {"msgId":SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.msgId,"result":SI_WCM_CAMERA_DETAILS_UPDATED_QUEUE_MESSAGE.result};
       
              
            io.sockets.emit("WCM_WVM_CAMERA_ DETAILS_UPDATED",WCM_WVM_CAMERA_DETAILS_UPDATED_DATA) ;
        }
        if(msgId==17)
        {
          console.log(" [x] Received %s", msg.content.toString());
          var SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE = JSON.parse(msg.content.toString());
          console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId);
          console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName);
          console.log(SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel);

          var putBody = {"smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName,"garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel};
         // var putBody = { "smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName, "capacity":200, "batteryLife":4, "solarBased":1, "startBinPointLat":21.11, "startBinPointLong":72.11, "gpsEnabled":1, "contactNo":"9988776655", "zoneId":1, "wardId":1, "muhallaNme":"M1", "address":"ghaziabad", "capacityAlert":0, "alertDateTime":"", "binTemp":0, "nodeStatus":0 , "tripEnabled":0, "tripId":0, "garbageCollectionTimeStamp":"", "qrCode":"sfdf323", "issueStatus":1, "garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel, "alertTimeStmp":""};
         // var fetchedjson = await apicallingmodule.callingeditSmartBinApi(putBody); 
         var fetchedjson = await apicallingmodule.callingsetSmartBinGarbageLevelApi(putBody);

          var WCM_WVM_SMART_BIN_ALERT_DATA = {"msgId":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId,"smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName,"garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel};
          var WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA = {"msgId":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.msgId,"smartBinName":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.smartBinName,"garbageLevel":SI_WCM_DA_SMART_BIN_ALERT_QUEUE_MESSAGE.garbageLevel};
          // socket.on("connect", () => 
          // {
              
              io.sockets.emit("WCM_WVM_SMART_BIN_ALERT ",WCM_WVM_SMART_BIN_ALERT_DATA) ;
              io.sockets.emit("WCM_DRIVER_MOBILE_SMART_BIN_ALERT",WCM_DRIVER_MOBILE_SMART_BIN_ALERT_DATA) ;
        }
              
          // });
         

          

          
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
          
                
              io.sockets.emit("WCM_WVM_CALCULATED_AUTO_TRIP",WCM_WVM_CALCULATED_AUTO_TRIP_DATA) ;
                
           
           

            

            
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
     var event = "MESSAGE_FOR_ID_"+data.tripId;
     io.sockets.emit(event,data);
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



socket.on('WVM_WCM_ISSUE_STATUS_UPDATE', async function (data) {
  
  console.log(data.msgId);
  console.log(data.issueType);
  console.log(data.issueId);
  console.log(data.issueStatus);
  console.log(data.mobNo);
  var WCM_MOBILE_ISSUE_STATUS_UPDATE_BODY = {"issueType":data.issueType,"issueId":data.issueId,"issueStatus":data.issueStatus};
  var fetchedarray = await apicallingmodule.callingPlayerIdFetchingFromMobileNoApi(data.mobNo);  
  console.log("the fetched array from api is "+ fetchedarray );
  apicallingmodule.callingNotificationSendingApiForIssueStatusUpdate(fetchedarray,WCM_MOBILE_ISSUE_STATUS_UPDATE_BODY);

  
});

socket.on('WVM_WCM_TRIP_ASSIGNMENT_ALERT', function (data) {
  
  console.log(data.msgId);
  console.log(data.tripId);
  console.log(data.driverId);

  apicallingmodule.callingNotificationSendingApi();
  io.sockets.emit('WCM_MOBILE_TRIP_ASSIGNMENT_ALERT',data);
  
});


socket.on('WVM_WCM_TRIP_UPDATE_ALERT', function (data) {
  
  
  console.log(data.msgId);
  console.log(data.tripId);
  console.log(data.driverId);
  console.log(data.mobileNo);
  var WCM_MOBILE_TRIP_ASSIGNMENT_ALERT_BODY = {"msgId":data.msgId,"tripId":data.tripId,"driverId":data.driverId,"mobileNo":data.mobileNo};

 // var fetchedplayeridarray = await apicallingmodule.callingPlayerIdFetchingFromMobileNoApi(data.mobNo);
  apicallingmodule.callingNotificationSendingApiForTripUpdateAlert(fetchedplayeridarray,WCM_MOBILE_TRIP_ASSIGNMENT_ALERT_BODY);

  
});


socket.on('MOBILE1_WCM_COLLECTION_STATUS_OF_NODE', function (data) {
  
  console.log(data.msgId);
  console.log(data.mobileNo);
  console.log(data.nodeType);
  console.log(data.nodeId);
  console.log(data.nodeStatus);
  console.log(data.wardId);
  var WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":data.msgId,"wardId":data.wardId,"nodeType":data.nodeType,"nodeId":data.nodeId,"nodeStatus":data.nodeStatus};
  var WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA = {"msgId":data.msgId,"nodeType":data.nodeType,"nodeStatus":data.nodeStatus,"wardId":data.wardId};
  io.sockets.emit('WCM_WVM_COLLECTION_STATUS_OF_NODE',WCM_WVM_COLLECTION_STATUS_OF_NODE_DATA);
  apicallingmodule.WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_DATA);
  //notification to be sent
  
});



socket.on('MOBILE_WCM_ISSUE_REGISTERATION_ALERT', function (data) {
  
  console.log(data.msgId);
  console.log(data.issueType);
  console.log(data.issueId);
  console.log(data.nodeId);
  console.log(data.wardNo);
  console.log(data.zoneId);
 io.sockets.emit('WCM_WVM_ISSUE_REGISTERATION_ALERT',data);
  
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
  var WCM_DA_CALCULATE_AUTO_TRIP_MESSAGE = {"msgId":data.msgId,"wardNo":data.wardNo};
  mqsender.sender('WCM', Buffer.from(JSON.stringify(WCM_DA_CALCULATE_AUTO_TRIP_MESSAGE)))
  
});

socket.on('WVM_WCM_FETCH_CAMERA_DETAILS', function (data) {
  
  console.log(data.msgId);
  
  var WCM_SI_FETCH_CAMERA_DETAILS = {"msgId":data.msgId};
  mqsender.sender('WCM', Buffer.from(JSON.stringify(WCM_SI_FETCH_CAMERA_DETAILS)));
  
});



  
  socket.on('disconnect', function () {
     console.log('A user disconnected ' + address);
  });
});



http.listen(8088, function() {
    console.log('listening on *:8088');
});

}
}
module.exports =  new entrySocket(); 



// http.listen(process.argv[2], function() {
//     console.log('listening on *:==> ' + http.address().port);
// });


