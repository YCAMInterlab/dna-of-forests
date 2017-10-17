var ua = navigator.userAgent;
if((ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
  // do nothing
}
else if((ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)){
  // TODO 正規表現でwidthだけ変える
  document.querySelector('head>meta[name="viewport"]').setAttribute('content','width=1050');
}

var mapOptions = {
  mapTypeId: 'satellite',
  disableDefaultUI: true,
  type: false,
  zoomControl: false
};
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
map.setTilt(45);

var initMap = function(guides, locale){
  // 表示領域の調整
  var bounds = new google.maps.LatLngBounds();
  for(var prop in guides) {
    bounds.extend (guides[prop].position);
  }
  map.fitBounds (bounds);


  for(var _prop in guides) {
    var b = guides[_prop];
    var marker = new google.maps.Marker({
      position: b.position,
      map: map,
      title: b.title[locale]
    });
    marker.addListener('click', function() {
      location.href = b.link[locale];
    });
  }
};

var guides = {
  niho: {
    title: {
      ja: '仁保の森 2016',
      en: 'Forest of Niho 2016'
    },
    link: {
      ja: '/dna-of-forests/niho/',
      en: '/dna-of-forests/niho/en/'
    },
    position: new google.maps.LatLng(34.2505833, 131.5789502)
  },
  kumano: {
    title: {
      ja: '熊野の森 2017',
      en: 'Forest of Kumano 2017',
    },
    link: {
      ja: '/dna-of-forests/kumano/',
      en: '/dna-of-forests/kumano/en/'
    },
    position: new google.maps.LatLng(34.170286, 131.461427)
  }
};

const locale = location.pathname == '/dna-of-forests/' ? 'ja' : 'en';
initMap(guides, locale);
