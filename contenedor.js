
const {promises: fs} = require('fs');

let contador = 1;
let array=[];

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo; 
    }

    async save(obj){
        try {
            array = [...array, obj];
            await fs.writeFile('./'+this.nombreArchivo+'.txt', JSON.stringify(array)+'\n'); 
        } catch (error) {
            console.log('Hubo un error en Save');
        }
    }
    
    async getById(id){
        try {
           const producto = await this.getAll();
           const productsById = producto.find(p => p.id === id);
           return productsById;  
        } catch (error) {
            console.log('Hubo un error en getById')
        }
    }

    async getAll(){
        try {
            const productos = await fs.readFile('./'+this.nombreArchivo+'.txt', 'utf8');
            return JSON.parse(productos);
        } catch (error) {
            console.log('Hubo un error en GetAll');
        }
    }

    async deleteById(id){
        try {
          const producto = await this.getAll();
          const productsById = producto.filter(p => p.id != id);
          await fs.writeFile('./'+this.nombreArchivo+'.txt', JSON.stringify(productsById));  
        } catch (error) {
           console.log('Hubo un error en deleteById'); 
        }
    }
    
    async deleteAll(){
        array = [];
        const productos = await fs.writeFile('./'+this.nombreArchivo+'.txt', JSON.stringify(array));
    }
}

module.exports = Contenedor;