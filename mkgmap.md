# Maps for Garmin devices

Also hosted on this site are some [mkgmap-created maps of Great Britain](../mkgmap_maps/ajt03/great-britain/) and [Ireland](../mkgmap_maps/ajt03/ireland-and-northern-ireland/) for use with Garmin devices.  

### How to install them?

First, you'll need a Garmin device of some sort, preferably one that takes an SD card.  You can install on devices without an SD card providing there's enough space - but don't "delete files from it to make space" - it might not work afterwards!  These maps won't work with non-Garmin devices.  The Garmin devices that are supported include various eTrex GPSMap, Edge and Nuvi models (pretty much everything but the bargain basement ones), and even some Garmin watches.

You'll also need some sort of computer with a spare USB port that you can plug the Garmin device into using the cable that came with it.  Depending on the computer (PC, Mac, Linux...) I'll appear as some sort of connected disk.

You might struggle if you need maps featuring a non-Latin alphabet (Arabic, Georgian, etc.), but that's not an issue with the maps currently hosted here.

Next, download the files you need.  The [link above for Great Britain](../mkgmap_maps/ajt03/great-britain/) points to 3 files (two small and one large one).  Create an empty directory on your PC and download the 3 files into there.  Don't try and "open" these files on your PC; it won't understand them.  

If you have a new SD card to add to an empty slot in your Garmin device, do that now.  Next, plug your Garmin device into a USB port on your PC.  If the new card needs formatting, your PC will prompt you to do that now.  You should now see one or two new "disk drives" appear.  One (probably called "Garmin") is the device itself.  The other, if present, is the SD card.

If you've just inserted a blank SD card you'll want to create a "Garmin" directory there and copy your new maps into it.  The filenames and internal reference numbers have been chosen so that they hopefully won't clash with other maps.

If you don't have an SD card, or you have one that already has add-on maps on it that you don't want to overwrite, you'll want to copy onto the device itself.  It'll already have a "Garmin" directory on it; you can copy the 3 downloaded files into there, but do briefly check that there's enough space to do that.

When that's complete (the copy to the device might take 5 or so minutes), you can safely remove the "drive" that you copied the files to and unplug the device.

Turn the device on.  Depending on the type of Garmin device this'll be something like: select "menu", "setup map" then "select map".  scroll down to the "OSM Street Map" and select "enable" if it isn't already enabled.

### Why choose these maps?

It's worth mentioning that Garmin devices bought in the last few years very likely already have OpenStreetMap-based maps on them.  There are a couple of obvious reasons to upgrade though - one is just to have up to date maps (as an example, a 2023-bought Garmin 65s had OSM data from 2019 on it), but another is to have much more detail.  There are lots of downloadable OSM-based Garmin maps [elsewhere](https://wiki.openstreetmap.org/wiki/OSM_Map_On_Garmin/Download), but these maps try and do something different.  Like the web maps on these pages, they try and show _as much detail as possible_ from the underlying OpenStreetMap data.

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

More details about all this is in the [map legend](legend_mkgmap.html).  To see details of recent enhancements, see [here](changelog_mkgmap.html) for a changelog in github.  If you have any other questions you can create an issue there, or message [SomeoneElse](https://www.openstreetmap.org/message/new/SomeoneElse) via OpenStreetMap.

### Quality Control information

In addition to the descriptive information shown in round brackets after a feature, quality control information (such as potential missing tags) is shown in square brackets. For example, a road for which it's not known if its lit or not will have "[l]" appended after the name and a road with no details of whether a sidewalk or verge is present will have "[s]".

### Routable

The maps are of course routable for walking, cycling and driving.

## Technical details

The maps are updated once a week using OpenStreetMap data for [Great Britain](http://download.geofabrik.de/europe/great-britain.html), downloaded from [Geofabrik](https://www.geofabrik.de/).  Maps are created early in the morning based on OpenStreetMap data up to around [20:00](http://download.geofabrik.de/europe/great-britain.html) the previous night.  Maps of [other areas](https://map.atownsend.org.uk/maps/mkgmap_maps/ajt03/) are also occasionally built.

The feature processing is actually very similar to the [web maps](map.html) on this site, using lua [tag transforms](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/transform_03.lua) based on the [ones](https://github.com/SomeoneElseOSM/SomeoneElse-style/blob/master/style.lua) for the web maps.  

Download these maps <span style="font-size:larger;">[here](../mkgmap_maps/ajt03/)</span>.

## Creating maps of a different area yourself

The script that downloads data and create the maps is [here](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/garmin_map_etrex_03.sh).  The [readme](https://github.com/SomeoneElseOSM/mkgmap_style_ajt/blob/master/README.md) explains how to run it locally, and the area to process can be easily set in the script, for example like this:

    file_prefix1=paraguay
    file_page1=http://download.geofabrik.de/south-america/${file_prefix1}.html
    file_url1=http://download.geofabrik.de/south-america/${file_prefix1}-latest.osm.pbf

## Simpler maps

In addition to the detailed maps above, some simpler ones, which support the same sort of foot, bicycle and car routing but without the same detail on the display, are available <span style="font-size:larger;">[here](../mkgmap_maps/ajt2/)</span>.
