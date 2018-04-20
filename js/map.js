
/*
 *  map - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

CallMap = function(_parentElement, _data, _mapPosition) {

	this.parentElement = _parentElement;
	this.data = _data;
	this.mapPosition = _mapPosition;

	this.initVis();
}


/*
 *  Initialize map
 */

CallMap.prototype.initVis = function() {
	var vis = this;

	// Initialize leaflet map centered on coords
	vis.callMap = L.map('call-map').setView([vis.mapPosition[0], vis.mapPosition[1]], 13);

	L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 15,
			minZoom: 13
			})
	 .addTo(vis.callMap);


	// If the images are in the directory "/img":
    L.Icon.Default.imagePath = 'img/';

	// Defining an icon class with general options
	vis.LeafIcon = L.Icon.extend({
	     options: {
	         shadowUrl: 'img/marker-shadow.png',
	         iconSize: [15, 25],
	         iconAnchor: [7, 25],
	         popupAnchor: [0, -28]
	} });

	vis.location = new vis.LeafIcon({ iconUrl:  'img/marker-yellow.png' });

	vis.wrangleData();
}


/*
 *  Data wrangling
 */

CallMap.prototype.wrangleData = function() {
	var vis = this;

	// Currently no data wrangling/filtering needed
	vis.displayData = vis.data;

	// Update the visualization
	vis.updateVis();

}


/*
 *  The drawing function
 */

CallMap.prototype.updateVis = function() {
	var vis = this;

	// Add empty layer groups for the markers / map objects
	vis.calls = L.layerGroup().addTo(vis.callMap);

	// vis.displayData.forEach(function(d) {
	// 	// Create a marker and bind a popup with a particular HTML content
	// 	var location = L.marker([d.geometry[1],d.geometry[0]], { 
	// 		icon: vis.location
	// 	  })
	// 	  .bindPopup(d.createdAt + "<br>Code: " + d.code + " / Type: " + d.type);

	// 	vis.calls.addLayer(location);
	// });

	console.log(vis.calls);
}
