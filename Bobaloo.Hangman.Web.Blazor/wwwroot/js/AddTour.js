var map;
var wayPointPin;
var dotNetObject;
function mapIsReady() {
    if (dotNetObject === undefined)
        setTimeout(mapIsReady, 500);
    else
        dotNetObject.invokeMethodAsync("ConfigureMap");
}
function GetMapForAddTour() {
    map = new Microsoft.Maps.Map('#myMap', {});
    Microsoft.Maps.Events.addHandler(map, 'click', addWaypoint);
}
function SetDotNetObject(dno) {
    dotNetObject = dno;
}
function GetMapForEditTour() {
    
    var latStr = $("#Latitude").val();
    var longStr = $("#Longitude").val();
    var options = {};
    if (latStr !== '' && longStr !== '') {
        var lat = Number(latStr);
        var long = Number(longStr);
        options.bounds = Microsoft.Maps.LocationRect.fromEdges(lat + 0.001, long - 0.001, lat - 0.001, long + 0.001);
        wayPointPin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long));
    }
    map = new Microsoft.Maps.Map('#myMap', options);
    if (wayPointPin !== undefined)
        map.entities.push(wayPointPin);
    Microsoft.Maps.Events.addHandler(map, 'click', addWaypoint);
}
function addWaypoint(e) {
    if (wayPointPin !== undefined)
        map.entities.remove(wayPointPin);
    const location = e.location;
    $("#Latitude").val(e.location.latitude.toString());
    $("#Longitude").val(e.location.longitude.toString());
    dotNetObject.invokeMethodAsync("UpdateLatLong", e.location.latitude, e.location.longitude);
    // Create a waypoint pushpin
    wayPointPin = new Microsoft.Maps.Pushpin(location);
    // Add the pushpin to the map
    map.entities.push(wayPointPin);
}
