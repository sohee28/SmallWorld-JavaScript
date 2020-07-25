var L;

window.onload = function() {
  L.mapquest.key = 'yWWpsJFQtzqqmkijjhwXvdpA5MR7MiYJ';

  // 'map' refers to a <div> element with the ID map
  var map = L.mapquest.map('map', {
    center: [61.190610, -149.858724],
    layers: L.mapquest.tileLayer('light'),
    zoom: 15
  });

  map.addControl(L.mapquest.control());

  L.marker([61.190610, -149.858724], {
    icon: L.mapquest.icons.marker({
      primaryColor: '#7C7877',
      secondaryColor: '#D9D4CF',
      shadow: true,
      size: 'md'
    })
  })
  .bindPopup('3230 Latouche St')
  .addTo(map);
}