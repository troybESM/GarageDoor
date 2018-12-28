'use strict';
var MyQ = require('myq-api');
var email = process.env.USER;
var password = process.env.PASS;
var account = new MyQ(email, password);
let myDevices;

module.exports.status = async (event, context) => {
  await account.login()
  .then(function (result) {
    // console.log(result);
  }).catch(function (err) {
    console.error(err);
  });
  
  myDevices =await account.getDevices([3, 15, 17])
  .then(function (result) {
    // console.log(result);
    return result;
  }).catch(function (err) {
    // console.error(err);
    return err;
  });
  
  myDevices.devices.forEach(function(device){
    if (device.typeId == 17){
      console.log(`The ${device.name} is ${device.doorStateDescription} `)
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `The ${device.name} is ${device.doorStateDescription} `,
        }),
      };
    }
  })
};
