
import { useEffect, useMemo } from 'react';

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
// import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

// import { ApiParams } from 'src/types/api'

// ** import API services
// import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
// import { fetchAllAction } from 'src/store/apps/business'
import { fetchAllAction, addAction } from 'src/store/apps/business'



// ** Import Custom hooks
// import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

export const useBusiness = (serviceId: string | null) => {

    // ** Hook
    // const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.business)
    const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     serviceId && dispatch(fetchOneAction(serviceId))
    // }, [serviceId])

    // const getUser = async (id: string) => {
    //     dispatch(fetchOneAction(id))
    // }

    const getBusiness = async () => {
        dispatch(fetchAllAction());
    }

    const addBusiness = async (data: any) => {
        dispatch(addAction({ ...data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    // handleDrawer(null)
                    console.log('============BUSINESS_ADDED===============');
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }

    // const updateUser = async (id: string, data: any) => {
    //     dispatch(updateAction({ id, data }))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 handleDrawer(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }

    // const deleteUser = async (id: string) => {
    //     dispatch(deleteAction(id))
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

    // const exportBusiness = async () => {
    //     csvDownload('business ', store.business)
    // }

    return {
        store,
        getBusiness,
        addBusiness,
    }
};
