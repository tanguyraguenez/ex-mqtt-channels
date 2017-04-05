var mqtt = require('mqtt');
var client = {};
var exercise = {};
exercise.channelsReceived = [];

// We have devices connected to a broker publishing
// data. Each device may publish any data in topics
// such as:
// device/loganWeather/temperature
// device/loganWeather/pressure
// device/MITWeather/temperature
// device/MITWeather/pressure
// device/muddyCharles/soundLevel
// device/muddyCharles/lightLevel
// device/muddyCharles/temperature

exercise.ConnectToServer = function(address){
    client = mqtt.connect(address, 1883);

    exercise.client = client;
};

exercise.SubscribeToAllSensorData = function(){
    exercise.client.subscribe('device/#');
    
};

exercise.SubscribeToTemperatureDataOnly = function(){
    exercise.client.subscribe('device/+/temperature');
};

exercise.LogChannelsReceived = function(){
    exercise.client.on('message', function(channel, message){
        exercise.channelsReceived.push(channel);
    });
};

exercise.Disconnect = function(){
    client.end;
};

module.exports = exercise;
