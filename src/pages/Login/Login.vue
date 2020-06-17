<template>
  <div class="auth-page">
    <b-container>
     
      <Widget class="widget-auth mx-auto hola" title="" customHeader>
           <b-img :src="this.image" fluid alt="Fluid image"></b-img>
        <p class="widget-auth-info mt-2">
            Usa tu usuario y clave para acceder
        </p>
        <form class="mt mt-5" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" v-model="usuario" ref="text" required type="text" name="email" placeholder="Usuario" />
          </div>
          <div class="form-group">
            <input class="form-control md no-border" ref="password" v-model="pass" required type="password" name="password" placeholder="Password" />
          </div>
          <b-button type="submit" size="md" class="auth-btn  mb-3" variant="success">Ingresar</b-button>   
          <b-col class="mb-5"></b-col> 
        </form>
        <p class="widget-auth-info">
          No tienes una cuenta?
        </p>
        <router-link class="d-block text-center"  to="login"> <div>Crear una</div></router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2020 &copy; Artemisa porwer by MOS Tecnology.
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import Sparklines from '@/components/Sparklines/Sparklines'
export default {
  name: 'LoginPage',
  components: { Widget,Sparklines },
  data() {
    return {
      errorMessage: null,
      image:require('@/assets/logo.png'),
      usuario:'',
      pass:''
    };
  },
  methods: {
    login() {
      const email = this.usuario
      const password = this.pass

      if (email.length !== 0 && password.length !== 0) {
        window.localStorage.setItem('authenticated', true)
        this.$router.push('/app/dashboard')
      }else{
        this.errorAlert('Usuario o clave invalido')
      }
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/main/analytics');
    }
  },
  alerta(){
    // eslint-disable-next-line no-console
    console.log('entra')
    this.$toasted.error('Error:', {
                                    position: 'top-center',
                                    action: {
                                            text: 'cerrar',
                                            onClick: (e, toastObject) => {
                                                toastObject.goAway(0);
                                            }
                                            }
                                        })
  }
};
</script>

<style lang="scss" scoped>
  $text-color: #002b49 !default;
  $titulo-color:#ecfaec !default;
    .hola{
      background-color : $text-color;
    }
    .title{
      margin-top: 0;
      color:$titulo-color;
    }
</style>