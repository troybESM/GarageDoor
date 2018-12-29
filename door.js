'use strict';
var MyQ = require('myq-api');
var email = process.env.USER;
var password = process.env.PASS;
var account = new MyQ(email, password);
let myDevices;
let statusMessage;

module.exports.status = async (event, context) => {
  await account.login()
  .then(function (result) {
    // console.log(result);
  }).catch(function (err) {
    console.error(err);
  });
  
  myDevices =await account.getDevices([3, 15, 17])
  .then(function (result) {
    console.log(result);
    return result;
  }).catch(function (err) {
    // console.error(err);
    return err;
  });
  
  var door = myDevices.devices.find(function(device){
    // this will only find the first door. 
    return device.typeId == 17
  });
  console.log(door);
  statusMessage = `The ${door.name} is ${door.doorStateDescription}`
  console.log(statusMessage);
  return buildResponse(200,statusMessage,door.doorStateDescription)
};

module.exports.open = async (event, context) => {
  await account.login()
  .then(function (result) {
    // console.log(result);
  }).catch(function (err) {
    console.error(err);
  });
  
  myDevices =await account.getDevices([3, 15, 17])
  .then(function (result) {
    console.log(result);
    return result;
  }).catch(function (err) {
    // console.error(err);
    return err;
  });
  
  var door = myDevices.devices.find(function(device){
    // this will only find the first door. probably needs updated in the future. 
    return device.typeId == 17
  });
  console.log(door);

  account.setDoorState(door.id, 1)
  .then(function (result) {
    console.log(result);
    return result
  }).catch(function (err) {
    // console.error(err);
    return err
  });

  statusMessage = `The ${door.name} is ${door.doorStateDescription}`
  console.log(statusMessage);
  return buildResponse(200,statusMessage,door.doorStateDescription)
};

function buildResponse(code,responseMessage,state){
  let response = {
    statusCode: code,
    body: JSON.stringify({
      message: responseMessage,
      state: state
    },null,4)
  };
  return response
}