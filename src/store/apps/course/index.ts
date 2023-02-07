// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import CourseServices from 'src/services/course.service'


// ** Types Imports
import { IUser } from 'src/types/apps/user'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'
import { ICourse } from 'src/types/apps/course'

interface InitialState {
  courses: ICourse[] | [],
  course: ICourse | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('courses/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('courses/fetchOne', async (id: string) => {
  const response = await CourseServices.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'courses/fetchAll',
  async () => {
    const response = await CourseServices.getAll()
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'courses/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CourseServices.createCourse(data)
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

export const deleteAction = createAsyncThunk('courses/delete', async (id: string, { dispatch }: Redux) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await CourseServices.deleteCourse(id)
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
  'courses/update',
  async ({ id, data }: { id: string; data: ICourse }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CourseServices.updateCourse(id, data)
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
  name: 'courses',
  initialState: {
    courses: [],
    course: {},
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
      state.courses = data.entities || []
      state.total = data?.length || 0
      // state.courses = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      console.log('data.entities ',data.entities[0])
      state.course = data.entities[0] || {}
    })
    builder.addCase(addAction.fulfilled, (state, action) => {
      state.course = {};
    })
    builder.addCase(updateAction.fulfilled, (state, action) => {
      state.course = {};
    })
  }
})

export default Slice.reducer
