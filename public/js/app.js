'use strict';

(function ($) {
  var directionsDisplay = '';
  var directionsService = new google.maps.DirectionsService();
  var map = '';

  var initialize = function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var coordinates = new google.maps.LatLng(53.401686, -2.165961);
    var mapOptions = {
      zoom: 10,
      center: coordinates
    };
    new google.maps.places.Autocomplete(document.querySelector('#start'));
    new google.maps.places.Autocomplete(document.querySelector('#end'));

    map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  };

  var searchRoute = function searchRoute() {
    var inputStart = document.querySelector('#start').value;
    var inputend = document.querySelector('#end').value;
    var request = {
      origin: inputStart,
      destination: inputend,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Lo sentimos,no se pudo identificar una ruta entre estas ubicaciones');
      }
    });
  };

  var buttonRoute = document.querySelector('#route');
  buttonRoute.addEventListener('click', searchRoute);

  var buttonFound = document.querySelector('#found');
  buttonFound.addEventListener('click', function () {
    // var output = document.querySelector('#my-ubication');

    var localization = function localization(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
    };

    var error = function error() {
      alert('no se pudo encontrar tu ubicación');
    };

    navigator.geolocation.getCurrentPosition(localization, error);
  });

  google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery);