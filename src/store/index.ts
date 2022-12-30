// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import employee from 'src/store/apps/employee'
import client from 'src/store/apps/client'
import project from 'src/store/apps/project'
import assignment from 'src/store/apps/assignment'
import assignment_type from 'src/store/apps/assignment-type'
import report from 'src/store/apps/report'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import label from 'src/store/apps/label'
import subscription from 'src/store/apps/subscription'

// import project from './apps/project'

export const store = configureStore({
  reducer: {
    subscription,
    user,
    employee,
    client,
    assignment,
    assignment_type,
    project,
    report,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    label,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
