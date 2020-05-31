<template>
    <div id="linea">
        <h1 class="page-title">
            <span class="fw-semi-bold">SubLineas</span>
        </h1>
        <b-row>
            <b-col>
                <Widget
                 title="<h5>Listado <span class='fw-semi-bold'>de Sublineas</span></h5> "
                 customHeader
                >
                    <b-row>
                        <b-col cols="12" class="d-flex">
                            <b-button class="btn btn-success ml-auto"
                                @click="$bvModal.show('modal'),bloqueado=0,nuevo=true,edicion=false"
                            ><i class="glyphicon glyphicon-plus"></i> Nuevo</b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col cols="12">
                            <div class="table table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Linea</th>
                                            <th>Estado</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="datos in this.lista" :key="datos.id" >
                                            <td>{{datos.id}}</td>
                                            <td>{{datos.sublinea}}</td>
                                            <td>{{datos.linea}}</td>
                                            <td>
                                                <div v-if="datos.activo===true">
                                                    ACTIVO
                                                </div>
                                                <div v-else>
                                                    INACTIVO
                                                </div>
                                            </td>
                                            <td>
                                                <b-button  class='btn btn-info btn-sm ' @click="mostrarDatos(datos.id),bloqueado=1,nuevo=false,edicion=false">
                                                    <span class="glyphicon glyphicon-zoom-in"></span>
                                                </b-button>    
                                                <b-button  class='btn btn-warning btn-sm ml-1' @click="mostrarDatos(datos.id),bloqueado=0,nuevo=false,edicion=true">
                                                    <span class="glyphicon glyphicon-pencil"></span></b-button>
                                                <b-button type="button" class="btn btn-danger btn-sm ml-1" @click="modalEliminar(datos.id)" >
                                                    <span class="glyphicon glyphicon-trash"></span></b-button>   
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                </Widget>
            </b-col>
        </b-row> <!--termina el widget-->
        <b-modal id="modal" :title="titulo"
            :no-close-on-backdrop="true"
        >
            <b-row>
                <b-col cols="12">
                    <b-form-input type="text" placeholder="Nombre" 
                    :state="formState"
                    v-model="sublinea.nombre"
                    :disabled="bloqueado==1"></b-form-input>
                    <div class="mt-2">
                        <b-form-select v-model="opcion"
                    :options="opciones"
                    :disabled="bloqueado==1"
                    ></b-form-select>
                    </div>
                    <div class="mt-2">
                        <b-form-checkbox v-model="seleccionado"  
                         :unchecked-value="false"
                         :value="true"
                         :disabled="bloqueado==1"
                          >Activo</b-form-checkbox>
                    </div>
                    
                </b-col>
            </b-row>
            <template v-slot:modal-footer={}>
                <b-button size="sm" v-if="edicion==true" variant="info" @click="editarSublinea()"> <!--v-if sirve para ocultar o mostrar dependiendo de la condicion-->
                Editar</b-button>
                <b-button size="sm" v-if="nuevo==true" variant="success" @click="CrearLinea()">
                    Guardar
                </b-button>
                <b-button size="sm"  variant="danger" @click="$bvModal.hide('modal')">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>
    import Widget from '@/components/Widget/Widget';
    import Sparklines from '@/components/Sparklines/Sparklines'
    import axios from 'axios'
    export default {
    name:'linea',
    components:{Widget,Sparklines},
    data(){
        return{
            lista:[],
            ip:process.env.VUE_APP_BASE_URL,
            titulo:'Nueva Sublinea',
            bloqueado:0,
            formState:null,
            sublinea:{
                nombre:''
            },
            opciones:[],
            opcion:null,
            nuevo:false,
            edicion:false,
            seleccionado:false
        }
    },
    methods:{
        listarSublinea(){
            const url=this.ip+"/api/v1.0/Sublinea/"
            axios.get(url).
            then((response=>{
                const res=response.data
                if(res.error >0){
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
                    this.lista=response.data
                    // eslint-disable-next-line no-console
                    console.log(url)
                }
            })).catch(error=>{
                if(error.response){
                    var e=error.response.data
                    this.$toasted.error('Error:'+e.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }else{
                    this.$toasted.error('Error:'+error, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }
            })    
        },
        listarLinea(){
            const url=this.ip+"/api/v1.0/Linea/"
            axios.get(url).
            then(response =>{ 
                var datos=response.data
                this.opcion=0
                this.opciones.length=0
                datos.forEach(res=>{
                    if(res.activo===true){
                        var d={
                        value: res.id,
                        text: res.linea
                        }
                    this.opciones.push(d)
                    }
                    
                })
            }).catch(error =>{
                if(error.response){
                    let mensaje=error.response.response
                    this.$toasted.error('Error:'+mensaje, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }else{
                    this.$toasted.error('Error:'+error, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }
            })
        },
        mostrarDatos(id){
            const url=this.ip+"/api/v1.0/Sublinea/"+id+"/"
            axios.get(url).
            then(response => {
                const res=response.data[0]
                this.id=res.id
                this.sublinea.nombre=res.sublinea
                this.seleccionado=res.activo
                this.opcion=res.idlinea
                this.$bvModal.show('modal')

            }).catch(error=>{
                if(error.response){
                    this.$toasted.error('Error:'+error.response.data.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }else{
                    this.$toasted.error('Error:'+error, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }
            })
        },
        editarSublinea(){
            if(this.sublinea.nombre.length >0){
                this.formState=null
                const url=this.ip+"/api/v1.0/Sublinea/"+this.id+'/'
                const data={
                    sublinea: this.sublinea.nombre.toUpperCase(),
                    idlinea:this.opcion,
                    activo:this.seleccionado
                }
                axios.put(url,data).
                then(response =>{
                    const data=response.data
                    // eslint-disable-next-line no-console
                    console.log(response)
                    if(data.error >0){
                        this.$toasted.error('Error:'+data.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                    }else{
                        this.id=0
                        this.opcion=null
                        this.activo=true
                        this.sublinea.nombre=''
                        this.listarSublinea()
                        this.$bvModal.hide('modal')
                        this.$toasted.success(data.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })

                    }
                }).catch(error =>{
                    if(error.response){
                        this.$toasted.error('Error:'+error.response.data.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                    }else{
                       this.$toasted.error('Error:'+error, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        }) 
                    }
                })
            }else{
                this.formState=false
                this.$toasted.error('Error: debes llenar los campos obligatorios', {
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
    },//termina los metodos
    mounted(){
        this.listarSublinea()
        this.listarLinea()
    }
    }
</script>