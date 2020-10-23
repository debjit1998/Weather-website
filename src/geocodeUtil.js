const request=require('request')

const geocode=(address,callback)=>{
  data={lat:0,lon:0}
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib2N0YXZhcml1bSIsImEiOiJja2dreTY4anowOTF4MnpyMDByeXE1dHBoIn0.5tLyt1xQjuDC7cRMDeY6zg&limit=1&types=country'
  request(
    { url: url, json:true},
    (error,response)=>{
      if(error){
        callback("Unable to connect to weather service",undefined);
      }else if(response.body.error){
        callback("Not able to find loaction",undefined);
      }
      else{
        if(response.body.features.length>0){
          lon=response.body.features[0].center[0];
          lat=response.body.features[0].center[1];
          data.lat=lat;
          data.lon=lon;
          callback(undefined,data);
        }else{
          callback("Not able to find loaction",undefined);
        }
      }
    }
  )
}

const weatherStack = (data,callback)=>{
  const lon=data.lon;
  const lat=data.lat;

  const url='http://api.weatherstack.com/current?access_key=94fb873c9277e1de882a5aa1c52d38f1&query='+lat+','+lon;

  request(
    { url: url, json:true},
    (error,response)=>{
      if(error){
        callback(undefined,'Faced into some issues! Try again')
      }else{
        callback(response.body.current,undefined);
      }
      //console.log("The actual temperature is "+data.temperature+". It feels like it is "+data.feelslike+" outside");
    }
  )
}

module.exports={
  geocode:geocode,
  weatherStack:weatherStack
}
