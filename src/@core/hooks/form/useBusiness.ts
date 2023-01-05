import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types import
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from './../../../types/api';

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Actions Imports
import {
    addAction,
} from 'src/store/apps/business'

import { assignmentTypeSchema } from 'src/@core/schema'

const defaultValues = {
  name: '',
}

export const useBusiness = (serviceId: string | null) => {
  // // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.business)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(assignmentTypeSchema.add)
  })

//   useEffect(() => {
//     serviceId && dispatch(fetchAssignmentTypeAction(serviceId))
//   }, [serviceId])

//   useMemo(() => {
//     if (store.type && serviceId) {
//       // @ts-ignore
//       form.setValue('name', store.type.name)
//     }
//     else {
//       form.setValue('name', '')
//     }
//   }, [store.type, serviceId])

//   const getAssignmentType = async (id: string) => {
//     dispatch(fetchAssignmentTypeAction(id))
//   }

//   const getAssignmentTypes = async ({ query }: ApiParams) => {
//     dispatch(fetchAssignmentTypesAction({ query }))
//   }

  cancelAnimationFrame
  const addBusiness = async (data: any) => {
    dispatch(addAction({ ...data }))
        .then(({ payload }: any) => {
            if (payload.statusCode === "10000") {
                handleDrawer(null)
                console.log('============BUSINESS_ADDED===============');
            } else {
                console.log('============API_ERROR===============');
                console.log(payload);
                console.log('====================================');
            }
        })
    }


  return {
    form, store,
    addBusiness
  }
}
