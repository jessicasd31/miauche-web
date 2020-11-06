import Leaflet from 'leaflet';

import mapMarkerImg from './local.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [48, 58],
  iconAnchor: [24, 58],
  popupAnchor: [140, 10]
})

export default mapIcon;