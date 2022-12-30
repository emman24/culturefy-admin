
// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { EmployeeServices } from 'src/services'

// ** Types Imports
import { EmployeeType } from 'src/types/apps/employeeTypes'
import { ApiParams } from 'src/types/api'

interface DataParams extends Redux { }
// q: string
// role: string
// status: string
// currentPlan: string
// }

interface InitialState {
  employees: EmployeeType[] | [];
  employee: EmployeeType | {};
  total: number;
  params: {};
  allData: never[];
  status: 'pending' | 'error' | 'success' | 'idle';
}

interface RequcerActionStatus {
  payload: InitialState['status'];
  type: string;
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Employee
export const fetchEmployeeAction = createAsyncThunk(
  'employee/fetchEmployee',
  async (id: string) => {
    return { id }
  }
)

// ** Fetch Users
export const fetchEmployeesAction = createAsyncThunk(
  'employee/fetchEmployees',
  async (params: ApiParams, { getState, dispatch }: DataParams) => {
    const response = await EmployeeServices.getAll();
    return response.data
  }
)

// ** Add User
export const addEmployeeAction = createAsyncThunk(
  'employee/addEmployee',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(appEmployeesSlice.actions.handleStatus('pending'))
    try {
      const response = await EmployeeServices.add(data);
      // dispatch(fetchEmployeesAction(getState().user.params))
      dispatch(fetchEmployeesAction({}))
      toast.success("Employee added succesfully!")
      dispatch(appEmployeesSlice.actions.handleStatus('success'))
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong!")
      dispatch(appEmployeesSlice.actions.handleStatus('error'))
      return error.response.data;
    }
  }
)

// ** Add Client
export const updateEmployeeAction = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, data }: { id: string, data: EmployeeType }, { getState, dispatch }: Redux) => {
    dispatch(appEmployeesSlice.actions.handleStatus('pending'))
    try {
      const response = await EmployeeServices.update(id, data);
      // dispatch(fetchEmployeesAction(getState().user.params))
      dispatch(fetchEmployeesAction({}))
      toast.success("Employee updated succesfully!")
      dispatch(appEmployeesSlice.actions.handleStatus('success'))
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong!")
      dispatch(appEmployeesSlice.actions.handleStatus('error'))
      return error.response.data;
    }
  }
)

// ** Delete User
export const deleteEmployeeAction = createAsyncThunk(
  'employee/deleteEmployee',
  async (id: string, { getState, dispatch }: Redux) => {
    dispatch(appEmployeesSlice.actions.handleStatus('pending'))
    try {
      const response = await EmployeeServices.delete(id);
      // dispatch(fetchEmployeesAction(getState().user.params))
      dispatch(fetchEmployeesAction({}))
      toast.success("Employee deleted succesfully!")
      dispatch(appEmployeesSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong!")
      dispatch(appEmployeesSlice.actions.handleStatus('error'))
      return error.response.data;
    }
  }
)

// @ts-ignore
export const appEmployeesSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employee: {},
    total: 0,
    params: {},
    allData: [],
    status: 'idle',
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesAction.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.employees = data.employees.map((employee: EmployeeType) => {
        return {
          ...employee,
          fullName: `${employee.first_name} ${employee.last_name}`,
          role_code: `${employee.role.code}`,
        }
      })
    })
    builder.addCase(fetchEmployeeAction.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.employee = state.employees.find((employee: any) => employee.id === id) || {};
    })
  }
})

export default appEmployeesSlice.reducer
