fetch('no-encontrado.html')
    .then(resp => resp.text())
    .then(html => {
        const body = document.querySelector('body');
        body.innerHTML = html;
    })
    .catch(error => {
        console.log('Error en la peticion')
        console.log(error);
    })
