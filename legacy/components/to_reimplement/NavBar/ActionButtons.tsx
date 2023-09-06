'use client'

import React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useUIStore } from '../../common/store'

const ActionButtons = () => {
  const modalState = useUIStore((state) => state.modalState)
  const setModalState = useUIStore((state) => state.setModalState)

  const handleLoginClick = () => {
    if (modalState === 'login') {
      setModalState('none')
    } else {
      setModalState('login')
    }
  }

  const handleSignupClick = () => {
    if (modalState === 'signup') {
      setModalState('none')
    } else {
      setModalState('signup')
    }
  }

  return (
    <Box sx={{ display: 'flex', overflow: 'visible' }}>
      <ActionButton
        color="secondary"
        onClick={handleSignupClick}
        variant={modalState === 'signup' ? 'contained' : 'outlined'}
        disableElevation
        disabled={true}
      >
        Sign up
      </ActionButton>
      <ActionButton
        color="secondary"
        onClick={handleLoginClick}
        variant={modalState === 'login' ? 'contained' : 'outlined'}
        disableElevation
        disabled={true}
      >
        Log in
      </ActionButton>
    </Box>
  )
}

const ActionButton = styled(Button)({
  height: 40,
  display: 'inline',
  width: 90,
  margin: '0 0 0 10px',
  fontSize: '0.9rem',
})

export default ActionButtons