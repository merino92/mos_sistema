<template>
    <div id="general">
        
        <b-row>
            <b-col cols="8" >
                <h1 class="page-title">
                <span class="fw-semi-bold">Configuracion General</span>
                </h1>
            </b-col>
            <b-col cols="4">
                <b-button class="btn btn-info   float-right" @click="Guardar()">Actualizar</b-button>  
            </b-col>
        </b-row>
        <b-row class="mt-1">
            <b-col>
                <Widget 
                    title="<h5>Datos Generales<span class='fw-semi-bold'> del Negocio</span></h5> "
                 customHeader
                >
                <b-row>
                    <b-col cols="8" class="mt-2">
                        <b-form-group class="mt-2">
                            <label for="">Nombre de la Empresa</label>
                            <b-form-input type="text" 
                                :state="estados.nombre"
                            v-model="formulario.nombre" placeholder="Nombre" ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <label for="">Direccion</label>
                            <b-form-input type="text" 
                            :state="estados.direccion"
                            v-model="formulario.direccion" placeholder="Direccion de la empresa"></b-form-input>
                        </b-form-group>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group>
                                    <label for="">Telefono</label>
                                    <b-form-input type="text" 
                                    :state="estados.telefono"
                                    v-model="formulario.telefono" placeholder="Telefono"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <label for="">Tipo de Contribuyente</label>
                                <b-form-select v-model="formulario.opcion"
                                :options="opciones"
                                ></b-form-select>
                            </b-col>
                        </b-row>
                        
                    </b-col>
                    <b-col cols="3" offset-md="1">
                         <label for="">Logo/Imagen</label>
                        <div class="hovereffect">
                             <b-img fluid id="img" :src="this.imagen" alt=""></b-img>
                              <div class="overlay">
                                     <h2>Cambiar Imagen</h2>
                                    <a class="info" href="#" @click="Imagen()">
                                        <b-form-file horizontal id="imgfile" @change="cambiarImagen($event)" accept="image/*"  style="display:none">
                                        </b-form-file>
                                        Actualizar</a>
                                </div>  
                        </div>
                    </b-col>
                </b-row> 
                </Widget>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Widget 
                    title="<h5>Datos<span class='fw-semi-bold'> de Contribuyente</span></h5> "
                 customHeader
                >
                    <b-row class="mt-2">
                        <b-col cols="12">
                            <b-form-group>
                                <label for="">Nombre de Propietario / Sociedad</label>
                                <b-form-input type="text" 
                                :state="estados.nsociedad"
                                v-model="formulario.nsociedad" placeholder="Nombre"></b-form-input>
                            </b-form-group>
                            <b-row>
                                <b-col cols="6">
                                    <b-form-group>
                                        <label for="">NIT</label>
                                        <b-form-input type="text" 
                                        :state="estados.nit"
                                        v-model="formulario.nit" placeholder="XXX-XXXXX-XXX-XXX"></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="6">
                                    <label for="">NRC</label>
                                        <b-form-input type="text" 
                                        :state="estados.nrc"
                                        v-model="formulario.nrc" placeholder="XXXXX-XX"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-form-group>
                                <label for="">Giro Principal</label>
                                <b-form-input type="text" 
                                :state="estados.pgiro"
                                v-model="formulario.pgiro" placeholder="giro"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <label for="">Giro Secundario</label>
                                <b-form-input type="text" v-model="formulario.sgiro" placeholder="giro"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <label for="">Giro Terciario</label>
                                <b-form-input type="text" v-model="formulario.tgiro" placeholder="Nombre"></b-form-input>
                            </b-form-group>
                            
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
    
    name:'general',
    components:{Widget,Sparklines},
    data(){
        return {
            imagen:require('@/assets/camara.png'),
            imgnueva:0,
            ip:process.env.VUE_APP_BASE_URL,
            imgapi:false,
            formulario:{
                nombre:'',
                contribuyente:null,
                nsociedad:'',
                telefono:'',
                nit:'',
                nrc:'',
                pgiro:'',
                sgiro:'',
                tgiro:'',
                direccion:'',
                imagen:'',
                opcion:1,
            },
            estados:{
                nombre:null,
                contribuyente:null,
                nsociedad:null,
                telefono:null,
                nit:null,
                nrc:null,
                pgiro:null,
                sgiro:null,
                tgiro:null,
                direccion: null,
                imagen:null,             
            },
            opciones:[
                { value: 1, text: 'PEQUEÑO' },
                { value: 2, text: 'MEDIANO' },
                { value: 3, text: 'GRANDE' },
            ]
        }
    },
    methods:{
        Imagen(){
             document.getElementById('imgfile').click();

        },
        cambiarImagen(e){
            // eslint-disable-next-line no-console
           const archivo=e.target.files[0]
            if(archivo!=null){
                this.imagen=URL.createObjectURL(archivo)
                this.imgnueva++
            }else{
                this.imagen=require('@/assets/camara.png')
            }
        }, //cambia la imagen en el formulario
        ListarConfiguracion(){
            let ip=this.ip+'/api/v1.0/Configuracion/'
            axios.get(ip).then(response =>{
                let data=response.data 
                if(data.error>0){
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
                    let datos=data.response
                    // eslint-disable-next-line no-console
                    if(datos.length > 0){
                    datos.forEach(e => {
                        let element=JSON.parse(e.datos_generales)
                        this.formulario.nombre = element.nombre
                        this.opcion=element.contribuyente
                        this.formulario.nsociedad=element.propietario
                        this.formulario.nit = element.nit
                        this.formulario.nrc = element.nrc 
                        this.formulario.pgiro = element.pgiro
                        this.formulario.direccion = element.direccion
                        this.formulario.telefono = element.telefono
                        this.formulario.sgiro= element.sgiro
                       this.formulario.tgiro= element.tgiro
                       this.formulario.opcion = element.contribuyente
                        if(element.nombre_imagen !=null){
                           this.imagen=this.ip+'/static/'+element.nombre_imagen
                            this.imgapi=true
                        }else{
                            this.imagen=require('@/assets/camara.png')
                            this.imgapi=false
                        }
                        this.imgnueva=0   
                    })
                    }
                }

            }).catch(error =>{
                // eslint-disable-next-line no-console
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
        Guardar(){
            let campos=this.ValidarCampos() //validamos campos vacios
            if(!campos){
                // eslint-disable-next-line no-console
               this.errorAlert("Debes llenar los campos obligatorios")
               // si hay campos vacios emite alerta de advertencia 
            }else{
                if(this.imgnueva>0){
                    let img=document.getElementById('imgfile').files[0]
                    let reader = new FileReader(); //objecto para convertir la imagen a base64
                    let nombre=img.name
                    reader.onload =e => this.EnviarDatos(e.target.result,nombre) //evento asyncrono obtine la imagen
                    reader.readAsDataURL(img)    
                }else{
                    this.EnviarDatos(null,null)
                }
                
            }
        },
        ValidarCampos(){
            var respuesta = true 
            if (this.formulario.nombre.length > 0){
                respuesta = true 
                this.estados.nombre =null
            }else{
                respuesta = false
                this.estados.nombre = false
            }
            if(this.formulario.direccion.length > 0){
                respuesta =true
                this.estados.direccion=null
            }else{
                respuesta = false
                this.estados.direccion = false
            } 
            if(this.formulario.telefono.length > 0){
                respuesta = true
                this.estados.telefono = null
            }else{
                respuesta = false
                this.estados.telefono = false 
            }
            if(this.formulario.nsociedad.length > 0){
                respuesta = true 
                this.estados.nsociedad = null
            }else{
                respuesta = false
                this.estados.nsociedad = false
            }
            if(this.formulario.nit.length > 0){
                respuesta = true
                this.estados.nit = null
            }else{
                respuesta = false
                this.estados.nit = false
            }
            if(this.formulario.nrc.length > 0){
                respuesta = true
                this.estados.nrc = null
            }else{
                respuesta = false
                this.estados.nrc = false
            }
            if(this.formulario.pgiro.length > 0){
                respuesta = true
                this.estados.pgiro = null 
            }else{
                respuesta = false
                this.estados.pgiro = false
            }
            return respuesta
        },
        EnviarDatos(imagen,nombre){
             var img=null 

            if(imagen!=null){
                img=imagen.replace(/^data:image\/[a-z]+;base64,/, "")
            }
            var  datos={
                datos_generales:{
                    nombre:this.formulario.nombre.toUpperCase(),
                    contribuyente:this.formulario.opcion,
                    propietario:this.formulario.nsociedad.toUpperCase(),
                    nit:this.formulario.nit,
                    nrc:this.formulario.nrc,
                    pgiro:this.formulario.pgiro.toUpperCase(),
                    direccion:this.formulario.direccion.toUpperCase(),
                    telefono:this.formulario.telefono.toUpperCase(),
                    sgiro:this.formulario.sgiro.toUpperCase(),
                    tgiro:this.formulario.tgiro.toUpperCase(),
                    nombre_imagen:nombre,
                    cambio_imagen:this.imgnueva
                },
                imagen: img
            } 
            // eslint-disable-next-line no-console
            console.log(datos)
            const url = this.ip +'/api/v1.0/Configuracion/'
            axios.post(url ,datos)
            .then(response =>{
                const datos = response.data 
                if(datos.error > 0){
                    this.errorAlert(datos.response)
                }else{
                    this.successAlert(datos.response)
                    this.imgnueva =0
                    this.ListarConfiguracion()
                }

            }).catch(error =>{
                if(error.data){
                    var alerta = error.data
                    this.errorAlert(alerta.response)
                }else{
                    this.errorAlert(error)
                }
            })

        }

    },
    mounted(){
        this.ListarConfiguracion()
    }
}
</script>

<style lang="css">
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
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
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