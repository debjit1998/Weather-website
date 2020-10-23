const path=require('path')
const express=require('express');
const request=require('request');
const hbs=require('hbs')
const geocodeUtil=require('./geocodeUtil.js')

const app=express();
const port=process.env.PORT || 3000;
//console.log(path.join(__dirname,'../public'))
const staticPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(staticPath))


// app.get('',(req,res)=>{
//   res.send('Hello Express')
// })

app.get('/help',(req,res)=>{
  res.render('help',{
    helptext:'This is some helpful text',
    title:'Help',
    name:'Debjit'
  })
})

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Debjit'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Debjit',
    aboutText:'I am a software engineer'
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.location){
    return res.send({
      error:'You must pass a location query string'
    })
  }
  geocodeUtil.geocode(req.query.location,(error,data)=>{
    if(data){
      geocodeUtil.weatherStack(data,(data,error)=>{
        if(!error){
          res.send({
            temperature:data.temperature,
            feelslike:data.feelslike
          })
        }
      })
    }else{
      res.send({
        error:error
      })
    }
  })

})

app.get('/help/*',(req,res)=>{
  res.send("Help article not found");
})

app.get('*',(req,res)=>{
  res.send("My 404 Page");
})
// request({url:'http://localhost:3000/weather',json:true},(error,{body})=>{
//   console.log(body.forecast+' '+body.location)
// })
app.listen(port,()=>{
  console.log('Server is up on port '+port)
})
