ymaps.ready(init);

function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.758468, 37.601088],
      zoom: 15,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",

      geolocationControlPosition:  {
        top: mapElem.offsetHeight / 2 + 'px',
        right: "20px"
      },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: {
        top: mapElem.offsetHeight / 2 - 80 + 'px',
        right: "20px"
      }
    }
  )


  myMap.behaviors.disable('scrollZoom')

  const myPlacemark = new ymaps.Placemark(
    [55.758468, 37.601088],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'https://i.postimg.cc/VsJ0KdR0/Group-68.png',
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -40],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  setTimeout(() => {
    myMap.container.fitToViewport();
  }, 5000);


}
