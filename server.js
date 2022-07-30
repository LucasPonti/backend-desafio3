const express = require('express');
const Contenedor = require('./contenedor');
const app = express();




async function main(){
    
    const product = new Contenedor('productos');
    const miProducto = await product.getAll();

    app.get('/', (req, res) => {
        res.send('Bienvenidos a servidor de productos');
    });

    app.get('/productos', (req, res) => {
        res.send(JSON.stringify([miProducto]));
    });

    app.get('/productosRandom', (req, res) => {  
        let id = Math.ceil(Math.random() * 5);
        const productsById = miProducto.find(p => p.id === id);
        res.send(JSON.stringify([productsById]));
    });

    const server = app.listen(8080, () => {
        console.log (`Servidor http escuchando en el puerto ${server.address().port}`);
    });
    
    server.on('error', error => console.log(`Error en el servidor ${error}`));
}

main()
