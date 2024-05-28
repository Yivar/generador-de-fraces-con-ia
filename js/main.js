let separarTexto = (text) => {
    // Expresión regular para dividir el texto por puntos seguidos de un espacio o un salto de línea
    const regex = /\.\s*(?=[A-Z]|$)/g;
    // Dividir el texto en un array de oraciones
    const data = text.split(regex);
    // Eliminar oraciones vacías
    const limpiar = data.filter(data => data.trim().length > 0);
    return limpiar;
}
let generateImage = (divElement, resolution = 2) => {
    return new Promise((resolve, reject) => {
        html2canvas(divElement, {
            scale: resolution, // Escala la resolución de la imagen
            allowTaint: true, // Permite renderizar contenido de origen cruzado (cross-origin)
            useCORS: true, // Utiliza CORS para cargar recursos de origen cruzado
        }).then(canvas => {
            // Convierte el canvas en una imagen
            const image = canvas.toDataURL('image/png');

            // Crea un enlace para descargar la imagen
            const link = document.createElement('a');
            link.download = 'image.png';
            link.href = image;
            link.click();

            resolve(); // Resuelve la promesa si todo va bien
        }).catch(error => {
            reject(error); // Rechaza la promesa si hay un error
        });
    });
}



let textHTML = (_data) => {
    let data=_data;
    // Crea un conjunto vacío para almacenar los números generados
    const numero = new Set();
    let html = `<section>`;
    if (data.length > 1) {
        for (const parrafo of data) {
            let randomNumber;
            randomNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            // Genera un número aleatorio que no esté en el conjunto
            /*do {
                randomNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            } while (numero.has(randomNumber));
            // Agrega el número generado al conjunto
            numero.add(randomNumber);*/
            html += `<p style="color: var(--colt-${randomNumber});">${parrafo}.</p>`;
        }
    }else{
        data=data[0].split(' ');
        const nuevoData = data.map((elemento, indice) => indice === data.length - 1 ? `${elemento}.` : `${elemento} `);
        html+='<p>'
        for (const parrafo of nuevoData) {
            let randomNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            html += `<span style="color: var(--colt-${randomNumber});">${parrafo}</span>`;
        }
        html+='</p>'
    }
    html += `</section>`
    idFrace.innerHTML = html;
};

btnBuscar.addEventListener('click', (e) => {
    let texto = inputTexto.value;
    if (texto.length > 5) {
        texto = separarTexto(texto);
        textHTML(texto)
    }
})
btnGenerar.addEventListener('click', (e) => {
    let texto = inputTexto.value;
    if (texto.length > 5) {
        texto = separarTexto(texto);
        textHTML(texto)
    }
})
btnDescargar.addEventListener('click', (e) => {
    const divToCapture = document.getElementById('idFrace');
    generateImage(divToCapture, 4) // Resolución de 4 veces mayor
        .then(() => console.log('Imagen generada y descargada correctamente'))
        .catch(error => console.error('Error al generar la imagen:', error));
})

inputTamano.addEventListener('input',(e)=>{
    let size=e.target.value
    idFrace.style=`font-size:${size}px`;
})