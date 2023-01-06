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
} from 'src/store/apps/positionGoal'

import { positionGoalSchema } from 'src/@core/schema'

const defaultValues = {
  title: '',
}

export const usePositionGoal = (serviceId: string | null) => {
  // // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.positionGoal)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(positionGoalSchema.add)
  })


  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.positionGoal && serviceId) {
    //   console.log('store.positionGoal?.title ',store.positionGoal?.title);
      'title' in store?.positionGoal && form.setValue('title', store?.positionGoal?.title)
    }
    else {
      form.setValue('title', '')
    }
  }, [store.positionGoal, serviceId])

  //   const getAssignmentType = async (id: string) => {
  //     dispatch(fetchAssignmentTypeAction(id))
  //   }

  //   const getAssignmentTypes = async ({ query }: ApiParams) => {
  //     dispatch(fetchAssignmentTypesAction({ query }))
  //   }

  const getpositionGoal = async () => {
    dispatch(fetchAllAction());
  }


  const deletepositionGoal = async (id: string) => {
    dispatch(deleteAction(id));
  }

  const addpositionGoal = async (data: any) => {
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

  const updatepositionGoal = async (id: string, data: any) => {
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
    getpositionGoal,
    addpositionGoal,
    deletepositionGoal,
    updatepositionGoal
  }
}
