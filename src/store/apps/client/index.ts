
import { AxiosError, AxiosResponse } from 'axios'

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { ClientServices } from 'src/services'

// ** Types Imports
import { IClient } from 'src/types/apps/client'
import { ApiParams } from 'src/types/api'

interface InitialState {
    clients: IClient[] | [];
    client: IClient | {};
    total: number;
    params: {};
    allData: never[];
    status: 'pending' | 'error' | 'success' | 'idle';
}
interface DataParams {
    q: string
    role: string
    status: string
    currentPlan: string
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

// ** Fetch Client
export const fetchClientAction = createAsyncThunk(
    'client/fetchClient',
    async (id: string) => {
        return { id }
    }
)

// ** Fetch Clients
export const fetchClientsAction = createAsyncThunk(
    'client/fetchClients',
    async (params: ApiParams) => {
        const response = await ClientServices.getAll();
        return response.data
    }
)

// ** Add Client
export const addClientAction = createAsyncThunk(
    'client/addClient',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(appClientsSlice.actions.handleStatus('pending'))
        try {
            const response = await ClientServices.add(data);
            dispatch(fetchClientsAction({}))
            toast.success("Client Added succesfully!")
            dispatch(appClientsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appClientsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Add Client
export const updateClientAction = createAsyncThunk(
    'client/updateClient',
    async ({ id, data }: { id: string, data: IClient }, { getState, dispatch }: Redux) => {
        dispatch(appClientsSlice.actions.handleStatus('pending'))
        try {
            const response = await ClientServices.update(id, data);
            dispatch(fetchClientsAction({}))
            toast.success("Client updated succesfully!")
            dispatch(appClientsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appClientsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Delete Client
export const deleteClientAction = createAsyncThunk(
    'client/deleteEmployee',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(appClientsSlice.actions.handleStatus('pending'))
        try {
            const response = await ClientServices.delete(id);
            dispatch(fetchClientsAction({}))
            toast.success("Client deleted succesfully!")
            dispatch(appClientsSlice.actions.handleStatus('success'))
            return response.data
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appClientsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// @ts-ignore
export const appClientsSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        client: {},
        total: 0,
        params: {},
        allData: []
    } as InitialState,
    reducers: {
        handleStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchClientsAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.clients = data.clients || []
            state.total = data.clients.length || 0
        })
        builder.addCase(fetchClientAction.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.client = state.clients.find((client: any) => client.id === id) || {};
        })
    }
})

export default appClientsSlice.reducer
