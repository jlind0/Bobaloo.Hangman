"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map;
var wayPointPin;
function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {});
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
//# sourceMappingURL=AddTour.js.map