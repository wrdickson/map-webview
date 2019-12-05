<template>
  <v-app>
    <v-content>
      <v-btn
        @click="currentView = ''"
        color="indigo lighten-4"
        small
      >
        Clear
      </v-btn>
      <v-btn
        @click="currentView = 'tileRip1'"
        color="indigo lighten-4"
        small
      >
        TileRip1
      </v-btn>
      <TileRip1
        v-if="currentView === 'tileRip1'"
      />
    </v-content>
  </v-app>
</template>

<script>
import TileRip1 from './components/tileRip1.vue'
export default {
  name: 'App',
  components: {
    TileRip1
  },
  data: function () {
    return {
      currentView: ''

    }
  },
  computed: {

  },
  methods: {

  },
  created () {
    window.toggleView = (action, payload) => {
      //  eslint-disable-next-line
      console.log('toggleView() - action: ', action, ' payload: ', payload)
      switch (action) {
        case 'toggleView':
          switch (payload) {
            case 'tileRip1':
              this.currentView = 'tileRip1'
              break
          }
          break
      }
    }
  },
  mounted () {
    //  let android know when the app is mounted
    let somePayload = 'somePayload'
    //  eslint-disable-next-line
    MapWebViewClient.appLoaded(somePayload)
  }
}
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>

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
