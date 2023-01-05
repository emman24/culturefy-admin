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
} from 'src/store/apps/business'

import { assignmentTypeSchema } from 'src/@core/schema'

const defaultValues = {
  name: '',
  email: '',
  logo: '',
  website: '',
  location: '',
  facebook_link: '',
  instagram_link: '',
  linkedin_link: '',
  twitter_link: '',
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


  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.busines && serviceId) {
      // console.log('serviceId ',serviceId);
      'name' in store.busines && form.setValue('name', store.busines.name)
      'email' in store.busines && form.setValue('email', store.busines.email)
      'logo' in store.busines && form.setValue('logo', store.busines.logo)
      'website' in store.busines && form.setValue('website', store.busines.website)
      'location' in store.busines && form.setValue('location', store.busines.location)
      'facebook_link' in store.busines && form.setValue('facebook_link', store.busines.facebook_link)
      'instagram_link' in store.busines && form.setValue('instagram_link', store.busines.instagram_link)
      'linkedin_link' in store.busines && form.setValue('linkedin_link', store.busines.linkedin_link)
      'twitter_link' in store.busines && form.setValue('twitter_link', store.busines.twitter_link)
    }
    else {
      form.setValue('name', '')
    }
  }, [store.busines, serviceId])

  //   const getAssignmentType = async (id: string) => {
  //     dispatch(fetchAssignmentTypeAction(id))
  //   }

  //   const getAssignmentTypes = async ({ query }: ApiParams) => {
  //     dispatch(fetchAssignmentTypesAction({ query }))
  //   }

  const getBusiness = async () => {
    dispatch(fetchAllAction());
  }


  const deleteBusiness = async (id: string) => {
    dispatch(deleteAction(id));
  }

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

  const updateBusiness = async (id: string, data: any) => {
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
    getBusiness,
    addBusiness,
    deleteBusiness,
    updateBusiness
  }
}
