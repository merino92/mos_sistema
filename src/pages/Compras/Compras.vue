<template>
    <div id="compras">
         <h1 class="page-title">
            <span class="fw-semi-bold">Compras Generales</span>
        </h1>
        <b-row>
            <b-col>
                <Widget
                    title="<h5>Compras<span class='fw-semi-bold'> Generales</span></h5> "
                    customHeader
                >
                <b-row>
                    <b-col>
                         <b-button class="btn btn-success float-right" @click="limpiar(),$bvModal.show('modal'),nuevo=true,edicion=false, precios_lotes=true,bloqueado=false"
                        
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
                                <template v-slot:prepend >
                                <b-input-group-text>
                                    <span class="fa fa-barcode" ></span>
                                </b-input-group-text>
                            </template>
                            <b-form-input placeholder="N Documento" type="text" ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>    
                    <b-col cols="3" >
                        <b-form-group>
                           <b-form-datepicker  
                          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                          class="mb-2"></b-form-datepicker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group>
                           <b-form-datepicker  
                          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                          class="mb-2"></b-form-datepicker>
                        </b-form-group>
                    </b-col>
                    
                </b-row>
                <b-row>
                     <b-col cols="4">
                          <b-form-group>
                                            
                                            <b-form-select 
                                            
                                             ></b-form-select>
                                        </b-form-group>
                     </b-col>
                     <b-col cols="2">
                        <b-button variant="info" >Buscar</b-button>
                    </b-col>
                </b-row>
                </Widget>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget'
export default {
    name:'compras',
    components:{Widget},
    data(){
        return{}
    }
}
</script>