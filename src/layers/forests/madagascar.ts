import { addSource, addLayer } from '../../layer_groups'

addSource('madagascar-2017-mosaic', {
    "type": 'raster',
    'tiles': ['https://map.buttonprogram.org/madagascar-mosaic/{z}/{x}/{y}.png?v=0'],
    'tileSize': 512,
    "minzoom": 0,
    "maxzoom": 13,
    // bounds: [-27, 37, -9, 54], // Madagascar
});

addLayer({
    'id': 'madagascar-2017-mosaic-raster',
    'source': 'madagascar-2017-mosaic',
    'type': 'raster',
    BEFORE: 'FILL',
});
