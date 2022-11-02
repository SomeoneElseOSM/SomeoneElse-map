# Maps for Garmin devices

Also hosted on this site are some mkgmap-created maps for use with Garmin devices.

## Simple maps showing public footpath information

[Here](../mkgmap_maps/ajt2/) are maps created from OpenStreetMap data for [Great Britain](http://download.geofabrik.de/europe/great-britain.html).  They suppress non-foot-accessible ways and show the detail of public footpaths etc. in England and Wales.  See [this diary entry](https://www.openstreetmap.org/user/SomeoneElse/diary/400106) for more information.  These maps are created from fresh OpenStreetMap data roughly once a week.

## More detailed maps with QA information in them.

The main web map [here](map.html) contains much more detail then either a simple web map like the [standard OSM](https://www.openstreetmap.org/#map=14/51.7247/-0.7161&layers=S) one, or the simple Garmin map above - sort taginfo's [projects](https://taginfo.openstreetmap.org/projects) list by the number of keys handled to see that.  I've used some of the same [style code](https://github.com/SomeoneElseOSM/SomeoneElse-style/blob/master/style.lua) to also decide what should be shown on some more detailed maps for Garmin devices.  These are available [here](../mkgmap_maps/ajt03/).

### More description

Descriptive information is shown in round brackets after the name of a feature.  For example, in addition to being shown with the "information" icon on the map, a notice board will have "(B)" appended to the name, a guidepost "(GP)", a route marker "(RM)" and a sign "(S)".

### Quality Control information

This is shown in square brackets after the name of a feature.  For example, a road for which it's not known if its lit or not will have "[l]" appended; a road with recorded sidewalk or verge (or lack of sidewalk or verge) will have "[s]".

Some features might have both descriptive and quality control information shown.

## Technical detail

The tag transforms used are [here](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/transform_03.lua), and the script that downloads data and create the maps is [here](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/transform_03.lua).  See [here](changelog_mkgmap.html) for a changelog.



