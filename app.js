//Importamos Inquirer
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
        inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar, 
        confirmar, 
        mostrarListadoTareasCheckList }= require ('./helpers/inquirer');

//Importamos tareas

const Tareas = require ('./models/tareas');

//Requerimos colors

require ('colors');

//Creamos metodo main asincrono y asi se soluciona todos los procesos
const main = async() =>{
    let opcionElegida='';

    //Instancio un objeto Tareas
    const tareas = new Tareas();

    const tareasDB = leerDB();


    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB);
    }
    
    try{
        do{ 
            //Al devolver una opcion con la promesa le decimos con el AWAIT
            // que se espere cuando muestre el menu a que se de la respuesta y despues
            // continuamos con el programa

            //Imprime el menú
            opcionElegida = await inquirerMenu();
            console.log('\n');

            switch(opcionElegida){
                case '1':
                    const desc = await leerInput('Descripcion :');
                    tareas.crearTarea(desc);
                    console.log(desc);
                    break;
                case '2':
                    tareas.listadoCompleto();
                    break;
                case '3':
                    tareas.listarPendientesCompletadas(true);
                    break;
                case '4':
                    tareas.listarPendientesCompletadas(false);
                    break;
                case '5':
                        const ids = await mostrarListadoTareasCheckList(tareas.listadoArr);
                        tareas.toggleCompletadas(ids);
                    break;
                case '6':
                        const id = await listadoTareasBorrar(tareas.listadoArr);
                        if(id!=='0'){
                            const ok = await confirmar('¿Estás seguro que deseas borrarlo?');
                            if (ok){
                                tareas.borrarTarea(id);
                                console.log('Tarea borrada correctamente\n');
                            }else{
                                console.log('No se ha borrado nada\n');
                            }
                        } else{
                            console.log('A cancelado la operacion');
                        }
                    break;
            }
            guardarDB( tareas.listadoArr );
            if (opcionElegida!=0){
                //Hace una pausa en el caso de que no pulsemos salir
                await pausa();
            }
        }while(opcionElegida!=0);
        console.clear();
    }catch(err){
        console.log(err);
    }
}

//Inicio el metodo main

main();