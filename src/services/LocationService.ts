

import $ = require("jquery");
import ol = require("ol3");

class LocationService {
    constructor() {

    }

    getBrowserLocation(proj: string = 'EPSG:3857') {
        var deferred = $.Deferred();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (proj === 'EPSG:4326')
                    return [position.coords.longitude, position.coords.latitude];
                else {
                    
                        deferred.resolve(
                            ol.proj.transform([position.coords.longitude, position.coords.latitude],
                                'EPSG:4326', proj));

                 
                }

            });
        } else {
            deferred.reject();
        }
        return deferred.promise();
    }
}

export = LocationService;  