

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Label Service Imports
import { LabelServices } from 'src/services'

// ** Types Imports
import { IAssignmentType } from 'src/types/apps/assignment-type'
import { ApiParams } from 'src/types/api'

interface InitialState {
    labels: IAssignmentType[] | [];
    label: IAssignmentType | {};
    total: number;
    params: {};
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
export const fetchLabelAction = createAsyncThunk(
    'label/fetch',
    async (id: string) => {
        return { id }
    }
)

// ** Fetch Clients
export const fetchLabelsAction = createAsyncThunk(
    'label/fetchAll',
    async (params: ApiParams) => {
        const response = await LabelServices.getAll();
        return response.data
    }
)

// ** Add Client
export const addLabelAction = createAsyncThunk(
    'label/add',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await LabelServices.add(data);
            dispatch(fetchLabelsAction({}))
            toast.success("Type Added succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Add Client
export const updateLabelAction = createAsyncThunk(
    'label/update',
    async ({ id, data }: { id: string, data: IAssignmentType }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await LabelServices.update(id, data);
            dispatch(fetchLabelsAction({}))
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
export const deleteLabelAction = createAsyncThunk(
    'label/delete',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await LabelServices.delete(id);
            dispatch(fetchLabelsAction({}))
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
    name: 'labels',
    initialState: {
        labels: [],
        label: {},
        total: 0,
        params: {},
    } as InitialState,
    reducers: {
        handleStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchLabelsAction.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.labels = data.label || []
            state.total = data.label.length || 0
        })
        builder.addCase(fetchLabelAction.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.label = state.labels.find((assignmentType: any) => assignmentType.id === id) || {};
        })
    }
})

export default Slice.reducer
