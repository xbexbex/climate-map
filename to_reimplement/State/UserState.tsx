'use client'

import React, { createContext, useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

import { MapContext } from '#/components/Map'
import { UiStateContext } from './UiState'
import { VerificationStatus } from '#/types/state'
// const claimHashes = {
//     valio: '75e3e7c68bffb0efc8f893345bfe161f77175b8f9ce31840db93ace7fa46f3db',
// }

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const defaultUserLayers = { vipu: false }
const defaultPrivateLayers = { 'valio-carbon-grass-fields': false }

export const UserStateContext = createContext({})

export const UserStateProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [userIntegrations, setUserIntegrations] = useState(null)
  const [userLayers, setUserLayers] = useState(defaultUserLayers)
  const [privateLayers, setPrivateLayers] = useState(defaultPrivateLayers)
  const [verificationTimeout, setVerificationTimeout] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('unverified')
  const [hasInitialized, setHasInitialized] = useState(false)

  const { setSignupFunnelStep }: any = React.useContext(UiStateContext)
  const { enablePersonalDataset, disablePersonalDataset }: any = React.useContext(MapContext)

  const storeToken = (token, expires) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expires', expires)
  }

  const logout = () => {
    localStorage.getItem('token') && localStorage.removeItem('token')
    localStorage.getItem('expires') && localStorage.removeItem('expires')

    for (const key in userLayers) {
      if (userLayers[key]) {
        disablePersonalDataset(key)
      }
    }

    for (const key in privateLayers) {
      if (privateLayers[key]) {
        disablePersonalDataset(key)
      }
    }

    setUserLayers(defaultUserLayers)
    setPrivateLayers(defaultPrivateLayers)

    setIsLoggedIn(false)
    setUserIntegrations(null)
    setUserProfile(null)
    setVerificationStatus('unverified')
    window.location.reload()
  }

  const startVerificationTimeout = (time: number) => {
    setVerificationTimeout(time)

    setTimeout(() => {
      if (time > 0) {
        startVerificationTimeout(time - 1)
      }
    }, 1000)
  }

  const checkAuth = () => {
    if (localStorage.getItem('token') && localStorage.getItem('expires')) {
      if (Date.now() < parseInt(localStorage.getItem('expires'))) {
        !isLoggedIn && setIsLoggedIn(true)
        return true
      }
    }
    isLoggedIn && logout()
    !hasInitialized && setHasInitialized(true)

    return false
  }

  const login = async (values) => {
    try {
      const res = await axios.post(apiUrl + '/login', values)
      if (res.status === 200) {
        storeToken(res.data.token, res.data.expires)
        return checkAuth()
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const signup = async (values) => {
    try {
      const res = await axios.post(apiUrl + '/signup', values)

      if (res.status === 200) {
        storeToken(res.data.token, res.data.expires)

        return checkAuth()
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get(apiUrl + '/user/profile', {
        params: { token: localStorage.getItem('token') },
      })

      if (res.status === 200) {
        setUserProfile(res.data)
        return res.data
      }
    } catch (error: any) {
      if (error.response.status && error.response.status === 404) {
        logout()
      }
      throw error.response
    }
  }

  const updateProfile = async (values) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'put',
        url: apiUrl + '/user/profile',
        params: {
          token: localStorage.getItem('token'),
        },
        data: values,
      }
      const res = await axios(config)

      if (res.status === 200) {
        setUserProfile(res.data)
        return res.data
      }
    } catch (error: any) {
      if (error.response.status && error.response.status === 404) {
        logout()
      }
      throw error.response
    }
  }

  const sendEmailVerification = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: apiUrl + '/user/verify',
        params: {
          token: localStorage.getItem('token'),
        },
      }
      const res = await axios(config)

      if (res.status === 200) {
        startVerificationTimeout(30)
        setVerificationStatus('emailSent')
      }

      return res.status
    } catch (error: any) {
      setVerificationTimeout(0)
      setVerificationStatus('emailErrored')
      throw error.response
    }
  }

  const verifyEmail = async (token) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: apiUrl + '/verify',
        params: {
          token,
        },
      }
      const res = await axios(config)

      if (res.status === 200) {
        setVerificationStatus('verified')
      }

      setVerificationStatus('errored')
      return res.status
    } catch (error: any) {
      if (error.response.status && error.response.status === 409) {
        setVerificationStatus('verified')
      } else {
        setVerificationStatus('errored')
      }
      throw error.response
    }
  }

  const fetchIntegrations = async () => {
    try {
      const res = await axios.get(apiUrl + '/user/integration', {
        params: { token: localStorage.getItem('token') },
      })

      if (res.status === 200) {
        setUserIntegrations(res.data)
        return res.data
      }
    } catch (error: any) {
      if (error.response.status && error.response.status === 404) {
        logout()
      }
      throw error.response
    }
  }

  const createIntegration = async (integrationType, values) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: apiUrl + '/user/integration/' + integrationType,
        params: {
          token: localStorage.getItem('token'),
        },
        data: values,
      }

      const res = await axios(config)

      if (res.status === 200) {
        const newUserIntegrations = { ...userIntegrations, ...res.data }
        setUserIntegrations(newUserIntegrations)
        return res.data
      }
    } catch (error: any) {
      if (error.response.status && error.response.status === 404) {
        logout()
      }
      if (error.response.status === 409) {
        const data = await fetchIntegrations()
        return data.integrationType
      }
      throw error.response
    }
  }

  const updateIntegration = async (integrationType, values) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'put',
        url: apiUrl + '/user/integration/' + integrationType,
        params: {
          token: localStorage.getItem('token'),
        },
        data: values,
      }

      const res = await axios(config)

      if (res.status === 200) {
        const newUserIntegrations = { ...userIntegrations, ...res.data }
        setUserIntegrations(newUserIntegrations)
        return res.data
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const deleteIntegration = async (integrationType) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'delete',
        url: apiUrl + '/user/integration/' + integrationType,
        params: {
          token: localStorage.getItem('token'),
        },
      }

      const res = await axios(config)

      if (res.status === 200) {
        const newUserIntegrations = { ...userIntegrations }
        delete newUserIntegrations[integrationType]
        setUserIntegrations(newUserIntegrations)
        return newUserIntegrations
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const initDataAuth = async (integrationType) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: apiUrl + '/user/integration/' + integrationType + '/auth',
        params: {
          token: localStorage.getItem('token'),
        },
      }

      const res = await axios(config)

      if (res.status === 200) {
        return res.data.authLink
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const fetchDataAuthStatus = async (integrationType) => {
    try {
      const res = await axios.get(apiUrl + '/user/integration/' + integrationType + '/auth', {
        params: { token: localStorage.getItem('token') },
      })

      if (res.status === 200) {
        return res.data.authStatus
      }
    } catch (error: any) {
      throw error.response
    }
  }

  const fetchSource = async (sourceName) => {
    try {
      const res = await axios.get(apiUrl + '/user/data', {
        params: {
          file: sourceName,
          token: localStorage.getItem('token'),
        },
      })

      if (res.status === 200) {
        return res.data
      }
    } catch (error: any) {
      throw error.response
    }
  }

  useEffect(() => {
    if (userProfile && isLoggedIn && userIntegrations !== null && !hasInitialized) {
      setHasInitialized(true)
      setSignupFunnelStep(userProfile.funnelState)
    }
    if (userProfile && userProfile.emailVerified === 1 && verificationStatus !== 'verified') {
      setVerificationStatus('verified')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, userIntegrations])

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile()
      fetchIntegrations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userIntegrations) {
      const newUserLayers = { ...userLayers }
      const newPrivateLayers = { ...privateLayers }

      for (const integration in userIntegrations) {
        if (Object.keys(defaultUserLayers).includes(integration)) {
          if (userIntegrations[integration].integrationStatus === 'integrated' && !userLayers[integration]) {
            enablePersonalDataset(integration, localStorage.getItem('token'))
            newUserLayers[integration] = true
          } else if (userIntegrations[integration].integrationStatus !== 'integrated' && userLayers[integration]) {
            disablePersonalDataset(integration)
            newUserLayers[integration] = false
          }
        } else if (Object.keys(defaultPrivateLayers).includes(integration)) {
          if (userIntegrations[integration].integrationStatus === 'integrated' && !privateLayers[integration]) {
            enablePersonalDataset(integration, localStorage.getItem('token'))
            newPrivateLayers[integration] = true
          } else if (userIntegrations[integration].integrationStatus !== 'integrated' && privateLayers[integration]) {
            disablePersonalDataset(integration)
            newPrivateLayers[integration] = false
          }
        }
      }

      setUserLayers(newUserLayers)
      setPrivateLayers(newPrivateLayers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIntegrations])

  // useEffect(() => {
  //     getUser(props.userRef);
  //     getMerchant(props.merchantId);
  //     if (props.chatId && !messages) {
  //         getMessages(props.chatId);
  //         getChat(props.chatId);
  //     }
  // }, []);

  const values = {
    isLoggedIn,
    logout,
    login,
    signup,
    fetchProfile,
    updateProfile,
    fetchIntegrations,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    userProfile,
    userIntegrations,
    userLayers,
    privateLayers,
    initDataAuth,
    fetchDataAuthStatus,
    fetchSource,
    verificationTimeout,
    sendEmailVerification,
    verifyEmail,
    hasInitialized,
    verificationStatus,
  }

  return <UserStateContext.Provider value={values}>{props.children}</UserStateContext.Provider>
}

// const initAuth = function (claims = []) {
//     let idToken;
//     let accessToken;
//     let expiresAt: any;

//     function isLoggedIn() {
//         // Check whether the current time is past the
//         // Access Token's expiry time
//         const expiration = parseInt(expiresAt, 10) || 0;
//         return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
//     }

//     function displayButtons() {
//         const auth = isLoggedIn();
//         loginBtn.hidden = auth
//         logoutBtn.hidden = !auth
//     }

//     function handleAuthentication() {
//         webAuth.parseHash(function (err, authResult) {
//             if (authResult && authResult.accessToken && authResult.idToken) {
//                 window.location.hash = '';
//                 localLogin(authResult);
//             } else if (err) {
//                 console.log('ERROR in webAuth.parseHash:', err);
//             }
//             displayButtons();
//         });
//     }

//     function localLogin(authResult) {
//         const payload = authResult.idTokenPayload

//         const roles = payload['https://server.avoin.org/data/map/roles'] || [];
//         enablePrivateDatasets(roles);

//         // Set isLoggedIn flag in localStorage
//         localStorage.setItem('isLoggedIn', 'true');
//         // Set the time that the access token will expire at
//         expiresAt = JSON.stringify(
//             authResult.expiresIn * 1000 + new Date().getTime()
//         );
//         accessToken = authResult.accessToken;
//         idToken = authResult.idToken;

//         localStorage.setItem('authResult', JSON.stringify(authResult));

//         displayButtons();
//     }

//     function renewTokens(authorizeParams1) {
//         const authResult = JSON.parse(localStorage.getItem('authResult'));

//         if (authResult) {
//             localLogin(authResult);
//             if (isLoggedIn()) return;
//         }

//         webAuth.checkSession(authorizeParams1, (err, authResult1) => {
//             if (authResult1 && authResult1.accessToken && authResult1.idToken) {
//                 localLogin(authResult1);
//             } else if (err) {
//                 console.log('webAuth.checkSession: Could not get a new token', err.error, err.error_description);
//                 logout();
//             }
//         });
//     }

//     function logout() {
//         // Remove isLoggedIn flag from localStorage
//         localStorage.removeItem('authResult');
//         localStorage.removeItem('isLoggedIn');
//         // Remove tokens and expiry time
//         accessToken = '';
//         idToken = '';
//         expiresAt = 0;

//         displayButtons();
//     }

//     // @ts-ignore External dependency
//     const webAuth = new auth0.WebAuth({
//         domain: process.env.AUTH0_DOMAIN,
//         clientID: process.env.AUTH0_CLIENT_ID,
//         responseType: 'token id_token',
//         scope: 'openid email',
//         redirectUri: window.location.href
//     });

//     const loginBtn = document.getElementById('btn-login');
//     const logoutBtn = document.getElementById('btn-logout');
//     if (!loginBtn) return // A version without login

//     const authorizeParams = claims.length > 0 ? { roleclaims: claims } : {};
//     loginBtn.addEventListener('click', function (e) {
//         e.preventDefault();
//         webAuth.authorize(authorizeParams);
//     });

//     logoutBtn.addEventListener('click', logout);

//     if (localStorage.getItem('isLoggedIn') === 'true') {
//         renewTokens(authorizeParams);
//     } else {
//         handleAuthentication();
//     }
//     displayButtons();
// }

// interface IHashParams {
//     codes?: string
// }
// const initAuthWithClaims = function () {
//     const hashParams: IHashParams = location.hash.replace(/^[#?]*/, '').split('&').reduce((prev, item) => (
//         Object.assign({ [item.split('=')[0]]: item.split('=')[1] }, prev)
//     ), {});

//     if (!hashParams || !hashParams.codes) return initAuth();

//     const claims = hashParams.codes.split(',');
//     let claimsOK = 0;
//     claims.forEach(claim => {
//         const key = claim.split('-')[0];
//         if (sha256(claim) === claimHashes[key]) { claimsOK++; }
//     })
//     if (claims.length === claimsOK) {
//         window.location.hash = '';
//         initAuth(claims);
//     } else {
//         window.alert(`Invalid codes for private datasets: ${claims.join(", ")}`);
//     }
// }

// window.addEventListener('load', initAuthWithClaims);
