// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import BrandAssetsServices from 'src/services/brand-assets.service'

// ** Types Imports
import { IBrandAssets } from 'src/types/apps/brandAssets'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'

interface InitialState {
  brand_assets: IBrandAssets[] | [],
  brand_asset: IBrandAssets | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('brand_asset/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('brand_asset/fetchOne', async (id: string) => {
  const response = await BrandAssetsServices.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'brand_asset/fetchAll',
  async () => {
    const response = await BrandAssetsServices.getAll()
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'brand_asset/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BrandAssetsServices.add(data)
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

export const deleteAction = createAsyncThunk('brand_asset/delete', async (id: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await BrandAssetsServices.delete(id)
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
  'brand_asset/update',
  async ({ id, data }: { id: string; data: IBrandAssets }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BrandAssetsServices.update(id, data)
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
  name: 'brand_assets',
  initialState: {
    brand_assets: [],
    brand_asset: {},
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
      state.brand_assets = data.entities || []
      state.total = data?.length || 0
      // state.brand_assets = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.brand_asset = data.entities || {}
    })
  }
})

export default Slice.reducer
