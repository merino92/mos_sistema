
<template>
    <div id="inventario">
         <b-form-file horizontal ref="fileInput" 
                                        v-model="fileimagen" @change="cambiarImagen($event)" accept="image/*"  
                                        class="ocultar" id="fileimagen" style="display:none">
                                        </b-form-file>
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
                        @click="limpiar(),$bvModal.show('modal'),nuevo=true,edicion=false, precios_lotes=true,bloqueado=false"
                        
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
                                    <b-form-input v-model="busqueda.codigo" v-on:keyup.enter="buscar()" placeholder="Codigo" type="text"></b-form-input>
                                </b-input-group>  
                            </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-input type="text" v-model="busqueda.descripcion" v-on:keyup.enter="buscar()" placeholder="Descripcion del Producto"></b-form-input>
                    </b-col>
                    <b-col cols="2">
                        <b-button @click="buscar()" class="btn btn-info">Buscar</b-button>
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
                                                <td>{{datos.cunidades+' | '+datos.cfraccion}}</td>
                                                <td>{{"$"+parseFloat(datos.preciou).toFixed(2)+' | '+'$'+parseFloat(datos.preciof).toFixed(2)}}</td>
                                                <td>
                                                    <b-button  class='btn btn-info btn-sm ' @click=" limpiar(),mostrarProducto(datos.id),nuevo=false,edicion=false,bloqueado=true,precios_lotes=false">
                                                    <span class="glyphicon icono glyphicon-zoom-in"></span>
                                                    </b-button>    
                                                    <b-button  class='btn btn-warning btn-sm ml-1'  
                                                    @click="limpiar(),mostrarProducto(datos.id),nuevo=false,edicion=true,bloqueado=false,precios_lotes=false">
                                                    <span class="glyphicon icono glyphicon-pencil"></span></b-button>
                                                    <b-button type="button" class="btn btn-danger btn-sm ml-1" @click="alertaEliminar(datos.id)" >
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
                                <div class="hovereffect">
                                    <b-img fluid id="img" :src="this.imagen" alt=""></b-img>
                                    <div v-if="!bloqueado">
                                         <div class="overlay">
                                     <h2>Cambiar Imagen</h2>
                                    <a class="info" @click="imagenclick()" href="#" >
                                       
                                        Actualizar</a>
                                    </div>
                                   
                                </div>  
                                </div>
                                 
                            </b-col>
                            <b-col cols="8">
                                <b-row>
                                    <b-col cols="8">
                                        <b-form-group>
                                        <label for="">Codigo</label>
                                         <b-form-input v-model="producto.codigo_producto" 
                                         placeholder="Codigo"
                                         :disabled="bloqueado"
                                         :state="this.productostate.codigo_producto"
                                         ></b-form-input>
                                        </b-form-group>
                                       
                                    </b-col>
                                </b-row>
                                <b-row >
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Nombre del Producto</label>
                                            <b-form-input v-model="producto.nombre"
                                                :disabled="bloqueado"
                                                :state="this.productostate.nombre"
                                             placeholder="Descripcion"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Proveedor</label>
                                            <b-form-select 
                                            :disabled="bloqueado"
                                                v-model="proveedor.opcion"
                                                :options="proveedor.opciones"
                                             ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Ubicacion</label>
                                    <b-form-input v-model="producto.ubicacion" 
                                    :disabled="bloqueado"
                                    placeholder="Ubicacion" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                            <label for="">Tipo de producto</label>
                                            <b-form-select
                                            :disabled="bloqueado"
                                                v-model="tipo.opcion"
                                                :options="tipo.opciones"
                                             ></b-form-select>
                                        </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Linea</label>
                                    <b-form-select v-model="linea.opcion"
                                        :disabled="bloqueado"
                                        :options="linea.opciones"
                                        @change="onChangeLinea($event)"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Sublinea</label>
                                    <b-form-select v-model="sublinea.opcion"
                                        :disabled="bloqueado"
                                        :options="sublinea.opciones"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Condicion</label>
                                    <b-form-select v-model="condicion.opcion"
                                    :disabled="bloqueado"
                                        :options="condicion.opciones"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">   
                               <b-row>
                                 <b-col cols="6">
                                <b-form-group>
                                    <label for="">Cant. Maxima</label>
                                    <b-form-input class="numero" v-model="producto.cmaxima" 
                                        :disabled="bloqueado"
                                     type="number"></b-form-input>
                                </b-form-group>
                                 <b-form-group>
                                    <label for="">Exist. Unidad</label>
                                    <b-form-input class="numero" v-model="producto.cunidades" 
                                    :disabled="bloqueado"
                                    type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                 <b-form-group>
                                    <label for="">Cant. Minima</label>
                                    <b-form-input class="numero" v-model="producto.cminima" 
                                    :disabled="bloqueado"
                                    type="number"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                    <label for="">Exist. Fraccion</label>
                                    <b-form-input class="numero" v-model="producto.cfraccion"
                                    :disabled="bloqueado"
                                     type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                           
                                </b-row>                          
                            </b-col>
                        </b-row>
                        <b-row>
                           
                        </b-row>
                    </b-tab> 
                    <b-tab title="Detalles de Ventas">
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Nombre Unidad</label>
                                    <b-form-input v-model="producto.n_unidad" 
                                        :disabled="bloqueado"
                                     placeholder="Nombre" ></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                    <label for="">Nombre Fraccion</label>
                                    <b-form-input v-model="producto.n_fraccion"
                                        :disabled="bloqueado"
                                         :state="this.productostate.n_fraccion"
                                     placeholder="Nombre" ></b-form-input>
                                </b-form-group>
                                <b-row>
                                    <b-col cols="6">
                                        <b-form-group>
                                    <label for="">Equivalente Unidad</label>
                                    <b-form-input type="number" class="numero"
                                     :state="this.productostate.equivalente_unidad"
                                    v-model="producto.equivalente_unidad" placeholder="0" 
                                    :disabled="bloqueado"
                                        v-b-tooltip.hover title="Cuantas fracciones se divide una unidad"
                                    ></b-form-input>
                                </b-form-group>
                                    </b-col>
                                    <b-col cols="6">
                                        <b-form-group>
                                            <label for="">Descuento Maximo</label>
                                            <b-input-group append="%">
                                            <b-form-input  v-model="producto.mdescuento" class="numero"
                                            :disabled="bloqueado"
                                            type="number" v-b-tooltip.hover title="Porcentaje maximo de descuento que se le puede dar al producto"></b-form-input>
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
                                                        <b-form-input class="numero"
                                                        :disabled="true"
                                                         v-model="producto.costou"
                                                         type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title="Costo promedio con IVA"
                                                    >
                                                        <b-form-input   class="numero"
                                                        @change="onChangeCosto($event)"
                                                        :disabled="bloqueado"
                                                        v-model="producto.costouiva"  type="number"></b-form-input>
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
                                                        <b-form-input  v-model="producto.preciou" class="numero"
                                                        :disabled="true"
                                                        type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >
                                                        <b-form-input v-model="producto.preciouiva" class="numero"
                                                            :disabled="bloqueado"
                                                            @change="onChagePrecioUnidad($event)"
                                                         type="number"></b-form-input>
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
                                                        <b-form-input v-model="producto.preciof" 
                                                        :disabled="bloqueado" class="numero"
                                                         type="number"></b-form-input>
                                                    </b-input-group>  
                                                </b-col>
                                                <b-col cols="6">
                                                    <b-input-group prepend="$"
                                                        v-b-tooltip.hover title=""
                                                    >
                                                        <b-form-input v-model="producto.preciofiva" 
                                                        @change="onChangePrecioFraccion($event)"
                                                        :disabled="bloqueado" class="numero"
                                                        type="number"></b-form-input>
                                                    </b-input-group>
                                                </b-col>
                                            </b-row>
                                        </b-form-group>
                                     </b-col>
                                 </b-row>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="Precios Unidades" :disabled="precios_lotes" >
                        <Unidades :visible="bloqueado" :idinventario="producto.id"   ></Unidades>
                    </b-tab>
                  <!---  <b-tab title="Lotes" :visible="bloqueado" 
                    :idinventario="producto.id" :disabled="precios_lotes" >
                        <Lotes></Lotes>
                    </b-tab> ---->
                </b-tabs>
            </div>
             <template v-slot:modal-footer={}>
                  <b-button size="sm" v-if="edicion==true" variant="info" @click="updateProducto()" > <!--v-if sirve para ocultar o mostrar dependiendo de la condicion-->
                Editar</b-button>
                <b-button size="sm" v-if="nuevo==true" variant="success" @click="crearProducto()">
                    Guardar
                </b-button>
                <b-button size="sm"  variant="danger" @click="$bvModal.hide('modal'),limpiar()">
                    Cancelar
                </b-button>
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
                    <h6>El producto ya no lo volveras a ver pero si los podras activar
                        si lo necesitas mas adelante
                    </h6>
                </template>

                <template class="alerta" v-slot:modal-footer="{}">
                
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="deleted()">
                    Eliminar
                </b-button>
                <b-button size="sm" variant="danger" @click="$bvModal.hide('eliminar'),ideliminar=0">
                    Cancelar
                </b-button>
                <!-- Button with custom close trigger value -->
            </template>
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
            ideliminar:0,
            nuevo:false,
            edicion:false,
            impuestos:{iva:0,
                cesc:0,
                retencion:0,
                cotram:0},
            titulomodal:'Nuevo Producto',
            fileimagen:null,
            imgnueva:0,
            imagen:require('@/assets/producto.png'),
            proveedor:{opciones:[],
                opcion:null},
            linea:{opciones:[],
                opcion:null},
            sublinea:{opciones:[],
                opcion:null},
            tipo:{opciones:[],
                opcion:null},
            condicion:{opciones:[],
                opcion:null},
            busqueda:{codigo:'',
                    descripcion:''},    
            producto:{  id:0,
                        nombre:''.toUpperCase(),
                        codigo_producto:''.toUpperCase(),
                        n_unidad:''.toUpperCase(),
                        n_fraccion:''.toUpperCase(),
                        equivalente_unidad:0,
                        ubicacion:''.toUpperCase(),
                        cmaxima:0,
                        cminima:0,
                        mdescuento:0,
                        cunidades:0,
                        cfraccion:0,
                        costou:0.00,
                        costouiva:0.00,
                        costof:0.00,
                        costofiva:0.00,
                        preciou:0.00,
                        preciouiva:0.00,
                        preciof:0.00,
                        preciofiva:0.00,
                        opciones:{},
                        borrado:false,
                        idlinea:0,
                        idsublinea:0,
                        idproveedor:0,
                        idcondicionproducto:0,
                        idtipoproducto:0,
                        
                    },
            bloqueado:false,
            precios_lotes:false ,
            productostate:{  id:null,
                        nombre:null,
                        codigo_producto:null,
                        n_unidad:null,
                        n_fraccion:null,
                        equivalente_unidad:null,
                        ubicacion:null,
                        cmaxima:null,
                        cminima:null,
                        mdescuento:null,
                        cunidades:null,
                        cfraccion:null,
                        costou:null,
                        costouiva:null,
                        costof:null,
                        costofiva:null,
                        preciou:null,
                        preciouiva:null,
                        preciof:null,
                        preciofiva:null,
                    },                             

        }
    },
    methods:{
        imagenclick(){
            document.getElementById('fileimagen').click()
        },
        listarImpuestos(){
            const url = this.ip +'/api/v1.0/Configuracion/1/ListarImpuestos/'
            axios.get(url)
            .then(response =>{
                const data = response.data
                if(data.error > 0){
                    this.errorAlert(data.response)
                }else{
                    var impuesto =data.response
                    this.impuestos.iva = (parseInt(impuesto.iva)/100) + 1 
                    this.impuestos.retencion = (parseInt(impuesto.retencion)/100)
                    this.impuestos.cesc =(parseInt(impuesto.cesc)/100)
                    this.impuestos.cotram =(parseInt(impuesto.cotram) /100)
                }

            }).catch(error =>{
                if(error.response){
                    var datos = error.response
                    this.errorAlert(datos.response)
                }else{
                    this.errorAlert(error)
                }
            })
        },//lista los impuestos
        listarInventario(){
            const url=this.ip+"/api/v1.0/inventario/"
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

        }, //lista todos los productos
        listarProveedor(){
            const direcion=this.ip+"/api/v1.0/Proveedor/"
          
            axios.get(direcion).
            then(response =>{
                const data=response.data
                this.proveedor.opciones.length=0
                data.forEach(key=>{
                        var d={
                        value: key.id,
                        text: key.nombre
                        }
                    this.proveedor.opciones.push(d)
                    
                })
                this.proveedor.opcion=this.proveedor.opciones[0].value
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
            })//termina axios
        }, //lista los proveedores
        listarLinea(){
             const url=this.ip+"/api/v1.0/Linea/"
            axios.get(url).
            then(response =>{ 
                var datos=response.data
                this.opcion=0
                this.linea.opciones.length=0
                datos.forEach(res=>{
                    if(res.activo===true){
                        var d={
                        value: res.id,
                        text: res.linea
                        }
                    this.linea.opciones.push(d)
                    }
                    
                })
                this.linea.opcion=this.linea.opciones[0].value
                this.listarSublinea()
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
        }, //termina listarlinea
        listarSublinea(opcion,posicion){
            var id=opcion
            if(id==null){
                id=this.linea.opcion
            }
            this.linea.opcion=id
            const url=this.ip+"/api/v1.0/Sublinea/"+id+"/ListarId/"
            axios.get(url).
            then(response => {
                const data=response.data.response
                if(data.length >0){
                this.sublinea.opciones.length=0
            
                data.forEach(key=>{
                    var d={
                        text:key.sublinea,
                        value:key.id
                    }
                   
                    this.sublinea.opciones.push(d)
                })
                if (posicion > 0){
                     this.sublinea.opcion=posicion
                }else{
                     this.sublinea.opcion=this.sublinea.opciones[0].value
                }
               
                }else{
                    this.sublinea.opciones.length=0
                     this.sublinea.opcion=null
                }
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
        },//termina listarsublinea
        onChangeLinea(event){
           
            this.listarSublinea(event,0)
        },//se ejecuta cuando hay un cambio en el select linea
        onChangeCosto(event){
            this.producto.costouiva = parseFloat(event).toFixed(4)
            if(this.producto.costouiva > 0 || this.producto.costouiva != null){
                this.producto.costou = parseFloat(this.producto.costouiva/this.impuestos.iva).toFixed(4)

            }else{
                this.producto.costou = 0
            }
        }, //obtiene el costo promedio
        onChagePrecioUnidad(event){
            this.producto.preciouiva = parseFloat(event).toFixed(4)
            if(this.producto.preciouiva > 0 || this.producto.preciouiva != null){
                this.producto.preciou = parseFloat(this.producto.preciouiva/this.impuestos.iva).toFixed(4)

            }else{
                this.producto.preciou = parseFloat(0).toFixed(4)
            }
        }, //calcula el precio unidad sin iva cuan han cambiado 
        onChangePrecioFraccion(event){
            this.producto.preciofiva = parseFloat(event).toFixed(4)
            if(this.producto.preciofiva > 0 || this.producto.preciofiva != null){
                this.producto.preciof = parseFloat(this.producto.preciofiva/this.impuestos.iva).toFixed(4)

            }else{
                this.producto.preciof = parseFloat(0).toFixed(4)
            }
        },// calcula el precio de la franccion sin iva cuando haya cambiado
        listarTipoproducto(){
            const url=this.ip+"/api/v1.0/tipoproducto/"
            axios.get(url).then(response=>{
                var data=response.data
                if(data.error>0){
                    this.$toasted.error('Error: algo ocurrio', {
                                            position: 'top-center',
                                            action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
                }else{
                    if(data.response.length>0){
                        this.tipo.opciones.length=0
                        data.response.forEach(key=>{
                            var d={
                                value:key.id,
                                text:key.tipo_producto
                            }
                            this.tipo.opciones.push(d)
                        })
                        this.tipo.opcion=this.tipo.opciones[0].value
                    }
                }


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
        }, // lista los tipos de producto
        listarCondicionProducto(){
            const url =this.ip+'/api/v1.0/condicionproducto/'
            axios.get(url)
            .then(response => {
                const data =response.data
                if(data.error > 0){
                    this.mensajeAlerta(response)
                }else{
                    if(data.response.length>0){
                        this.condicion.opciones.length=0
                        data.response.forEach(key=>{
                            var d={
                                value:key.id,
                                text:key.condicion_producto
                            }
                            this.condicion.opciones.push(d)
                        })
                        this.condicion.opcion=this.condicion.opciones[0].value
                    }
                }
            }).catch(error =>{
                this.mensajeAlerta(error)
            })
        }, //listado de los tipos de condiciones del producto
        cambiarImagen(e){
            // eslint-disable-next-line no-console
           const archivo=e.target.files[0]
            if(archivo!=null){
                this.imagen=URL.createObjectURL(archivo)
                this.imgnueva ++
            }else{
                this.imagen=require('@/assets/producto.png')
                this.imgnueva =0
            }
        }, //cambia la imagen en el formulario
        buscar(){
            if (this.busqueda.codigo.length <= 0 && this.busqueda.descripcion.length <= 0){
                this.listarInventario()
            }else{
                const url = this.ip + "/api/v1.0/inventario/busqueda/"
                var datos={
                    codigo:this.busqueda.codigo,
                    descripcion:this.busqueda.descripcion
                } 
                axios.post(url,datos).
                then(response=>{
                    if(response.data.error > 0){
                        this.mensajeAlerta(response)
                    }else{
                        this.lista.length=0
                        this.lista=response.data.response 
                    }
                }).catch(error =>{
                    this.mensajeAlerta(error)
                })

            }
        }, //busca el producto por descripcion o codigo seraching
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
        mostrarProducto(id){
            const url = this.ip +'/api/v1.0/inventario/'+id+'/'
            axios.get(url)
            .then(response => {
                const datos = response.data
                 // eslint-disable-next-line no-console
                 console.log(datos.response[0])
                if(datos.error > 0){
                    this.mensajeAlerta(response)
                }else{
                    
                    // eslint-disable-next-line no-console
                    console.log(datos.response[0])
                    const producto = datos.response[0]
                    const imagen =JSON.parse(producto.opciones)
                    if(imagen.imagen){
                        if (imagen.imagen.length > 0){
                            this.imagen = this.ip + '/static/'+ imagen.imagen
                        }else{
                            this.imagen = require('@/assets/producto.png')
                        }
                    }else{
                        this.imagen = require('@/assets/producto.png')
                    }
                    this.producto.id = producto.id
                    this.producto.nombre = producto.nombre
                    this.producto.codigo_producto = producto.codigo_producto
                    this.proveedor.opcion=producto.idproveedor
                    this.producto.ubicacion = producto.ubicacion
                    
                    this.linea.opcion= producto.idlinea
                    this.listarSublinea(producto.idlinea,producto.idsublinea)
                    this.condicion.opcion = producto.idcondicionproducto
                    this.tipo.opcion = producto.idtiproducto
                    this.producto.cmaxima = producto.cmaxima
                    this.producto.cminima =producto.cminima
                    this.producto.cunidades =producto.cunidades
                    this.producto.cfraccion =producto.cfraccion
                    this.producto.n_unidad = producto.n_unidad
                    this.producto.n_fraccion =producto.n_fraccion
                    this.producto.equivalente_unidad = producto.equivalente_unidad
                    this.producto.mdescuento = parseFloat(producto.mdescuento).toFixed(1)
                    this.producto.costouiva = parseFloat(producto.costou).toFixed(4)
                    this.producto.costou = parseFloat(parseFloat(producto.costou).toFixed(4)/ this.impuestos.iva).toFixed(4) 
                    this.producto.preciouiva = parseFloat(producto.preciou).toFixed(4)
                    this.producto.preciou =parseFloat(parseFloat(producto.preciou).toFixed(4)/this.impuestos.iva).toFixed(4)
                    this.producto.preciofiva = parseFloat(producto.preciof).toFixed(4)
                    this.producto.preciof = parseFloat(parseFloat(producto.preciof).toFixed(4)/this.impuestos.iva).toFixed(4)
                    this.$bvModal.show('modal')
                }   
            }).catch(error => {
                this.mensajeAlerta(error)
            })
        },
        limpiar(){  
            this.imgnueva =0
            this.fileimagen = null
            this.imagen =require('@/assets/producto.png')
            this.producto.id = 0
            this.producto.nombre = ""
            this.producto.codigo_producto = ""
            this.proveedor.opcion= this.proveedor.opciones[0].value
            this.producto.ubicacion = "" 
            this.linea.opcion= this.linea.opciones[0].value
            this.listarSublinea(this.linea.opcion,0)
            this.condicion.opcion = this.condicion.opciones[0].value
            this.tipo.opcion = this.tipo.opciones[0].value
            this.producto.cmaxima = 0
            this.producto.cminima = 0
            this.producto.cunidades = 0
            this.producto.cfraccion = 0
            this.producto.n_unidad = ''
            this.producto.n_fraccion =''
            this.producto.equivalente_unidad = 0
            this.producto.mdescuento = 0
            this.producto.costouiva = 0
            this.producto.costou = 0
            this.producto.preciouiva = 0
            this.producto.preciou = 0
            this.producto.preciofiva = 0
            this.producto.preciof = 0
        }, //limpia el formulario
        validarFraccion(){
            if(this.producto.n_fraccion.length ==0 && this.producto.equivalente_unidad == 0){               
                this.productostate.n_fraccion = null
                this.productostate.equivalente_unidad =null
                return true
            }else if(this.producto.n_fraccion.length > 0 && this.producto.equivalente_unidad == 0){
                  this.productostate.n_fraccion = null
                this.productostate.equivalente_unidad =false
                return false 
            } else if(this.producto.n_fraccion.length === 0 && this.producto.equivalente_unidad > 0){
                  this.productostate.n_fraccion = false
                this.productostate.equivalente_unidad =null
                return false 
            }else{
                 // eslint-disable-next-line no-console
                console.log('caso4')
                 this.productostate.n_fraccion = null
                this.productostate.equivalente_unidad =null
                return true 
            }
        }, //valida el nombre de la fraccion y el equivalente
        validarFormulario(){
            var respuesta = 0
            if(this.producto.codigo_producto.length > 0){  
                this.productostate.codigo_producto=null
            }else{
                respuesta++
                this.productostate.codigo_producto=false
            } 
            
            if(this.producto.nombre.length > 0){
                this.productostate.nombre=null
            }else{
                this.productostate.nombre=false
                 // eslint-disable-next-line no-console
                 console.log('respuesta ante',this.productostate.nombre)
                 
                respuesta++
                
            }
             let res =this.validarFraccion()
                if(!res){
                  respuesta ++  
                }

            return respuesta
        },
        crearProducto(){
            const res =this.validarFormulario() //funcion que valida los campos del formulario
            if(res === 0){
                    var nombre = this.fileimagen ? this.fileimagen.name:''
                if(nombre.length > 0){
                    let img=this.fileimagen
                    let reader = new FileReader() //objecto para convertir la imagen a base64
                    reader.readAsDataURL(img)  
                    let name = nombre
                    reader.onload = e => {
                        var convertImage= e.target.result
                        var newImage =convertImage.replace(/^data:image\/[a-z]+;base64,/, "")
                        this.newProducto(newImage,name)}                   
                }else{
                    this.newProducto('','')
                }        
            }else{
                this.errorAlert('Hay campos Obligatorios que no se han llenado corretamente')
            }
        }, //termina crear producto
         newProducto(imagen,nombreimg){
            const url =this.ip+'/api/v1.0/inventario/'
            const producto ={
                codigoProducto:this.producto.codigo_producto.toUpperCase(),
                nombre:this.producto.nombre.toUpperCase(),
                idLinea:this.linea.opcion,
                idSublinea:this.sublinea.opcion,
                idProveedor:this.proveedor.opcion,
                idCondicionProducto:this.condicion.opcion,
                idTipoProducto:this.tipo.opcion,
                nombreUnidad:this.producto.n_unidad.toUpperCase(),
                nombreFraccion:this.producto.n_fraccion.toUpperCase(),
                ubicacion:this.producto.ubicacion.toUpperCase(),
                equivalenteUnidad:parseInt(this.producto.equivalente_unidad), 
                cantidadMaxima:parseInt(this.producto.cmaxima),
                cantidadMinima:parseInt(this.producto.cminima),
                maximoDescuento:parseInt(this.producto.mdescuento),
                cantidadUnidad:parseInt(this.producto.cunidades),
                cantidadFraccion:parseInt(this.producto.cfraccion),
                costoUnidad:parseFloat(this.producto.costouiva).toFixed(4),
                costoFraccion:parseFloat(this.producto.costofiva).toFixed(4),
                precioUnidad:parseFloat(this.producto.preciouiva).toFixed(4),
                precioFraccion:parseFloat(this.producto.preciofiva).toFixed(4),

            } //datos del producto
            const datos={
                producto:producto,
                usuario:'merino92',
                imagen:{
                    imagen:imagen,
                    nombre:nombreimg
                }
            } //armado de objecto json 
            axios.post(url,datos)
            .then(response =>{
                const  res = response.data
                if(res.error > 0){
                    this.errorAlert(res.response)
                }else{
                    this.listarInventario()
                    this.limpiar()
                    this.$bvModal.hide('modal')
                    this.successAlert(res.response)
                }

            }).catch(error =>{
               this.mensajeAlerta(error)
            })
            
        
        },
        updateProducto(){
            const validacion = this.validarFormulario()
            if (validacion === 0){
                var nombre = this.fileimagen ? this.fileimagen.name:''
                if(nombre.length > 0){
                    let img=this.fileimagen
                    let reader = new FileReader() //objecto para convertir la imagen a base64
                    reader.readAsDataURL(img)  
                    let name = nombre
                    reader.onload = e => {
                        var convertImage= e.target.result
                        var newImage =convertImage.replace(/^data:image\/[a-z]+;base64,/, "")
                        this.update(newImage,name)} 
                }else{
                    this.update('','')
                }
            }else{
                 this.errorAlert('Hay campos Obligatorios que no se han llenado corretamente')
            }
        },
        update(imagen,nombre){
            const url = this.ip + '/api/v1.0/inventario/' + this.producto.id +'/'
            const producto ={
                codigoProducto:this.producto.codigo_producto.toUpperCase(),
                nombre:this.producto.nombre.toUpperCase(),
                idLinea:this.linea.opcion,
                idSublinea:this.sublinea.opcion,
                idProveedor:this.proveedor.opcion,
                idCondicionProducto:this.condicion.opcion,
                idTipoProducto:this.tipo.opcion,
                nombreUnidad:this.producto.n_unidad.toUpperCase(),
                nombreFraccion:this.producto.n_fraccion.toUpperCase(),
                ubicacion:this.producto.ubicacion.toUpperCase(),
                equivalenteUnidad:parseInt(this.producto.equivalente_unidad), 
                cantidadMaxima:parseInt(this.producto.cmaxima),
                cantidadMinima:parseInt(this.producto.cminima),
                maximoDescuento:parseInt(this.producto.mdescuento),
                cantidadUnidad:parseInt(this.producto.cunidades),
                cantidadFraccion:parseInt(this.producto.cfraccion),
                costoUnidad:parseFloat(this.producto.costouiva).toFixed(4),
                costoFraccion:parseFloat(this.producto.costofiva).toFixed(4),
                precioUnidad:parseFloat(this.producto.preciouiva).toFixed(4),
                precioFraccion:parseFloat(this.producto.preciofiva).toFixed(4),
                borrado:false,


            } //datos del producto
            const datos={
                producto:producto,
                usuario:'merino92',
                imagen:{
                    imagen:imagen,
                    nombre:nombre
                }
            } //armado de objecto json 
           axios.put(url,datos)
           .then(response =>{
               const datos = response.data
               if(datos.error> 0){
                   this.errorAlert(datos.response)
               }else{
                   this.listarInventario()
                   this.limpiar()
                   this.$bvModal.hide('modal')
                   this.successAlert(datos.response)
               }

           }).catch(error=>{
               // eslint-disable-next-line no-console
               console.log(error)
               if(error.response){
                   var msj=error.response.data
                   this.errorAlert(msj.response)
               }else{
                   this.errorAlert(error)
               }
           }) 
        },
        deleted(){
           const url = this.ip +'/api/v1.0/inventario/'+this.ideliminar+'/'
           // eslint-disable-next-line no-console
           console.log(url)
           axios.delete(url)
           .then(response =>{
               var res = response.data 
               if(res.error > 0){
                   this.errorAlert(res.response)
               }else{
                   this.listarInventario()
                   this.ideliminar =0 
                   this.$bvModal.hide('eliminar')
                   this.successAlert(res.response)
               }

           }).catch(error =>{
               if(error.response){
                   var res = error.response.data
                   this.errorAlert(res.response)
               }else{
                   this.errorAlert(error)
               }
           })

        },
        alertaEliminar(id){
            // eslint-disable-next-line no-console
            console.log(id)
            this.ideliminar =id
             // eslint-disable-next-line no-console
            console.log(this.ideliminar)
            this.$bvModal.show('eliminar')
        }
    },
   
    mounted(){
        this.listarInventario()
        this.listarProveedor()
        this.listarLinea()
        this.listarTipoproducto()
        this.listarCondicionProducto()
        this.listarImpuestos()
    } //funcion de ciclo de vida  cuando se inicia el componente
}
</script>

<style lang="scss" scoped>
    .numero{
        font-weight: bold;
    }
    .icono {
     vertical-align: top !important; 
    }
    $color:#99bfd9;
    .targeta{
        background:$color;
        margin-bottom: 2px;
    }
     .hovereffect {
  width: 100%;
  height: 90%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}

.hovereffect .overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  background-color: rgba(0,0,0,0.5);
  -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
  transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
}

.hovereffect img {
  display: block;
  position: relative;
  -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
  transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
}

.hovereffect h2 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  background: rgba(0,0,0,0.6);
  -webkit-transform: translatey(-100px);
  -ms-transform: translatey(-100px);
  transform: translatey(-100px);
  -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
  transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
  padding: 10px;
}

.hovereffect a.info {
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #fff;
  background-color: transparent;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  margin: 50px 0 0;
  padding: 7px 14px;
}

.hovereffect a.info:hover {
  box-shadow: 0 0 5px #fff;
}

.hovereffect:hover img {
  -ms-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.hovereffect:hover .overlay {
  opacity: 1;
  filter: alpha(opacity=100);
}

.hovereffect:hover h2,.hovereffect:hover a.info {
  opacity: 1;
  filter: alpha(opacity=100);
  -ms-transform: translatey(0);
  -webkit-transform: translatey(0);
  transform: translatey(0);
}

.hovereffect:hover a.info {
  -webkit-transition-delay: .2s;
  transition-delay: .2s;
}
.alerta >.modal-dialog >.modal-content{
    background-color:white;
    border-top: 0px;
}
</style>