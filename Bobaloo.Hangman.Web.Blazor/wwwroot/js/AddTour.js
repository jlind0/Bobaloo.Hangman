var map;
var wayPointPin;
var dotNetObject;
var searchManager;
function mapIsReady() {
    if (dotNetObject === undefined)
        setTimeout(mapIsReady, 100);
    else
        dotNetObject.invokeMethodAsync("ConfigureMap");
}
function GetMapForAddTour() {
    map = new Microsoft.Maps.Map('#myMap', {});
    Microsoft.Maps.Events.addHandler(map, 'click', addWaypoint);
    Microsoft.Maps.loadModule(['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.Search'], function () {
        var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', suggestionSelected);

        searchManager = new Microsoft.Maps.Search.SearchManager(map);
    });
}
 function suggestionSelected(result) {
     map.setView({ bounds: result.bestView });
        }

function SetDotNetObject(dno) {
    dotNetObject = dno;
        }
function geocode() {
        //Remove previously results from the map.
        map.entities.clear();

        //Get the users query and geocode it.
        var query = document.getElementById('searchBox').value;

        var searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin, pins = [], locs = [];

                    //Add a pushpin for each result to the map and create a list to display.
                    for (var i = 0; i < r.results.length; i++) {
                        locs.push(r.results[i].location);
                    }


                    //Determine a bounding box to best view the results.
                    var bounds;

                    if (r.results.length == 1) {
                        bounds = r.results[0].bestView;
                    } else {
                        //Use the locations from the results to calculate a bounding box.
                        bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
                    }

                    map.setView({ bounds: bounds, padding: 30 });
                }
            },
            errorCallback: function (e) {
            }
        };

        //Make the geocode request.
        searchManager.geocode(searchRequest);
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
    Microsoft.Maps.loadModule(['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.Search'], function () {
        var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', suggestionSelected);

        searchManager = new Microsoft.Maps.Search.SearchManager(map);
    });
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
