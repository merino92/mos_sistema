<template>
    <div id="inventario">
        <h1 class="page-title">
            <span class="fw-semi-bold">Inventario</span>
        </h1>
        <b-row>
            <b-col>
                <Widget
                    title="<h5>Inventario<span class='fw-semi-bold'> General</span></h5> "
                 customHeader
                >
                 <b-row>
                    <b-col cols="12">
                        <b-button class="btn btn-success float-right"
                        
                        >
                    <span class="glyphicon icono glyphicon-plus"></span>
                     Nuevo  
                    </b-button>
                    </b-col>     
                </b-row>   
                <b-row class="mt-2">
                    <b-col cols="3">
                        <b-form-group>
                                <b-input-group>
                                    <template v-slot:prepend>
                                        <b-input-group-text>
                                            <span class="fa fa-barcode" ></span>
                                        </b-input-group-text>
                                        
                                    </template>
                                    <b-form-input placeholder="Codigo" type="text"></b-form-input>
                                </b-input-group>  
                            </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-input type="text" placeholder="Descripcion del Producto"></b-form-input>
                    </b-col>
                    <b-col cols="2">
                        <b-button class="btn btn-info">Buscar</b-button>
                    </b-col>
                </b-row>
                <b-row>
                         <b-col cols="12">
                             <div class="table table-responsive">
                                 <table class="table table-hover">
                                     <thead>
                                         <tr>
                                             <th>Codigo</th>
                                             <th>Nombre</th>
                                             <th>Existencias</th>
                                             <th>Precio</th>
                                             <th>Opciones</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         <tr v-for="datos in this.lista" :key="datos.id" >
                                                <td>{{datos.codigo_producto}}</td>
                                                <td>{{datos.nombre}}</td>
                                                <td>{{datos.cmaxima+' | '+datos.cminima}}</td>
                                                <td>{{"$"+datos.cmaxima+' | '+'$'+datos.cminima}}</td>
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
    </div>
</template>

<script>
import Widget from '@/components/Widget/Widget'
import Sparklines from '@/components/Sparklines/Sparklines'
import axios from 'axios'
export default {
    name:'inventario',
    components:{Widget,Sparklines},
    data(){
        return{
            ip:process.env.VUE_APP_BASE_URL,
            lista:[]
        }
    },
    methods:{

        listarInventario(){
            const url=this.ip+"/api/v1.0/producto/"
            axios.get(url).then(
                response=>{
                    const re=response.data
                    if(re.error>0){
                        this.$toasted.error('Error:'+re.response, {
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
                         this.lista=re.response

                    }

            }).catch(error =>{
                if(error.response){
                        var res=error.response.data
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

        }

    },
    mounted(){
        this.listarInventario()
    }
}
</script>

<style lang="scss" scoped>
    .icono {
     vertical-align: top !important; 
    }
</style>