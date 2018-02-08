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


  google.maps.event.addDomListener(window, 'load', initialize);
  })(jQuery); 