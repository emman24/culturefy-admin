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
    addAction, 
    deleteAction, 
    // fetchOneAction, 
    updateAction
} from 'src/store/apps/courseVideo'

import { CourseVideoSchema } from 'src/@core/schema'

const defaultValues = {
    videoTitle: '',
    courseId: '',
    source: '',
}

export const useCourseVideo = (serviceId: string | null) => {


    // // ** Hook
    const dispatch = useDispatch<AppDispatch>()
    const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.courseVideo)
    // const form = useForm({
    //     defaultValues,
    //     mode: 'onChange',
    //     resolver: yupResolver(CourseVideoSchema.add)
    // })
    // useEffect(() => {
    //     serviceId && dispatch(fetchOneAction(serviceId))
    // }, [serviceId])

    // useMemo(() => {
    //     console.log('store.courseVideo ',store.courseVideo);
    //     if (store.courseVideo && serviceId) {
    //         'videoTitle' in store.courseVideo && form.setValue('videoTitle', store.courseVideo.videoTitle)
    //         'courseId' in store.courseVideo && form.setValue('courseId', store.courseVideo.courseId)
    //         'source' in store.courseVideo && form.setValue('source', store.courseVideo.source)
    //     }
    //     else {
    //         form.setValue('videoTitle', '')
    //         form.setValue('courseId', '')
    //         form.setValue('source', '')
    //     }
    // }, [store.courseVideo, serviceId])

    

    // const getCourseVideo = async (id: string) => {
    //     dispatch(fetchOneAction(id));
    // }


    const deleteCourseVideo = async (id: string) => {
        dispatch(deleteAction(id));
    }

    const addCourseVideo = async (data: any) => {
        dispatch(addAction({ ...data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    // form.reset()
                    // handleDrawer(null)
                    console.log('============BUSINESS_ADDED===============');
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }

    const updateCourseVideo = async (id: string, data: any) => {
        dispatch(updateAction({ id, data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    // form.reset()
                    // handleDrawer(null)
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }

    return {
        // form, 
        store,
        // getCourseVideo,
        addCourseVideo,
        deleteCourseVideo,
        updateCourseVideo
    }
}
