<template>
    <div id="unidades">
        <b-row>
            <b-col>
                <b-button variant="primary" v-b-toggle.colapso  size="sm" class="float-right">
                    <span class="glyphicon glyphicon-chevron-down"></span>
                    Formulario
                </b-button>
            </b-col>
        </b-row>
        <b-collapse id="colapso" class="pt-2">
             <b-row>
            <b-col cols="3">
                <b-form-group>
                    <label for="">Tipo</label>
                    <b-form-select></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group>
                    <label for="">Nombre Unidad</label>
                    <b-form-input></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group>
                     <label for="">Cantidad</label>
                    <b-form-input type="number"></b-form-input>
                </b-form-group>
            </b-col>
            
        </b-row>
        <b-row>
            <b-col cols="4">
                <b-form-group>
                    <label for="">Precio</label>
                    <b-input-group prepend="$"
                    v-b-tooltip.hover title="">
                    <b-form-input  type="number"></b-form-input>
                </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="4">
                <b-button class="btn btn-success mt-4" >Agregar</b-button>
            </b-col>
        </b-row>
        
        </b-collapse>
        <b-row>
            <b-col>
                <div class="table table-responsive">
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Unidad</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody class="tbody"></tbody>
                    </table>
                </div>
            </b-col>
        </b-row>
        
    </div>
</template>
<script>

export default {
    name:'unidades',
    data(){
        return{}
    }    
}
</script>

<style lang="scss" scoped>
.tbody{
    height:200px !important;
    overflow-y:auto !important;
    width: 100% !important;
    }
</style>