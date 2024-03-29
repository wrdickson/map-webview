module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      // don't use the wildcard '/' here . . huge fucking problem
      // in development with firefox complaining that a sockjs connection timed out?????
      // hours of time wasted on this one
      //  if i use the wildcard, manual refreshed don't work . . makes sense since it is
      //  trying to reroute everything
      '/api': {
        //  this is my localhost backend, WAMP style
        target: 'http://localhost:80',
        // i think this is what fixes it
        ws: false,
      }
    },
    //  no, i think this is the key to the 'failure to load ...sock.js' repeating error
    //  And . . . this will cause the sock.js error if the cli serves it up
    //  on localhost:8081 or whatever
    public: 'http://localhost:8080'
  },
  //  needed for vuetify on IE, Edge
  'transpileDependencies': [
    'vuetify'
  ],
  //  use to deploy to local machine
  //  publicPath: '/map-webview/dist/'

  //  use for development
  //  publicPath: '/'

  //  use to deploy to mto live server @ example.com/map-webview/
  //  publicPath: '/map-webview/'

  //  use for android webviews to run offline
   publicPath: ''
}