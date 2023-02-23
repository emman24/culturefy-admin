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
} from 'src/store/apps/workGoal'

import { positionGoalSchema } from 'src/@core/schema'

const defaultValues = {
  title: '',
  description: '',
}

export const useWorkGoal = (serviceId: string | null) => {
  // // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.workGoal)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(positionGoalSchema.add)
  })


  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.workGoal && serviceId) {
      'title' in store?.workGoal && form.setValue('title', store?.workGoal?.title);
      'description' in store?.workGoal && form.setValue('description', store?.workGoal?.description);
    }
    else {
      form.setValue('title', '');
      form.setValue('description', '')
    }
  }, [store.workGoal, serviceId])

  //   const getAssignmentType = async (id: string) => {
  //     dispatch(fetchAssignmentTypeAction(id))
  //   }

  //   const getAssignmentTypes = async ({ query }: ApiParams) => {
  //     dispatch(fetchAssignmentTypesAction({ query }))
  //   }

  const getWorkGoal = async () => {
    dispatch(fetchAllAction());
  }


  const deleteWorkGoal = async (id: string) => {
    dispatch(deleteAction(id));
  }

  const addWorkGoal = async (data: any) => {
    dispatch(addAction({ ...data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleDrawer(null)
          console.log('============positionGoal_ADDED===============');
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }

  const updateWorkGoal = async (id: string, data: any) => {
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
    getWorkGoal,
    addWorkGoal,
    deleteWorkGoal,
    updateWorkGoal
  }
}
