<template>
  <transition enter-active-class="animate__fadeInDown" leave-active-class="animate__fadeOutDown">
    <router-view />
    </transition>
</template>
  
  

<script>
import 'animate.css'
export default {
  name: 'App',
  created() {
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem('authenticated') === 'false') {
      this.$router.push('/login');
    }

    if (currentPath === '/' || currentPath === '/app') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
