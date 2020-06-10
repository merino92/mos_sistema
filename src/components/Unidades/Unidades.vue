<template>
    <div id="unidades">
        <b-row>
            <b-col>
                <div v-if="!visible" >
                    <b-button variant="primary" v-b-toggle.colapso   size="sm" class="float-right">
                    <span class="glyphicon glyphicon-chevron-down"></span>
                    Formulario
                </b-button>
                </div>
                
            </b-col>
        </b-row>
        <b-collapse id="colapso" class="pt-2">
             <b-row>
            <b-col cols="3">
                <b-form-group>
                    <label for="">Tipo</label>
                    <b-form-select 
                     v-model="precio_tipo.opcion"
                    :options="precio_tipo.items"
                    ></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group>
                    <label for="">Nombre Unidad</label>
                    <b-form-input 
                        v-model="formulario.nombre"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group>
                     <label for="">Cantidad</label>
                    <b-form-input v-model="formulario.cantidad" type="number"></b-form-input>
                </b-form-group>
            </b-col>
            
        </b-row>
        <b-row>
            <b-col cols="4">
                <b-form-group>
                    <label for="">Precio</label>
                    <b-input-group prepend="$"
                    v-b-tooltip.hover title="">
                    <b-form-input  v-model="formulario.precio" type="number"></b-form-input>
                </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="6" class="mt-2">
                <b-row>
                    <div v-if="nuevo">
                        <b-col cols="3">
                            <b-button class="btn btn-success mt-4" @click="crearPrecio()" >Agregar</b-button>
                        </b-col>
                    </div>
                    <div v-if="!nuevo">
                        <b-col cols="3">
                            <b-button variant="info" class="mt-4">Actualizar</b-button>    
                        </b-col>    
                    </div>
                    <b-col cols="2">
                        <b-button variant="danger" @click="nuevo=true" class="mt-4 ">Cancelar</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        
        </b-collapse>
        <b-row>
            <b-col>
                <div class="table table-responsive">
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Unidad</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="key in this.datos" :key="key.id">
                                <td>{{key.id}}</td>
                                <td>{{key.nprecios}}</td>
                                <td>
                                    <div v-if="key.esunidad">
                                        UNIDAD
                                    </div>
                                    <div v-else>
                                        FRACCION
                                    </div>
                                </td>
                                <td>
                                     <div v-if="key.cunidad > 0">
                                {{key.cunidad}}</div>
                                <div v-else>
                                    {{key.cfraccion}}
                                </div>
                                </td>
                                <td>{{'$'+parseFloat(key.precio).toFixed(2)}}</td>
                                <td>
                                    <div v-if="!visible">
                                         <b-button variant="warning" size="sm" @click="nuevo=false" > <span class="glyphicon icono glyphicon-pencil"></span></b-button>
                                    </div>
                                   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-col>
        </b-row>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'unidades',
    props:{ idinventario:{
        type:Number,
        defaultValue:0
        },
        visible:{
            type:Boolean,
            defaultValue:false
        }
    },
    data(){
        return{
            id:0,
            ip:process.env.VUE_APP_BASE_URL,
            nprecio:'',
            datos:[],
            nuevo:true,  
            idprecio:0,
            precio_tipo:{
                items:[{value:true,text:'UNIDAD'},{value:false,text:'FRACCION'}],
                opcion:true
            } ,
            formulario:{
                tipo:null,
                nombre:null,
                cantidad:null,
                precio:null
            }
        }
    } ,
    whatch:{
        idinventario: function(val){
            // eslint-disable-next-line no-console
            console.log(val)
            this.idinventario =val
            this.id = val 
            this.listarPrecios()
        },
        visible:function(val){
            this.visible=val
        }
    },
    methods:{
        listarPrecios(){

            const url = this.ip +'/api/v1.0/precio/listar_precios_principales/'
            var datos = {
                idproducto:this.idinventario,
                nprecios:this.nprecio
            }
            axios.post(url,datos)
            .then(response =>{
                const data =response.data
                if(data.error > 0){
                    this.mensajeAlerta(response)
                }else{
                    this.datos = data.response
                }

            }).catch(error =>{
                this.mensajeAlerta(error)
            })
        },
        mensajeAlerta(response){
            if(response.data){
                var res=response.data
                if(res.error > 0){
                    this.$toasted.error('Error:'+res.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }else{
                    this.$toasted.success(res.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }
                
            }else{
                this.$toasted.error('Error:'+response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
            }


        }, //muestra las diferentes alertas 
        validarCampos(){
            var res = true
            if (this.formulario.nombre.length > 0){
                res =true
            }else{
                res =false 
            }
            if(this.formulario.cantidad.length > 0 && this.formulario.cantidad > 0){
                res=true
            }else{
                res=false
            }
             if(this.formulario.precio.length > 0 && this.formulario.precio > 0){
                res=true
            }else{
                res=false
            }
            return res
        },
        crearPrecio(){
            const validacion = this.validarCampos()
            if(validacion){
                const url = this.ip+"/api/v1.0/precio/"
                var unidad= 0
                var fraccion=0
                if(this.precio_tipo.opcion){
                    unidad =this.formulario.cantidad
                    fraccion =0
                }else{
                     fraccion =this.formulario.cantidad
                    unidad =0
                }
                const datos={
                    id:this.idinventario,
                    idinventario:this.idinventario,
                    nombre:this.formulario.nombre,
                    esunidad:this.precio_tipo.opcion,
                    cunidad:unidad,
                    cfraccion:fraccion,
                    precio:this.formulario.precio
                }
                // eslint-disable-next-line no-console
                console.log(datos)
                axios.post(url,datos)
                .then(response =>{
                    var res=response.data
                    if(res.error > 0){
                        this.mensajeAlerta(response)
                    }else{
                        this.formulario.nombre =null
                        this.formulario.cantidad=null
                        this.formulario.precio =null
                        this.mensajeAlerta(response)
                        this.listarPrecios()
                    }
                }).cantidad(error =>{
                    this.mensajeAlerta(error)
                })
            }else{
                this.$toasted.error('Error: debes llenar campos', {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
            }
        }
    },
    mounted(){
        if (this.idinventario > 0){
        this.listarPrecios()
        }
    }
}
</script>

<style lang="scss" scoped>
.tbody{
    height:200px !important;
    overflow-y:auto !important;
    width: 100% !important;
    }
</style>