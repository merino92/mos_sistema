
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
                                                    <b-button  class='btn btn-info btn-sm ' @click="mostrarProducto(datos.id),bloqueado=true,nuevo=false,edicion=false">
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
                                <div class="hovereffect">
                                    <b-img fluid id="img" :src="this.imagen" alt=""></b-img>
                                    <div class="overlay">
                                     <h2>Cambiar Imagen</h2>
                                    <a class="info" href="#" onclick="document.getElementById('imgfile').click()"  @click="imagenClick()" >
                                        <b-form-file horizontal id="imgfile" v-model="fileimagen" @change="cambiarImagen($event)" accept="image/*"  style="display:none">
                                        </b-form-file>
                                        Actualizar</a>
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
                                         ></b-form-input>
                                        </b-form-group>
                                       
                                    </b-col>
                                </b-row>
                                <b-row >
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Nombre del Producto</label>
                                            <b-form-input v-model="producto.nombre" placeholder="Descripcion"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="">Proveedor</label>
                                            <b-form-select 
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
                                    <b-form-input v-model="producto.ubicacion" placeholder="Ubicacion" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                            <label for="">Tipo de producto</label>
                                            <b-form-select
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
                                        :options="linea.opciones"
                                        @change="onChangeLinea($event)"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Sublinea</label>
                                    <b-form-select v-model="sublinea.opcion"
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
                                        :options="condicion.opciones"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">                                
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Cant. Maxima</label>
                                    <b-form-input v-model="producto.cmaxima" type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                 <b-form-group>
                                    <label for="">Cant. Minima</label>
                                    <b-form-input v-model="producto.cminima" type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Exist. Unidad</label>
                                    <b-form-input v-model="producto.cunidades" type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group>
                                    <label for="">Exist. Fraccion</label>
                                    <b-form-input v-model="producto.cfraccion" type="number"></b-form-input>
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
            fileimagen:null,
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
            producto:{nombre:'',
                        codigo_producto:'',
                        n_unidad:'',
                        n_fraccion:'',
                        equivalente_unidad:0,
                        ubicacion:'',
                        cmaxima:'',
                        cminima:'',
                        mdescuento:0,
                        cunidades:0,
                        cfraccion:0,
                        costou:0.00,
                        costof:0.00,
                        preciou:0.00,
                        preciof:0.00,
                        opciones:null,
                        borrado:false,
                        idlinea:0,
                        idsublinea:0,
                        idproveedor:0,
                        idcondicionproducto:0,
                        idtipoproducto:0,
                    },
            bloqueado:false                              

        }
    },
    methods:{
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
        },
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
        },
        cambiarImagen(e){
            // eslint-disable-next-line no-console
           const archivo=e.target.files[0]
            if(archivo!=null){
                this.imagen=URL.createObjectURL(archivo)
               
            }else{
                this.imagen=require('@/assets/producto.png')
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
                    const producto = datos.response[0]
                    this.producto.nombre = producto.nombre
                    this.producto.codigo_producto = producto.codigo_producto
                    this.proveedor.opcion=producto.idproveedor
                    this.producto.ubicacion = producto.ubicacion
                    
                    this.linea.opcion= producto.idlinea
                    this.listarSublinea(producto.idlinea,producto.idsublinea)
                    this.condicion.opcion = producto.idcondicionproducto
                    this.tipo.opcion = producto.idtipoproducto
                    this.producto.cmaxima = producto.cmaxima
                    this.producto.cminima =producto.cminima
                    this.producto.cunidades =producto.cunidades
                    this.producto.cfraccion =producto.cfraccion
                    this.$bvModal.show('modal')
                }   
            }).catch(error => {
                this.mensajeAlerta(error)
            })
        }
    },
    mounted(){
        this.listarInventario()
        this.listarProveedor()
        this.listarLinea()
        this.listarTipoproducto()
        this.listarCondicionProducto()
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
</style>