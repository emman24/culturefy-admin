// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import WorkGoalsServices from 'src/services/work-goal.service'

// ** Types Imports
import { IPositionGoal } from 'src/types/apps/positionGoal'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'

interface InitialState {
  workGoals: IPositionGoal[] | [],
  workGoal: IPositionGoal | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('workGoal/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('workGoal/fetchOne', async (id: string) => {
  const response = await WorkGoalsServices.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'workGoal/fetchAll',
  async () => {
    const response = await WorkGoalsServices.getAll()
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'workGoal/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await WorkGoalsServices.addWorkGoal(data)
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

export const deleteAction = createAsyncThunk('workGoal/delete', async (id: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await WorkGoalsServices.deleteWorkGoal(id)
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
  'workGoal/update',
  async ({ id, data }: { id: string; data: IPositionGoal }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await WorkGoalsServices.updateWorkGoal(id, data)
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
  name: 'positionGoal',
  initialState: {
    workGoals: [],
    workGoal: {},
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
      state.workGoals = data.entities || []
      state.total = data?.length || 0
      // state.workGoals = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.workGoal = data.entities || {}
    })
  }
})

export default Slice.reducer
