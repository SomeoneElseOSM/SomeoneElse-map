This map is one of several here.  See [here](https://map.atownsend.org.uk/maps/map/mkgmap.html) for information about maps for Garmin devices, and see the link to "raster map" above for a similar map style as this using raster tiles, and also [here](https://map.atownsend.org.uk/vector/index_osmf_shortbread.html) for a worldwide map based on OSMF's vector map tiles.

This map is created in the user's web browser using information read from vector map tiles hosted on this site, created from [OpenStreetMap](https://www.openstreetmap.org/about) data. It’s designed to show information that’s specifically useful to rural pedestrians - things like public footpaths and bridleways, and which roads you can safely walk along because there’s a roadside pavement or verge. Recent changes that have been made to what is shown on the map can be seen in two changelogs - [one](../../maps/map/changelog_sve01.html) for the vector tile schema (what information is available to be shown) and [one](../../maps/map/changelog_svwd01.html) for the map style (how it actually looks).

The vector tiles are created using [Tilemaker](https://tilemaker.org/).  The map style is created with [MapLibre GL](https://maplibre.org/maplibre-gl-js/docs/).  The fonts used are from [Klokantech](https://github.com/klokantech/klokantech-gl-fonts), in turn based on Google's [noto](https://fonts.google.com/noto).

## Why is this map better than other maps made using OSM data?

It handles a much larger proportion of the tags used in OSM [than other maps](https://taginfo.openstreetmap.org/projects).  It groups similar objects together, so for example `shop=vehicle` will appear with the same icon as `shop=car`.  It does this via tilemaker and lua to customise the schema for rendering, making queries easy to write.

It uses a wider variety of icons than other maps, especially icons with a small modifier indicating a certain feature varies in some small way from the norm, such as a grocery shop that sells zero-waste products, or a pub with outdoor seating.

It shows features not normally shown on general-purpose map tiles, such as [England and Wales rights of way](https://map.atownsend.org.uk/vector/#16.91/51.59978/-0.862324) and [hiking and cycling routes](https://map.atownsend.org.uk/vector/#16.39/53.735085/-2.038727).

## How is it made?

There are a set of [management scripts](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/README.md) that can create, install and delete sets of vector tiles behind an Apache web server.  The scripts work directly with Geofabrik extracts, so there's minimal manual fiddling with shell scripts, web pages or javascript.

The vector tile schema is described [here](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/resources/README_sve01.md).  It's based on the schema as used for the equivalent [raster map style](https://github.com/SomeoneElseOSM/SomeoneElse-style), with the difference that the [number of layers used there](https://github.com/SomeoneElseOSM/openstreetmap-carto-AJT/blob/master/project.mml) has been vastly reduced.

There is another set of [management scripts](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/README.md) that can manage icons and sprites, and install and delete map styles behind an Apache web server.  They're designed so that multiple map styles based on the same vector data can be installed for testing.

There is an example [display style](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/README_svwd01.md) that showcases all the data in the SVE01 schema.  The cartography is very much based on the equivalent raster maps, with some improvements - for example all varieties of bridges and tunnels on all classes of roads are supported; and proper UK/IE-style road shields have been created.

## Descriptions of and changes to the scripts, schema and display style

There is a [readme](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/README.md) and a [changelog](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/changelog.md) for the vector tile management scripts.

There is also a [readme](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/resources/README_sve01.md), [install notes](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/resources/INSTALL_sve01.md) and [changelog](https://github.com/SomeoneElseOSM/SomeoneElse-vector-extract/blob/main/resources/changelog_sve01.md) for the schema.

Details of which OSM tags the schema uses are listed against the project at [taginfo](https://taginfo.openstreetmap.org/projects/someoneelse_vector_sve01#tags), but the actual data stored in the tiles will often be a consolidation of the data from OSM - for example many sorts of sidewalk tags (`sidewalk`, `sidewalk:left`, `sidewalk:right`) will result in `edge=sidewalk` being written to a road in the `transportation` layer.

There is a [readme](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/README.md) and [changelog](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/changelog.md) for the style management scripts, and a [readme](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/README_svwd01.md) and a [changelog](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/changelog_svwd01.md) for the display style.

In order to help understanding how and why things are displayed, the [default web page](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/svwd01_index.html) includes MapLibre GL debug, and there is also a [debug style](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/svwd04_style.json) that just shows the contents of the vector tiles.

## Can I use this map?

Yes, you're welcome to link to it.  As you zoom in the URL changes, so the contents of the URL bar should always link to what you are seeing.

## Can I use these vector tiles?

By all means do create map styles (based on the example style here, or on something else altogether) based on this schema.  You can add this as a layer to another map, provided that you link back to the map style somehow (e.g. by linking to this page) and credit OpenStreetMap on the map layer as described on OSM's [copyright](https://www.openstreetmap.org/copyright) page.

What you are not allowed to do is any sort of bulk downloading (such as directly downloading the vector tile file itself, or downloading more than you need to display on screen at once).  What any normal person would view as normal usage of a web map is likely to be absolutely fine.  Please use the scripts to generate your own vector tiles if you'd like to host some yourself.

## Is this map accurate?

This data that this map uses is all added by contributors to the [OpenStreetMap](https://www.openstreetmap.org/) project .  In some areas it'll be significantly better than commercial or governmental alternatives, but in other places (with fewer OSM contributors) it won't be as good.  As with all maps, it may contain errors - because of that please don't infer that you have a legal right to do anything or go anywhere based on information shown on this map.  Please also note that a particular route (e.g. [at Gordale Scar](https://map.atownsend.org.uk/vector/#20/54.07259/-2.13081)) may be safe to travel along at some times but not others (e.g. when a river is in spate), or only with suitable equipment.  Your safety and that of those with you is your responsibility.

## Is this map up to date?

Unlike the raster map, this map isn't updated as people update OpenStreetMap.  It is reloaded periodically, including when there have been minor style changes; currently more than once a week.

## Something's wrong, how do I fix it?

You can update the data that this map uses by going to [https://www.openstreetmap.org/](https://www.openstreetmap.org/) and following the advice on [this page](https://www.openstreetmap.org/fixthemap).

There have been occasional examples of vandalism at [OpenStreetMap](https://www.openstreetmap.org/).  If you think you can see an example of that, please message [me](https://www.openstreetmap.org/message/new/SomeoneElse) via OpenStreetMap.  You also might find [this](https://community.openstreetmap.org/t/have-you-spotted-vandalism-on-openstreetmap-org/114684) article useful - but note that you'll need to go to the main [OpenStreetMap](https://www.openstreetmap.org/) site to follow that.

## Can I change what this vector map looks like?

As noted above, if you would like to change what the vector map looks like, you essentially just need to edit [one .json file](https://github.com/SomeoneElseOSM/SomeoneElse-vector-web-display/blob/main/resources/svwd01_style.json).

## If I use these maps, what will people know about me?

[I](https://www.openstreetmap.org/user/SomeoneElse) am the only person that I've set up to have access to this server (tiles loaded from other servers are accessed by other people, of course).  If you request tiles or any other files then the normal Linux logs will record the fact (Apache's "access" log stores which IP address asked for a tile when, and the "syslog" stores details about new raster tiles being rendered).  I can't comment on who might be watching traffic between you and the server (in Germany).  If you're particularly worried about people NOT knowing that you're requesting certain map tiles I recommend that you set up your own server and serve everything from there instead.

