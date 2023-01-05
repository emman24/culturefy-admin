// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import BusinessUserServices from 'src/services/businessUser.service'

// ** Types Imports
import { IUser } from 'src/types/apps/user'
import { IBusinessUser } from 'src/types/apps/businessUser'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'

interface InitialState {
  businessUsers: IBusinessUser[] | [],
  businessUser: IBusinessUser | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('businessUser/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('businessUser/fetchOne', async (id: string) => {
  const response = await BusinessUserServices.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'businessUser/fetchAll',
  async () => {
    const response = await BusinessUserServices.getAll()
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'businessUser/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BusinessUserServices.createBusinessUser(data)
      toast.success('Added succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      dispatch(fetchAllAction())
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong!')
      dispatch(Slice.actions.handleStatus('error'))
      return error.response.data
    }
  }
)

export const deleteAction = createAsyncThunk('businessUser/delete', async (id: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await BusinessUserServices.deleteBusinessUser(id)
    toast.success('deleted succesfully!')
    dispatch(Slice.actions.handleStatus('success'))
    dispatch(fetchAllAction())
    return response.data
  } catch (error: any) {
    toast.error(error.response.data.message || 'Something went wrong!')
    dispatch(Slice.actions.handleStatus('error'))
    return error.response.data
  }
})



export const updateAction = createAsyncThunk(
  'businessUser/update',
  async ({ id, data }: { id: string; data: IBusinessUser }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BusinessUserServices.updateBusinessUser(id, data)
      // const query = getState().entity.params.query
      // dispatch(fetchAllAction({ query }))
      dispatch(fetchAllAction())
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong!')
      dispatch(Slice.actions.handleStatus('error'))
      return error.response.data
    }
  }
)



// @ts-ignore

export const Slice = createSlice({
  name: 'businessUser',
  initialState: {
    businessUsers: [],
    businessUser: {},
    params: {},
    total: 0,
    status: 'pending'
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      state.params.query = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.businessUsers = data || []
      state.total = data?.length || 0
      // state.businessUsers = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.businessUser = data || {}
    })
  }
})

export default Slice.reducer
