const MAP_WIDTH = 650;
const MAP_HEIGHT = 450;
const MAP_LAYER = 'map';

export default function getMapUrl(coordinates, zoom) {
  const mapQuery = [
    `size=${MAP_WIDTH},${MAP_HEIGHT}`,
    `l=${MAP_LAYER}`,
    `ll=${coordinates.join(',')}`,
    `z=${zoom}`,
    `pt=${coordinates},pm2gnl`,
  ];

  return `https://static-maps.yandex.ru/1.x/?${mapQuery.join('&')}`;
}
