import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types import
import { RootState, AppDispatch } from 'src/store'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Actions Imports
import {
  addReportAction,
  fetchReportAction,
  fetchReportsAction,
  updateReportAction,
  updateReportAssesstAction,
  updateReportLabelAction,
  ReportQueryAction,

  addReportVersionAction,
  updateVersionLabelAction,
  updateVersionMetaAction,

  deleteReportAction,

  // ** types
  DataParams,
} from 'src/store/apps/report'

import { reportSchema } from 'src/@core/schema'
import csvDownload from 'json-to-csv-export'

const defaultValues = {
  name: '',
  assignmentId: '',
  inspectors: [],
  labels: [],
  images: [
    {
      description: ""
    }
  ],
  videos: [
    {
      description: ""
    }
  ],
  docs: [
    {
      description: ""
    }
  ],
}

const versionDefaultValues = {
  name: "",
  labels: [],
  images: [
    { description: "" }
  ],
  videos: [
    { description: "" }
  ],
  docs: [
    { description: "" }
  ],
}

export const useReport = (serviceId: string | null) => {

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.report)

  // ======================================
  // ======================================
  // ======================================
  // ** Report Add and Update
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(reportSchema.add)
  })
  const images_handler = useFieldArray({
    control: form.control,
    name: "images"
  });
  const videos_handler = useFieldArray({
    control: form.control,
    name: "videos"
  });
  const docs_handler = useFieldArray({
    control: form.control,
    name: "docs"
  });

  // ======================================
  // ======================================
  // ======================================
  // ** Report Version Add
  const version_form = useForm({
    defaultValues: versionDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(reportSchema.addVersion)
  })
  const version_images_handler = useFieldArray({
    control: version_form.control,
    name: "images"
  });
  const version_videos_handler = useFieldArray({
    control: version_form.control,
    name: "videos"
  });
  const version_docs_handler = useFieldArray({
    control: version_form.control,
    name: "docs"
  });



  useMemo(() => {
    if (!_.isNull(serviceId)) {
      dispatch(fetchReportAction(serviceId))
    }
    else if (_.isNull(serviceId) || serviceId === null) {
      // form.setValue('name', '')
      // form.setValue('assignmentId', '')
      // form.setValue('labels', [])
      // form.setValue('inspectors', [])
      // form.setValue('images', [])
      // form.setValue('videos', [])
      // form.setValue('docs', [])
      form.reset()
      version_form.reset()
    } else {
      toast.error("Some thing went Wrong")
    }
  }, [serviceId])

  useEffect(() => {
    if (!_.isEmpty(store.report) && !_.isNull(serviceId)) {
      // @ts-ignore
      form.setValue('name', store.report?.name)
      // @ts-ignore
      form.setValue('assignmentId', store.report?.assignmentId)
      // @ts-ignore
      form.setValue('labels', store.report?.labels)
      // @ts-ignore
      form.setValue('inspectors', store.report?.inspectors.map(({ inspector }) => inspector))
      // images_handler.
      // @ts-ignore
      // form.setValue('images', store.report?.images.map(item => ({ description: item.description })))
      // @ts-ignore
      // form.setValue('videos', store.report?.videos.map(item => ({ description: item.description })))
      // @ts-ignore
      // form.setValue('docs', store.report?.docs.map(item => ({ description: item.description })))
    }
  }, [store.report, serviceId])

  const getReport = async (id: string) => {
    dispatch(fetchReportAction(id))
  }

  const getReports = async ({ query }: DataParams) => {
    dispatch(fetchReportsAction({ query }))
  }

  const addReport = async (data: any) => {
    data.labels = data.labels.map((label: any) => {
      return { labelId: label.id }
    })
    // data.type = "default"
    // data.name = "name"
    dispatch(addReportAction({ ...data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleDrawer(null)
        }
      })
  }

  const addReportVersion = async (reportId: string, data: any) => {
    data.labels = data.labels.map((label: any) => {
      return { labelId: label.id }
    })
    dispatch(addReportVersionAction({ reportId, data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          version_form.reset()
          handleDrawer(null)
        }
      })
  }

  const updateReport = async (id: string, data: any) => {
    dispatch(updateReportAction({ id, data }))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          form.reset()
          handleDrawer(null)
        }
      })
  }

  const deleteReport = async (id: string) => {
    dispatch(deleteReportAction(id))
      .then(({ payload }: any) => {
        if (payload.statusCode === "10000") {
          handleModal(null)
        }
      })
  }

  const updateReportAssesst = async (assestId: string, data: any) => {
    dispatch(updateReportAssesstAction({ assestId, data }))
  }

  const updateReportLabel = async (reportId: string, labelId: string, data: any) => {
    dispatch(updateReportLabelAction({ reportId, labelId, data }))
  }


  const updateVersionLabel = async (id: string, data: any) => {
    dispatch(updateVersionLabelAction({ id, data }))
  }

  const updateVersionMeta = async (id: string, data: any) => {
    dispatch(updateVersionMetaAction({ id, data }))
  }

  const exportReport = async () => {
    const dataToConvert = {
      data: store.reports,
      filename: `report-qac-${Date.now()}`,
      delimiter: ',',
      headers: ['email', "fullName", "batchId"]
    }
    csvDownload(dataToConvert)
  }

  const handleReportQuery = (query: string) => {
    dispatch(ReportQueryAction(query))
  }

  return {
    store,

    // Return Report Form
    form,
    images_handler,
    videos_handler,
    docs_handler,

    // Return Report Version Form
    version_form,
    version_images_handler,
    version_videos_handler,
    version_docs_handler,

    getReport,
    getReports,
    addReport,
    updateReport,
    updateReportAssesst,
    updateReportLabel,
    deleteReport,

    addReportVersion,
    updateVersionMeta,

    exportReport,
    handleReportQuery,
    updateVersionLabel,
  }

}
