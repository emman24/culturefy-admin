

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { ProjectServices } from 'src/services'

// ** Types Imports
import { IExample } from 'src/types/apps/example'

export interface DataParams {
    query?: string
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

interface InitialState {
    entities: IExample[] | [];
    entity: IExample | {};
    total: number;
    params: DataParams;
    status: 'pending' | 'error' | 'success' | 'idle';
}

export const QueryAction = createAsyncThunk(
    'example/query',
    async (query: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleQuery(query))
        return query;
    }
)

export const fetchOneAction = createAsyncThunk(
    'example/fetchOne',
    async (id: string) => {
        const response = await ProjectServices.getById(id);
        return response.data
    }
)

export const fetchAllAction = createAsyncThunk(
    'example/fetchAll',
    async (params: DataParams, { getState, dispatch }: Redux) => {
        const { query } = params;
        const response = await ProjectServices.getAll({ query });
        return response.data
    }
)

export const addAction = createAsyncThunk(
    'example/add',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await ProjectServices.add(data);
            const query = getState().example.params.query;
            dispatch(fetchAllAction({ query }))
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
    'example/update',
    async ({ id, data }: { id: string, data: IExample }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await ProjectServices.update(id, data);
            const query = getState().entity.params.query;
            dispatch(fetchAllAction({ query }))
            toast.success("updated succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const deleteAction = createAsyncThunk(
    'example/delete',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await ProjectServices.delete(id);
            const query = getState().entity.params.query;
            dispatch(fetchAllAction({ query }))
            toast.success("deleted succesfully!")
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
    name: 'example',
    initialState: {
        entities: [],
        entity: {},
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
        builder.addCase(fetchAllAction.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.entities = data.entities || []
            state.total = data.entities?.length || 0
        })
        builder.addCase(fetchOneAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.entity = data.entity || {};
        })
    }
})

export default Slice.reducer
