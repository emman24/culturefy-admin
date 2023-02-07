import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm, useFieldArray } from 'react-hook-form'
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
    addAction, fetchAllAction, deleteAction, fetchOneAction, updateAction
} from 'src/store/apps/course'

import { CourseSchema } from 'src/@core/schema'

const defaultValues = {
    title: '',
    number_of_lessons: 1,
    duration: '',
    details: '',
    thumbnail: '',
}

export const useCourse = (serviceId: string | null) => {




    // // ** Hook
    const dispatch = useDispatch<AppDispatch>()
    const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.course)
    const form = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(CourseSchema.add)
    })
    useEffect(() => {
        serviceId && dispatch(fetchOneAction(serviceId))
    }, [serviceId])

    useMemo(() => {
        console.log('store.course ',store.course);
        if (store.course && serviceId) {
            console.log('store.course.title ',store.course)
            'title' in store.course && form.setValue('title', store.course.title)
            'number_of_lessons' in store.course && form.setValue('number_of_lessons', store.course.number_of_lessons)
            // 'points' in store.course && form.setValue('points', store.course.points)
            'duration' in store.course && form.setValue('duration', store.course.duration)
            'details' in store.course && form.setValue('details', store.course.details)
            'thumbnail' in store.course && form.setValue('thumbnail', store.course.thumbnail)
        }
        else {
            form.setValue('title', '')
            form.setValue('number_of_lessons', 1)
            //   form.setValue('points', '')
            // form.setValue('duration', '')
            form.setValue('details', '')
            form.setValue('thumbnail', '')
        }
    }, [store.course, serviceId])

    //   const getAssignmentType = async (id: string) => {
    //     dispatch(fetchAssignmentTypeAction(id))
    //   }

    //   const getAssignmentTypes = async ({ query }: ApiParams) => {
    //     dispatch(fetchAssignmentTypesAction({ query }))
    //   }

    const getCourses = async () => {
        dispatch(fetchAllAction());
    }

    const getCourse = async (id: string) => {
        dispatch(fetchOneAction(id));
    }


    const deleteCourse = async (id: string) => {
        dispatch(deleteAction(id));
    }

    const addCourse = async (data: any) => {
        dispatch(addAction({ ...data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    form.reset()
                    handleDrawer(null)
                    console.log('============BUSINESS_ADDED===============');
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }

    const updateCourse = async (id: string, data: any) => {
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
        getCourse,
        getCourses,
        addCourse,
        deleteCourse,
        updateCourse
    }
}
