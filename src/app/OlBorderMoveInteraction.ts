
import $ = require("jquery");
import ol = require("ol3");
import ko = require("knockout");

class OlBorderMoveInteraction {

    constructor(opt: { map: ol.Map }) {
        var timeout = null, olddir = null, canRun = false;
        var dirs = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

        $(opt.map.getViewport()).mouseleave(() => { canRun = false; });
        $(opt.map.getViewport()).mouseenter(() => { setTimeout(() => canRun = true, 25) });

        var borderProcent = 0.05;
        var borderScale = 6;
        var borderProcent3 = 0.05 * 6;
        var borderProcentInverse = 1 - borderProcent;
        var borderProcentInverse3 = 1 - borderProcent * 6;
        var sqrt2 = 1.4142135623730951;
        var half = 0.5;

        var _start = new Date().getTime();
        var _dx = ko.observable(0.5);
        var _dy = ko.observable(0.5);
        var _dispatcher = ko.observable(0);
        var _timer = null;

        var _m = ko.computed(() => {
            var dx = _dx();
            var dy = _dy();
            var dir = dirs[(dx < borderProcent ? 0 : (dx > borderProcentInverse ? 2 : 1))][(dy < borderProcent ? 0 : (dy > borderProcentInverse ? 2 : 1))];

            if (dir !== dirs[1][1]) {

                var ddx = (dx < borderProcent3 ? -1 : (dx > borderProcentInverse3 ? 1 : 0)) * (1 - (half - Math.abs(dx - half)) / borderProcent3);
                var ddy = (dy < borderProcent3 ? -1 : (dy > borderProcentInverse3 ? 1 : 0)) * (1 - (half - Math.abs(dy - half)) / borderProcent3);

                var norm = Math.sqrt(ddx * ddx + ddy * ddy);

                ddx /= norm / (opt.map.getView().getResolution() * 2);
                ddy /= norm / (opt.map.getView().getResolution() * 2);


                ddx = ddx > 0 ? Math.min(64, ddx) : Math.max(-64, ddx);
                ddy = ddy > 0 ? Math.min(64, ddy) : Math.max(-64, ddy);



                if ((ddx !== 0 || ddy !== 0)) {
                    if (!_timer) {
                        _timer = setInterval(() => _dispatcher(new Date().getTime()), 25);
                    }
                } else {
                    clearInterval(_timer);
                    _timer = null;
                }
                return [ddx, ddy];

            }
        }).extend({ rateLimit: 250 });


        ko.computed(() => {
            var v = _m.peek();
            var dispatcher = _dispatcher();
            if (!canRun) {
                clearInterval(_timer);
                _timer = null;
            }
            if (v) {
                //    console.log(["b", new Date().getTime() - _start, v[0], v[1]]);

                if (v[0] + v[1] !== 0) {
                    var center = opt.map.getView().getCenter();
                    center[0] += v[0];
                    center[1] -= v[1];

                    opt.map.getView().setCenter(center);
                }
            }

        });

        opt.map.on('pointermove',(evt: ol.MapBrowserEvent) => {
            if (!canRun) {
                return;
            }

            var size = opt.map.getSize();
            var dx = evt.pixel[0] / size[0];
            var dy = evt.pixel[1] / size[1];
            _dx(dx); _dy(dy);
        }, this);
    }
} 
export = OlBorderMoveInteraction;