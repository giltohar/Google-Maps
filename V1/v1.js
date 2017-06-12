var map;

function initMap(){
  // Constructor creates a new map - only center and zoom are required
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.74135, lng: -73.9980244},
    zoom: 15
  });
  // each object in array is: {title: '', location: {lat: real, lng: real}}
  const locations = [{title: 'google offices', location: {lat: 40.74135, lng: -73.9980244}}];
  // these will be corresponding markers for each location
  var markers = [];
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  // setting a marker for (var i = 0; i < array.length; i++) {
      array[i]
  } each location using iteration
  for (var i=0; i< locations.length; i++) {
    // get the position of the location in the form of {lat: real, lng: real}
    var position = locations[i].location;
    var title = locations[i].title;
    //create marker for current location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // push this marker to the array of markers
    markers.push(marker);
    // extend the boundaries of the map for each other
    bounds.extend(marker.position);
    // create an onclick event to open an infowindow for each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    })
  }
  map.fitBounds(bounds);

  // this function populates the infowindow where the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position
  function populateInfoWindow(marker, infowindow){
    // check to make sure the infowindow is not already open
    if (infowindow.marker != marker){
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '<div>');
      infowindow.open(map, marker);
      // make sure the marker property is cleared if the window is closed
      infowindow.addListener('closeClick', function() {
        infowindow.setMarker(null);
      });
    }
  }
}
