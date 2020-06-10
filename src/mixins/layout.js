import config from '../config';

export default {
    data: () => {
        return {
            appConfig: config.app,
        }
    },
  methods: {
    decodeHtml(html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    errorAlert(mensaje){
      return this.$toasted.error('Error:'+mensaje, {
        position: 'top-center',
        action: {
        text: 'cerrar',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
        }
    })
    },
    successAlert(mensaje){
      return this.$toasted.success(mensaje, {
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
  
};
