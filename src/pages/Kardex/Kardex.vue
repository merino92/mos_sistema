<template>
    <div id="kardex">
        <h1 class="page-title">
            <span class="fw-semi-bold">Movimientos de Productos</span>
        </h1>
        <b-row>
            <b-col>
                <Widget 
                 title="<h5>Kardex<span class='fw-semi-bold'></span></h5> "
                 customHeader   
                >
                     
                <b-row class="mt-4">
                    <b-col cols="3">
                        <b-form-group>
                                <b-input-group>
                                    <template v-slot:prepend>
                                        <b-input-group-text>
                                            <span class="fa fa-barcode" ></span>
                                        </b-input-group-text>
                                        
                                    </template>
                                    <b-form-input placeholder="Codigo" v-on:keyup.enter="filtrarProducto()" v-model="busqueda.codigo" type="text"></b-form-input>
                                </b-input-group>  
                            </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-input type="text" v-model="busqueda.descripcion" 
                        v-on:keyup.enter="filtrarProducto()"
                        placeholder="Descripcion del Producto"></b-form-input>
                    </b-col>
                    <b-col cols="2">
                        <b-button class="btn btn-info" @click="filtrarProducto()">Buscar</b-button>
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
                                             <th>Unidades</th>
                                             <th>Fracciones</th>
                                             <th>Opciones</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         <tr v-for="datos in this.lista" :key="datos.id" >
                                                <td>{{datos.codigo_producto}}</td>
                                                <td>{{datos.nombre}}</td>
                                                <td>{{datos.cunidades}}</td>
                                                <td>{{datos.cfraccion}}</td>
                                                <td>
                                                    <b-button  class='btn btn-info btn-sm ' @click="mostrarDatos(datos.id)">
                                                    <span class="glyphicon icono glyphicon-zoom-in"></span>
                                                    </b-button>    
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
        <b-modal id="modal" size="xl" title="Detalles de movimiento" :no-close-on-backdrop="true"> 
             <b-row>
                 <b-col cols="2">
                     <b-form-group>
                         <label for="">Codigo</label>
                         <b-form-input v-model="codigo" type="text" :disabled="true"></b-form-input>
                     </b-form-group>
                 </b-col>
                 <b-col cols="4">
                      <label for="">Descripcion</label>
                         <b-form-input v-model="descripcion" type="text" :disabled="true"></b-form-input>
                 </b-col>
             </b-row>
             <b-row>
                 <b-col>
                     <h5>Filtros de Busqueda</h5>
                 </b-col>
             </b-row>
             <b-row>
                 
                 <b-col cols="3">
                     <b-form-group>
                         <label for="">Fecha Inicio</label>
                         <b-form-datepicker 
                             :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                           v-model="fechai" class="mb-2"></b-form-datepicker>
                     </b-form-group>
                 </b-col>
                 <b-col cols="3">
                      <b-form-group>
                         <label for="">Fecha Final</label>
                         <b-form-datepicker  
                          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                         v-model="fechaf" class="mb-2"></b-form-datepicker>
                     </b-form-group>
                 </b-col>
                 <b-col cols="2">
                     <b-form-group class="mt-4" >
                        
                          <b-button variant="info" @click="filtrar()" class="mt-2">Buscar</b-button>
                     </b-form-group>
                   
                 </b-col>
                
             </b-row>
              <b-row>
                     <b-col>
                         <b-table responsive small :fields="tabla.fields" :busy="cargando" :items="tabla.items">
                            <template v-slot:table-busy>
                                <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Cargando...</strong>
                                </div>
                            </template>
                         <template v-slot:thead-top="data">
                            <b-tr>
                          
                            <b-th variant="secondary" class="text-center" >N</b-th>
                            <b-th variant="primary" class="text-center"  colspan="3">Detalle del Movimiento</b-th>
                            <b-th variant="success"  colspan="2" >Entrada</b-th>
                             <b-th variant="danger"  colspan="2" >Salida</b-th>
                             <b-th variant="warning"  colspan="2" >Saldos</b-th>
                            </b-tr>
                        </template>
                        <template v-slot:cell(documento)="data">
                             <span  v-b-tooltip.hover :title="data.value.concepto" >{{data.value.documento}}</span>
                        </template>
                        <template v-slot:cell(uentrada)="data">
                              <strong class="text-success">{{ data.value}}</strong>
                        </template>
                        <template v-slot:cell(fentrada)="data">
                              <strong class="text-success">{{ data.value}}</strong>
                        </template>
                        <template v-slot:cell(usalida)="data">
                              <strong class="text-danger">{{ data.value}}</strong>
                        </template>
                        <template v-slot:cell(fsalida)="data">
                              <strong class="text-danger">{{ data.value}}</strong>
                        </template>
                     </b-table>
                    </b-col>
                     
                 </b-row>
            <template v-slot:modal-footer={}>
                <b-button size="sm"  variant="danger" @click="$bvModal.hide('modal'),id=0">
                    Cancelar
                </b-button>
            </template>     
        </b-modal>
    </div>
</template>

<script>
import Widget from '@/components/Widget/Widget'
import axios from 'axios'
import moment from 'moment'
export default {
    
    name:'kardex',
    component:{Widget},
    data(){
        return{
             ip:process.env.VUE_APP_BASE_URL,
            lista:[],
            fahora:new Date(),
            fechai:moment(this.fahora).format('YYYY-MM-DD'),
            fechaf:moment(this.fahora).format('YYYY-MM-DD'),
            id:0,
            busqueda:{codigo:'',
                    descripcion:''},
            tabla:{fields:[{key:'nid',label:'#'},{key:'fecha'},{key:'documento'},{key:'usuario',label:'Usuario'},
                        {key:'uentrada',label:'U'},{key:'fentrada',label:'F'},{key:'usalida',label:'U'},
                        {key:'fsalida',label:'F'},{key:'saldou',label:'U'},{key:'saldof',label:'F'}],
                    items:[]},
            cargando:false        

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
        },
        mostrarDatos(id){
            this.id = id
            const url =this.ip+'/api/v1.0/kardex/'
            var ahora = new Date()
            this.fechai = moment(ahora).format("YYYY-MM-DD")
            this.fechaf = moment(ahora).format("YYYY-MM-DD")
            axios.get(url,{params:{idinventario:id,
                                    fecha:moment(ahora).format("YYYY-MM-DD")
            }}).then(response =>{
                // eslint-disable-next-line no-console
                console.log(response)
                const data = response.data 
                if(data.error > 0){
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
                    var datos =data.response
                    this.tabla.items.length = 0
                    var lista =[]
                    datos.forEach(key => {
                         const m =JSON.parse(key.movimiento)
                        var dato ={
                            nid:key.id,
                            fecha:moment(key.fecha).format('DD/MM/YYYY'),
                            documento:{documento:key.ndocumento,concepto:key.concepto},
                            uentrada:m.entrada.unidad,
                            fentrada:m.entrada.fraccion,
                            usalida:m.salidad.unidad,
                            fsalida:m.salidad.fraccion,
                            usuario:key.usuario,
                            saldou:m.saldo.unidad,
                            saldof:m.saldo.fraccion,
                              
                             
                        }
                        
                        lista.push(dato)
                    });
                    this.tabla.items=lista
                    this.codigo = data.datos.codigo
                    this.descripcion = data.datos.nombre
                    this.$bvModal.show('modal')
                }
            }).catch(error =>{
                if (error.response){
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
        filtrar(){
            this.cargando =true
            const url=this.ip+'/api/v1.0/kardex/listarkardex/'
            const formato ='YYYY-MM-DD'
            var datos ={
                id:this.id,
                fechai:moment(this.fechai).format(formato),
                fechaf:moment(this.fechaf).format(formato)
            }
            axios.post(url,datos).
            then(response =>{
                const data = response.data 
                if(data.error > 0){
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
                    var datos =data.response
                    this.tabla.items.length = 0
                    var lista =[]
                    datos.forEach(key => {
                         const m =JSON.parse(key.movimiento)
                        var dato ={
                            nid:key.id,
                            fecha:moment(key.fecha).format('DD/MM/YYYY'),
                            documento:{documento:key.ndocumento,concepto:key.concepto},
                            uentrada:m.entrada.unidad,
                            fentrada:m.entrada.fraccion,
                            usalida:m.salidad.unidad,
                            fsalida:m.salidad.fraccion,
                            usuario:key.usuario,
                            saldou:m.saldo.unidad,
                            saldof:m.saldo.fraccion,
                              
                             
                        }
                        
                        lista.push(dato)
                    });
                    this.tabla.items=lista
                    this.cargando =false
                   
                }

            }).catch(error =>{
                 if (error.response){
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
        filtrarProducto(){
             if (this.busqueda.codigo.length <= 0 && this.busqueda.descripcion.length <= 0){
                this.listarInventario()
            }else{
                const url = this.ip + "/api/v1.0/inventario/busqueda/"
                var datos={
                    codigo:this.busqueda.codigo.toUpperCase(),
                    descripcion:this.busqueda.descripcion.toUpperCase()
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
                    if(error.respose){
                        const msg =error.response.data.response
                        this.mensajeAlerta(msg)
                    }else{
                        this.mensajeAlerta(error)
                    }
                    
                })

            }
        }


    },
    mounted(){
        this.listarInventario()
    }
}
</script>