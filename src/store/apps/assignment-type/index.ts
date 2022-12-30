

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { AssignmentTypeServices } from 'src/services'

// ** Types Imports
import { IAssignmentType } from 'src/types/apps/assignment-type'
import { ApiParams } from 'src/types/api'

interface InitialState {
    types: IAssignmentType[] | [];
    type: IAssignmentType | {};
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
export const fetchAssignmentTypeAction = createAsyncThunk(
    'assignmentType/fetch',
    async (id: string) => {
        return { id }
    }
)

// ** Fetch Clients
export const fetchAssignmentTypesAction = createAsyncThunk(
    'assignmentType/fetchAll',
    async (params: ApiParams) => {
        const response = await AssignmentTypeServices.getAll();
        return response.data
    }
)

// ** Add Client
export const addAssignmmentTypeAction = createAsyncThunk(
    'client/add',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await AssignmentTypeServices.add(data);
            dispatch(fetchAssignmentTypesAction(getState().user.params))
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
export const updateAssignmentTypeAction = createAsyncThunk(
    'assignmentType/update',
    async ({ id, data }: { id: string, data: IAssignmentType }, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await AssignmentTypeServices.update(id, data);
            dispatch(fetchAssignmentTypesAction(getState().user.params))
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
export const deleteAssignmentTypeAction = createAsyncThunk(
    'assignmentType/delete',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await AssignmentTypeServices.delete(id);
            dispatch(fetchAssignmentTypesAction(getState().user.params))
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
    name: 'assignmentType',
    initialState: {
        types: [],
        type: {},
        total: 0,
        params: {},
    } as InitialState,
    reducers: {
        handleStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAssignmentTypesAction.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.types = data.assignments || []
            state.total = data.assignments.length || 0
        })
        builder.addCase(fetchAssignmentTypeAction.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.type = state.types.find((assignmentType: any) => assignmentType.id === id) || {};
        })
    }
})

export default Slice.reducer
