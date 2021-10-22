
function callingDemoApi(){
    const axios = require('axios');
    dummyparametervalue = 123456;
    axios.get(`http://localhost:8081/${dummyparametervalue}`).then(resp => {
    console.log(resp.data);
});
}

async function callingGetListOfUserForCommunityPointApi(receivedCommunityPointName,ip){

  var receivedvalue = receivedCommunityPointName;
  var fetchedArray;
  const axios = require('axios');
  var query = 'http://'+ip+':8081/api/swm/report/getListOfUserForCommunityPoint/?communityPointName='+receivedvalue;
  await axios.get(query).then(resp => {
  console.log(resp.data);
  fetchedArray = resp.data;
});
return fetchedArray;
}


async function callingNodeDetailsFetchingApiForGivenTagId(tagId,ip)
{
  var test = 'GHZBDCB000001';
  var fetchedArray;
  var receivedtagId = tagId;
  const axios = require('axios');
  if(true)
  {
    const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");
    const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})
    axios = axios.create({httpsAgent});
  }
  try
  {
      var query = 'http://'+ip+':8081/api/swm/report/nodeIdForQrCode/?qrCode='+receivedtagId;
      await axios.get(query).then( resp => {
      console.log(resp.data);
      fetchedJson = resp.data;
      console.log("fetched_json_in_apicalling",fetchedJson);
      
    });
  }
  catch(err)
  {
    console.log(err);
  }
  return fetchedJson;


}


async function callingNodeDetailsFetchingApiForGivenQrCodeForSmartBin(smartBinName,ip)
{
  var test = 'GHZBDCB000001';
  var fetchedArray;
  var receivedtagId = tagId;
  const axios = require('axios');
  if(true)
  {
    const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");
    const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})
    axios = axios.create({httpsAgent});
  }
  try
  {
      var query = 'http://'+ip+':8081/api/swm/report/nodeIdForQrCode/?qrCode='+smartBinName;
      await axios.get(query).then( resp => {
      console.log(resp.data);
      fetchedJson = resp.data;
      console.log("fetched_json_in_apicalling",fetchedJson);
      
    });
  }
  catch(err)
  {
    console.log(err);
  }
  return fetchedJson;


}



async function callingNodeDetailsFetchingApiForSmartBinName(smartBinName,ip)
{
  var test = 'GHZBDCB000001';
  var fetchedArray;
  var receivedtagId = tagId;
  const axios = require('axios');
  if(true)
  {
    const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");
    const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})
    axios = axios.create({httpsAgent});
  }
  try
  {
      var query = 'http://'+ip+':8081/api/swm/smartBin/getsmartBinDetail/?smartBinName='+smartBinName;
      await axios.get(query).then( resp => {
      console.log(resp.data);
      fetchedJson = resp.data;
      console.log("fetched_json_in_apicalling",fetchedJson);
      
    });
  }
  catch(err)
  {
    console.log(err);
  }
  return fetchedJson;


}





async function callingVehicleInfoApiForGivenTrackerId(gps_tracker_id,ip)
{
 
  var fetchedArray;
  var receivedgps_tracker_id = gps_tracker_id;
  const axios = require('axios');
  if(true)
  {
    const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");
    const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})
    axios = axios.create({httpsAgent});
  }
  try
  {

      var query = 'http://'+ip+':8081/api/swm/si/getVehicleInfo/?gpsTrackerID='+receivedgps_tracker_id;
      await axios.get(query).then( resp => {
      console.log(resp.data);
      fetchedJson = resp.data;
      console.log("fetched_json_in_apicalling",fetchedJson);
      
    });
  }
  catch(err)
  {
    console.log(err);
  }

 

  return fetchedJson;


}









async function callingapiAddGPSData(dataToBeUpdated,ip)
{
 
  var query = 'http://'+ip+':8081/api/swm/si/addGPSData/';
  const res = await axios.post(query,dataToBeUpdated);
  console.log("callingUpdatingNodeDetailsUpdateApiRes--------------->",res.data)
  res.data.form; 
}


async function callingapiUpdateVehiclePerformanceData(dataToBeUpdated,vehicleNo,ip)
{
 
  var query = 'http://'+ip+':8081/api/swm/si/updateVehiclePerformanceData/?vehicleNo='+vehicleNo;
  const res = await axios.post(query,dataToBeUpdated);
  console.log("callingUpdatingNodeDetailsUpdateApiRes--------------->",res.data)
  res.data.form; 
}





async function callingPlayerIdFetchingFromMobileNoApi(mobNo,ip)
{

  var receivedmobNo =  mobNo;
  var fetchedArray;
    const axios = require('axios');
var query = 'http://'+ip+':8081/api/swm/report/getPlayerId/?mobNo='+mobNo;
//await axios.get(`http://localhost:8081/api/swm/report/getPlayerId/${mobNo}`).then(resp => {
  await axios.get(query).then(resp => {
    console.log(resp.data);
    fetchedArray = resp.data;
});

//console.log("data inside",fetchedArray);
return fetchedArray;
}


async function callingeditSmartBinApi(dataToBeUpdated)
{

  var query = 'http://'+ip+':8081/api/swm/report/updateNodeStatus/';
  const res = await axios.put(query, dataToBeUpdated);
  res.data.form; 
}


async function callingsetSmartBinGarbageLevelApi(dataToBeUpdated,ip)
{
var query = 'http://'+ip+':8081/api/swm/si/setSmartBinGarbageLevel/';
const res = await axios.put(query,dataToBeUpdated);
res.data.form; 
}

async function callingUpdatingNodeDetailsUpdateApi(dataToBeUpdated,ip)
{
  const axios = require('axios');
  var query = 'http://'+ip+':8081/api/swm/report/updateNodeStatus/';
  const res = await axios.put(query, dataToBeUpdated);
  console.log("callingUpdatingNodeDetailsUpdateApiRes--------------->",res.data)
  res.data.form; 
}

async function callingNotificationSendingApi(playerIdArrayarg)
{
var axios = require('axios');
var playerIdArray1 = playerIdArrayarg;
console.log(playerIdArray1);
var playerIdArray = [
    "8132f2d9-890f-4bec-8500-210f3e0b27c4",
    "8132f2d9-890f-4bec-8600-210f3e0b2756",
    "8132f2d9-890f-4bec-8500-210f3e0b27c4"
  ];
var data = JSON.stringify({
  "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
  "include_player_ids": playerIdArray,
  "data": {
    "driverId": "12240",
    "tripId": "111",
    "timestamp": "AssignedTimestamp"
  },
  "contents": {
    "en": "You have been Assigned a trip!!"
  },
  "buttons": [
    {
      "id": "reply",
      "text": "Reply"
    }
  ]
});

var config = {
  method: 'post',
  url: 'https://onesignal.com/api/v1/notifications',
  headers: { 
    'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


}


async function callingNotificationSendingApiForIssueStatusUpdate(playerIdArrayarg,body){
  var axios = require('axios');
  var playerIdArray = [
      "8132f2d9-890f-4bec-8500-210f3e0b27c4",
      "8132f2d9-890f-4bec-8600-210f3e0b2756",
      "8132f2d9-890f-4bec-8500-210f3e0b27c4"
    ];

  var data = JSON.stringify({
    "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
    "include_player_ids": playerIdArrayarg,
    "data": body,
    "contents": {
      "en": "You have been Assigned a trip!!"
    },
    "buttons": [
      {
        "id": "reply",
        "text": "Reply"
      }
    ]
  });
  
  var config = {
    method: 'post',
    url: 'https://onesignal.com/api/v1/notifications',
    headers: { 
      'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
  }


  async function callingNotificationSendingApiForIssueStatusUpdate(playerIdArrayarg,body){
  var axios = require('axios');
  var playerIdArray = [
      "8132f2d9-890f-4bec-8500-210f3e0b27c4",
      "8132f2d9-890f-4bec-8600-210f3e0b2756",
      "8132f2d9-890f-4bec-8500-210f3e0b27c4"
    ];

  var data = JSON.stringify({
    "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
    "include_player_ids": playerIdArrayarg,
    "data": body,
    "contents": {
      "en": "You have been Assigned a trip!!"
    },
    "buttons": [
      {
        "id": "reply",
        "text": "Reply"
      }
    ]
  });
  
  var config = {
    method: 'post',
    url: 'https://onesignal.com/api/v1/notifications',
    headers: { 
      'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  }); 
  
  }


  async function callingNotificationSendingApiForTripUpdateAlert(playerIdArrayarg,body){
    var axios = require('axios');
    var playerIdArray = [
        "8132f2d9-890f-4bec-8500-210f3e0b27c4",
        "8132f2d9-890f-4bec-8600-210f3e0b2756",
        "8132f2d9-890f-4bec-8500-210f3e0b27c4"
      ];
  
    var data = JSON.stringify({
      "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
      "include_player_ids": playerIdArrayarg,
      "data": body,
      "contents": {
        "en": "You have been Assigned a trip!!"
      },
      "buttons": [
        {
          "id": "reply",
          "text": "Reply"
        }
      ]
    });
    
    var config = {
      method: 'post',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: { 
        'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    }


    async function WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,body){
      var axios = require('axios');
      var playerIdArray = [
          "8132f2d9-890f-4bec-8500-210f3e0b27c4",
          "8132f2d9-890f-4bec-8600-210f3e0b2756",
          "8132f2d9-890f-4bec-8500-210f3e0b27c4"
        ];
    
      var data = JSON.stringify({
        "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
        "include_player_ids": mobilestobenotified,
        "data": body,
        "contents": {
          "en": "You have been Assigned a trip!!"
        },
        "buttons": [
          {
            "id": "reply",
            "text": "Reply"
          }
        ]
      });
      
      var config = {
        method: 'post',
        url: 'https://onesignal.com/api/v1/notifications',
        headers: { 
          'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
      
      }

      async function WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION(mobilestobenotified,body){
        var axios = require('axios');
        var playerIdArray = [
            "8132f2d9-890f-4bec-8500-210f3e0b27c4",
            "8132f2d9-890f-4bec-8600-210f3e0b2756",
            "8132f2d9-890f-4bec-8500-210f3e0b27c4"
          ];
      
        var data = JSON.stringify({
          "app_id": "f01491c7-0a84-421c-9a58-289d685259b7",
          "include_player_ids": mobilestobenotified,
          "data": body,
          "contents": {
            "en": "You have been Assigned a trip!!"
          },
          "buttons": [
            {
              "id": "reply",
              "text": "Reply"
            }
          ]
        });
        
        var config = {
          method: 'post',
          url: 'https://onesignal.com/api/v1/notifications',
          headers: { 
            'Authorization': 'N2M0ZjZjN2MtMDc2OS00ZDVjLWI1NzUtOGRlOTA3NGU1MWY1', 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        
        
        }


module.exports = {callingDemoApi,callingNotificationSendingApi,callingPlayerIdFetchingFromMobileNoApi,callingNotificationSendingApiForIssueStatusUpdate,callingNotificationSendingApiForTripUpdateAlert,callingNodeDetailsFetchingApiForGivenTagId,callingUpdatingNodeDetailsUpdateApi,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION,WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION,callingsetSmartBinGarbageLevelApi,callingGetListOfUserForCommunityPointApi,callingVehicleInfoApiForGivenTrackerId,callingapiAddGPSData,callingapiUpdateVehiclePerformanceData,callingNodeDetailsFetchingApiForGivenQrCodeForSmartBin,callingNodeDetailsFetchingApiForSmartBinName};