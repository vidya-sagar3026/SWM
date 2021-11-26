const express = require('express')
const app = express()
const port = 8081

let something = 5;
app.get('/:id', (req, res) => {
  var arr = ['123','456','789'];
    res.send(arr);

    
  res.end('THis is response from rest api'+req.params.id);
});



app.get('/api/swm/dss/getListOfUserForCommunityPoint/:communityPointName', (req, res) => {
     var arr = [
      "8132f2d9-890f-4bec-8500-210f3e0b27c4",
      "8132f2d9-890f-4bec-8600-210f3e0b2756",
      "8132f2d9-890f-4bec-8500-210f3e0b27c4"
    ];
    res.send(arr);
   // res.end('This is response from rest api'+req.params.communityPointName+{arr});
    
  });

app.listen(port, () => {
    console.log(`app listening at http://127.0.0.1:${port}`)
  });