<template>
  <div>
    <v-row
      no-gutters
    >
      <v-col>
        <span>RootA: {{ rootA }}</span>
        <v-btn
          @click="btn1Click"
          class="mt-2"
        >
          <v-icon>mdi-home</v-icon>
          btn1
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
          v-model="mapZoom"
          label="Zoom"
          class="pt-2"
          outlined
          dense
        />
      </v-col>
      <v-col>
        <v-select
          v-model="selectMinZoom"
          :style="{zIndex: 2000}"
          class="pt-2 z-top"
          :items="selectMinZoomItems"
          label="Min"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="selectMaxZoom"
          :style="{zIndex: 2000}"
          class="pt-2 z-top"
          :items="selectMaxZoomItems"
          label="Max"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col>
        <v-text-field
          v-model="tileLayerTitle"
          class="pt-2"
          label="Enter tile layer title"
          dense
          outlined
        />
      </v-col>
      <v-col>
        <v-btn
          v-if="tileLayerTitle"
          @click="sendTileRequest"
          class="mt-2"
        >
          Send Request
        </v-btn>
      </v-col>
    </v-row>
    <div
      id="lmap"
      :style="{height: mapHeight}"
    >
      something
    </div>
  </div>
</template>

<script>

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
export default {
  name: 'TileRip1',
  components: {

  },
  data: () => ({
    map: null,
    mapBBoxString: '',
    mapBounds: [],
    mapCenter: {
      lat: 38,
      lng: -109
    },
    mapZoom: 12,
    selectMinZoom: 12,
    selectMinZoomItems: [11, 12, 13, 14, 15],
    selectMaxZoom: 15,
    selectMaxZoomItems: [11, 12, 13, 14, 15],
    tileLayerTitle: '',
    wHeight: 400
  }),
  computed: {
    boundsObj: {
      get: function () {
        let boundsObj = {
          ne_lat: this.mapBounds._northEast.lat,
          ne_lng: this.mapBounds._northEast.lng,
          sw_lat: this.mapBounds._southWest.lat,
          sw_lng: this.mapBounds._southWest.lng
        }
        return boundsObj
      }
    },
    mapHeight: {
      get: function () {
        return String(this.wHeight - 250) + 'px'
        //  return window.innerWidth
      }
    },
    rootA: {
      get: function () {
        return this.$root.a
      }
    }
  },
  created () {
    this.wHeight = window.innerHeight
    //  eslint-disable-next-line
    console.log('root', this.$root)
  },
  mounted () {
    window.onresize = () => {
      this.handleResize()
    }
    this.renderMap()
  },
  methods: {
    btn1Click () {
      //  eslint-disable-next-line
      console.log('button1Click()')
      //  eslint-disable-next-line
      MapClient.button1Click('from web meng!')
    },
    handleResize () {
      this.wHeight = window.innerHeight
      if (this.map) {
        this.map.invalidateSize()
      }
    },
    renderMap () {
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
      this.map = L.map('lmap').setView(this.mapCenter, this.mapZoom)
      openTopoMap.addTo(this.map)
      this.mapBounds = this.map.getBounds()
      this.map.on('zoomend', () => {
        this.mapZoom = this.map.getZoom()
        this.mapBounds = this.map.getBounds()
      })
      this.map.on('moveend', () => {
        this.mapBounds = this.map.getBounds()
      })
    },
    sendTileRequest () {
      let requestObj = {
        maxZoom: this.selectMaxZoom,
        minZoom: this.selectMinZoom,
        neLat: this.boundsObj.ne_lat,
        neLng: this.boundsObj.ne_lng,
        swLat: this.boundsObj.sw_lat,
        swLng: this.boundsObj.sw_lng,
        title: this.tileLayerTitle
      }
      //  eslint-disable-next-line
      console.log('requestObj', requestObj)
      //  eslint-disable-next-line
      MapClient.tileRequest(JSON.stringify(requestObj))
    }
  }
}
</script>

<style scoped>
  .container{
    padding: 0px;
  }
  #lmap{
    width: 100%;
  }
  z-top{
    z-index: 2000 !important;
  }
</style>
