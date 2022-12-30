// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type EmployeeLayoutType = {
  id: string | undefined
}

export type EmployeeRole = {
  id: string,
  code: "ADMIN" | "MANAGER" | "INSPECTOR"
}

export interface IEmployeeRoleIcons {
  [key: string]: JSX.Element
}

export type EmployeeType = {
  id: string
  role: EmployeeRole
  role_code: EmployeeRole['code']
  phone: string
  batchId: string
  gender: string
  email: string
  status: string
  profile_picture: string
  image: string
  company: string
  country: string
  contact: string
  fullName: string
  first_name: string
  last_name: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}
