
/// <amd-dependency path="./knockout/ol3MapBindingHandler"/>




import ol = require("ol3");
import ko = require("knockout");
import LocationService = require("services/LocationService");
import OlBorderMoveInteraction = require("./OlBorderMoveInteraction");
import TweenMax = require("greensock/TweenMax");
import Back = require("greensock/Back");
import Bounce = require("greensock/Bounce");
import TimelineLite = require("greensock/TimelineLite");
import Circ = require("greensock/Circ");



class App {

    map: KnockoutObservable<ol.Map>;
    constructor() {
 
       var layers = [new ol.layer.Tile({
           source: new ol.source.BingMaps({
               imagerySet: 'Aerial',
               maxZoom: 19,
           })
        })];

        var map = new ol.Map({
            controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
            interactions: ol.interaction.defaults({}),
            layers: layers,
            view: new ol.View({
                center: [0, 0],
                zoom: 14
            })
       });
        var loc = new LocationService();
        loc.getBrowserLocation().done(pos => {

            map.getView().setCenter(pos);

        })

       
        this.map = ko.observable(map);     
        var moveBorder = new OlBorderMoveInteraction({map : this.map()});

        setTimeout(() => {
            this.setupMenu();
        }, 1000);
    }
    show3d() {
        require(["ol3cesium","cesium"], (olcs,Cesium)=> {
            console.log(olcs);
            var ol3d = new olcs.OLCesium({ map: this.map() });
            ol3d.warmUp(0, 5000);
            var scene = ol3d.getCesiumScene();
            var terrainProvider = new Cesium.CesiumTerrainProvider({
                url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
            });
            scene.terrainProvider = terrainProvider;
            setTimeout(() => {
                ol3d.setEnabled(true);
            }, 3500);
        });
    }
    setupMenu() {
        var svg = document.getElementById('menu'),
            items = svg.querySelectorAll('.item'),
            trigger = document.getElementById('trigger'),
            label = <HTMLLabelElement>trigger.querySelectorAll('#label')[0],
            open = false,
            angle = 45;

        //set up event handler
        trigger.addEventListener('click', toggleMenu, false);
        // svg.style.pointerEvents = "none";

        //toggle menu when trigger is clicked
        function toggleMenu(event) {
            if (!event) event = window.event;

            event.stopPropagation();
            open = !open;
            if (open) {
                var tl = new TimelineLite();
                tl.to(items, 0.2, { scale: 1, ease: Back.easeOut.config(4) }, 0.05);
                for (var i = 0; i < items.length; i++) {
                    tl.to(items[i], 0.7, { rotation: -i * angle + "deg", ease: Bounce.easeOut }, 0.35);
                }
                label.innerHTML = "-";
                svg.style.pointerEvents = "auto";
            } else {
                var tl = new TimelineLite();
                for (var i = 0; i < items.length; i++) {
                    tl.to(items[i], 0.3, { rotation: 0, ease: Circ.easeOut }, 0.05);
                }
                tl.to(items, .3, { scale: 0, ease: Back.easeIn }, 0.3);
                label.innerHTML = "+";
                svg.style.pointerEvents = "none";
            }

        }

        svg.onclick = function (e) {
            e.stopPropagation();
        }
        //close the nav when document is clicked
        document.onclick = function () {
            open = false;
            var tl = new TimelineLite();
            for (var i = 0; i < items.length; i++) {
                tl.to(items[i], 0.3, { rotation: 0, ease: Circ.easeOut }, 0.05);
            }
            tl.to(items, .3, { scale: 0, ease: Back.easeIn }, 0.3);
            label.innerHTML = "+";
            svg.style.pointerEvents = "none";
        };
    }


   

}

export = App; 