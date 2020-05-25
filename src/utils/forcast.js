const request = require('request')

const forcast = (lati,long,location,callback)=>{
    
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lati+"&lon="+long+"&appid=5e3ae0ad01fc2b96ab80b90050d81be7"

    request({url:url,json:true},(err,res)=>{
        if(err){
            callback('unable to find location',undefined)
        }
        else if(res.code=="400"){
            callback("please enter correct location",undefined)
        }
        else{
            callback(undefined,{
                weather   :res.body.weather[0].main,
                visibility:res.body.visibility,
                location:location
            })
            
        }
    }) 
}

module.exports={
    forcast_fun:forcast
}