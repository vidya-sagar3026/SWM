var ip = '115.249.29.238';
var tagId = 'GHZBDCB000001';
var query = 'http://'+ip+':8081/api/swm/report/nodeIdForQrCode/?qrCode='+tagId;
var fetchedJson;
const axios = require('axios');
    //  axios.get(query).then( resp => {
    //   console.log(resp.data);
    //   fetchedJson = resp.data;
    //   console.log("fetched_json_in_apicalling",fetchedJson);
      
      
    // });
// var arr = [{"a":1,"b":3}];
// for(let i=0;i<arr.length;i++)
// {
//   console.log(arr[i].a);
// }
// var a = [];
// a[3] = 2;
// if(a[1]==undefined)
// {
//   console.log("key 1 does not exist");
// }
// if(a[2]==undefined)
// {
//   console.log("key 2 does not exist");
// }

  //const axios = require('axios');
  if(false)
  {
    const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");
    const httpsAgent = new HttpsProxyAgent({host: "proxyhost", port: "proxyport", auth: "username:password"})
    axios = axios.create({httpsAgent});
  }
  try
  {
     // var query = 'http://'+'115.249.29.238'+':8081/api/swm/report/nodeIdForQrCode/?qrCode='+'dummy';
      var query = 'http://'+'127.0.0.1'+':8081/23';
       axios.get(query).then( resp => {
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
