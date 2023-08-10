/// <reference path="../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
/// <reference path="../node_modules/@types/jquery/JQuery.d.ts" />
export { }
    var map: Microsoft.Maps.Map;
    var wayPointPin: Microsoft.Maps.Pushpin;
function GetMap() {

    var latStr = $("#Latitude").val();
    var longStr = $("#Longitude").val();
    var box: Microsoft.Maps.LocationRect = undefined;
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