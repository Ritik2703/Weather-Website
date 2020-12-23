const express= require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app= express()
const port = process.env.PORT || 3000

// defines paths for express config
const pdpath = path.join(__dirname,'../public')
const viewpath= path.join(__dirname,'../templates/views')
const parpath= path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(parpath)

// setup static directory to serve
app.use(express.static(pdpath))


app.get('', (req, res) => {            
     res.render('index', {
         title: 'Weather',
         name: 'Ritik Dagar'
     })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ritik Dagar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Helptext: 'This is some helpful texts.',
        title: 'Help',
        name: 'Ritik Dagar'
    })
})

app.get('/view-weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Add address to find weather'
        })
      
    }
    geocode(req.query.address, (error,data/*{latitude, longitude, location}*/) => {
        if(error){
            return res.send({ error })
        }
        forecast(/*{latitude, longitude}*/ data.latitude, data.longitude,(error,forecastdata) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                'forecast': forecastdata,
                'location': data.location,
                'address': req.query.address
            })
        })
   })
})

app.get('/products', (req, res)=> {
    if(!req.query.addess){
        return res.search({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errormsg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
     res.render('404', {
         errormsg: 'My 404 page'
     })
})

// app.get('', (req, res) => {            
//      res.send('<h1>Hare Krishna</h1>')
// })

// app.get('/help', (req, res) => {
//  res.send([{
//      name: 'Hare Ram',
//      name2: 'Sita Ram'
//  },{
//      name: 'Hare krishna'
//  }])
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>Hari Bol</h1>')
// })



app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
