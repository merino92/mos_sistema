<template>
    <div id="impuesto">
        <h1 class="page-title">
            <span class="fw-semi-bold">Configuracion de Impuestos</span>
        </h1>
        <b-row>
            <b-col cols=12>
                <b-button class="btn btn-info float-right"
                        @click="actualizarImpuestos()"
                        >
                    <span class="glyphicon icono glyphicon-repeat"></span>
                    Actualizar    
                </b-button>
            </b-col>
        </b-row>
        <b-row class="mt-4">
            <b-col sm="12" md="3" lg="3">
                <Widget title="<h5>I<span class='fw-semi-bold'>va</span></h5> "
                 customHeader>
                    <b-row class="mt-2">
                        <b-col cols="8"  md="8" sm="8">
                            <b-form-group>
                            <b-input-group append="%">
                                <b-form-input :state="formState.iva" v-model="impuestos.iva" type="number"></b-form-input>
                            </b-input-group>  
                        </b-form-group>
                        </b-col>
                    </b-row>
                 </Widget>
            </b-col>
            <b-col sm="12" md="3">
                 <Widget
                     title="<h5>CE<span class='fw-semi-bold'>SC</span></h5> "
                 customHeader
                 >
                     <b-row class="mt-2">
                         <b-col cols="8"  md="8" sm="8">
                             <b-form-group>
                               
                                <b-input-group append="%">
                                    <b-form-input :state="formState.cesc" v-model="impuestos.cesc" type="number"></b-form-input>
                                </b-input-group>  
                            </b-form-group>
                         </b-col>
                     </b-row>
                 </Widget>
            </b-col>
            <b-col sm="12" md="3">
                 <Widget 
                     title="<h5>RETEN<span class='fw-semi-bold'>CION</span></h5> "
                 customHeader
                 >
                     <b-row class="mt-2">
                         <b-col cols="8"  md="8" sm="8">
                            <b-form-group>
                               
                                <b-input-group append="%">
                                    <b-form-input :state="formState.retencion" v-model="impuestos.retencion" type="number"></b-form-input>
                                </b-input-group>  
                             </b-form-group>
                         </b-col>
                     </b-row>
                 </Widget>
            </b-col>
            <b-col sm="12" md="3">
                 <Widget
                     title="<h5>COT<span class='fw-semi-bold'>RAM</span></h5> "
                 customHeader
                 >
                     <b-row class="mt-2">
                         <b-col cols="8"  md="8" sm="8">
                            <b-form-group>
                                <b-input-group append="%">
                                    <b-form-input :state="formState.cotram" v-model="impuestos.cotram" type="number"></b-form-input>
                                </b-input-group>  
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
    
    name:'impuesto',
    components:{Widget,Sparklines},
    data(){
        return {
            imagen:require('@/assets/camara.png'),
            ip:process.env.VUE_APP_BASE_URL,
            impuestos:{
                cesc:0,
                cotram:0,
                iva:0,
                retencion:0
            }, //sirven para obtener los valores de los imputs
            formState:{
                cecs:null,
                cotram:null,
                iva:null,
                retencion:null
            }//sirven para validar los campos 
        }  
    },
    methods:{
        listarImpuestos(){
                const url=this.ip+'/api/v1.0/Configuracion/1/ListarImpuestos/'
                axios.get(url).then(response =>{
                    const res=response.data
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
                        var inp=res.response
                        this.impuestos.cesc=inp.cesc
                        this.impuestos.iva=inp.iva
                        this.impuestos.cotram=inp.cotran
                        this.impuestos.retencion=inp.retencion    
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
        },//termina listar impuestos
        actualizarImpuestos(){
            const vacio=this.validarPorcentajes()
            if(vacio){
                const url =this.ip+'/api/v1.0/Configuracion/1/UpdateImpuestos/'
                const datos={
                    iva:this.impuestos.iva,
                    cesc:this.impuestos.cesc,
                    cotran:this.impuestos.cotram,
                    retencion:this.impuestos.retencion
                }
                axios.post(url,datos).then(response =>{
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
                        this.formState.iva=null
                        this.formState.cesc=null
                        this.formState.cotram=null
                        this.formState.retencion=null
                        this.listarImpuestos()
                        this.$toasted.success('Impuestos Actualizados', {
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

            }else{
                this.$toasted.error('Error: los valores no puede ser mayor a 100 ni negativos', {
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
        validarPorcentajes(){
            var res=true
            if(this.impuestos.iva <= 0){
                this.formState.iva=false
                res=false
            }else if( this.impuestos.iva >100){
                this.formState.iva=false
                res-false
            }else{
                this.formState.iva=true
                res=true
            }
            if(this.impuestos.cesc <= 0){
                this.formState.cesc=false
                res=false
            }else if( this.impuestos.cesc >100){
                this.formState.cesc=false
                res-false
            }else{
                this.formState.cesc=true
                res=true
            }
            if(this.impuestos.cotram <= 0){
                this.formState.cotram=false
                res=false
            }else if( this.impuestos.cotram >100){
                this.formState.cotram=false
                res-false
            }else{
                this.formState.cotram=true
                res=true
            }
            if(this.impuestos.retencion <= 0){
                this.formState.retencion=false
                res=false
            }else if( this.impuestos.retencion >100){
                this.formState.retencion=false
                res-false
            }else{
                this.formState.retencion=true
                res=true
            }
           return res
        }

    },
    mounted(){
        this.listarImpuestos()
    }
}
</script>
<style scoped>

    .icono {
     vertical-align: top !important; 
    }

</style>