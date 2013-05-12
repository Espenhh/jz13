/*global exports */

exports.config = {

  ignore_build: ["components"],

  assets: {

    js: {
      all: [
        "components/es5-shim/es5-shim.js",
        "components/es5-shim/es5-sham.js",
        "components/json3/lib/json3.js",
        "components/underscore/underscore.js",
        "components/underscore.string/lib/underscore.string.js",
        "components/eventemitter2/lib/eventemitter2.js",
        "components/dispatch/dispatch.js",
        "components/jquery/jquery.js",
        "assets/js/main.js"
      ]
    },

    css: {
      all: [
        "assets/css/reset.css",
        "assets/css/font-awesome.css",
        "assets/css/images.css",
        "assets/css/helpers.css",
        "assets/css/screen.css"
      ]
    }

  }

};
