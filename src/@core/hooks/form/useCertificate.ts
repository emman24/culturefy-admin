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
    addAction, fetchAllAction, deleteAction, fetchOneAction, updateAction,
    testFetchOneAction, testUpdateAction
} from 'src/store/apps/certificate'

import { CertificateSchema } from 'src/@core/schema'

const defaultValues = {
    title: '',
    course: '',
    require_test: false,
}

export const useCertificate = (serviceId: string | null) => {

    // // ** Hook
    const dispatch = useDispatch<AppDispatch>()
    const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.certificate)
    const form = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(CertificateSchema.add)
    })
    useEffect(() => {
        serviceId && dispatch(fetchOneAction(serviceId))
    }, [serviceId])

    useMemo(() => {
        // console.log('store?.certificate?.course?.title ',store?.certificate?.course?.title);
        if (store.certificate && serviceId) {
            'title' in store.certificate && form.setValue('title', store?.certificate?.title)
            // @ts-ignore 
            'course' in store.certificate && form.setValue('course', store?.certificate?.course?._id)
            // @ts-ignore 
            'require_test' in store.certificate && form.setValue('require_test', store?.certificate?.course?.require_test)
        }
        else {
            form.setValue('title', '')
            form.setValue('course', '')
            form.setValue('require_test', false)

        }
    }, [store.certificate, serviceId])


    const getCertificates = async () => {
        dispatch(fetchAllAction());
    }

    const getCertificate = async (id: string) => {
        dispatch(fetchOneAction(id));
    }


    const deleteCertificate = async (id: string) => {
        dispatch(deleteAction(id));
    }

    const addCertificate = async (data: any) => {
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

    const updateCertificate = async (id: string, data: any) => {
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


    // CERTFICATE TESTS FUNCTIONS
    const getCertificateTest = async (id: string) => {
        dispatch(testFetchOneAction(id));
    }


    const updateCertificateTest = async (id: string, data: any) => {
        dispatch(testUpdateAction({ id, data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    form.reset()
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }



    return {
        form, store,
        getCertificate,
        getCertificates,
        addCertificate,
        deleteCertificate,
        updateCertificate,

        getCertificateTest,
        updateCertificateTest
    }
}
