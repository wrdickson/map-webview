<template>
  <v-container fluid>
    <div
      id="lmap"
      :style="{height: mapHeight}"
    />
  </v-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import s from './../assets/3207.js'
import _ from 'lodash'
export default {
  name: 'Map1',
  components: {
  },
  data: () => ({
    imageString: s,
    map: null,
    mapBBoxString: 'zzz',
    mapBounds: [],
    mapCenter: {
      lat: 38,
      lng: -109
    },
    mapZoom: 12,
    tileLayerTitle: '',
    wHeight: 400
  }),
  computed: {
    mapHeight: {
      get: function () {
        return String(this.wHeight - 28) + 'px'
        //  return window.innerWidth
      }
    }
  },
  created () {
    this.wHeight = window.innerHeight
    window.gImageString = 'empty image'
  },
  mounted () {
    window.onresize = () => {
      this.handleResize()
    }
    this.renderMap()
    window.imageObjects = []
    window.loadImageString = function (iString) {
      //  eslint-disable-next-line
      //  console.log("@loadImage()", iString)
      //  alert('loadImageString() fires', iString)
      window.gImageString = iString
      let iObj = JSON.parse(iString)
      let imageExists = _.find(window.imageObjects, {
        //  coords.x etc is int.  convert to string
        'x': iObj.x, 'y': iObj.y, 'z': iObj.z
      })
      if (!imageExists) {
        window.imageObjects.push(iObj)
      }
      if (window.imageObjects.length > 100) {
        window.imageObjects.shift()
      }
    }
  },
  methods: {
    handleResize () {
      this.wHeight = window.innerHeight
      if (this.map) {
        this.map.invalidateSize()
      }
    },
    renderMap () {
      L.TileLayer.Kitten = L.TileLayer.extend({
        createTile: (coords, done) => {
          var tile = new Image()
          //  call the function on android
          //  eslint-disable-next-line
          MapViewClient.loadTileString(JSON.stringify(coords))
          setTimeout(() => {
            //  find the object in the window array . . .
            //  eslint-disable-next-line
            console.log('window.imageObjects[0]', JSON.stringify(window.imageObjects[0]))
            //  eslint-disable-next-line
            console.log('coords.x', coords.x)
            //  eslint-disable-next-line
            console.log('length', window.imageObjects.length)
            let iObj = _.find(window.imageObjects, {
              //  coords.x etc is int.  convert to string
              'x': coords.x.toString(), 'y': coords.y.toString(), 'z': coords.z.toString()
            })
            tile.src = 'data:image/jpg;base64,' + iObj.i
            done(null, tile)// Syntax is 'done(error, tile)'
          }, 500)
          return tile
        }
      })
      //  eslint-disable-next-line
      var usgsTopo = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.jpg',{        
        attribution: 'lkjlkj',
        minZoom: 2,
        maxZoom: 15
      })
      //  eslint-disable-next-line
      var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      })

      //  eslint-disable-next-line
      var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      })
      //  eslint-disable-next-line
      var android = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      })
      this.map = L.map('lmap').setView(this.mapCenter, this.mapZoom)
      //  openTopoMap.addTo(this.map)
      //  android.addTo(this.map)

      L.tileLayer.kitten = function () {
        return new L.TileLayer.Kitten()
      }
      L.TileLayer.Kitten = new L.TileLayer.kitten()
      L.TileLayer.Kitten.addTo(this.map)
      this.mapBounds = this.map.getBounds()
      this.map.on('zoomend', () => {
        this.mapZoom = this.map.getZoom()
        this.mapBounds = this.map.getBounds()
      })
      this.map.on('moveend', () => {
        this.mapBounds = this.map.getBounds()
      })
    }
  }
}
</script>

<style scoped>
  #lmap{
    width: 100%;
  }
</style>
