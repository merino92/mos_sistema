<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app/dashboard">
       
         <span class="primary-word">
         
        <b-img :src="require('@/assets/Artemisa.png')" class="img" >
        </b-img>
           
               Artemisa</span>
      
        
        </router-link>
      </header>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Inicio"
            link="/app/dashboard"
            iconName="fi flaticon-home"
            index="inicio"
            isHeader
        />
        <NavLink 
            :activeItem="activeItem"
            header="Compras"
            link="/compras/compra"
            iconName="fa fa-truck"
            index="compras"
            :childrenLinks="[
              { header: 'Compras', link: '/compras/general' },
              { header: 'Proveedores', link: '/compras/compra/proveedor' },
              { header: 'Lineas', link: '/compras/compra/linea' },
              { header: 'Sublineas', link: '/compras/compra/sublinea' },
            ]"/>
            <NavLink
            :activeItem="activeItem"
            header="Ventas"
            link="/ventas"
            iconName="glyphicon glyphicon-shopping-cart"
            index="ventas"
            :childrenLinks="[
              { header: 'Venta', link: '/app/components/charts' },
              { header: 'Facturacion', link: '/app/components/icons' },
              { header: 'Cierre Diario', link: '/app/components/maps' },
            ]"
        />
         <NavLink
            :activeItem="activeItem"
            header="Inventario"
            link="/inventario"
            iconName="glyphicon glyphicon-list-alt"
            index="inventario"
            :childrenLinks="[
              { header: 'Inventario', link: '/inventario/producto' },
              { header: 'Kardex', link: '/inventario/kardex'},
              { header: 'Ajuste Inventario', link: '/app/components/maps' },
            ]"
        />
       <!--- <NavLink
            :activeItem="activeItem"
            header="Components"
            link="/app/components"
            iconName="fi flaticon-network"
            index="components"
            :childrenLinks="[
              { header: 'Charts', link: '/app/components/charts' },
              { header: 'Icons', link: '/app/components/icons' },
              { header: 'Maps', link: '/app/components/maps' },
            ]"
        />--->
        <NavLink
          :activeItem="activeItem"
          header="Seguridad"
          link="/seguridad"
          iconName="glyphicon glyphicon-glyph-lock"
          index="seguridad"
          :childrenLinks="[
            {header:' Usuarios',link:'/configuracion/general'},  
             {header:'Perfiles Usuarios',link:'/configuracion/impuestos'}  
          ]"
        />
        <NavLink
          :activeItem="activeItem"
          header="Configuracion"
          link="/configuracion"
          iconName="glyphicon glyphicon-cog"
          index="configuracion"
          :childrenLinks="[
            {header:' Datos Generales',link:'/configuracion/general'},  
             {header:'Config. Impuestos',link:'/configuracion/impuestos'}  
          ]"
        />

      </ul>
     
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
