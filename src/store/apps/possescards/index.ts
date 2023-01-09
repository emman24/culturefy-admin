// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import PossesCardsServices from 'src/services/possescards.service'

// ** Types Imports
import { IUser } from 'src/types/apps/user'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'
import { IPossescards } from 'src/types/apps/possescards'

interface InitialState {
  possescards: IPossescards[] | [],
  possescard: IPossescards | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('possescards/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('possescards/fetchOne', async (id: string) => {
  const response = await PossesCardsServices.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'possescards/fetchAll',
  async () => {
    const response = await PossesCardsServices.getAll()
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'possescards/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await PossesCardsServices.createPossesCard(data)
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

export const deleteAction = createAsyncThunk('possescards/delete', async (id: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await PossesCardsServices.deletePossesCard(id)
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
  'possescards/update',
  async ({ id, data }: { id: string; data: IPossescards }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await PossesCardsServices.updatePossesCard(id, data)
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
  name: 'possescards',
  initialState: {
    possescards: [],
    possescard: {},
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
      state.possescards = data.entities || []
      state.total = data?.length || 0
      // state.possescards = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.possescard = data.entities || {}
    })
    builder.addCase(addAction.fulfilled, (state, action) => {
      state.possescard = {};
    })
    builder.addCase(updateAction.fulfilled, (state, action) => {
      state.possescard = {};
    })
  }
})

export default Slice.reducer
