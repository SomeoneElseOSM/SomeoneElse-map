# What is this map?

The default layer on this map is created from [OpenStreetMap](https://www.openstreetmap.org/about) data.  It's designed to show information that's specifically useful to rural pedestrians - things like public footpaths and bridleways, and which roads you can safely walk along because there's a roadside pavement or verge.  There's a map legend [here](https://map.atownsend.org.uk/maps/map/map.html#zoom=14&lat=-24.99839&lon=135.04956), but it's quite large, so you'll need to scroll around to see it all, and also zoom in to see things that are only visible when you are zoomed in.  Recent changes that have been made to what is shown on the map can be seen [here](https://map.atownsend.org.uk/maps/map/changelog.html).

It uses a Javascript library called [Leaflet](http://leafletjs.com/), which is really well documented and simple to use, and makes it easy to create map web sites such as this one.

Other map layers contain data from other sources - for example the "Flooding" layer contains [Environment Agency](https://check-for-flooding.service.gov.uk/river-and-sea-levels) data.

## What are the other map layers?

* OSM - OpenStreetMap's "[Standard](https://github.com/gravitystorm/openstreetmap-carto)" map tiles.
* DE - Openstreetmap.de's "[deutscher Stil](https://www.openstreetmap.de/germanstyle.html)".
* OS 201604 - Ordnance Survey's OS OpenData StreetView, from April 2016.
* OS OM Local - Ordnance Survey's OS OpenMap Local, from April 2024.
* Humanitarian - OSM France's humanitarian tiles.
* Boundaries - European boundaries, designed to be used as an overlay for the "Default" layer.
* GPS - GPS traces that have been uploaded to OpenStreetMap.
* Current flooding - Using up-to-date Environment Agency data, show when certain footpaths and other areas are flooded.  See [here](https://www.openstreetmap.org/user/SomeoneElse/diary/398374).
* LA PRoW - English and Welsh local authority rights-of-way data, from rowmaps.com (where licence permits).  See [this message](https://lists.openstreetmap.org/pipermail/talk-gb/2021-December/028217.html).
* No vis paths - paths that aren't designated as England/Wales public rights of way that aren't particularly visible or are particularly demanding.
* OSMUK cadastral parcels - Zoom 18 and above only.  See [here](https://osmuk.org/cadastral-parcels/).

There's also an experimental vector-tile based map [here](https://map.atownsend.org.uk/vector/index.html#13.33/53.73709/-2.01785).  Unlike the raster maps it's not updated as people update OpenStreetMap.

## Why is this map better than other maps made using OSM data?

It handles a much larger proportion of the tags used in OSM [than other maps](https://taginfo.openstreetmap.org/projects).  It groups similar objects together, so for example "shop=vehicle" will appear with the same icon as "shop=car".  It does this via osm2pgsql and lua to customise the database for rendering, making queries easy to write.

It uses a wider variety of icons than other maps, especially icons with a small modifier indicating a certain feature, such as a shop that sells zero-waste products.

It shows features not normally shown on general-purpose map tiles, such as England and Wales rights of way and hiking and cycling routes.

It uses geographical customisation so that (for example) a Welsh name will be shown in Welsh-speaking parts of Wales and an English name in English-speaking parts.

## Can I use this map?

Yes, you're welcome to link to it.  As you zoom in the URL changes, so the contents of the URL bar should always link to what you are seeing.

## Can I use these map tiles?

The raster map is actually composed of a series of map tiles, such as [this one](https://map.atownsend.org.uk/hot/13/4070/2627.png).  You can add these tiles as a layer to another map, provided that you link back to the map style somehow (e.g. by linking to this page) and credit OpenStreetMap on the map layer as described [here](https://www.openstreetmap.org/copyright).

What you are not allowed to do is any sort of bulk downloading (i.e. downloading more than you need to display on screen at once).  What any normal person would view as normal usage of a web map is likely to be absolutely fine.

Similar "normal usage is likely to be fine" rules apply to the vector map tiles too.  However, the way that these are served is slightly different; if that becomes problematic I'll have to review how and if it can continue to be provided.

## Is this map accurate?

This data that this map uses is all added by contributors to the [OpenStreetMap](https://www.openstreetmap.org/) project .  In some areas it'll be significantly better than commercial or governmental alternatives, but in other places (with fewer OSM contributors) it won't be as good.  As with all maps, it may contain errors - because of that please don't infer that you have a legal right to do anything or go anywhere based on information shown on this map.  In particular, the "No vis paths" layer includes things that might be "a way to get up a mountain" but may not be an obvious "path".  Also note that a particular route (e.g. [here](https://map.atownsend.org.uk/maps/map/map.html#zoom=17&lat=54.073544&lon=-2.13134)) may be safe to travel along at some times but not others (e.g. when a river is in spate), or only with suitable equipment.  Your safety and that of those with you is your responsibility.

## Is this map up to date?

Apart from the places shown at very low zoom levels, the data that the raster map uses is updated from OpenStreetMap data every few minutes.  Depending on what you're looking at, changes will either appear very nearly immediately (when you're zoomed in) or in a few days (zoomed out).  Nothing should be more than about 4 days old, though you may see cached tiles (either in your browser or from the server, while a new tile is being created).

The raster map is completely reloaded every time there are minor style changes; typically this is once or twice a month.

## Something's wrong, how do I fix it?

You can update the data that this map uses by going to [https://www.openstreetmap.org/](https://www.openstreetmap.org/) and following the advice on [this page](https://www.openstreetmap.org/fixthemap).

There have been occasional examples of vandalism at [OpenStreetMap](https://www.openstreetmap.org/).  If you think you can see an example of that, please message [me](https://www.openstreetmap.org/message/new/SomeoneElse) via OpenStreetMap.  You also might find [this](https://community.openstreetmap.org/t/have-you-spotted-vandalism-on-openstreetmap-org/114684) article useful - but note that you'll need to go to the main [OpenStreetMap](https://www.openstreetmap.org/) site to follow that.

## Can I change what the raster map looks like?

You can, but only by creating your version of the map using your own map tiles.  The [changelog](https://map.atownsend.org.uk/maps/map/changelog.html) contains some links at the top to the various parts of the map style in github - you can create an issue there if you've got further questions, or message [me](https://www.openstreetmap.org/message/new/SomeoneElse) via OpenStreetMap.

The vector map is similar, except that the [schema](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/resources/README_sve01.md) is defined separately to the [display style](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/README_svwd01.md).  If you just need to change what the vector map looks like, you essentially need to edit [one .json file](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/svwd01_style.json).

## If I use these maps, what will people know about me?

[I](https://www.openstreetmap.org/user/SomeoneElse) am the only person that I've set up to have access to this server (tiles loaded from other servers are accessed by other people, of course).  If you request tiles or any other files then the normal Linux logs will record the fact (Apache's "access" log stores which IP address asked for a tile when, and the "syslog" stores details about new raster tiles being rendered).  The logs store data for about a week and then wrap around.  I can't comment on who might be watching traffic between you and the server (in Germany).  If you're particularly worried about people NOT knowing that you're requesting certain map tiles I recommend that you set up your own server and serve everything from there instead.
