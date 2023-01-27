import React from 'react'
import { Box } from '@mui/system'

import { MapContext } from '#/components/Map'
import { OverlayMessage } from '#/common/types/map'

export const OverlayMessages = ({ message }: { message: OverlayMessage | null }) => {
  const { activeLayerGroupIds } = React.useContext(MapContext)

  let isActive = false

  if (message != null) {
    // If the the message has no layerGroupId specified, it is always active.
    if (message.layerGroupId == null) {
      isActive = true
    } else if (activeLayerGroupIds.filter((x: any) => x === message.layerGroupId).length > 0) {
      isActive = true
    }
  }

  if (!isActive) return null

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          padding: '10px',
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: '2000',
        }}
      >
        {message && message.message}
      </Box>
    </Box>
  )
}