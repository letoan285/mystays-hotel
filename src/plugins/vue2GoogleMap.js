import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs',
    libraries: 'places'
  }
})
