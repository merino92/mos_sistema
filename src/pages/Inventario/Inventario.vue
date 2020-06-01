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
                        <b-button class="btn btn-success float-right" @click="$bvModal.show('modal')"
                        
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
        <b-modal id="modal" size="lg" :title="titulomodal" :no-close-on-backdrop="true">
           <div>
                <b-tabs content-class="mt-3">
                    <b-tab title="General" active>
                        <b-row>
                            <b-col cols="4">
                                 <b-img fluid id="img" :src="this.imagen" alt=""></b-img>
                            </b-col>
                            <b-col cols="8">
                                <b-row>
                                    <b-col cols="8">
                                        <b-form-group>
                                        <label for="">Codigo</label>
                                         <b-form-input placeholder="Codigo"></b-form-input>
                                        </b-form-group>
                                       
                                    </b-col>
                                </b-row>
                                <b-row >
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Nombre del Producto</label>
                                            <b-form-input placeholder="Descripcion"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Proveedor</label>
                                            <b-form-select></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Ubicacion</label>
                                    <b-form-input placeholder="Ubicacion" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                            <label for="">Tipo de producto</label>
                                            <b-form-select></b-form-select>
                                        </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Linea</label>
                                    <b-form-select></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Sublinea</label>
                                    <b-form-select></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Condicion</label>
                                    <b-form-select></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">                                
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Cant. Maxima</label>
                                    <b-form-input type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                 <b-form-group>
                                    <label for="">Cant. Minima</label>
                                    <b-form-input type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Exist. Unidad</label>
                                    <b-form-input type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Exist. Fraccion</label>
                                    <b-form-input type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-tab> 
                    <b-tab title="Detalles de Ventas">
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Nombre Unidad</label>
                                    <b-form-input placeholder="Nombre" ></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                    <label for="">Nombre Fraccion</label>
                                    <b-form-input placeholder="Nombre" ></b-form-input>
                                </b-form-group>
                                <b-row>
                                    <b-col cols="6">
                                        <b-form-group>
                                    <label for="">Equivalente Unidad</label>
                                    <b-form-input type="number" placeholder="0" 
                                        v-b-tooltip.hover title="Cuantas fracciones se divide una unidad"
                                    ></b-form-input>
                                </b-form-group>
                                    </b-col>
                                    <b-col cols="6">
                                        <b-form-group>
                                            <label for="">Descuento Maximo</label>
                                            <b-input-group append="%">
                                            <b-form-input  type="number" v-b-tooltip.hover title="Porcentaje maximo de descuento que se le puede dar al producto"></b-form-input>
                                            </b-input-group>  
                                             </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-col>
                             <b-col cols="6">
                                 <b-row>
                                     <b-col cols="12">
                                         <b-form-group>
                                            <label for="">Costo Promedio</label>
                                            <b-row>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title="Costo promedio sin IVA"
                                                    >    
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title="Costo promedio con IVA"
                                                    >
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>
                                                </b-col>
                                            </b-row>
                                        </b-form-group>
                                     </b-col>
                                 </b-row>
                                <b-row>
                                     <b-col cols="12">
                                         <b-form-group>
                                            <label for="">Precio Venta Unidad</label>
                                            <b-row>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >    
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>
                                                </b-col>
                                            </b-row>
                                        </b-form-group>
                                     </b-col>
                                 </b-row>
                                 <b-row>
                                     <b-col cols="12">
                                         <b-form-group>
                                            <label for="">Precio Venta Fraccion</label>
                                            <b-row>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >    
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >
                                                        <b-form-input  type="number"></b-form-input>
                                                    </b-input-group>
                                                </b-col>
                                            </b-row>
                                        </b-form-group>
                                     </b-col>
                                 </b-row>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="Precios Unidades" >
                        <Unidades></Unidades>
                    </b-tab>
                    <b-tab title="Lotes" ><Lotes></Lotes></b-tab>
                </b-tabs>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Widget from '@/components/Widget/Widget'
import Sparklines from '@/components/Sparklines/Sparklines'
import axios from 'axios'
import Unidades from '@/components/Unidades/Unidades'
import Lotes from '@/components/Lotes/Lotes'
export default {
    name:'inventario',
    components:{Widget,Sparklines,Unidades,
                Lotes},
    data(){
        return{
            ip:process.env.VUE_APP_BASE_URL,
            lista:[],
            titulomodal:'Nuevo Producto',
            imagen:require('@/assets/producto.png')
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
    $color:#99bfd9;
    .targeta{
        background:$color;
        margin-bottom: 2px;
    }
</style>