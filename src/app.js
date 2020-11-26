// use nodemon src/app.js -e js,hsb 
// where e stands for extensions

const path = require('path') //this is a core node moule not a npm package
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
// console.log(__dirname)
// // console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 //using process.env we can access envirnoment variables

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //for setting up handlebars
app.set('views', viewsPath) //now express will no longer look for 'views' directory . It will instead look for a replaced path
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => { //this will not run if we use a static webpage
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{     //it will automatically strigify the object
//        name: 'Andrew',
//     }, {    
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {               
    res.render('index', {    //render goes to index.hbs and coverts the html
            title: 'Weather',
            name: 'Andrew Mead'
        })
})

app.get('/about', (req,res) => {
    res.render('about', { 
        title: 'About Me',
        name: 'Andrew Mead'   
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

//http request can only respong once. Hence we are using return res.send to end the code if there is no query provided

app.get('/products', (req,res) => {
    
    if(!req.query.search){  //if search value in query is not provided
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => { //if the user provided /help/anythingwhichisnotin website 
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

// app.get('*', (req,res) => {  //* means everything else i.e except everything that we have prvided earlier
//     res.send('My 404 page')
// })

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {    //3000 is the port
    console.log('Server is up on port ' + port) //this will not be printed in the browser
})   


