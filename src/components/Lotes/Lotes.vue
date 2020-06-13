<template>
    <div id="lote">
        <b-row class="mb-2">
            <b-col>
                <b-button variant="primary" size="sm" class="float-right" 
                     v-b-toggle.colapso 
                v-b-tooltip.hover title="Despliega un formulario para que puedas editar o agregar lotes">
                    <span class="glyphicon glyphicon-chevron-down"></span>
                    Formulario
                </b-button>
            </b-col>
        </b-row>
       <b-collapse id="colapso" class="mt-2">
            <b-row>
                <b-col cols="5">
                    <b-form-group>
                        <label for=""># de Lote</label>
                        <b-form-input type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group>
                        <label for="">Unidad</label>
                        <b-form-input type="number"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group>
                        <label for="">Fraccion</label>
                        <b-form-input type="number"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">
                    <b-form-group>
                         <label for="">Fecha de Fabricacion</label>
                        <b-form-datepicker id="example-datepicker" class="mb-2" 
                            v-model="fechaFabricacion"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                        ></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group>
                         <label for="">Fecha de Vencimiento</label>
                        <b-form-datepicker id="example-datepicker1" class="mb-2"
                            v-model="fechaVencimiento"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                        ></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group>
                        <label for=""></label>
                        <b-button variant="success">Agregar</b-button>
                    </b-form-group>
                </b-col>
            
            </b-row>
       </b-collapse>
       <b-row>
           <b-col>
               <b-table responsive small :fields="tabla.fields" :items="tabla.items" >

               </b-table>
           </b-col>
       </b-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'lote',
    props:{
        idinventario:{
        type:Number,
        defaultValue:0
        },
        visible:{
            type:Boolean,
            defaultValue:false
        }
    }, //propiedades que recibe del componente padre
    data(){
        return{
            ip:process.env.VUE_APP_BASE_URL,
            fechaFabricacion: new Date(),
            fechaVencimiento: new Date(),
            tabla:{fields:[{key:'id',label:'#'},{key:'nlote',label:'Lote'},{key:'ffabricacion',label:'Fabricacion'},
                            {key:'fvencimiento',label:'Vencimiento'},
                        {key:'cunidades',label:'Unidad'},{key:'cfracion',label:'Fraccion'},'Opciones'],
                    items:[]},
            formulario:{
                fechaf:null,
                fechav:null,
                numlote:'',
                unidad:0,
                fraccion:0,
            }        
        }
    },
    watch:{
        idinventario: data =>{
            this.idinventario = data 

        },
        visible: data =>{
            this.visible = data 
        }
    }, //acciones en caso que cvambie los valores de las variables dque vienen del padre
    methods:{
        listarLotes(){
            const url = this.ip + '/api/v1.0/lotes/'+this.idinventario+'/'
            axios.get(url)
            .then(response =>{
                var datos = response.data
                if(datos.error > 0 ){
                    this.errorAlert(datos.response)
                }else{
                    var lotes = datos.response
                    this.tabla.items.length = 0 //limpiamos el array
                    lotes.forEach( key => {
                        var item ={
                            value:key.id 
                            
                        }
                    })
                }

            }).catch(error=>{
                if(error.response){
                    var mensaje = error.response.data.response
                    this.errorAlert(mensaje)
                }else{
                    this.errorAlert(error)
                }
            })

        }


    }
}
</script>