// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { Services } from 'src/services'
import CourseVideoServices from 'src/services/course-video.service'


// ** Types Imports
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'
import { ICourseVideo } from 'src/types/apps/courseVideo'

import { fetchAllAction } from '../course'

interface InitialState {
  courseVideos: ICourseVideo[] | [],
  courseVideo: ICourseVideo | {},
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

export const QueryAction = createAsyncThunk('courses/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

// export const fetchOneAction = createAsyncThunk('courses/fetchOne', async (id: string) => {
//   const response = await CourseVideoServices.getById(id)
//   return response.data
// })

export const addAction = createAsyncThunk(
  'courses/add',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CourseVideoServices.createCourseVideo(data)
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
    const response = await CourseVideoServices.deleteCourseVideo(id)
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
  async ({ id, data }: { id: string; data: ICourseVideo }, { getState, dispatch }: Redux) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CourseVideoServices.updateCourseVideo(id, data)
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
    courseVideos: [],
    courseVideo: {},
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
    // builder.addCase(fetchAllAction.fulfilled, (state, action) => {
    //   const { data } = action.payload
    //   state.courseVideos = data.entities || []
    //   state.total = data?.length || 0
    //   // state.courseVideos = []
    //   // state.total = 0
    // })
    builder.addCase(addAction.fulfilled, (state, action) => {
      // state.courseVideo = {};
    })
    builder.addCase(updateAction.fulfilled, (state, action) => {
      // state.courseVideo = {};
    })
  }
})

export default Slice.reducer
