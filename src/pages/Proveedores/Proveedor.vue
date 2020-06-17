<template>
    <div id="proveedor">
        <h1 class="page-title">
            <span class="fw-semi-bold">Proveedores</span>
        </h1>
        <b-row>
            <b-col>
                <Widget
                 title="<h5>Listado <span class='fw-semi-bold'>Proveedores</span></h5> "
                 customHeader >
                    <div class="row">
                        
                            <div class="col-12">
                               <div class="d-flex">
                                 <b-button @click="LimpiarModal(),showModal(),nuevo=true,
                                 edicion=false,titulomodal='Nuevo Proveedor',bloqueado=0" 
                                 class="btn btn-success ml-auto"  ><span class="glyphicon glyphicon-plus"></span> Nuevo</b-button>
                             </div> 
                            </div> 
                             
                               
                        
                        
                    </div>
                <!---    <div class="row ">
                        <div class="col-xs-12 col-md-7 col-lg-7">
                            <div class="form-group">
                                <input type="text" class="form-control md" placeholder="Buscar Proveedor" id="buscar">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-2 col-lg-2">
                            <button type="button" class="btn btn-info" >Buscar</button>
                        </div>
                        <div class="col-xs-4 col-md-3 col-lg-3">
                           
                        </div>
                    </div> ---->

                    <div class="row mt-2">
                            <div class="col-xs-12 col-md-12 col-lg-12">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Codigo</th>
                                                <th>Nombre de Proveedor</th>
                                                <th>Encargado</th>
                                                <th>Opciones</th>    
                                            </tr>
                                        </thead>
                                        <tbody>
                                             <tr v-for="datos in this.lista" :key="datos.id">
                                                 
                                                <td>{{datos.id}}</td>
                                               <td>{{datos.codigo}}</td>
                                                <td>{{datos.nombre}}</td>
                                                <td>{{datos.encargado}}</td>
                                                 
                                                <td>
                                                <b-button  class='btn btn-info btn-sm ' @click="MostrarDatos(datos.id),bloqueado=1,nuevo=false,edicion=false">
                                                    <span class="glyphicon glyphicon-zoom-in"></span>
                                                </b-button>    
                                              <b-button  class='btn btn-warning btn-sm ml-1' @click="MostrarDatos(datos.id),bloqueado=0,nuevo=false,edicion=true">
                                                  <span class="glyphicon glyphicon-pencil"></span></b-button>
                                            <b-button type="button" class="btn btn-danger btn-sm ml-1" @click="Eliminar(datos.id)" >
                                                <span class="glyphicon glyphicon-trash"></span></b-button>   
                                                </td>
                                    </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>

                </Widget>
            </b-col>
        </b-row> <!--termina la tabla-->
            <b-modal id="modal" ref="modal" size="lg" :title="titulomodal" 
                :no-close-on-backdrop="true" >
                <b-row>
                        <b-col md="3" sm="6" lg="3">
                            <img :src="require('@/assets/usuario.png')" class="img-fluid"  height="50" alt="Responsive image"> 
                        </b-col> 
                        <b-col md="9" sm="12" lg="9">
                            <b-row>
                                <b-col md="6" sm="6" lg="6">
                                    <div class="form-group">
                                          <label for="">Codigo</label>
                                        <b-form-input  type="text" class="form-control md" :value="proveedor.codigo" 
                                         v-model="formulario.codigo" 
                                         :state="formState.codigo"
                                         placeholder="Codigo" id="codigo" :disabled='bloqueado==1' ></b-form-input>
                                </div>
                                    
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col md="12" sm="12" lg="10">
                                    <label for="">Nombre del Proveedor</label>
                                    <b-form-input type="text" id="nombrep" 
                                    :value="proveedor.nombre"  v-model="formulario.nombre"  
                                    :state="formState.nombre"
                                     class="form-control md" placeholder="Nombre" :disabled='bloqueado==1' ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="4" sm="6" lg="4" >
                                    <label for="">NRC</label>
                                    <b-form-input id="nrc" class="form-control md" 
                                    :value="proveedor.nrc" v-model="formulario.nrc" 
                                    :state="formState.nrc"
                                    placeholder="000000-00" :disabled='bloqueado==1'></b-form-input>
                                </b-col>
                                <b-col md="8" sm="6" lg="8" >
                                    <label for="">NIT</label>
                                    <b-form-input id="nit" class="form-control md" :value="proveedor.nit" 
                                    :state="formState.nit"
                                    v-model="formulario.nit" placeholder="000-000000-000-0" :disabled='bloqueado==1'></b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>  
                        
                </b-row>
                <b-row class="mt-2">
                    <b-col md="12"  sm="12" lg="12">
                        <h5>Datos de Encargado</h5>
                    </b-col>
                </b-row>    
                <b-row>
                    <b-col md="8" sm="12" lg="8" >
                        <label for="">Nombre de Encargado</label>
                        <b-form-input id="encargado"  class="form-control md" 
                        :state="formState.encargado"
                        :value="proveedor.encargado" v-model="formulario.encargado" 
                        placeholder="encargado" :disabled='bloqueado==1'></b-form-input>
                    </b-col>
                    <b-col md="4" sm="10" lg="4">
                        <label for="">Telefono</label>
                        <b-form-input id="telefono" class="form-control md" :value="proveedor.telefono" 
                        :state="formState.telefono"
                        v-model="formulario.telefono" placeholder="0000-0000" 
                        :disabled="bloqueado==1" ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="pb-1">
                    <b-col md="12" sm="12" lg="12">
                        <label for="">Direccion</label>
                        <b-form-input id="direccion" class="form-control md" 
                        :state="formState.direccion"
                        :value="proveedor.direccion" v-model="formulario.direccion" 
                        placeholder="ubicacion del proveedor" :disabled="bloqueado==1" ></b-form-input>
                    </b-col>
                </b-row>
                    <b-modal modal-class="alerta" id="modalalert" size="sm" title="Advertencia" ok-only>
                     <p class="my-1">Debes Llenar los campos Obligatorios</p>
                    </b-modal>
                <template v-slot:modal-footer="{}">
                    
                    
      <!-- Emulate built in modal footer ok and cancel button actions -->
      
          <b-button size="sm" v-if="edicion==true" variant="info" @click="UpdateProveedor()"> <!--v-if sirve para ocultar o mostrar dependiendo de la condicion-->
            Editar
         </b-button>
    
      
      <b-button size="sm" v-if="nuevo==true" variant="success" @click="CrearProveedor()">
        Guardar
      </b-button>
      <b-button size="sm"  variant="danger" @click="hideModal(),idproveedor=0">
        Cancelar
      </b-button>
      <!-- Button with custom close trigger value -->
    </template>
            </b-modal>
        <b-modal id="eliminar" centered  modal-class="alerta" :no-close-on-backdrop="true" >
    <template class="alerta" v-slot:modal-header="{}">
      <!-- Emulate built in modal header close button action -->
      <div class="text-danger">
         <h4>Advertencia!!</h4>
      </div>
        
    </template>

    <template class="alerta" v-slot:default="{}">
        <h5>Estas seguro que quieres eliminar el proveedor??</h5>
    </template>

    <template class="alerta" v-slot:modal-footer="{}">
      
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="DeleteProveedor()">
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
import Sparklines from '../../components/Sparklines/Sparklines'
import axios from 'axios'
export default {
    name:'proveedor',
    components: { Widget, Sparklines },
    data(){
        return{
            lista:[],
            modal:false,
            idproveedor:0,
            bloqueado:0,
            editar:0,
            titulomodal:'Nuevo Proveedor',
            ip:process.env.VUE_APP_BASE_URL,
            edicion:false,
            nuevo:false,
            proveedor:{
                codigo:'',
                nombre:'',
                nit:'',
                nrc:'',
                telefono:'',
                encargado:'',
                direccion:''
            }, //sirve para enviar los valores a los inputs
            formulario:{
                codigo:'',
                nombre:'',
                nit:'',
                nrc:'',
                telefono:'',
                encargado:'',
                direccion:''
            },//sirve para obtener los valores de los formularios
            formState:{
                codigo:null,
                nombre:null,
                nit:null,
                nrc:null,
                telefono:null,
                encargado:null,
                direccion:null
            }//sirve para la validacion de los campos

        }
    },
    methods:{
        btn(){
            this.$swal({
               icon: 'error',
              title:"Campos Vacios!!",
              text:"Debes llenar los campos",
              showCloseButton:true
          })      
        },
        showModal() {
        this.$bvModal.show('modal')
        }, //muestra el modal de proveedor
         hideModal() {
           this.$bvModal.hide('modal')
        }, //cierra el modal de proveedor
        ListarProveedores(){
            const direcion=this.ip+"/api/v1.0/Proveedor/"
          
            axios.get(direcion).
            then(response =>{
             
                this.lista=response.data
                
            }).catch(error =>{
                // eslint-disable-next-line no-console
                console.log(error)
            })

        },//obtiene todos los proveedores y los lista
        MostrarDatos(id,){
          
            // eslint-disable-next-line no-console
            console.log('edicio='+this.edicion)
           this.titulomodal='Datos de Proveedor'
            const direcion=this.ip+"/api/v1.0/Proveedor/"+id+"/"
            axios.get(direcion).
            then(response =>{
                var datos=response.data
                if(datos.error>0){
                       // console.log(datos.response)
                }else{
                    
                    //esconde los botones
                    const re=datos.response;
                    this.idproveedor=id;
                    this.formulario.codigo=re.codigo
                    this.formulario.nombre=re.nombre
                    this.formulario.nrc=re.nrc
                    this.formulario.nit=re.nit
                    this.formulario.direccion=re.direccion
                    this.formulario.encargado=re.encargado
                    this.formulario.telefono=re.telefono
                    // eslint-disable-next-line no-console
                    console.log(this.proveedor.codigo)
                    this.showModal()
                }
                
            }).catch(error =>{
                // eslint-disable-next-line no-console
                console.log(error)
              
            })
           
            
        }, //muestra los datos del proveedor seleccionado
        UpdateProveedor(){
        var validacion=this.ValidarCamposVacios()
        if (validacion==false){    
            var url=this.ip+"/api/v1.0/Proveedor/"+this.idproveedor+"/"
            var datos={
                id:this.idproveedor,
                codigo:String(this.formulario.codigo).toUpperCase(),
                nombre:String(this.formulario.nombre).toUpperCase(),
                direccion:String(this.formulario.direccion).toUpperCase(),
                nrc:String(this.formulario.nrc).toUpperCase(),
                nit:String(this.formulario.nit).toUpperCase(),
                telefono:String(this.formulario.telefono).toUpperCase(),
                encargado:String(this.formulario.encargado).toUpperCase()
            }//obtenemos los valores del formulario pasados a json
            axios.put(url,datos).then(response=>{
                    const datos=response.data
                    if(datos.error>0){
                        this.$toasted.error('Error:'+datos.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })     
                    }else{
                        this.idproveedor=0
                        this.LimpiarModal()
                        this.ListarProveedores()
                        this.hideModal()
                        this.$toasted.success(datos.response, {
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
                let datos=error.response
                this.$toasted.error('Error:'+datos.response, {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
            })//termina ajax
        }else{
              this.$bvModal.show('modalalert')  
        }
    }, //actualiza los datos del proveedor
    LimpiarModal(){
            this.idproveedor=0
            this.proveedor.codigo=''
            this.proveedor.nombre=''
            this.proveedor.nrc=''
            this.proveedor.nit=''
            this.proveedor.direccion=''
            this.proveedor.encargado=''
            this.proveedor.telefono=''
             this.formulario.codigo=''
            this.formulario.nombre=''
            this.formulario.nrc=''
            this.formulario.nit=''
            this.formulario.direccion=''
            this.formulario.encargado=''
            this.formulario.telefono=''
                   
    },
    CrearProveedor(){
        const url=this.ip+"/api/v1.0/Proveedor/"
        const vacio=this.ValidarCamposVacios()
        if(vacio==false){
        var datos={
            codigo:String(this.formulario.codigo).toUpperCase(),
            nombre:String(this.formulario.nombre).toUpperCase(),
            direccion:String(this.formulario.direccion).toUpperCase(),
            nrc:String(this.formulario.nrc).toUpperCase(),
            nit:String(this.formulario.nit).toUpperCase(),
            telefono:String(this.formulario.telefono).toUpperCase(),
            encargado:String(this.formulario.encargado).toUpperCase()
        }
       axios.post(url,datos).then(response=>{
                const datos=response.data
                if(datos.error>0){
                    this.$toasted.error('Error:'+datos.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    })
                    
                }else{
                    this.ListarProveedores()
                    this.LimpiarModal()
                    this.hideModal()
                    this.$toasted.success('Proveedor creado con exito!!', {
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
                // eslint-disable-next-line no-console
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
        })
        this.modal=false
        }else{
          this.$bvModal.show('modalalert')
        }
    },
    Eliminar(id){
        this.$bvModal.show('eliminar')
        this.idproveedor=id
    },
    DeleteProveedor(){
        const url=this.ip+"/api/v1.0/Proveedor/"+this.idproveedor+"/"
            axios.delete(url).then(response=>{
                    const datos=response.data
                if(datos.error>0){
                    this.$bvModal.hide('eliminar')
                    this.$toasted.error('Error:'+datos.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    })
                    
                }else{
                    this.ListarProveedores()
                      this.$bvModal.hide('eliminar')
                    this.$toasted.success(datos.response, {
                                        position: 'top-center',
                                        action: {
                                        text: 'cerrar',
                                        onClick: (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                        }
                                    })
                }
                this.idproveedor=0
                }).catch(error=>{
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
                })
    },
    ValidarCamposVacios(){
        var res=false
        // eslint-disable-next-line no-console
        console.log(this.formulario)
        if(this.formulario.codigo.length > 0){
            // eslint-disable-next-line no-console
            console.log(this.formulario.codigo.length)
            this.formState.codigo=null
        }else{
             this.formState.codigo=false
             res=true
        }
        if(this.formulario.nombre.length > 0){
            this.formState.nombre=null
        }else{
             this.formState.nombre=false
             res=true
        }
        if(this.formulario.nrc.length > 0){
            this.formState.nrc=null
        }else{
             this.formState.nrc=false
             res=true
        }
        if(this.formulario.nit.length > 0){
            this.formState.nit=null
        }else{
             this.formState.nit=false
             res=true
        }
        if(this.formulario.direccion.length > 0){
            this.formState.direccion=null
        }else{
             this.formState.direccion=false
             res=true
        }
        if(this.formulario.encargado.length > 0){
            this.formState.encargado=null
        }else{
             this.formState.encargado=false
             res=true
        }
        if(this.formulario.telefono.length > 0){
            this.formState.telefono=null
        }else{
             this.formState.telefono=false
             res=true
        }
        return res
    }//valida que no hayan campos vacios
    }, //TERMINAN LAS FUNCIONES
    mounted(){
        this.ListarProveedores()
       
    }  //funcion de ciclo d
}
</script> 

<style lang="css" scoped>
    
    .alerta >.modal-dialog >.modal-content{
        background-color:white;
        border-top: 0px;
    }
</style>