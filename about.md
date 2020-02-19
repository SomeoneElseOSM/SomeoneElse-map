# What is this map?

This map is created from [OpenStreetMap](https://www.openstreetmap.org/about) data.  It's designed to show information that's specifically useful to rural pedestrians - things like public footpaths and bridleways, and which roads you can safely walk along because there's a roadside pavement or verge.  There's a map legend [here](https://map.atownsend.org.uk/maps/map/map.html#zoom=14&lat=-24.99839&lon=135.04956), but it's quite large, so you'll need to scroll around to see it all, and also zoom in to see things that are only visible when you are zoomed in.  Changes that have been made to what is shown on the map can be seen [here](https://map.atownsend.org.uk/maps/map/changelog.html).

It uses a Javascript library called [Leaflet](http://leafletjs.com/), which is really well documented and simple to use, and makes it easy to create map web sites such as this one.

## Can I use this map?

Yes, you're welcome to link to it.  If you want to link to a specific area zoom in to wherever you are interested in and click "permalink" in the top right-hand corner, and just copy the contents of the URL bar.

## Can I use these map tiles?

The map is actually composed of a series of map tiles, such as [this one](https://map.atownsend.org.uk/hot/13/4070/2627.png).  You can add these tiles as a layer to another map, provided that you link back to the map style somehow (e.g. by linking to this page) and credit OpenStreetMap on the map layer as described [here](https://www.openstreetmap.org/copyright).

What you are not allowed to do is any sort of bulk downloading (i.e. downloading more than you need to display on screen at once).

## Is this map accurate?

This data that this map uses is all added by contributors to the [OpenStreetMap](https://www.openstreetmap.org/) project .  In some areas it'll be significantly better than commercial or governmental alternatives, but in other places (with fewer OSM contributors) it won't be as good.  As with all maps, it may contain erors - because of that please don't infer that you have a legal right to do anything or go anywhere based on information shown on this map.  Also note that a particular route (e.g. [here](https://map.atownsend.org.uk/maps/map/map.html#zoom=17&lat=54.073544&lon=-2.13134)) may be safe to travel along at some times but not others (e.g. when a river is in spate), or only with suitable equipment.  Your safety and that of those with you is your responsibility.

## Is this map up to date?

Apart from the places shown at very low zoom levels, the data that this map uses is updated from OpenStreetMap data every few minutes.  Depending on what you're looking at, changes will either appear very nearly immediately (when you're zoomed in) or in a few days (zoomed out).  Nothing should be more than about 4 days old, though you may see cached tiles (either in your browser or from the server, while a new tile is being created).

## Something's wrong, how do I fix it?

You can update the data that this map uses by going to [https://www.openstreetmap.org/](https://www.openstreetmap.org/) and following the advice on [this page](https://www.openstreetmap.org/fixthemap).

## Can I change what the map looks like?

You can, but only by creating your version of the map using your own map tiles.  The [changelog](https://map.atownsend.org.uk/maps/map/changelog.html) contains some links at the top to the various parts of the map style in github - create an issue there if you've got further questions.

## If I use these map tiles, what will people know about me?

[I](https://www.openstreetmap.org/user/SomeoneElse) am the only person that I've set up to have access to the server.  If you request tiles then the normal Linux logs will record the fact (Apache's "access" log stores which IP address asked for a tile when, and the "syslog" stores details about new tiles being rendered).  The logs store data for about a week and then wrap around.  I can't comment on who might be watching traffic between you and the server (in Finland).  If you're particularly worried about people NOT knowing that you're requesting certain map tiles I recommend that you set up your own server and serve tiles from there instead.
