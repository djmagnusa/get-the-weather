//client side javascript



//querySelector selects the first form tag in the document
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript' //textContent for the content of the paragraph

// document.getElementById("message-1").innerHTML = "From Javascript";



weatherForm.addEventListener('submit', (e) => {  //e stands for event
    e.preventDefault() //prevents the default behaviour i.e preventing the broser from reloading the page

    const location = search.value //extracts the input value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    // console.log(location)
})

