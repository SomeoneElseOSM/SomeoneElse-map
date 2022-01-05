var map;
var layersControl;
var zoomControl;
var ajaxRequest;
var current_zoom = 9;
var some_var = 0;

function initmap()
{
    var hetznerUrl='//map.atownsend.org.uk/hot/{z}/{x}/{y}.png';
    var boundaryUrl='//map.atownsend.org.uk/hot2/{z}/{x}/{y}.png';
    var osmUrl='//a.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var deUrl='//a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
    var os201604Url='//{s}.os.openstreetmap.org/layer/gb_os_sv_2016_04/{z}/{x}/{y}.png';
    var oslocalUrl='//{s}.os.openstreetmap.org/layer/gb_os_om_local_2020_04/{z}/{x}/{y}.png';
    var wikiUrl='//maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
    var gps2Url='//gps-b.tile.openstreetmap.org/lines/{z}/{x}/{y}.png';
    var floodedUrl='//map.atownsend.org.uk/hot4/{z}/{x}/{y}.png';
    var LA_ProwUrl='https://osm.cycle.travel/rights_of_way/{z}/{x}/{y}.png';

    var osmAttrib='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
    var osAttrib='Map data &copy; <a href="https://www.ordnancesurvey.co.uk/business-government/products/open-map-local">Ordnance Survey</a> under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL</a>';
    var eaAttrib='current flooding &copy; <a href="https://check-for-flooding.service.gov.uk/find-location">Environment Agency</a> under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL</a>';
    var laAttrib='PRoW overlay &copy; local authorities under OGL & rowmaps.com';

/* ------------------------------------------------------------------------------
 * A note about layer min and max zoom levels:
 *
 * My renderd-generated layers are valid from 0 to 18 only.  It's only really useful from layer 5.
 * The "standard" OSM tiles are valid from 0 to 19.
 * OS OpenData_StreetView is valid from 0 to 19 (which is actually an overzoomed 18)
 * The GPS layer is valid from 0 to 24, but we only go to 20 here.
 *
 * Leaflet now supports a lower maxZoom than maxNativeZoom (i.e. overzoom).
 * We support maxZoom 19 across the board to allow switching from one layer to 
 * another without just getting a grey background.
 * ------------------------------------------------------------------------------ */
    var hetznerLayer = new L.TileLayer( hetznerUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });
    var boundaryLayer = new L.TileLayer( boundaryUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: osmAttrib });
    var osmLayer = new L.TileLayer( osmUrl, {minZoom: 0, maxZoom: 20, maxNativeZoom: 19, attribution: osmAttrib });
    var deLayer = new L.TileLayer( deUrl, {minZoom: 0, maxZoom: 20, maxNativeZoom: 19, attribution: osmAttrib });
    var os201604Layer = new L.TileLayer( os201604Url, {minZoom: 0, maxZoom: 19, attribution: osAttrib });
    var oslocalLayer = new L.TileLayer( oslocalUrl, {minZoom: 0, maxZoom: 19, attribution: osAttrib });
    var wikiLayer = new L.TileLayer( wikiUrl, {minZoom: 0, maxZoom: 19, maxNativeZoom: 18, attribution: osmAttrib });
    var gps2Layer = new L.TileLayer( gps2Url, {minZoom: 0, maxZoom: 20, attribution: osmAttrib });
    var floodedLayer = new L.TileLayer( floodedUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: eaAttrib });
    var LA_ProwLayer = new L.TileLayer( LA_ProwUrl, {minZoom: 0, maxZoom: 25, maxNativeZoom: 24, attribution: laAttrib });

    // set up the map

/* ------------------------------------------------------------------------------
 * Set up the map with no zoomControl (there's a button to add it), a map centre
 * of near Milford, zoom 9 and the current layer being my "designation" layer.
 * ------------------------------------------------------------------------------ */
    map = new L.Map('map', {
        zoomControl: false,
	center: new L.LatLng( 53, -1.5 ),
	zoom: current_zoom,
	layers: [ hetznerLayer ]
    });

    map.attributionControl.setPrefix(false);
    map.addControl( new L.Control.Permalink({ text: 'Permalink', layers: layersControl }) );

    var baseMaps = {
	"Default": hetznerLayer,
	"OSM": osmLayer,
	"DE": deLayer,
	"OS 201604": os201604Layer,
	"OS OM Local": oslocalLayer,
	"Wikimedia": wikiLayer
    };

    var overlayMaps = {
        "Boundaries": boundaryLayer,
        "GPS": gps2Layer,
        "Current flooding": floodedLayer,
        "LA PRoW": LA_ProwLayer
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
 * A button to pan to a map legend.  This data needs to be loaded manually.
 * See https://github.com/SomeoneElseOSM/SomeoneElse-style-legend
 * ------------------------------------------------------------------------- */
function pan_legend()
{
    map.setZoom( 12 );
    map.panTo([ -25.001, 135.1107 ]);
}

/* -------------------------------------------------------------------------
 * A button to pan to display a changelog.
 * ------------------------------------------------------------------------- */
function show_changelog()
{
    window.open ( 'changelog.html','_self',false )
}

/* -------------------------------------------------------------------------
 * A button to pan to display an about screen.
 * ------------------------------------------------------------------------- */
function show_about()
{
    window.open ( 'about.html','_self',false )
}


