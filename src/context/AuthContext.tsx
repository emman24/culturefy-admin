// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

import { AuthServices, CompanyServices } from 'src/services'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  ISignupFormValues,
  ICompanyFormValues
} from './types'

// ** Third Party Imports
import toast from 'react-hot-toast'

const steps = [
  {
    title: 'Create Account',
    subtitle: 'Add Persnol Details'
  },
  {
    title: 'Create Company',
    subtitle: 'Add Company Details'
  },
  {
    title: 'Subscriptions',
    subtitle: 'Pick a plan that works best for you'
  }
]

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  createAccount: () => Promise.resolve(),
  createCompany(body, errorCallback?) {},
  // Signup related
  activeStep: 0,
  steps,
  handleBack: () => Promise.resolve(),
  handleNext: () => Promise.resolve(),
  handleReset: () => Promise.resolve(),

  // API status
  status: 'idle',
  // @ts-ignore
  setStatus: () => ''
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [userTmp, setUserTmp] = useState<UserDataType | null>(defaultProvider.user)
  const [accessTokenTmp, setAccessTokenTmp] = useState<string | null>('')

  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [status, setStatus] = useState<AuthValuesType['status']>('idle')
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)
  const [activeStep, setActiveStep] = useState<number>(defaultProvider.activeStep) // signup step form

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true)

      // const ddd = window.localStorage.getItem(authConfig.storageTokenKeyName)
      // console.log('====================================');
      // console.log("initAuth", ddd);
      // console.log('====================================');
      // AuthServices.me()
      //   .then((data) => {
      //     console.log('====================================');
      //     console.log("initAuth", data);
      //     console.log('====================================');
      //   })
      //   .catch((error) => {
      //     console.log('====================================');
      //     console.log("initAuth", error.response);
      //     console.log('====================================');
      //   })

      setIsInitialized(true)

      const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const refreshToken = window.localStorage.getItem(authConfig.refreshTokenKeyName)
      const user = JSON.parse(window.localStorage.getItem('userData') || '{}')

      // console.log('====================================');
      // console.log(user);
      // console.log('====================================');
      // console.log(accessToken);
      // console.log('====================================');
      // console.log(refreshToken);
      // console.log('====================================');

      if (accessToken && refreshToken && user) {
        saveLogin({ accessToken, refreshToken, user })
      }

      //   if (storedToken) {
      //     setLoading(true)
      //     await axios
      //       .get(authConfig.meEndpoint, {
      //         headers: {
      //           Authorization: storedToken
      //         }
      //       })
      //       .then(async response => {
      //         setLoading(false)
      //         setUser({ ...response.data.userData })
      //       })
      //       .catch(() => {
      //         localStorage.removeItem('userData')
      //         localStorage.removeItem('refreshToken')
      //         localStorage.removeItem('accessToken')
      //         setUser(null)
      //         setLoading(false)
      //       })
      //   } else {
      //   }
      setLoading(false)
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.login(params)
      .then(async ({ data: response }) => {
        console.log('==========Login data================')
        console.log(response)
        console.log('====================================')

        saveLogin({
          accessToken: response.data.tokens.accessToken || '',
          refreshToken: response.data.tokens.refreshToken || '',
          user: response.data.user
        })
        setStatus('success')
      })
      .catch(error => {
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.refreshTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const handleCreateAccount = async (body: ISignupFormValues, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    delete body.confirm_password
    delete body.API_ERROR
    try {
      const { data } = await AuthServices.signup(body)

      setUserTmp(data.data.user)
      setAccessTokenTmp(data.data.tokens.accessToken)

      window.localStorage.setItem(authConfig.storageTokenKeyName, data.data.tokens.accessToken)

      setStatus('success')
      handleNext()
    } catch (error: any) {
      setStatus('error')
      toast.error(error?.response?.data?.message || 'Something went wrong!')
      if (errorCallback) errorCallback(error?.response?.data)
    }
  }

  const handleCreateCompany = async (body: ICompanyFormValues, errorCallback?: ErrCallbackType) => {
    delete body.API_ERROR
    setStatus('pending')
    try {
      const { data } = await CompanyServices.add(body, {
        Authorization: `Bearer ${accessTokenTmp}`
      })
      console.log('====================================')
      console.log(accessTokenTmp)
      console.log(data.data.company)
      console.log('====================================')

      // saveLogin({
      //   accessToken: accessTokenTmp || "",
      //   refreshToken: accessTokenTmp || "",
      //   user: userTmp
      // })
      setStatus('success')
      handleNext()
    } catch (error: any) {
      setStatus('error')
      toast.error(error?.response?.data?.message || 'Something went wrong!')
      if (errorCallback) errorCallback(error?.response?.data)
    }
  }

  // Handle Stepper Back
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  // Handle Stepper Next
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Stepper Reset all process
  const handleReset = () => {
    setActiveStep(0)
  }

  const saveLogin = ({ accessToken, refreshToken, user }: { accessToken: string; refreshToken: string; user: any }) => {
    // save token in localStorage
    window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
    window.localStorage.setItem(authConfig.refreshTokenKeyName, refreshToken)

    const returnUrl = router.query.returnUrl

    console.log('=========returnUrl===========================')
    console.log(returnUrl)
    console.log('====================================')

    setUser(user)
    window.localStorage.setItem('userData', JSON.stringify(user))

    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard/'

    router.replace(redirectURL as string)
  }

  const values = {
    user,
    loading,
    activeStep,
    steps,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    createAccount: handleCreateAccount,
    createCompany: handleCreateCompany,
    handleBack,
    handleNext,
    handleReset,
    status,
    setStatus
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
