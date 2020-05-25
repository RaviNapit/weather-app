console.log('Client side javascript file is loaded!')

// fetch("https://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch("http://localhost:3000/weather?address=boston").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }
//         else{
//             console.log(data.weather)
//             console.log(data.location)
//         }
        
//     })
// })



const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const message1    = document.querySelector('#message-1')
const message2    = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    const url      = "http://localhost:3000/weather?address="+encodeURI(location)
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.weather
            }
        })
    })
})