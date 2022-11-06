# Maps for Garmin devices

Also hosted on this site are some mkgmap-created maps for use with Garmin devices.

## Simple maps showing public footpath information

These are available <span style="font-size:larger;">[here](../mkgmap_maps/ajt2/)</span>.

They are created using OpenStreetMap data for [Great Britain](http://download.geofabrik.de/europe/great-britain.html) downloaded from Geofabrik.  They:

* suppress non-foot-accessible ways
* show public footpaths, bridleways etc. with e.g. "(PF") after the name
* show hiking route relations

See [this diary entry](https://www.openstreetmap.org/user/SomeoneElse/diary/400106) for more information.  They are created from fresh OpenStreetMap data roughly once a week.

## More detailed maps with QA information in them.

These are available <span style="font-size:larger;">[here](../mkgmap_maps/ajt03/)</span>.

They contain some of the same processing as the [web maps](map.html) on this site, using lua [tag transforms](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/transform_03.lua) based on the [ones](https://github.com/SomeoneElseOSM/SomeoneElse-style/blob/master/style.lua) for the web maps.
.

### More description

Descriptive information is shown in round brackets after the name of a feature.  For example, in addition to being shown with the "information" icon on the map, a notice board will have "(B)" appended to the name, a guidepost "(GP)", a route marker "(RM)" and a sign "(S)".

### Quality Control information

This is shown in square brackets after the name of a feature.  For example, a road for which it's not known if its lit or not will have "[l]" appended; a road with recorded sidewalk or verge (or lack of sidewalk or verge) will have "[s]".

Some features might have both descriptive and quality control information shown.

## Technical detail

The script that downloads data and create the maps is [here](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/garmin_map_etrex_03.sh).  See [here](changelog_mkgmap.html) for a changelog.

.
