import { useEffect, useMemo } from 'react'
// import { useForm } from 'react-hook-form';
// import { SidebarContext } from '../context/SidebarContext';
// import ProductServices from '../services/ProductServices';
// import { notifyError, notifySuccess } from '../utils/toast';

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types import
import { RootState, AppDispatch } from 'src/store'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"


// ** Actions Imports
import {
  addAssignmmentAction,
  fetchAssignmentAction,
  updateAssignmentAction,
  deleteAssignmentAction,
  AssignmmentQueryAction,
} from 'src/store/apps/assignment'

import { assignmentSchema } from 'src/@core/schema'
import csvDownload from 'json-to-csv-export'

const defaultValues = {
  name: '',
  description: '',
  projectId: '',
  assignmentTypeId: '',
  managers: []
}

export const useAssignment = (serviceId: string | null) => {
  // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.assignment)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(assignmentSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchAssignmentAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.assignment && serviceId) {
      // @ts-ignore
      form.setValue('name', store.assignment.name)
      // @ts-ignore
      form.setValue('description', store.assignment.description)
      // @ts-ignore
      form.setValue('projectId', store.assignment.projectId)
      // @ts-ignore
      form.setValue('assignmentTypeId', store.assignment.assignmentTypeId)
      // @ts-ignore
      form.setValue('managers', store.assignment.managers)
    }
    else {
      form.setValue('name', '')
      form.setValue('description', '')
      form.setValue('projectId', '')
      form.setValue('assignmentTypeId', '')
      form.setValue('managers', [])
    }
  }, [store.assignment, serviceId])

  const fetchAssignment = async (id: string) => {
    dispatch(fetchAssignmentAction(id))
  }

  const addAssignment = async (data: any) => {
    dispatch(addAssignmmentAction({ ...data }))
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

  const updateAssignment = async (id: string, data: any) => {
    dispatch(updateAssignmentAction({ id, data }))
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

  const deleteAssignment = async (id: string) => {
    dispatch(deleteAssignmentAction(id))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleModal(null)
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }

  const exportAssignment = async () => {
    const dataToConvert = {
      data: store.assignments,
      filename: `assignments-qac-${Date.now()}`,
      delimiter: ',',
      headers: ['email', "fullName", "batchId"]
    }
    await csvDownload(dataToConvert)
  }

  const handleAssignmentQuery = (query: string) => {
    dispatch(AssignmmentQueryAction(query))
  }

  return { form, store, fetchAssignment, addAssignment, updateAssignment, deleteAssignment, exportAssignment, handleAssignmentQuery }
}
