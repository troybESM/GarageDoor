'use strict';
var MyQ = require('myq-api');
var email = process.env.USER
var password = process.env.PASS
var account = new MyQ(email, password);

module.exports.status = async (event, context) => {
  await account.login()
  .then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.error(err);
  });

  let myDevices =await account.getDevices([3, 15, 17])
  .then(function (result) {
    console.log(result);
    return result;
  }).catch(function (err) {
    console.error(err);
    return err;
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'These are the devices associated with your account',
      input: event,
      devices: myDevices
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
