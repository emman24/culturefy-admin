// ** Toolkit imports
import { configureStore, Dispatch } from '@reduxjs/toolkit'

// ** Reducers
import example from 'src/store/apps/example'
import user from 'src/store/apps/user'
import challenges from './apps/challenges'
import business from './apps/business'
import businessUser from './apps/businessUser'
import positionGoal from './apps/positionGoal'
import possescards from './apps/possescards'
import businessQuestions from './apps/businessQuestions'
import recommendations from './apps/recommendations'
import course from './apps/course'
import courseVideo from './apps/courseVideo'
<<<<<<< HEAD
import certificate from './apps/certificate'
=======
import workGoal from './apps/workGoal'



>>>>>>> ef9e10d4a03e1c956ec452b1cb458505e6bbf8d3


// import project from './apps/project'

export const store = configureStore({
  reducer: {
    // example,
    user,
    business,
    businessUser,
    positionGoal,
    possescards,
    businessQuestions,
    recommendations,
    course,
    courseVideo,
<<<<<<< HEAD
    // challenges,
    certificate
=======
    workGoal,
    // challenges
>>>>>>> ef9e10d4a03e1c956ec452b1cb458505e6bbf8d3
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Redux {
  getState: any // ReturnType<typeof store.getState>
  dispatch: Dispatch<any>
}
