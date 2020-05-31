<template>
    <div id="impuesto">
        <h1 class="page-title">
            <span class="fw-semi-bold">Configuracion de Impuestos</span>
        </h1>
        <b-row>
            <b-col sm="12" md="6" lg="6">
                <Widget
                 title="<h5>Impuestos <span class='fw-semi-bold'>Generales</span></h5> "
                 customHeader
                >
                <b-row class="mt-2">
                    <b-col cols="6">
                        <b-form-group>
                            <label for="">IVA</label>
                            <b-input-group append="%">
                                <b-form-input type="number"></b-form-input>
                            </b-input-group>  
                        </b-form-group>
                        <b-form-group>
                            <label for="">CESC</label>
                            <b-input-group append="%">
                                <b-form-input type="number"></b-form-input>
                            </b-input-group>  
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group>
                            <label for="">RETENCION</label>
                            <b-input-group append="%">
                                <b-form-input type="number"></b-form-input>
                            </b-input-group>  
                        </b-form-group>
                        <b-form-group>
                            <label for="">COTRAM</label>
                            <b-input-group append="%">
                                <b-form-input type="number"></b-form-input>
                            </b-input-group>  
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button class="btn btn-info float-right">
                        <span class="glyphicon glyphicon-repeat"></span>
                         Actualizar    
                        </b-button>
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
        }
    }
}
</script>
<style>
    .glyphicon {
     vertical-align: top !important; 
    }

</style>