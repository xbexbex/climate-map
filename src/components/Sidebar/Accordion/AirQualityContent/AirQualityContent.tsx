import React from 'react'
import { Container } from '@mui/material'

import { LayerToggleControl } from '../AOAccordion'

const AirQualityContent = () => {
  return (
    <Container>
      <h2>Air pollution indicator - NO₂</h2>

      <LayerToggleControl layerId="no2" label="Show on map" />

      <p>Burning of fossil fuel creates oir pollutants such as NO₂ and small particles.</p>

      <strong>Air cleanliness</strong>

      <p>
        The satellite NO₂ data is based on Sentinel 5P measurements and is updated approximately once per 24 hours for
        any given location. A healthy threshold of NO₂ is around 50 umol/m<sup>2</sup>.
      </p>
    </Container>
  )
}

export default AirQualityContent
