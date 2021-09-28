function callingDemoApi(){
    const axios = require('axios');
    dummyparametervalue = 123456;
    axios.get(`http://localhost:8081/${dummyparametervalue}`).then(resp => {
    console.log(resp.data);
});
}

async function callingPlayerIdFetchingApi(value){

  var value1 =  value;
  var fetchedArray;
    const axios = require('axios');
//     axios.get('http:/api/swm/dss/getListOfUserForCommunityPoint/${value}').then(resp => {
//     console.log(resp.data);
// });
await axios.get(`http://localhost:8081/api/swm/dss/getListOfUserForCommunityPoint/${value}`).then(resp => {
    console.log(resp.data);
    fetchedArray = resp.data;
});

//console.log("data inside",fetchedArray);
return fetchedArray;
}


async function callingNodeDetailsFetchingApiForGivenTagId(tagId)
{
  //var value1 =  value;
  var test = 'GHZBDCB000001';
  var fetchedArray;
  const axios = require('axios');
  try
  {
    await axios.get(`http://172.22.7.105:8081/api/swm/report/nodeIdForQrCode/?qrCode=${tagId}`).then( resp => {
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





async function callingPlayerIdFetchingFromMobileNoApi(mobNo)
{

  var value1 =  mobNo;
  var fetchedArray;
    const axios = require('axios');

await axios.get(`http://localhost:8081/api/swm/report/getPlayerId/${mobNo}`).then(resp => {
    console.log(resp.data);
    fetchedArray = resp.data;
});

//console.log("data inside",fetchedArray);
return fetchedArray;
}


async function callingeditSmartBinApi(dataToBeUpdated)
{
const res = await axios.put('http://localhost:8081/api/swm/report/updateNodeStatus/', dataToBeUpdated);
res.data.form; 
res.data.headers['application/json;charset=utf-8']; 
}


async function callingsetSmartBinGarbageLevelApi(dataToBeUpdated)
{
const res = await axios.put('http://172.22.7.105:8081/api/swm/si/setSmartBinGarbageLevel/', dataToBeUpdated);
res.data.form; 
//res.data.headers['application/json;charset=utf-8']; 
}

async function callingUpdatingNodeDetailsUpdateApi(dataToBeUpdated)
{
  const axios = require('axios');
const res = await axios.put('http://172.22.7.105:8081/api/swm/report/updateNodeStatus/', dataToBeUpdated);
console.log("callingUpdatingNodeDetailsUpdateApiRes--------------->",res.data)
res.data.form; 
//res.data.headers['application/json;charset=utf-8']; 
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


module.exports = {callingDemoApi,callingPlayerIdFetchingApi,callingNotificationSendingApi,callingPlayerIdFetchingFromMobileNoApi,callingNotificationSendingApiForIssueStatusUpdate,callingNotificationSendingApiForTripUpdateAlert,callingNodeDetailsFetchingApiForGivenTagId,callingUpdatingNodeDetailsUpdateApi,WCM_MOBLE2_COLLECTION_STATUS_OF_NODE_NOTIFICATION,WCM_MOBLE1_COLLECTION_STATUS_OF_NODE_NOTIFICATION,callingsetSmartBinGarbageLevelApi};