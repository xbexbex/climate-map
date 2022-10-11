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
import metsaanEteBasic from './Biodiversity/metsaanEteBasic'
import metsaanEteImportant from './Biodiversity/metsaanEteImportant'
import zonation from './Biodiversity/zonation'
import natura2000 from './Biodiversity/natura2000'
import hansen from './Forests/hansen'
import finlandMatureForests from './Forests/finlandMatureForests'

export const layerConfs = [
  buildingEnergyCertificates,
  snowCoverLoss,
  airQuality,
  hsySolarpotential,
  helsinkiBuildings,
  finlandBogs,
  ciforPeatlands,
  ciforWetlands,
  metsaanEteBasic,
  metsaanEteImportant,
  zonation,
  natura2000,
  hansen,
  finlandMatureForests,
]