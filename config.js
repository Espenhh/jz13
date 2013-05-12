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
        "js/main.js"
      ]
    },

    css: {
      all: [
        "css/reset.css",
        "css/font-awesome.css",
        "css/images.css",
        "css/helpers.css",
        "css/screen.css"
      ]
    }

  }

};
