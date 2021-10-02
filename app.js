const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
       tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        //aqui se imprime el menu
        opt = await inquirerMenu();
        
        switch (opt) {

            case '1':
                //crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);    
                break;
                
                //aqui se listan las tarea
            case '2':
                    tareas.listadoCompleto()
                    break;
                    
                //Aqui se listan las tareas completadas
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

                 //Aqui se listan las tareas Pendientes
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;

                //Marcar Completados
            case '5':
              const ids = await mostrarListadoCheckList(tareas.listadoArr);
              tareas.toggleCompletadas(ids);
                break;

                //Tareas A borrar
            case '6':
               const id = await listadoTareasBorrar(tareas.listadoArr);
               if(id !== '0'){
                   const ok = await confirmar('¿Esta Seguro?');
    
                   if(ok){
                       tareas.borrarTarea(id);
                       console.log('Tarea Borrada');
                   }

               }
                break;
        }
        
        guardarDB(tareas.listadoArr);
        await pausa();
        
        
        
        
    } while (opt !== '0');
    
    
};

main();
// pausa();