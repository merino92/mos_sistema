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
                <b-col cols="4">
                    <b-form-group>
                         <label for="">Fecha de Fabricacion</label>
                        <b-form-datepicker id="example-datepicker" class="mb-2" 
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                        ></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group>
                         <label for="">Fecha de Vencimiento</label>
                        <b-form-datepicker id="example-datepicker1" class="mb-2"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="es"
                        ></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group>
                        <label for=""></label>
                        <b-button variant="success">Agregar</b-button>
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