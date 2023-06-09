import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/challenges'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

export const useUser = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  // @ts-ignore
  const store = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  const getUser = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getUsers = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addUser = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload.statusCode === '10000') {
        handleDrawer(null)
      } else {
        console.log('============API_ERROR===============')
        console.log(payload)
        console.log('====================================')
      }
    })
  }

  const updateUser = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload.statusCode === '10000') {
        handleDrawer(null)
      } else {
        console.log('============API_ERROR===============')
        console.log(payload)
        console.log('====================================')
      }
    })
  }

  const deleteUser = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload.statusCode === '10000') {
        handleModal(null)
      } else {
        console.log('============API_ERROR===============')
        console.log(payload)
        console.log('====================================')
      }
    })
  }

  const exportUsers = async () => {
    csvDownload('users', store.entities)
  }

  return {
    store,
    getUser,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    exportUsers
  }
}
