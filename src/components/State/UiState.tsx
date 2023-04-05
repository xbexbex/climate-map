'use client'

import React, { createContext, useState, useRef, SyntheticEvent } from 'react'
import { Box, SnackbarCloseReason } from '@mui/material'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { ProfileState, ModalState, NotificationMessage } from '#/common/types/state'

const Notification = (props: NotificationMessage) => {
  const [open, setOpen] = useState(true)

  const handleClose = (_event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={props.duration} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={props.severity}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  )
}

interface IUIContext {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
  isSidebarDisabled: boolean
  setIsSidebarDisabled: (value: boolean) => void
  isMapPopupOpen: boolean
  setIsMapPopupOpen: (value: boolean) => void
  profileState: ProfileState
  setProfileState: (value: ProfileState) => void
  modalState: ModalState
  setModalState: (value: ModalState) => void
  signupFunnelStep: number
  setSignupFunnelStep: (value: number) => void
  notifications: NotificationMessage[]
  notify: (message: NotificationMessage) => void
}

export const UiStateContext = createContext({} as IUIContext)

export const UiStateProvider = (props: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMapPopupOpen, setIsMapPopupOpen] = useState(true)
  const [isSidebarDisabled, setIsSidebarDisabled] = useState(false)
  const [profileState, setProfileState] = useState<ProfileState>('none')
  const [modalState, setModalState] = useState<ModalState>('none')
  // const [profileMessage, setProfileMessage] = useState(null);
  const [signupFunnelStep, setSignupFunnelStep] = useState(0)
  const [notifications, setNotifications] = useState<any>({})

  const notificationsRef = useRef(notifications)
  notificationsRef.current = notifications

  const notify = ({ message, severity, duration = 6000 }: NotificationMessage) => {
    const newNotification: any = {}
    const index = new Date().getTime()

    newNotification[index] = {
      message,
      severity,
      duration,
    }

    setNotificationTimeout(index, duration + 1000)

    setNotifications((notifications: any) => {
      return { ...notifications, ...newNotification }
    })
  }

  const setNotificationTimeout = (index: number, timeout: number) => {
    setTimeout(async () => {
      const newNotifications: any = { ...notificationsRef.current }
      delete newNotifications[index]
      setNotifications(newNotifications)
    }, timeout)
  }

  const handleSetModalState = (state: ModalState) => {
    setModalState(state)
    setIsSidebarDisabled(state !== 'none')
  }

  const handleSetProfileState = (state: ProfileState) => {
    setProfileState(state)

    if (state !== 'none') {
      setModalState('profile')
    } else {
      setModalState('none')
    }

    setIsSidebarDisabled(state !== 'none')
  }

  const values: IUIContext = {
    isSidebarOpen,
    setIsSidebarOpen,
    isMapPopupOpen,
    setIsMapPopupOpen,
    isSidebarDisabled,
    setIsSidebarDisabled,
    profileState,
    setProfileState: handleSetProfileState,
    modalState,
    setModalState: handleSetModalState,
    signupFunnelStep,
    setSignupFunnelStep,
    notifications,
    notify,
    // profileMessage,
    // setProfileMessage,
  }

  return (
    <UiStateContext.Provider value={values}>
      {props.children}
      <Box
        sx={(theme) => ({
          width: '100%',
          zIndex: 3000,
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        })}
      >
        {Object.keys(notifications).map((key) => {
          return (
            <Notification
              key={key}
              message={notifications[key].message}
              severity={notifications[key].severity}
              duration={notifications[key].duration}
            />
          )
        })}
      </Box>
    </UiStateContext.Provider>
  )
}
