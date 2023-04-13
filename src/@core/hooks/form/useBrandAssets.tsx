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
    addAction, fetchAllAction, deleteAction, fetchOneAction, updateAction
} from 'src/store/apps/brandAssets'

import { BrandAssetsSchema } from 'src/@core/schema'

const defaultValues = {
    business: '',
    logos: [''],
    fonts: [''],
}

export const useBrandAssets = (serviceId: string | null) => {
    // // ** Hook
    const dispatch = useDispatch<AppDispatch>()
    const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.brandAssets)
    const form = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(BrandAssetsSchema.add)
    })


    useEffect(() => {
        serviceId && dispatch(fetchOneAction(serviceId))
    }, [serviceId])

    useMemo(() => {
        if (store.brand_asset && serviceId) {
            console.log('serviceId ',serviceId);
            'business' in store.brand_asset && form.setValue('business', store.brand_asset.business)
            // 'colors' in store.brand_asset && form.setValue('colors', store.brand_asset.colors)
            'logos' in store.brand_asset && form.setValue('logos', store.brand_asset.logos)
            'fonts' in store.brand_asset && form.setValue('fonts', store.brand_asset.fonts)
        }
        else {
            form.setValue('business', '')
            form.setValue('logos', [])
            form.setValue('fonts', [])
        }
    }, [store.brand_asset, serviceId])

    

    const getBrandAssets = async () => {
        dispatch(fetchAllAction());
    }


    const deleteBrandAssets = async (id: string) => {
        dispatch(deleteAction(id));
    }

    const addBrandAssets = async (data: any) => {
        dispatch(addAction({ ...data }))
            .then(({ payload }: any) => {
                if (payload.statusCode === "10000") {
                    handleDrawer(null)
                    console.log('============BrandAssets_ADDED===============');
                } else {
                    console.log('============API_ERROR===============');
                    console.log(payload);
                    console.log('====================================');
                }
            })
    }

    const updateBrandAssets = async (id: string, data: any) => {
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
        getBrandAssets,
        addBrandAssets,
        deleteBrandAssets,
        updateBrandAssets
    }
}
