"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map;
var wayPointPin;
function GetMap() {
    var latStr = $("#Latitude").val();
    var longStr = $("#Longitude").val();
    var box = undefined;
    if (latStr !== '' && longStr !== '') {
        var lat = Number(latStr);
        var long = Number(longStr);
        box = Microsoft.Maps.LocationRect.fromEdges(lat + 0.001, long - 0.001, lat - 0.001, long + 0.001);
    }
    map = new Microsoft.Maps.Map('#myMap', {
        bounds: box
    });
    wayPointPin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long));
    map.entities.push(wayPointPin);
    Microsoft.Maps.Events.addHandler(map, 'click', addWaypoint);
}
function addWaypoint(e) {
    if (wayPointPin !== undefined)
        map.entities.remove(wayPointPin);
    var location = e.location;
    $("#Latitude").val(e.location.latitude.toString());
    $("#Longitude").val(e.location.longitude.toString());
    // Create a waypoint pushpin
    wayPointPin = new Microsoft.Maps.Pushpin(location);
    // Add the pushpin to the map
    map.entities.push(wayPointPin);
}
//# sourceMappingURL=EditTour.js.map