var map;
var layersControl;
var zoomControl;
var ajaxRequest;
var current_zoom = 9;
var current_layer;

/* ------------------------------------------------------------------------------
 * The "live" version on map.atownsend.org.uk does not display "local" maps.
 * Test versions do, and also display "Hetzner" maps too.
 * The code supports switching to and from local maps, even if it isn't in 
 * "basemaps"
 * localUrl is defined identically to hetznerUrl.
 * ------------------------------------------------------------------------------ */
var localUrl='//map.atownsend.org.uk/hot/{z}/{x}/{y}.png';
var hetznerUrl='//map.atownsend.org.uk/hot/{z}/{x}/{y}.png';
var osmUrl='//tile.openstreetmap.org/{z}/{x}/{y}.png';
var deUrl='//a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
var os201604Url='//{s}.os.openstreetmap.org/layer/gb_os_sv_2016_04/{z}/{x}/{y}.png';
var oslocalUrl='//{s}.os.openstreetmap.org/layer/gb_os_om_local_2022_10/{z}/{x}/{y}.png';
var humUrl='http://77.95.65.40/hot/{z}/{x}/{y}.png';

/* ------------------------------------------------------------------------------
 * On installations other than map.atownsend.org.uk, the URLs below will normally
 * point locally rather than to map.atownsend.org.uk .
 * ------------------------------------------------------------------------------ */
var boundaryUrl='//map.atownsend.org.uk/hot6/{z}/{x}/{y}.png';
var gps2Url='//gps-b.tile.openstreetmap.org/lines/{z}/{x}/{y}.png';
var floodedUrl='//map.atownsend.org.uk/hot4/{z}/{x}/{y}.png';
var LA_ProwUrl='https://osm.cycle.travel/rights_of_way/{z}/{x}/{y}.png';
var novisUrl='//map.atownsend.org.uk/hot5/{z}/{x}/{y}.png';

var hash;

/* ------------------------------------------------------------------------------
 * Layer attributions are added together and displayed at the bottom right of 
 * the screen.
 * ------------------------------------------------------------------------------ */
var osmAttrib='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
var osAttrib='Map data &copy; <a href="https://www.ordnancesurvey.co.uk/business-government/products/open-map-local">Ordnance Survey</a> under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL</a>';
var eaAttrib='current flooding &copy; <a href="https://check-for-flooding.service.gov.uk/find-location">Environment Agency</a> under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL</a>';
var laAttrib='PRoW overlay &copy; local authorities under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL</a> & <a href="https://rowmaps.com">rowmaps.com</a>';

/* ------------------------------------------------------------------------------
 * A note about layer min and max zoom levels:
 *
 * My renderd-generated layers are valid from 0 to 24 only.
 * The "standard" OSM tiles are valid from 0 to 19.
 * OS OpenData_StreetView is valid from 0 to 19 (which is actually an overzoomed 18)
 * The GPS layer is valid from 0 to 24, but we only go to 20 here.
 *
 * Leaflet supports a lower maxZoom than maxNativeZoom (i.e. overzoom).
 * ------------------------------------------------------------------------------ */
var localLayer = new L.TileLayer( localUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });
var hetznerLayer = new L.TileLayer( hetznerUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });
var osmLayer = new L.TileLayer( osmUrl, {minZoom: 0, maxZoom: 20, maxNativeZoom: 19, attribution: osmAttrib });
var deLayer = new L.TileLayer( deUrl, {minZoom: 0, maxZoom: 20, maxNativeZoom: 19, attribution: osmAttrib });
var os201604Layer = new L.TileLayer( os201604Url, {minZoom: 0, maxZoom: 19, attribution: osAttrib });
var oslocalLayer = new L.TileLayer( oslocalUrl, {minZoom: 0, maxZoom: 19, attribution: osAttrib });
var humLayer = new L.TileLayer( humUrl, {minZoom: 0, maxZoom: 19, attribution: osAttrib });

var boundaryLayer = new L.TileLayer( boundaryUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });
var gps2Layer = new L.TileLayer( gps2Url, {minZoom: 0, maxZoom: 20, attribution: osmAttrib });
var floodedLayer = new L.TileLayer( floodedUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: eaAttrib });
var LA_ProwLayer = new L.TileLayer( LA_ProwUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 18, attribution: laAttrib });
var novisLayer = new L.TileLayer( novisUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });

function initmap()
{
    // set up the map

/* ------------------------------------------------------------------------------
 * Set up the map with no zoomControl (there's a button to add it), a map centre
 * of near Milford, zoom 9 and the current layer being my SomeoneElse-Style layer.
 * ------------------------------------------------------------------------------ */
    map = new L.Map('map', {
        zoomControl: false,
	center: new L.LatLng( 53, -1.5 ),
	zoom: current_zoom,
	layers: [ hetznerLayer ]
    });

    map.attributionControl.setPrefix(false);

/* ------------------------------------------------------------------------------
 * The "live" version on map.atownsend.org.uk does not display "local" maps.
 * Test versions do, and also display "Hetzner" maps too.
 *
 * In those cases, the definition below will be:
 *     "Local": localLayer,
 *     "Hetzner": hetznerLayer,
 *
 * The code supports switching to and from local maps, even if it isn't in 
 * "basemaps".
 * localUrl is defined above identically to hetznerUrl.
 * ------------------------------------------------------------------------------ */
    var baseMaps = {
	"Default": hetznerLayer,
	"OSM": osmLayer,
	"DE": deLayer,
	"OS 201604": os201604Layer,
	"OS OM Local": oslocalLayer,
	"Humanitarian": humLayer
    };

    var overlayMaps = {
        "Boundaries": boundaryLayer,
        "GPS": gps2Layer,
        "Current flooding": floodedLayer,
        "LA PRoW": LA_ProwLayer,
        "No vis paths": novisLayer
    };

/* ------------------------------------------------------------------------------
 * "layersControl" is declared at the top and used here in "initmap" and also
 * in the button handlers for "Control" (to show the controls on the map) and 
 * "Off" (to turn them off).  The map is created with no layers control by 
 * default.  We declare one at the top of the code and turn it on and off within
 * the same functions.
 * ------------------------------------------------------------------------------ */
    layersControl = new L.Control.Layers( baseMaps, overlayMaps );
    zoomControl = new L.Control.Zoom( baseMaps );

    map.on( 'locationfound', location_success );
    map.on( 'locationerror', location_fail );

/* ------------------------------------------------------------------------------
 * See https://leafletjs.com/reference.html#map-baselayerchange for these events:
 * ------------------------------------------------------------------------------ */
    map.on('baselayerchange', function (e) {
	any_layer_change( e );
    });

    map.on('overlayadd', function (e) {
	any_layer_change( e );
    });

    map.on('overlayremove', function (e) {
	any_layer_change( e );
    });

/* ------------------------------------------------------------------------------
 * Add a permalink to the map URL
 * ------------------------------------------------------------------------------ */
    hash = new L.Hash(map)

/* ------------------------------------------------------------------------------
 * What state is the map in and what does the URL look like?
 * If some layers are defined in there, try and load them.
 * ------------------------------------------------------------------------------ */
    console.log('Initial location.hash', location.hash);
    hash2 = new L.Hash.parseHash(location.hash);
    console.log('new hash2.meta', hash2.meta);
    hash.setHashMeta( hash2.meta, false);

    for (var i = 0; i < hash2.meta.length; i++)
    {
	console.log("hash.meta[i]", hash2.meta[i]);
	process_newmeta(hash2.meta[i]);
    }

    console.log('After process_newmeta array calls');

      map.on("hashmetainit", function(initState) {
          console.log('hashmetainit detected', initState.meta);
      })
/* ------------------------------------------------------------------------------
 * Next we need some way of knowing that a user has used a permalink resulting in
 * a different map layer.
 * ------------------------------------------------------------------------------ */
    map.on("hashmetachange", function(newState) {
        console.log('hashmetachange detected', newState.meta);

/* ------------------------------------------------------------------------------
 * Remove any overlays.  If they're in the URL, they will get re-added.
 * ------------------------------------------------------------------------------ */
        console.log('before overlay deletion');
	map.removeLayer(boundaryLayer);
	map.removeLayer(gps2Layer);
	map.removeLayer(LA_ProwLayer);
	map.removeLayer(novisLayer);
        console.log('after overlay deletion');

/* ------------------------------------------------------------------------------
 * newState.meta is a string with layers in it, e.g. "HB" for the "Hetzner" base
 * layer and te "Boundaries" overlay layer.
 * There will be exactly one base layer and 0 or more overlay layers.
 * "any_layer_change" below prevents the meta from having more than one base 
 * layer in it.
 *
 * For each base or overlay layer, add it (and if it is a base layer remove the
 * previous base layer).
 * ------------------------------------------------------------------------------ */
	for (var i = 0; i < newState.meta.length; i++)
	    {
		console.log("newState.meta[i]", newState.meta[i]);
		process_newmeta(newState.meta[i]);

	    }
    });
    console.log('Initialisation completed');

}


function process_newmeta( newmeta )
{
/* ------------------------------------------------------------------------------
 * The "live" version on map.atownsend.org.uk does not display "local" maps.
 * The code supports switching to and from local maps, even if it isn't in 
 * "basemaps".
 * localUrl is defined above identically to hetznerUrl.
 * ------------------------------------------------------------------------------ */
    console.log('process_newmeta', newmeta);
    if ( newmeta == "L" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(localLayer);
	current_layer = localLayer;
    }

    if ( newmeta == "H" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(hetznerLayer);
	current_layer = hetznerLayer;
    }

    if ( newmeta == "O" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(osmLayer);
	current_layer = osmLayer;
    }

    if ( newmeta == "D" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(deLayer);
	current_layer = deLayer;
    }

    if ( newmeta == "6" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(os201604Layer);
	current_layer = os201604Layer;
    }

    if ( newmeta == "2" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(oslocalLayer);
	current_layer = oslocalLayer;
    }

    if ( newmeta == "U" )
    {
	if ( current_layer )
	    map.removeLayer(current_layer);

	map.addLayer(humLayer);
	current_layer = humLayer;
    }

    if ( newmeta == "B" )
    {
	map.addLayer(boundaryLayer);
    }

    if ( newmeta == "G" )
    {
	map.addLayer(gps2Layer);
    }

    if ( newmeta == "F" )
    {
	map.addLayer(floodedLayer);
    }

    if ( newmeta == "P" )
    {
	map.addLayer(LA_ProwLayer);
    }

    if ( newmeta == "N" )
    {
	map.addLayer(novisLayer);
    }
}


/* ------------------------------------------------------------------------------
 * Any leaflet layer change might require us to change the URL, so each of the 
 * 3 events comes here.
 * ------------------------------------------------------------------------------ */
    function any_layer_change( e )
    {
	console.log("any_layer_change");
	console.log(e.layer._url);
	current_layer = e.layer;

/* ------------------------------------------------------------------------------
 * At this point the "number of layers" found by counting map.eachLayer will be 1
 * or 2, even though there is only ever one base layer (if no overlays), and
 * that number plus an selected overlayes, if overlays are selected.
 *
 * Oddly there does not seem to be a way of iterating through the layers added 
 * to an L.Control.Layers.
 * ------------------------------------------------------------------------------ */
	var total_matched_layers = "";
        map.eachLayer(function(layer){
	    var current_matched_layer;
	    current_matched_layer = match_layers( layer._url );

	    console.log(current_matched_layer);

	    if ((( total_matched_layers  === "L" ) ||
                 ( total_matched_layers  === "H" ) ||
                 ( total_matched_layers  === "O" ) ||
                 ( total_matched_layers  === "D" ) ||
                 ( total_matched_layers  === "6" ) ||
                 ( total_matched_layers  === "2" ) ||
                 ( total_matched_layers  === "U" )) &&
		(( current_matched_layer === "L" ) ||
                 ( current_matched_layer === "H" ) ||
                 ( current_matched_layer === "O" ) ||
                 ( current_matched_layer === "D" ) ||
                 ( current_matched_layer === "6" ) ||
                 ( current_matched_layer === "2" ) ||
                 ( current_matched_layer === "U" )))
		{
		    console.log("Base layer already added; ignoring");
		}
	    else
		{
		    total_matched_layers = total_matched_layers + current_matched_layer;
		}
	});

	console.log("total_matched_layers",total_matched_layers);

	if ( total_matched_layers )
	    hash.setHashMeta(total_matched_layers, false);
    }    


function match_layers( passed_layer_url )
{
    var current_matched_layer = "";

/* ------------------------------------------------------------------------------
 * The "live" version on map.atownsend.org.uk does not display "local" maps.
 * The code supports switching to and from local maps, even if it isn't in 
 * "basemaps".
 * localUrl is defined above identically to hetznerUrl.
 * ------------------------------------------------------------------------------ */
    if ( passed_layer_url === localUrl )
	current_matched_layer = "L";

    if ( passed_layer_url === hetznerUrl )
	current_matched_layer = "H";

    if ( passed_layer_url === osmUrl )
	current_matched_layer = "O";

    if ( passed_layer_url === deUrl )
	current_matched_layer = "D";

    if ( passed_layer_url === os201604Url )
	current_matched_layer = "6";

    if ( passed_layer_url === oslocalUrl )
	current_matched_layer = "2";

    if ( passed_layer_url === humUrl )
	current_matched_layer = "U";

    if ( passed_layer_url === boundaryUrl )
	current_matched_layer = "B";

    if ( passed_layer_url === gps2Url )
	current_matched_layer = "G";

    if ( passed_layer_url === floodedUrl )
	current_matched_layer = "F";

    if ( passed_layer_url === LA_ProwUrl )
	current_matched_layer = "P";

    if ( passed_layer_url === novisUrl )
	current_matched_layer = "N";

    console.log(current_matched_layer);
    return current_matched_layer;
}


function location_success( e )
{
/* ------------------------------------------------------------------------------
 * Uncomment to verify when locations are actually returned to the code.
 * ------------------------------------------------------------------------------ */
//    alert(  "location_success" );
}

function location_fail( e )
{
    alert(  "location_fail " + e.message );
}


function zoom_in()
{
    map.zoomIn();
}


function layers_on()
{
/* ------------------------------------------------------------------------------
 * Another valid method would be "map.addControl( layersControl );"
 * ------------------------------------------------------------------------------ */
    layersControl.addTo( map );
    zoomControl.addTo( map );
}

/* ------------------------------------------------------------------------------
 * These functions are bound to buttons above the map.  They're included because
 * on a small phone screen a layer of buttons at the top is less intrusive than
 * controls on the map.
 * ------------------------------------------------------------------------------ */
function layers_off()
{
    layersControl.removeFrom( map );
    zoomControl.removeFrom( map );
}


/* ------------------------------------------------------------------------------
 * Another button above the map - this one centres the map on the current 
 * location at zoom 16.  The relatively high timeout is to allow it still to be
 * useful on phones that are slow to get a location.
 *
 * This form of the call replaces "map.locateAndSetView( 16, {timeout: 300000} );"
 * in earlier leaflet versions
 * ------------------------------------------------------------------------------ */
function pan_centre()
{
    map.locate({ setView: true, maxZoom: 16, timeout: 300000 });
}


/* -------------------------------------------------------------------------
 * A button to show a map legend.  This data needs to be loaded manually.
 * See https://github.com/SomeoneElseOSM/SomeoneElse-style-legend
 * ------------------------------------------------------------------------- */
function pan_legend()
{
    map.panTo([ -25.001, 135.1107 ]);
    map.setZoom( 12 );
}

/* -------------------------------------------------------------------------
 * A button to display a changelog.
 * ------------------------------------------------------------------------- */
function show_changelog()
{
    window.open ( 'changelog.html','_self',false )
}

/* -------------------------------------------------------------------------
 * A button to display details of mkgmap maps.
 * ------------------------------------------------------------------------- */
function show_mkgmap()
{
    window.open ( 'mkgmap.html','_self',false )
}

/* -------------------------------------------------------------------------
 * A button to display an about screen.
 * ------------------------------------------------------------------------- */
function show_about()
{
    window.open ( 'about.html','_self',false )
}


