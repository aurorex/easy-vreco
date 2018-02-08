(function($) {
  var directionsDisplay = '';
  var directionsService = new google.maps.DirectionsService();
  var map = '';
  
  var initialize = () => {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var coordinates = new google.maps.LatLng(53.401686, -2.165961);
    var mapOptions = {
      zoom: 10,
      center: coordinates
    }
    new google.maps.places.Autocomplete(document.querySelector('#start'));
    new google.maps.places.Autocomplete(document.querySelector('#end'));

    map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  }
  
  var searchRoute = () => {
    var inputStart = document.querySelector('#start').value;
    var inputend = document.querySelector('#end').value;
    var request = {
      origin: inputStart,
      destination: inputend,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Lo sentimos,no se pudo identificar una ruta entre estas ubicaciones');
      }
    });
  }

  var buttonRoute = document.querySelector('#route');
  buttonRoute.addEventListener('click', searchRoute);

  google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery);   