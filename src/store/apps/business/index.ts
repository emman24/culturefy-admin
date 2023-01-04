// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import BusinessServices from 'src/services/business.service'

// ** Types Imports
import { IUser } from 'src/types/apps/user'
import { IBusiness } from 'src/types/apps/business'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'

interface InitialState {
  business: IBusiness[] | []
  // entity: IUser | {}
  // total: number
  // params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// export const QueryAction = createAsyncThunk('user/query', async (query: string, { getState, dispatch }: Redux) => {
//   dispatch(Slice.actions.handleQuery(query))
//   return query
// })

// export const fetchOneAction = createAsyncThunk('user/fetchOne', async (id: string) => {
//   const response = await BusinessServices.getById(id)
//   return response.data
// })

export const fetchAllAction = createAsyncThunk(
  'business/fetchAll',
  async () => {
    const response = await BusinessServices.getAll()
    console.log('response business ', response.data)
    return response.data
  }
)

// export const addAction = createAsyncThunk(
//   'user/add',
//   async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
//     dispatch(Slice.actions.handleStatus('pending'))
//     try {
//       const response = await BusinessServices.add(data)
//       const query = getState().user.params.query
//       dispatch(fetchAllAction({ query }))
//       toast.success('Added succesfully!')
//       dispatch(Slice.actions.handleStatus('success'))
//       return response.data
//     } catch (error: any) {
//       toast.error(error.response.data.message || 'Something went wrong!')
//       dispatch(Slice.actions.handleStatus('error'))
//       return error.response.data
//     }
//   }
// )

// export const updateAction = createAsyncThunk(
//   'user/update',
//   async ({ id, data }: { id: string; data: IUser }, { getState, dispatch }: Redux) => {
//     dispatch(Slice.actions.handleStatus('pending'))
//     try {
//       const response = await BusinessServices.update(id, data)
//       const query = getState().entity.params.query
//       dispatch(fetchAllAction({ query }))
//       toast.success('updated succesfully!')
//       dispatch(Slice.actions.handleStatus('success'))
//       return response.data
//     } catch (error: any) {
//       toast.error(error.response.data.message || 'Something went wrong!')
//       dispatch(Slice.actions.handleStatus('error'))
//       return error.response.data
//     }
//   }
// )

// export const deleteAction = createAsyncThunk('user/delete', async (id: string, { getState, dispatch }: Redux) => {
//   dispatch(Slice.actions.handleStatus('pending'))
//   try {
//     const response = await BusinessServices.delete(id)
//     const query = getState().entity.params.query
//     dispatch(fetchAllAction({ query }))
//     toast.success('deleted succesfully!')
//     dispatch(Slice.actions.handleStatus('success'))
//     return response.data
//   } catch (error: any) {
//     toast.error(error.response.data.message || 'Something went wrong!')
//     dispatch(Slice.actions.handleStatus('error'))
//     return error.response.data
//   }
// })

// @ts-ignore

export const Slice = createSlice({
  name: 'business',
  initialState: {
    business: [],
    // params: {}
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    // handleQuery: (state, action) => {
    //   state.params.query = action.payload
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload

      state.business = data || []
      // state.total = data?.length || 0
      // state.entities = []
      // state.total = 0
    })
    // builder.addCase(fetchOneAction.fulfilled, (state, action) => {
    //   const { data } = action.payload
    //   state.entity = data || {}
    // })
  }
})

export default Slice.reducer
