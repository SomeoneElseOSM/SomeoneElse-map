# Maps for Garmin devices

Also hosted on this site are some [mkgmap-created maps of Great Britain](../mkgmap_maps/ajt03/) for use with Garmin devices.  There are lots of other ones [elsewhere](https://wiki.openstreetmap.org/wiki/OSM_Map_On_Garmin/Download), but these maps try and do something different.  Like the web maps on these pages, they try and show _as much detail as possible_ in the underlying OpenStreetMap data.

<img align="left" src="https://map.atownsend.org.uk/tmp/IMG_20230719_235909_HDR.jpg" width="300" height="400" />

This screenshot shows [High Petergate](https://www.openstreetmap.org/way/92158611) in York.  The name, religion and denomination of the church to the north are shown.  Dots are shown for "point" features like trees, wastebaskets, benches, etc. - move the pointer over any of them for more details.  

Descriptive information is shown in round brackets after the name of a feature.  For example, in addition to being shown with the "information" icon on the map, a notice board will have "(B)" appended to the name, a guidepost "(GP)", a route marker "(RM)" and a sign "(S)".

Barriers are shown as lines, and you can see that the fence to the north of the path has "(Fence)" shown against it.

Currently the "[Guy Fawkes](https://www.openstreetmap.org/node/736284390)" pub is highlighted, and a summary of attributes is shown at the top of the screen.  It's a pub that servers real ale ("r"), does food ("f"), has a noncarpeted floor ("l"), has outside seating ("o") and doesn't support wheelchair access ("wn").

### Public footpaths and bridleways, and hiking route relations

A path that is a public footpath will have "(Pf)" appended to the name, if any.  Any hiking route relations will also be shown in brackets after that - hover the pointer over the path so that details are shown at the top of the screen.

### Search menu

Garmin devices have extensive search capabilities.  For example, press the "find" button, select "Food and Drink" and this long list of categories will be shown:

<span style="font-size:smaller;">American, Asian, Barbeque, Chinese, Deli or Bakery, International, Fast Food, Italian, Mexican, Pizza, Seafood, Steak or Grill, Bagel or Donut, Cafe or Diner, French, German, British Isles, Other</span>.

These maps have been created so that almost everything is searchable, and details of "what OSM tags are where in the menu" can be found out at [this link in taginfo](https://taginfo.openstreetmap.org/projects/someoneelse_mkgmap_ajt03#tags).  For example, to see where things matching "fish_and_chips" might be, just type that into the search filter on that screen:

<img src="http://map.atownsend.org.uk/tmp/Screenshot_20230720_011507.png" width="1200" height="300" />

Here we can see that the places where it is a primary cuisine are on the "Food and Drink / Seafood" menu, which is the best fit of the (a bit too American for European tastes) available Garmin "Food and Drink" menus.

More details about all this is in the [map legend](legend_mkgmap.html).  To see details of recent enhancements, see [here](changelog_mkgmap.html) for a changelog.

### Quality Control information

In addition to the descriptive information shown in round brackets after a feature, quality control information (such as potential missing tags) is shown in square brackets. For example, a road for which it's not known if its lit or not will have "[l]" appended after the name and a road with no details of whether a sidewalk or verge is present will have "[s]".

### Routable

The maps are of course routable for walking, cycling and driving.

## Technical details

The maps are updated once a week using OpenStreetMap data for [Great Britain](http://download.geofabrik.de/europe/great-britain.html), downloaded from [Geofabrik](https://www.geofabrik.de/).  Maps are created early in the morning based on OpenStreetMap data up to around [20:00](http://download.geofabrik.de/europe/great-britain.html) the previous night.

The feature processing is actually very similar to the [web maps](map.html) on this site, using lua [tag transforms](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/transform_03.lua) based on the [ones](https://github.com/SomeoneElseOSM/SomeoneElse-style/blob/master/style.lua) for the web maps.  

Download these maps <span style="font-size:larger;">[here](../mkgmap_maps/ajt03/)</span>.

## Creating maps of a different area yourself

The script that downloads data and create the maps is [here](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/garmin_map_etrex_03.sh).  The [readme](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/README.md) explains how to run it locally, and the area to process can be easily set in the script, for example like this:

    file_prefix1=paraguay
    file_page1=http://download.geofabrik.de/south-america/${file_prefix1}.html
    file_url1=http://download.geofabrik.de/south-america/${file_prefix1}-latest.osm.pbf

## Simpler maps

In addition to the detailed maps above, some simpler ones, which support the same sort of foot, bicycle and car routing but without the same detail on the display, are available <span style="font-size:larger;">[here](../mkgmap_maps/ajt2/)</span>.
