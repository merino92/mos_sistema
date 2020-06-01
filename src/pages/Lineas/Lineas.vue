<template>
    <div id="linea">
        <h1 class="page-title">
            <span class="fw-semi-bold">Lineas</span>
        </h1>
        <b-row>
            <b-col>
                <Widget
                title="<h5>Listado <span class='fw-semi-bold'>Lineas</span></h5> "
                 customHeader>
                    <b-row>
                        <b-col cols="12" class="d-flex">
                                   <b-button class="btn btn-success ml-auto" @click="limpiar(),$bvModal.show('modal'),editar=false,nuevo=true,bloqueado=0" ><i class="glyphicon icono glyphicon-plus"></i> Nuevo</b-button>  
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6">
                            <b-form-input type="search" v-model="buscar" v-on:Keyup="Limpiar()" v-on:keyup.enter="Busqueda()" placeholder="Buscar Nombre de Linea" ></b-form-input>
                        </b-col>
                        <b-col cols="2">
                            <b-button class="btn btn-info" @click="Busqueda()" >Buscar</b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col cols="12" >
                            <div class="table table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Linea</th>
                                            <th>Estado</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="datos in this.lista" :key="datos.id" >
                                                <td>{{datos.id}}</td>
                                                <td>{{datos.linea}}</td>
                                                <td>
                                                     <div v-if="datos.activo==true">
                                                        Activo 
                                                    </div>
                                                    <div v-else>
                                                        Inactivo
                                                     </div>
                                                </td>
                                                <td>
                                                    <b-button  class='btn btn-info btn-sm ' @click="mostrarDatos(datos.id),bloqueado=1,nuevo=false,edicion=false">
                                                    <span class="glyphicon icono glyphicon-zoom-in"></span>
                                                    </b-button>    
                                                    <b-button  class='btn btn-warning btn-sm ml-1' @click="mostrarDatos(datos.id),bloqueado=0,nuevo=false,edicion=true">
                                                    <span class="glyphicon icono glyphicon-pencil"></span></b-button>
                                                    <b-button type="button" class="btn btn-danger btn-sm ml-1" @click="modalEliminar(datos.id)" >
                                                    <span class="glyphicon icono glyphicon-trash"></span></b-button>   
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </b-col>    
                    </b-row>
                </Widget>
            </b-col>
        </b-row>
        <b-modal id="modal" :title="titulomodal" :no-close-on-backdrop="true">
            <b-row>
                <b-col cols=12>
                    <label for="">Nombre de Linea</label>
                    <b-form-input type="text" placeholder="Linea"
                    :state="formState"
                    :value="linea.linea" v-model="formulario.linea" 
                    :disabled="bloqueado==1"
                    ></b-form-input>
                    <div class="pt-2">
                         <b-form-checkbox v-model="seleccionado"  
                         :unchecked-value="false"
                         :value="true"
                         :disabled="bloqueado==1"
                          >Activo</b-form-checkbox>
                    </div>
                    
                </b-col>
            </b-row>
            <template v-slot:modal-footer={}>
                <b-button size="sm" v-if="edicion==true" variant="info" @click="updateLinea()"> <!--v-if sirve para ocultar o mostrar dependiendo de la condicion-->
                Editar</b-button>
                <b-button size="sm" v-if="nuevo==true" variant="success" @click="CrearLinea()">
                    Guardar
                </b-button>
                <b-button size="sm"  variant="danger" @click="$bvModal.hide('modal')">
                    Cancelar
                </b-button>
            </template>
        </b-modal> <!--termina modal de agregar linea-->
        <b-modal id="eliminar" centered  modal-class="alerta" :no-close-on-backdrop="true" >
    <template class="alerta" v-slot:modal-header="{}">
      <!-- Emulate built in modal header close button action -->
      <div class="text-danger">
         <h4>Advertencia!!</h4>
      </div>
        
    </template>

    <template class="alerta" v-slot:default="{}">
        <h5>Estas seguro que quieres eliminar esta Linea??</h5>
    </template>

    <template class="alerta" v-slot:modal-footer="{}">
      
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="eliminar()">
        Eliminar
      </b-button>
      <b-button size="sm" variant="danger" @click="$bvModal.hide('eliminar')">
        Cancelar
      </b-button>
      <!-- Button with custom close trigger value -->
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
            chequeado:false,
            id:0,
            lista:[],
            titulomodal:'Nueva Linea',
           ip:process.env.VUE_APP_BASE_URL, //obtiene la ip de la api
           edicion:false,
           nuevo:false,
           formulario:{linea:''},
           linea:{linea:''},
           formState:null, //validacion de campos
           seleccionado:true, //cheque
            bloqueado:0,
            buscar:''
        }
    },
    methods:{
        limpiar(){

            this.id=0
            this.seleccionado=true
            this.formulario.linea=''
        },
        ListarLineas(){
            
            const url=this.ip+"/api/v1.0/Linea/"
            axios.get(url).
            then(response =>{ 
                this.lista=response.data
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
            
             const url=this.ip+"/api/v1.0/Linea/"+id+"/"
             axios.get(url).then(response=>{
                 const res=response.data //obtiene los datos
                 if(res > 0){
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
                     this.id=res.response.id
                     this.formulario.linea=res.response.linea
                     this.seleccionado=res.response.activo
                    this.$bvModal.show('modal')
                    
                 }

             }).catch(error=>{
                 if(error.response){
                     const r=error.response.data
                     this.$toasted.error('Error:'+r.response, {
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
        CrearLinea(){
            if(this.formulario.linea.length>0){
                this.formState=null
                const url=this.ip+"/api/v1.0/Linea/"
                const datos={
                    linea:this.formulario.linea.toUpperCase(),
                    activo:this.seleccionado
                } 
                axios.post(url,datos).then(response=>{
                    const data=response.data
                    if(data.error > 0){
                        this.$toasted.error('Error:'+data.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0)
                                        }
                                        }
                                    })
                    }else{
                        this.ListarLineas()
                        this.formulario.linea=''
                        this.seleccionado=true
                        this.$bvModal.hide('modal')
                       this.$toasted.success(data.response,{
                           position:'top-center',
                           action:{
                               text:'cerrar',
                               onClick:(e, toastObject)=>{
                                   toastObject.goAway(0)
                               }
                           }
                       })
                       
                    }
                })
                .catch(error =>{
                    if (error.response){
                        var res=error.response
                        if(res.status===500){
                            if(res.data){
                                this.$toasted.error(res.data.response,{
                                    position:'top-center',
                                    action:{
                                        text:'cerrar',
                                        onClick:(e,toastObject)=>{
                                            toastObject.goAway(0)
                                        }
                                    }        
                                })
                            }
                        }
                    }else{
                           this.$toasted.error(error,{
                                    position:'top-center',
                                    action:{
                                        text:'cerrar',
                                        onClick:(e,toastObject)=>{
                                            toastObject.goAway(0)
                                        }
                                    }        
                                }) 
                    }
                })



            }else{
                this.formState=false
                this.$toasted.error('Error: debe llenar el campo obligatorio', {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    })
            } //valida que hayas datos en el input
        },
        updateLinea(){
            if(this.formulario.linea.length > 0){
                const url=this.ip+"/api/v1.0/Linea/"+this.id+"/"
            const datos={
                id:this.id,
                linea:this.formulario.linea,
                activo:this.seleccionado
            }
            axios.put(url,datos).then(response=>{
                    const res=response.data
                    if(res.error > 0){
                        this.$toasted.error('Error: '+res.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    }) 
                    }else{
                        this.ListarLineas()
                        this.id=0
                        this.formulario.linea=''
                        this.seleccionado=true
                        this.$bvModal.hide('modal')
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
            }).catch(error=>{
                if(error.response){
                    if(error.response.data){
                        const msg=error.response.data.response
                        this.$toasted.error('Error: '+msg, {
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
                    this.$toasted.error('Error: '+error, {
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
                this.$toasted.error('Error: debe llenar el campo obligatorio', {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    }) 
            }
        },
        eliminar(){
            const url=this.ip+"/api/v1.0/Linea/"+this.id+"/"
            // eslint-disable-next-line no-console
            console.log(url)
                    axios.delete(url).
                    then(response=>{
                        const res=response.data
                        if(res.error>0){
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
                            this.ListarLineas()
                            this.id=0
                            this.$bvModal.hide('eliminar')
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


                    }).catch(error=>{
                        if(error.response){
                        const msg=error.response.data.response
                        this.$toasted.error('Error: '+msg, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    }) 
                    
                    }else{
                        this.$toasted.error('Error: '+error, {
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
        modalEliminar(id){
            this.id=id
            this.$bvModal.show('eliminar')
        },
        Busqueda(){
            // eslint-disable-next-line no-console
            console.log(this.buscar)
            if(this.buscar.length>0){
                const url=this.ip+'/api/v1.0/Linea/1/Busquedalinea/'
                const datos={
                    busqueda:this.buscar.toUpperCase()
                }
                axios.post(url,datos).
                then(response=>{
                    const res=response.data
                    if(res.error>0){
                         this.$toasted.error('Error: '+res.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    }) 
                    }else{
                       this.lista.length=0
                        this.lista=res.response
                    }

                }).
                catch(error=>{
                    if(error.response){
                        const msg=error.response.data.response
                        this.$toasted.error('Error: '+msg, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    }) 
                    
                    }else{
                        this.$toasted.error('Error: '+error, {
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
                this.ListarLineas()
            }

        },
        Limpiar(){
            if(this.buscar.length<=0){
                this.ListarLineas()
            }
        }
    },
    mounted(){
        this.ListarLineas()
    }

}
</script>

<style scoped>
    .icono {
     vertical-align: top !important; 
    }
</style>