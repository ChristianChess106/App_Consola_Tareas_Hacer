const colors = require('colors');
const Tarea = require("./tarea");

/* _listado:
{'uuid-1223334:{id:12,desc:epa,completadoEn:martes}'} */


class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.getOwnPropertyNames(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        /* Object.keys(this._listado).forEach(key => {
             const tarea = this._listado[key];
             listado.push(tarea);
        }); */

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id){

        if(this._listado[id]){
            delete this._listado[id];
        }
    };

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    };

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto(){
        
        let contador = 1;

        this.listadoArr.forEach(tarea => {
            (tarea.completadoEn !== null)
             ? console.log(`${colors.green(contador)}.${tarea.desc} :: ${colors.green('Completado')}`)
             : console.log(`${colors.green(contador)}.${tarea.desc} :: ${colors.red('Pendiente')}`);
            contador++;
        });

    };

    listarPendientesCompletadas(completadas = true){

        //Solucion del profe
        console.log();

        let contador = 0;

        this.listadoArr.forEach(tarea => {

            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${colors.green(completadoEn)}`);
                }
            }
                else{
                    if(!completadoEn){
                        contador +=1;
                        console.log(`${(contador + '.').green} ${desc} :: ${colors.red(completadoEn)}`);
                    }
                        
                }
        });

        //Solucion Propia
        /* if(completadas){
            let completos = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
            completos.forEach((tareasCompletadas,i) => {
              let idx =`${i + 1}`.green;
                console.log(`${idx}.${tareasCompletadas.desc} :: ${colors.green(tareasCompletadas.completadoEn)}`)
            });

        }else{
            let pendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);
            pendientes.forEach((pendientes, i) => {
                let idx =`${i + 1}`.green;
                console.log(`${idx}.${pendientes.desc} :: ${colors.red('Pendiente')}`)
            });

        }             */

    };

    toggleCompletadas(ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                 this._listado[tarea.id].completadoEn = null;
            }

        });

    };

};

module.exports = Tareas;