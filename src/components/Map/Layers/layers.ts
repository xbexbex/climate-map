// Exports the layer configurations to the Map component.

import buildingEnergyCertificates from './Buildings/buildingEnergyCertificates'
// import finlandBuildings from './Buildings/finlandBuildings'
import hsySolarpotential from './Buildings/hsySolarpontential'
import helsinkiBuildings from './Buildings/helsinkiBuildings'
import snowCoverLoss from './SnowCoverLoss/snowCoverLoss'
import airQuality from './AirQuality/airQuality'
import finlandBogs from './Wetlands/finlandBogs'
import ciforPeatlands from './Wetlands/ciforPeatlands'
import ciforWetlands from './Wetlands/ciforWetlands'
import metsaanEte from './Biodiversity/metsaanEte'

const layerConfs = [
  buildingEnergyCertificates,
  snowCoverLoss,
  airQuality,
  hsySolarpotential,
  helsinkiBuildings,
  finlandBogs,
  ciforPeatlands,
  ciforWetlands,
  metsaanEte,
]

export default layerConfs
