//Poder grabar en fichero Importamos

const fs = require ('fs');
const archivo = './db/data.json';

const guardarDB = (data) => {

    //Mediante JSON.stringinfy(data) transfomo lo que me entra que es un string en un JSON
    fs.writeFileSync (archivo, JSON.stringify(data));

}

const leerDB = () =>{
    //Compruebo si existe el archivo sino retorno un NULL y finalizo 
    if (!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync( archivo , { encoding: 'utf-8'} );
    //Doy formato del tipo JSON a los datos leidos del archivo
    const data = JSON.parse (info);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}