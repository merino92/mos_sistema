<template>
    <div id="lote">
        <b-row class="mb-2">
            <b-col>
                <b-button variant="primary" size="sm" class="float-right" 
                     v-b-toggle.colapso 
                v-b-tooltip.hover title="Despliega un formulario para que puedas editar o agregar lotes">
                    <span class="glyphicon glyphicon-chevron-down"></span>
                    Formulario
                </b-button>
            </b-col>
        </b-row>
       <b-collapse id="colapso" class="mt-2">
            <b-row>
                <b-col cols="5">
                    <b-form-group>
                        <label for=""># de Lote</label>
                        <b-form-input type="text"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group>
                        <label for="">Unidad</label>
                        <b-form-input type="number"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group>
                        <label for="">Fraccion</label>
                        <b-form-input type="number"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-form-group>
                         <label for="">Fecha de Fabricacion</label>
                       <date-picker></date-picker>
                    </b-form-group>
                </b-col>
            
            </b-row>
       </b-collapse>
    </div>
</template>

<script>
export default {
    name:'lote',
    data(){
        return{}
    }
}
</script>