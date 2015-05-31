
var gs = window["GreenSockGlobals"] = {};
var GreenSockAMDPath = "greensock";

require.config({
    baseUrl: '',
    urlArgs: '',
    shim: {
        "ol3cesium": {
            deps: ["cesium", "ol3"],
            exports: 'olcs'
        },
        "ol3": {
            deps: ["proj4", "css!libs/ol3/3.5.0/ol.css"],
         //   "exports": "ol"
        },
        "knockout-es5": {
            deps:["knockout"]
        },
        "cesium": {
            exports: "Cesium",
            deps: [
                "css!/libs/cesium/1.9.0/Widgets/widgets.css",
            ]
        },
      
       
    },
    bundles: {
        "greensock": [
            "greensock/TweenMax",
            "greensock/Back",
            "greensock/Bounce",   
            "greensock/Circ",               
            "greensock/TimelineMax",
            "greensock/TweenLite",
            "greensock/TimelineLite",
            "greensock/DirectionalRotationPlugin",
            "greensock/EasePack",
            "greensock/CSSPlugin",
            "greensock/RoundPropsPlugin",
            "greensock/BezierPlugin",
            "greensock/AttrPlugin"
        ],
    },
    paths: {
        "ol3cesium": "/libs/ol3cesium/1.5.0/ol3cesium",
        "cesium": "/libs/cesium/1.9.0/Cesium",
        "proj4": "libs/proj4/2.3.6/proj4",
        "knockout": "libs/knockout/3.3.0/knockout-latest",
        "ol3": "libs/ol3/3.5.0/ol",
        "css": "libs/require-css/0.1.8/css.min",
        "jquery": "//code.jquery.com/jquery-2.1.4.min",
        "knockout-es5": "libs/knockout-es5/0.1.1/knockout-es5.min",
        "greensock": "//cdnjs.cloudflare.com/ajax/libs/gsap/1.16.0/TweenMax.min"
    }
});


require(["knockout-es5","app/AppLoader"],(ko, loader: IAppLoader )=> {
 
    ko.applyBindings(loader.getApplicationModel());
});