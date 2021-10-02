const colors = require('colors');

const mostrarMenu = () => {

    return new Promise((resolve,reject) => {

        console.clear();
        console.log('================='.green);
        console.log('Selecciona una opcion'.yellow);
        console.log('=================\n'.green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tarea`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Borrar Tareas`);
        console.log(`${'0.'.green} Salir\n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output:process.stdout
        });
    
        readLine.question('Seleccione una opción: ',(opt => {
            readLine.close();
            resolve(opt);
        }));
    });
};

const pausa = () => {

    return new Promise((resolve,reject) => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output:process.stdout
        });
    
        readLine.question(`\nPresione ${'Enter'.green} para continuar:\n` ,(opt => {
            readLine.close();
            resolve();
        }));
    });

   
};

module.exports ={
    mostrarMenu,
    pausa
}

