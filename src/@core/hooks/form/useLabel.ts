
import { useEffect, useMemo } from 'react';

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import csvDownload from 'json-to-csv-export'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

// ** import API services
import { EmployeeServices } from 'src/services'

import { ApiParams } from './../../../types/api';

// ** Actions Imports
// import { fetchLabelAction, fetchLabelsAction, deleteLabelAction, addLabelAction, updateLabelAction } from 'src/store/apps/label'

import schema from 'src/@core/schema/label'


// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

const defaultValues = {
    name: ""
}

export const useLabel = (serviceId: string | null) => {

    // // ** Hook
    // const { handleDrawer, handleModal } = useToggleDrawer();
    // const store = useSelector((state: RootState) => state.label)
    // const dispatch = useDispatch<AppDispatch>()
    // const form = useForm({
    //     defaultValues,
    //     mode: 'onChange',
    //     resolver: yupResolver(schema.addLabel)
    // })

    // useEffect(() => {
    //     serviceId && dispatch(fetchLabelAction(serviceId))
    // }, [serviceId])

    // useMemo(() => {
    //     if (store.label && serviceId) {
    //         // @ts-ignore
    //         form.setValue('name', store.label?.name)
    //     } else {
    //         form.setValue('name', '')
    //     }
    // }, [store.label, serviceId])

    // const getReportLabel = async (id: string) => {
    //     dispatch(fetchLabelAction(id))
    // }

    // const getReportLabels = async ({ query }: ApiParams) => {
    //     dispatch(fetchLabelsAction({ query }))
    // }

    // const addLabel = async (data: any) => {
    //     dispatch(addLabelAction({ ...data }))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 form.reset()
    //                 handleDrawer(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }

    // const updateLabel = async (id: string, data: any) => {
    //     dispatch(updateLabelAction({ id, data }))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 form.reset()
    //                 handleDrawer(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }

    // const deleteLabel = async (id: string) => {
    //     dispatch(deleteLabelAction(id))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 handleModal(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }


    // return {
    //     form, store,
    //     getReportLabel, getReportLabels, addLabel, updateLabel, deleteLabel,
    // }
};
