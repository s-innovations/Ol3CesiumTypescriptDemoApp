import ol = require("ol3");
var wgs84Sphere = new ol.Sphere(6378137);

/**
 * format length output
 * @param {ol.geom.Polygon} polygon
 * @return {string}
 */
export function formatArea(map: ol.Map, polygon: ol.geom.Polygon, geodesic = true) {
    var a = area(map, polygon, geodesic);
    var output;
    if (a > 100000) {
        output = (Math.round(a / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(a * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
    }
    return output;
};
export function area(map: ol.Map, polygon: ol.geom.Polygon, geodesic = true) {
    var area;
    if (geodesic) {
        var sourceProj = map.getView().getProjection();
        var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
            sourceProj, 'EPSG:4326'));
        var coordinates = geom.getLinearRing(0).getCoordinates();
        area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
    } else {
        area = polygon.getArea();
    }
    return area;
};

/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
export function formatLength(map: ol.Map, line: ol.geom.LineString, geodesic = true) {
    var l = length(map, line, geodesic);
    var output;
    if (l > 1000) {
        output = (Math.round(l / 1000 * 100) / 100) +
        ' ' + 'km';
    } else {
        output = (Math.round(l * 100) / 100) +
        ' ' + 'm';
    }
    return output;
};
export function length(map: ol.Map, line: ol.geom.LineString, geodesic = true) {
    var length;
    if (geodesic) {
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
        }
    } else {
        length = Math.round(line.getLength() * 100) / 100;
    }
    return length;
}; 