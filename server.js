const express = require('express');
const Contenedor = require('./contenedor');
const app = express();

    const product = new Contenedor('productos');

    app.get('/', (req, res) => {
        res.send('Bienvenidos a servidor de productos');
    });

    app.get('/productos', async (req, res) => {
        res.send(await product.getAll());
    });

    app.get('/productosRandom', async (req, res) => {  
        res.send(await product.getById(Math.ceil(Math.random() * 5)));
    });

    const server = app.listen(8080, () => {
        console.log (`Servidor http escuchando en el puerto ${server.address().port}`);
    });
    
    server.on('error', error => console.log(`Error en el servidor ${error}`));

