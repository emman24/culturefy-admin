export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: { id: string, code: string }
  email: string
  name: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  createAccount: (body: ISignupFormValues, errorCallback?: ErrCallbackType) => void,
  createCompany: (body: ICompanyFormValues, errorCallback?: ErrCallbackType) => void,
  // Signup related 
  activeStep: number
  steps: { title: string; subtitle: string }[]
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;

  // API status
  status: 'idle' | 'pending' | 'success' | 'error'
}

export interface ISignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password?: string;
  gender: string;
  API_ERROR?: {};
}

export interface ICompanyFormValues {
  name: string;
  email: string;
  address: string;
  API_ERROR?: {};
}