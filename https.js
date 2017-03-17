const HTTPS = require('https');
class HttpEngine {
  httpsGet(options) {
    return new Promise((resolve, reject) => {
      const request = HTTPS.request(options, (res) => {
        if (res.statusCode === 200) {
          res.setEncoding('utf8');
          res.on('data', (data) => {
            resolve(data);
          });
        } else {
          reject(res.statusCode);
        }
      });
      request.on('error', (e) => {
        console.error(e);
        reject(e);
      });
      request.end();
    });
  }

  httpsPost(options, postData) {
    return new Promise((resolve, reject) => {
      const request = HTTPS.request(options, (res) => {
        if (res.statusCode === 200) {
          res.setEncoding('utf8');
          res.on('data', (data) => {
            resolve(data);
          });
        } else {
          reject(res.statusCode);
        }
      });
      request.on('error', (e) => {
        console.error(e);
        reject(e);
      });
      request.write(postData);
      request.end();
    });
  }

}

module.exports = new HttpEngine();