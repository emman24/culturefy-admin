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
// import {
//   addAssignmmentTypeAction,
//   fetchAssignmentTypeAction,
//   fetchAssignmentTypesAction,
//   updateAssignmentTypeAction,
//   deleteAssignmentTypeAction
// } from 'src/store/apps/assignment-type'

import { assignmentTypeSchema } from 'src/@core/schema'

const defaultValues = {
  name: '',
}

export const useAssignmentType = (serviceId: string | null) => {
  // // ** Hook
  // const dispatch = useDispatch<AppDispatch>()
  // const { handleDrawer, handleModal } = useToggleDrawer();
  // const store = useSelector((state: RootState) => state.assignment_type)
  // const form = useForm({
  //   defaultValues,
  //   mode: 'onChange',
  //   resolver: yupResolver(assignmentTypeSchema.add)
  // })

  // useEffect(() => {
  //   serviceId && dispatch(fetchAssignmentTypeAction(serviceId))
  // }, [serviceId])

  // useMemo(() => {
  //   if (store.type && serviceId) {
  //     // @ts-ignore
  //     form.setValue('name', store.type.name)
  //   }
  //   else {
  //     form.setValue('name', '')
  //   }
  // }, [store.type, serviceId])

  // const getAssignmentType = async (id: string) => {
  //   dispatch(fetchAssignmentTypeAction(id))
  // }

  // const getAssignmentTypes = async ({ query }: ApiParams) => {
  //   dispatch(fetchAssignmentTypesAction({ query }))
  // }

  // const addAssignmentType = async (data: any) => {
  //   dispatch(addAssignmmentTypeAction({ ...data }))
  //     .then(({ payload }: any) => {
  //       if (payload.statusCode === "10000") {
  //         form.reset()
  //         handleDrawer(null)
  //       } else {
  //         console.log('============API_ERROR===============');
  //         console.log(payload);
  //         console.log('====================================');
  //       }
  //     })
  // }

  // const updateAssignmentType = async (id: string, data: any) => {
  //   dispatch(updateAssignmentTypeAction({ id, data }))
  //     .then(({ payload }: any) => {
  //       if (payload.statusCode === "10000") {
  //         form.reset()
  //         handleDrawer(null)
  //       } else {
  //         console.log('============API_ERROR===============');
  //         console.log(payload);
  //         console.log('====================================');
  //       }
  //     })
  // }

  // const deleteAssignmentType = async (id: string) => {
  //   dispatch(deleteAssignmentTypeAction(id))
  //     .then(({ payload }: any) => {
  //       if (payload.statusCode === "10000") {
  //         form.reset()
  //         handleModal(null)
  //       } else {
  //         console.log('============API_ERROR===============');
  //         console.log(payload);
  //         console.log('====================================');
  //       }
  //     })
  // }

  // return {
  //   form, store,
  //   getAssignmentType, getAssignmentTypes, addAssignmentType, updateAssignmentType, deleteAssignmentType
  // }
}
