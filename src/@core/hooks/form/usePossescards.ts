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
} from 'src/store/apps/possescards'

import { PossesCardsSchema } from 'src/@core/schema'

const defaultValues = {
    title: '',
    description: '',
    // points: [],
    image: '',
    text_color: '',
    color: '',
}

export const usePossescards = (serviceId: string | null) => {




    // // ** Hook
    const dispatch = useDispatch<AppDispatch>()
    const { handleDrawer, handleModal } = useToggleDrawer();
    const store = useSelector((state: RootState) => state.possescards)
    const form = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(PossesCardsSchema.add)
    })
    useEffect(() => {
        serviceId && dispatch(fetchOneAction(serviceId))
    }, [serviceId])

    useMemo(() => {
        // console.log('store.possescard ',store.possescard);
        if (store.possescard && serviceId) {
            'title' in store.possescard && form.setValue('title', store.possescard.title)
            'description' in store.possescard && form.setValue('description', store.possescard.description)
            // 'points' in store.possescard && form.setValue('points', store.possescard.points)
            'image' in store.possescard && form.setValue('image', store.possescard.image)
            'text_color' in store.possescard && form.setValue('text_color', store.possescard.text_color)
            'color' in store.possescard && form.setValue('color', store.possescard.color)
        }
        else {
            form.setValue('title', '')
            form.setValue('description', '')
            //   form.setValue('points', '')
            // form.setValue('image', '')
            form.setValue('text_color', '')
            form.setValue('color', '')
        }
    }, [store.possescard, serviceId])

    //   const getAssignmentType = async (id: string) => {
    //     dispatch(fetchAssignmentTypeAction(id))
    //   }

    //   const getAssignmentTypes = async ({ query }: ApiParams) => {
    //     dispatch(fetchAssignmentTypesAction({ query }))
    //   }

    const getPossesCards = async () => {
        dispatch(fetchAllAction());
    }

    const getPossesCard = async (id: string) => {
        dispatch(fetchOneAction(id));
    }


    const deletePossesCard = async (id: string) => {
        dispatch(deleteAction(id));
    }

    const addPossesCard = async (data: any) => {
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

    const updatePossesCard = async (id: string, data: any) => {
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
        getPossesCard,
        getPossesCards,
        addPossesCard,
        deletePossesCard,
        updatePossesCard
    }
}
