import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';



// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';
//paginas del sistema
import Proveedor from '@/pages/Proveedores/Proveedor';
import Linea from '@/pages/Lineas/Lineas';
import Sublinea from '@/pages/Sublineas/Sublineas';
import General from '@/pages/General/General';
import Impuestos from '@/pages/Impuestos/Impuestos';
import Inventario from '@/pages/Inventario/Inventario';
import Kardex from '@/pages/Kardex/Kardex'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: General,
        },
      ],
    },
    {
      path:'/compras',
      name:'Compras',
      component:Layout,
      children:[
        {
          path:'compra/proveedor',
          name:'Proveedor',
          component: Proveedor
        },
        {
          path:'compra/linea',
          name:'Linea',
          component: Linea
        },
        {
          path:'compra/sublinea',
          name:'Sublinea',
          component:Sublinea
        }
      ]
    },
    {
      path:"/configuracion",
      name:'Configuracion',
      component:Layout,
      children:[
        {
          path:'general',
          name:'General',
          component: General
        },
        {
          path:'impuestos',
          name:'Impuestos',
          component:Impuestos
        }
      ]
    },
    {
      path:'/inventario',
      name:'Inventario',
      component:Layout,
      children:[
        {
          path:'inventario',
          name:'Inventario',
          component:Inventario
        },
        { path:'kardex',
          name:'Kardex',
          component:Kardex
        }
      ]
    }
  ],
});
