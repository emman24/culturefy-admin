// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import BusinessQuestionsServices from 'src/services/business-questions.service'

// ** Types Imports
import { Redux } from 'src/store'

interface InitialState {
  businessQuestions: '',
  status: 'pending' | 'error' | 'success' | 'idle'
}


export const fetchOneAction = createAsyncThunk('businessQuestions/fetchOne', async (id: string | string[],{dispatch}:Redux) => {
  // const response = await BusinessQuestionsServices.getById(id)
  // return response.data
  dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BusinessQuestionsServices.getById(id,)
      // toast.success('Fetched succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong!')
      dispatch(Slice.actions.handleStatus('error'))
      return error.response.data
    }
})



export const updateAction = createAsyncThunk(
  'businessQuestions/update',
  async ({ id, data }: { id: string | string[]; data: string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await BusinessQuestionsServices.updateBusiness(id, data)
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      console.log('response.data ',response.data);
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
  name: 'businessQuestions',
  initialState: {
    businessQuestions: '',
    status: 'pending'
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.businessQuestions = data || ''
    })
  }
})

export default Slice.reducer
