const { createReadStream } = require('fs');
const { resolve } = require('path');

//Importo el paquete de colors
require ('colors');

//Creacion del menu
const mostrarMenu = () => {
    
    //IMPORTANTISIMO
    //Mediante una promesa devolvemos la opcion del menu
        return new Promise ( resolve => {

            console.clear();
            console.log('========================='.green);
            console.log(' SELECCIONE UNA OPCION'.green);
            console.log('=========================\n'.green);

            console.log(`${ '1.'.green} Crear tarea`);
            console.log(`${ '2.'.green} Listar tarea`);
            console.log(`${ '3.'.green} Listar tareas completadas`);
            console.log(`${ '4.'.green} Listar tareas pendientes`);
            console.log(`${ '5.'.green} Completar tarea(s)`);
            console.log(`${ '6.'.green} Borrar tarea`);
            console.log(`${ '0.'.green} Salir\n`);

            //Preparamos la interfaz para poder leer de consola y salir por consola
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            //Para llamar el stdin para leer por consola
            readline.question('Seleccione una opcion : ', (opt)=> {
                readline.close();
                //Devolvemos opt con el resolve de la promesa
                resolve(opt);
            })

            });
        
    } 
    
    const pausar = () => {

        //IMPORTANTISIMO
        //Mediante una promesa devolvemos la opcion del menu
        return new Promise ( resolve => {
            //Preparamos la interfaz para poder leer de consola y salir por consola
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //Para llamar el stdin para leer por consola
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n `, (opt)=> {
            readline.close();
            //Devolvemos opt con el resolve de la promesa
            resolve ();
        })

        });
        
    }

module.exports = {
    mostrarMenu,
    pausar
}
