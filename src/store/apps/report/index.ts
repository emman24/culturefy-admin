
// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { ReportServices } from 'src/services'

// ** Types Imports
import { IReport, LabelsOnReports } from 'src/types/apps/report'

export interface DataParams {
    query?: string
}

interface InitialState {
    reports: IReport[] | [];
    report: IReport;
    total: number;
    params: DataParams;
    allData: never[];
    status: 'pending' | 'error' | 'success' | 'idle';
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

export const ReportQueryAction = createAsyncThunk(
    'report/query',
    async (query: string, { getState, dispatch }: Redux) => {
        dispatch(appReportsSlice.actions.handleQuery(query))
        return query;
    }
)

// ** Fetch Client
export const fetchReportAction = createAsyncThunk(
    'report/fetchReport',
    async (id: string) => {
        const response = await ReportServices.getById(id);
        return response.data
    }
)

// ** Fetch Clients
export const fetchReportsAction = createAsyncThunk(
    'report/fetchReports',
    async (params: DataParams, { getState, dispatch }: Redux) => {
        const { query } = params;
        const response = await ReportServices.getAll({ query });
        return response.data
    }
)

// ** Add Client
export const addReportAction = createAsyncThunk(
    'report/addReport',
    async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.add(data);
            const query = getState().report.params.query;
            dispatch(fetchReportsAction({ query }))
            toast.success("Report Added succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const addReportVersionAction = createAsyncThunk(
    'report/addReportVersion',
    async (
        { reportId, data }: { reportId: string, data: IReport },
        { getState, dispatch }: Redux
    ) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.addNewVersion(reportId, data);
            // const query = getState().report.params.query;
            // dispatch(fetchReportsAction({ query }))
            dispatch(fetchReportAction(reportId))
            toast.success("Report Added succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Add Client
export const updateReportAction = createAsyncThunk(
    'report/updateReport',
    async ({ id, data }: { id: string, data: IReport }, { getState, dispatch }: Redux) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.update(id, data);
            dispatch(fetchReportsAction({ query: getState().report.params.query }))
            toast.success("Report updated succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateReportAssesstAction = createAsyncThunk(
    'report/updateReportAssesst',
    async ({ assestId, data }: { assestId: string, data: IReport }, { getState, dispatch }: Redux) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.updateAssesst(assestId, data);
            // dispatch(fetchReportsAction(getState().user.params))
            toast.success("Report updated succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateReportLabelAction = createAsyncThunk(
    'report/updateReportLabel',
    async (
        { reportId, labelId, data }: { reportId: string, labelId: string, data: LabelsOnReports },
        { getState, dispatch }: Redux
    ) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.updateLabel(reportId, labelId, data);
            dispatch(fetchReportAction(reportId))
            toast.success("Report label updated succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateVersionLabelAction = createAsyncThunk(
    'report/updateVersionLabel',
    async (
        { id, data }: { id: string, data: any },
        { getState, dispatch }: Redux
    ) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.updateVersionLabel(id, data);
            const report_store = getState().report
            dispatch(fetchReportAction(report_store.report.id))
            toast.success("Report label updated succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateVersionMetaAction = createAsyncThunk(
    'report/updateVersionMeta',
    async (
        { id, data }: { id: string, data: any },
        { getState, dispatch }: Redux
    ) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.updateVersionMeta(id, data);
            const report_store = getState().report
            dispatch(fetchReportAction(report_store.report.id))
            toast.success("Report updated succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// ** Delete Client
export const deleteReportAction = createAsyncThunk(
    'report/delete',
    async (id: string, { getState, dispatch }: Redux) => {
        dispatch(appReportsSlice.actions.handleStatus('pending'))
        try {
            const response = await ReportServices.delete(id);
            dispatch(fetchReportsAction({ query: getState().report.params.query }))
            toast.success("Report deleted succesfully!")
            dispatch(appReportsSlice.actions.handleStatus('success'))
            return response.data
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            dispatch(appReportsSlice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// @ts-ignore
export const appReportsSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        report: {},
        total: 0,
        params: {},
        allData: []
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
        builder.addCase(fetchReportsAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.reports = data.report || []
            state.total = data.report.length || 0
        })
        builder.addCase(fetchReportAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.report = data.report || {};
        })
        builder.addCase(updateReportLabelAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            // @ts-ignore
            const index = state.report?.labels?.findIndex((label) => (label.reportId === data?.report?.reportId && label.labelId === data?.report?.labelId))
            // @ts-ignore
            state.report.labels[index] = { ...state.report.labels[index], ...data.report }
        })
        builder.addCase(updateReportAssesstAction.fulfilled, (state, action) => {
            const { payload } = action;
            if (payload.data.report.type === "image") {
                // @ts-ignore
                const assesstIndex = state.report.images.findIndex((assesst) => assesst.id === payload.data.report.id)
                // @ts-ignore
                state.report.images[assesstIndex] = payload.data.report;
            } else if (payload.data.report.type === "video") {
                // @ts-ignore
                const assesstIndex = state.report.videos.findIndex((assesst) => assesst.id === payload.data.report.id)
                // @ts-ignore
                state.report.videos[assesstIndex] = payload.data.report;
            } else if (payload.data.report.type === "doc") {
                // @ts-ignore
                const assesstIndex = state.report.docs.findIndex((assesst) => assesst.id === payload.data.report.id)
                // @ts-ignore
                state.report.docs[assesstIndex] = payload.data.report;
            } else {
                // @ts-ignore
                const assesstIndex = state.report.reportAssesst.findIndex((assesst) => assesst.id === payload.data.report.id)
                // @ts-ignore
                state.report.reportAssesst[assesstIndex] = payload.data.report;
            }
        })
    }
})

export default appReportsSlice.reducer
