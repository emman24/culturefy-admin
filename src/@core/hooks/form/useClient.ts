import { useEffect, useMemo } from 'react';
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
import { ApiParams } from './../../../types/api';

// ** Types import
import { RootState, AppDispatch } from 'src/store'

// ** Actions Imports
// import { addClientAction, fetchClientAction, fetchClientsAction, updateClientAction, deleteClientAction } from 'src/store/apps/client'

import { csvDownload } from 'src/@core/helper/csv-export'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

import { clientScheme } from 'src/@core/schema'
// import csvDownload from 'json-to-csv-export';

const defaultValues = {
    client_name: "",
    client_email: "",
    client_phone: "",
    client_image: "",
    website: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    longitude: "",
    latitude: "",
}

interface IuseClient {
    form: any,
    addClient: Promise<any>,
    updateClient: Promise<any>,
} // Promise<IuseClient>

export const useClient = (serviceId: string | null) => {

    // ** Hook
    // const { handleDrawer, handleModal } = useToggleDrawer();
    // const dispatch = useDispatch<AppDispatch>()
    // const store = useSelector((state: RootState['client']) => state.client)
    
    // const form = useForm({
    //     defaultValues,
    //     mode: 'onChange',
    //     resolver: yupResolver(clientScheme.addClient)
    // })

    // useEffect(() => {
    //     serviceId && dispatch(fetchClientAction(serviceId))
    // }, [serviceId])


    // useMemo(() => {
    //     if (store.client && serviceId) {
    //         // @ts-ignore
    //         form.setValue('client_name', store.client.client_name)
    //         // @ts-ignore
    //         form.setValue('client_email', store.client.client_email)
    //         // @ts-ignore
    //         form.setValue('client_phone', store.client.client_phone)
    //         // @ts-ignore
    //         form.setValue('client_image', store.client.client_image)
    //         // @ts-ignore
    //         form.setValue('website', store.client.website)
    //         // @ts-ignore
    //         form.setValue('country', store.client.country)
    //         // @ts-ignore
    //         form.setValue('state', store.client.state)
    //         // @ts-ignore
    //         form.setValue('city', store.client.city)
    //         // @ts-ignore
    //         form.setValue('zip', store.client.zip)
    //         // @ts-ignore
    //         form.setValue('longitude', store.client.longitude)
    //         // @ts-ignore
    //         form.setValue('latitude', store.client.latitude)
    //     } else {
    //         form.setValue('client_name', '')
    //         form.setValue('client_email', '')
    //         form.setValue('client_phone', '')
    //         form.setValue('client_image', '')
    //         form.setValue('website', '')
    //         form.setValue('country', '')
    //         form.setValue('state', '')
    //         form.setValue('city', '')
    //         form.setValue('zip', '')
    //         form.setValue('longitude', '')
    //         form.setValue('latitude', '')
    //     }
    // }, [store.client, serviceId])

    // const getClient = async (id: string) => {
    //     dispatch(fetchClientAction(id))
    // }

    // const getClients = async ({ query }: ApiParams) => {
    //     dispatch(fetchClientsAction({ query }))
    // }

    // const addClient = async (data: any) => {
    //     dispatch(addClientAction({ ...data }))
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

    // const updateClient = async (id: string, data: any) => {
    //     dispatch(updateClientAction({ id, data }))
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

    // const deleteClient = async (id: string) => {
    //     dispatch(deleteClientAction(id))
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

    // const exportClients = async () => {
    //     // const dataToConvert = {
    //     //     data: store.clients,
    //     //     filename: `clients-qac-${Date.now()}`,
    //     //     delimiter: ',',
    //     //     headers: ['email', "fullName", "batchId"]
    //     // }
    //     // await csvDownload(dataToConvert)
    //     csvDownload('clients', store.clients)
    // }

    // return {
    //     form, store,
    //     getClient, getClients, addClient, updateClient, deleteClient, exportClients
    // }
};
