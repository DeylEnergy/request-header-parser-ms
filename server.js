const express = require('express');
let app = express();

app.get('/', (req, res) => {
  let chunkOS = req.headers['user-agent'];
  let isNeededChunk = false;
  let fullOSInfo = '';
  for(let i = 0; i < chunkOS.length; i++){
    if ((isNeededChunk) && (chunkOS[i] != ')')){
      fullOSInfo += chunkOS[i];
    } else if (chunkOS[i] == '(') {
      isNeededChunk = true;
    } else if (chunkOS[i] == ')') {
      break;
    }
  }
  const data = {
    ipaddress: req.connection.remoteAdress || null,
    language: req.headers['accept-language'].split(',')[0],
    software: fullOSInfo
  };
  res.json(data);
});

app.listen(3000);
