(function(){
  $('button').on('click', function() {
    // verificar si soporta geolocation
    var output = document.getElementById('map');
    if (navigator.geolocation) {
        output.innerHTML = '<p>tu navegador soporta geolocation</p>'
    } else {
      output.innerHTML = '<p>tu navegador No soporta geolocation</p>'
    }
        
    // obtenemos latitud y longitud
    function localization(posicion) {
      var latitude = posicion.coords.latitude;
      var longitude = posicion.coords.longitude;
      output.innerHTML = '<p>latitud:' + latitude + '<br>' + 'longitud:' + longitude + '</p>'
    }

    function error() {
      output.innerHTML = '<p>no se pudo obtener tu ubicación</p>'
    }

    navigator.geolocation.getCurrentPosition(localization,error)
  });

})(jQuery);