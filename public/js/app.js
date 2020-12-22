console.log('client side javascript run')

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 =  document.querySelector('#message1')
const msg2 =  document.querySelector('#message2')

weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
   
    const location = search.value

    msg1.textContent ='Loading....'
    msg2.textContent=''
    fetch("http://localhost:3000/view-weather?address="+ location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           msg1.textContent=data.error
        } else {
            msg2.textContent= data.location
            msg2.textContent= data.forecast
        }
    })
})


})