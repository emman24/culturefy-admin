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
    if (store.business && serviceId) {
      // console.log('serviceId ',serviceId);
      'name' in store.business && form.setValue('name', store.business.name)
      'email' in store.business && form.setValue('email', store.business.email)
      'logo' in store.business && form.setValue('logo', store.business.logo)
      'website' in store.business && form.setValue('website', store.business.website)
      'location' in store.business && form.setValue('location', store.business.location)
      'facebook_link' in store.business && form.setValue('facebook_link', store.business.facebook_link)
      'instagram_link' in store.business && form.setValue('instagram_link', store.business.instagram_link)
      'linkedin_link' in store.business && form.setValue('linkedin_link', store.business.linkedin_link)
      'twitter_link' in store.business && form.setValue('twitter_link', store.business.twitter_link)
    }
    else {
      form.setValue('name', '')
    }
  }, [store.business, serviceId])

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
