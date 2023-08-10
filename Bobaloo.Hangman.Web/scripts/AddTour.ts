/// <reference path="../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
/// <reference path="../node_modules/@types/jquery/JQuery.d.ts" />
export { }
var map: Microsoft.Maps.Map;
var wayPointPin: Microsoft.Maps.Pushpin;
function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {

    });
    Microsoft.Maps.Events.addHandler(map, 'click', addWaypoint);
}
function addWaypoint(e: Microsoft.Maps.IMouseEventArgs) {
    if (wayPointPin !== undefined)
        map.entities.remove(wayPointPin);

    const location = e.location;
    $("#Latitude").val(e.location.latitude.toString());
    $("#Longitude").val(e.location.longitude.toString());
    // Create a waypoint pushpin
    wayPointPin = new Microsoft.Maps.Pushpin(location);

    // Add the pushpin to the map
    map.entities.push(wayPointPin);
}
