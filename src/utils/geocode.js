const request = require('request')

const geocode_fun = (address, callback)=>{
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF2aW5hcGl0IiwiYSI6ImNrYWpwYmVldjBjcWQycHBqemJtazd3ZXIifQ.Fj-SLy0lr4rco40PwjQS2Q'
    
    request({url:url,json:true},(err,res)=>{
        if(err){
            callback('Unable to connect location',undefined)
        }
        else if(res.body.features.length==0){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{
                latitude :res.body.features[0].center[0],
                longitude:res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }

    })
}



module.exports = {
    geocode_fun :geocode_fun
}