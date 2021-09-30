//Requerimos colors

require('colors');
const { red } = require('colors');
/**
 * _listado
 *  { 'uuid-xxxxxxx: { id : 12, desc wsdfsd, compleatoEn: scasc}}
 */

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    //Con este getter recorremos todos los elementos de tipo Tareas
    // los guardamos en un Array listado
    // lo guardamos con el Objeto object con un forEach
    // guardamos en este listado mediante un PUSH
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};

    }
    borrarTarea(id =''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });


    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log("Nº Tarea".green + "    Completado" + "            Descripcion")
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const descripcion = tarea.desc;

            if (tarea.completadoEn == null) {
                console.log(idx + "             " + "NO                  " + `${descripcion}`.red);
            } else {
                console.log(idx + "             " + "SI                  " + `${descripcion}`.green);
            }

        })
    }

    listarPendientesCompletadas(completadas = true) {
        let idx = 0;
        console.log("Nº Tarea".green + "              Fecha" + "                        Descripcion");
        this.listadoArr.forEach(tarea => {
            if (!completadas) {
                if (!tarea.completadoEn) {
                    idx = idx + 1;
                    const descripcion = tarea.desc;
                    console.log(idx.toString().red + "                     " + "(--/--/----)".red + "                     " + `${descripcion}`.red);
                }

            } else {
                if (tarea.completadoEn) {
                    idx = idx + 1;
                    const descripcion = tarea.desc;
                    console.log(idx.toString().green + "                     " + tarea.completadoEn + "                     " + `${descripcion}`.green);
                }

            }

        })
    }

    toggleCompletadas( ids = []){
        ids.forEach (id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                const dia = new Date().getDay();
                const mes = new Date().getMonth();
                const anio = new Date().getFullYear();
                tarea.completadoEn= (dia + '\\' + mes + '\\' + anio);
            }
        });
        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;  
            }

        });
    }

}

module.exports = Tareas;