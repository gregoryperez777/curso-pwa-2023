// Petición POST
// https://reqres.in/api/users

let img = document.querySelector('img');

fetch('superman.png')
    .then(resp => resp.blob())
    .then(imagen => {
        console.log(imagen)
        const imgPath = URL.createObjectURL(imagen)
        img.src = imgPath;
    })