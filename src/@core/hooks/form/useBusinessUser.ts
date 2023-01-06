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
  addAction, fetchAllAction, deleteAction, fetchOneAction,updateAction
} from 'src/store/apps/businessUser'

import { businessUserSchema } from 'src/@core/schema'

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: '',
  phone: '',
  password: '',
  gender: '',
  // location: '',
  // permissions: '',
  business_id: '',
  role: '',
}

export const useBusinessUser = (serviceId: string | null) => {
  // // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.businessUser)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(businessUserSchema.add)
  })


  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.businessUser && serviceId) {
      // console.log('serviceId ',serviceId);
      'first_name' in store.businessUser && form.setValue('first_name', store.businessUser.first_name)
      'last_name' in store.businessUser && form.setValue('last_name', store.businessUser.last_name)
      'email' in store.businessUser && form.setValue('email', store.businessUser.email)
      'date_of_birth' in store.businessUser && form.setValue('date_of_birth', store.businessUser.date_of_birth)
      'phone' in store.businessUser && form.setValue('phone', store.businessUser.phone)
      'password' in store.businessUser && form.setValue('password', store.businessUser.password)
      'gender' in store.businessUser && form.setValue('gender', store.businessUser.gender)
      // 'location' in store.businessUser && form.setValue('location', store.businessUser.location)
      // 'permissions' in store.businessUser && form.setValue('permissions', store.businessUser.permissions)
      'business_id' in store.businessUser && form.setValue('business_id', store.businessUser.business_id)
      'role' in store.businessUser && form.setValue('role', store.businessUser.role)
    }
    else {
      form.setValue('first_name', '')
      form.setValue('last_name', '')
      form.setValue('email', '')
      form.setValue('date_of_birth', '')
      form.setValue('phone', '')
      form.setValue('password', '')
      form.setValue('gender', '')
      form.setValue('business_id', '')
      form.setValue('role', '')
    }
  }, [store.businessUsers, serviceId])

  //   const getAssignmentType = async (id: string) => {
  //     dispatch(fetchAssignmentTypeAction(id))
  //   }

  //   const getAssignmentTypes = async ({ query }: ApiParams) => {
  //     dispatch(fetchAssignmentTypesAction({ query }))
  //   }

  const getBusinessUser = async () => {
    dispatch(fetchAllAction());
  }


  const deleteBusinessUser = async (id: string) => {
    dispatch(deleteAction(id));
  }

  const addBusinessUser = async (data: any) => {
    dispatch(addAction({ ...data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleDrawer(null)
          console.log('============BUSINESSUser_ADDED===============');
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }

  const updateBusinessUser = async (id: string, data: any) => {
    dispatch(updateAction({ id, data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleDrawer(null)
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }

  return {
    form, store,
    getBusinessUser,
    addBusinessUser,
    deleteBusinessUser,
    updateBusinessUser
  }
}
