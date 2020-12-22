const req= require('request')

const forecast = (latitude,longitude,callback) => {
   // const a= latitude
    //const b= longitude
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude+ '&lon=' + longitude + '&appid=d779ae314b41a8502cbf2723d09e8e05'
    req({url, json:true}, (error,{body}) => {
     //   console.log(response.body)
        if(error){
            callback('unable to connect', undefined)
        } else if(body.message){
           // console.log(response.body)
           callback('unable to find location', undefined)
        } else {
           // console.log(response.body)
            callback(undefined, "it is currently "+ body.main.temp+ " temperature and "+ body.main.humidity+ " pressure.")
        }
    })
}

module.exports= forecast