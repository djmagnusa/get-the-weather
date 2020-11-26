const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=96a86508aecd5959b9e34d53cdfbeb7b'
    request({ url: url, json: true}, (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.message){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, 'It is currently ' + body.main.temp + ' degrees out. Min temperature is ' + body.main.temp_min + ' and max temperature is ' + body.main.temp_max + '. There is 0% chance of rain. ')
        }
    })
}


module.exports = forecast