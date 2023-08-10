import { map, uniq } from 'lodash-es'

import { getColorExpressionArrForValues } from '#/common/utils/map'
import { ExtendedMbStyle, SerializableLayerConf } from '#/common/types/map'

export const getPlanLayerGroupId = (planId: string) => {
  return `${planId}_zoning_plan`
}

export const createLayerConf = (
  json: any,
  planId: string,
  featureColorCol: string
) => {
  const uniqueVals = uniq(map(json.features, 'properties.' + featureColorCol))
  const colorArr = getColorExpressionArrForValues(uniqueVals)

  const sourceId = getPlanLayerGroupId(planId)

  const style: ExtendedMbStyle = {
    version: 8,
    sources: {
      [sourceId]: {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: json,
      },
    },
    layers: [
      {
        id: `${sourceId}-outline`,
        type: 'line',
        source: sourceId,
        paint: {
          'line-opacity': 0.9,
        },
      },
      {
        id: `${sourceId}-fill`,
        type: 'fill',
        source: sourceId, // reference the data source
        layout: {},
        paint: {
          'fill-color': [
            'match',
            ['get', featureColorCol],
            ...colorArr,
            'white',
          ],
          'fill-opacity': 0.7,
        },
      },
      {
        id: `${sourceId}-symbol`,
        source: sourceId,
        type: 'symbol',
        layout: {
          'symbol-placement': 'point',
          'text-size': 20,
          'text-font': ['Open Sans Regular'],
          'text-field': [
            'case',
            ['has', featureColorCol],
            ['get', featureColorCol],
            '',
          ],
        },
        paint: {
          'text-color': '#999',
          'text-halo-blur': 1,
          'text-halo-color': 'rgb(242,243,240)',
          'text-halo-width': 2,
        },
        minzoom: 12,
      },
    ],
  }

  const layerConf: SerializableLayerConf = {
    id: sourceId,
    style: style,
    useMb: true,
  }

  return layerConf
}
