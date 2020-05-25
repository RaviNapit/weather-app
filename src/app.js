const express = require('express')
const path    = require('path')
const hbs     = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')


const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath            = path.join(__dirname,'../templates/views')
const partialPath         = path.join(__dirname,'../templates/partials')


//setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


//set up static directory
app.use(express.static(publicDirectoryPath))



app.get('/',(req,res)=>{
    res.render('index',{
        title:"weather-app",
        name:'ravi napit'
    })
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        helpText: 'This is some helpful text.',
        name :'ravi napit'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide a location for searhing location"
        });
    }

    geocode.geocode_fun(req.query.address,(err,cordinate)=>{
        if(err){
            return res.send({
                    error:err
                })
        }
        forcast.forcast_fun(cordinate.latitude,cordinate.longitude,cordinate.location,(err,result)=>{
            if(err){
                return res.send({error:err})
            }
            return res.send({
                weather  :result.weather,
                visibilit:result.visibilit,
                location:result.location

            })


        })

    })
    


})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})