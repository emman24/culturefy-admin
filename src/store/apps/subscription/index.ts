

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { SubscriptionService } from 'src/services'

// ** Types Imports
import { ISubscription } from 'src/types/apps/subscription'
import { ApiParams } from 'src/types/api'

interface InitialState {
    subscriptions: ISubscription[] | [];
    subscription: ISubscription | {};
    total: number;
    params: ApiParams;
    status: 'pending' | 'error' | 'success' | 'idle';
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

export const QueryAction = createAsyncThunk(
    'report/query',
    async (query: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleQuery(query))
        return query;
    }
)

export const fetchByIdAction = createAsyncThunk(
    'subscription/fetchById',
    async (id: string) => {
        const response = await SubscriptionService.getById(id);
        return response.data
    }
)

export const fetchAction = createAsyncThunk(
    'subscription/fetchAll',
    async (params: ApiParams, { getState, dispatch }: Redux) => {
        const { query } = params;
        const response = await SubscriptionService.getAll({ query });
        return response.data
    }
)

export const addAction = createAsyncThunk(
    'subscription/add',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await SubscriptionService.add(data);
            const query = getState().report.params.query;
            dispatch(fetchAction({ query }))
            toast.success("Added succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateAction = createAsyncThunk(
    'subscription/update',
    async ({ id, data }: { id: string, data: ISubscription }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await SubscriptionService.update(id, data);
            const query = getState().report.params.query;
            dispatch(fetchAction({ query }))
            toast.success("Type updated succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Delete Client
export const deleteAction = createAsyncThunk(
    'subscription/delete',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await SubscriptionService.delete(id);
            const query = getState().report.params.query;
            dispatch(fetchAction({ query }))
            toast.success("Type deleted succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// @ts-ignore
export const Slice = createSlice({
    name: 'subscription',
    initialState: {
        subscriptions: [],
        subscription: {},
        total: 0,
        params: {},
    } as InitialState,
    reducers: {
        handleStatus: (state, action) => {
            state.status = action.payload;
        },
        handleQuery: (state, action) => {
            state.params.query = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAction.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.subscriptions = data.subscriptions || []
            state.total = data.subscriptions.length || 0
        })
        builder.addCase(fetchByIdAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.subscription = data.subscription || {};
        })
    }
})

export default Slice.reducer
