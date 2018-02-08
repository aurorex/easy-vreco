(function($) {
  let directionsDisplay = '';
  let directionsService = new google.maps.DirectionsService();
  let map = '';

  let initialize = () => {
    directionsDisplay = new google.maps.DirectionsRenderer();
    let coordinates = new google.maps.LatLng(53.401686, -2.165961);
    let mapOptions = {
      zoom: 10,
      center: coordinates
    }
    new google.maps.places.Autocomplete(document.querySelector('#start'));
    new google.maps.places.Autocomplete(document.querySelector('#end'));

    map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  }

  let searchRoute = () => {
    let inputStart = document.querySelector('#start').value;
    let inputend = document.querySelector('#end').value;
    let request = {
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

  let buttonRoute = document.querySelector('#route');
  buttonRoute.addEventListener('click', searchRoute);

  let buttonFound = document.querySelector('#found');
  buttonFound.addEventListener('click', function() {

    var output = document.querySelector('#my-ubication');

    var localization = (position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var imgUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&size=600x300&makers=color:red%7C' + latitude + longitude + 'key=AIzaSyDyTMwJFSm3tf0ajjiOhzqqu4J2AKkGFFY';
    };
    output.innerHTML = '<img src"' + imgUrl + '">';

    var error = () => {
      alert('no se pudo encontrar tu ubicación');
    };

    navigator.geolocation.getCurrentPosition(localization, error);
  });

  google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery);
