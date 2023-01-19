import csvDownload from 'json-to-csv-export';
import { useEffect, useMemo } from 'react';
// import { useForm } from 'react-hook-form';
// import { SidebarContext } from '../context/SidebarContext';
// import ProductServices from '../services/ProductServices';
// import { notifyError, notifySuccess } from '../utils/toast';

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types import
import { RootState, AppDispatch } from 'src/store'

// ** Actions Imports
// import {
//     addProjectAction,
//     fetchProjectAction,
//     updateProjectAction,
//     deleteProjectAction,
//     ProjectQueryAction,
// } from 'src/store/apps/project'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

import { projectScheme } from 'src/@core/schema'

const defaultValues = {
    name: "",
    discription: "",
    phone: "",
    clientId: "",
    image: "",
    longitude: "",
    latitude: "",
    API_ERROR: {}
}

interface IuseProject {
    form: any,
    addProject: Promise<any>,
    updateProject: Promise<any>,
} // Promise<IuseProject>

export const useProject = (serviceId: string | null) => {

    // // ** Hook
    // const dispatch = useDispatch<AppDispatch>()
    // const { handleDrawer, handleModal } = useToggleDrawer();
    // const store = useSelector((state: RootState) => state.project)
    // const form = useForm({
    //     defaultValues,
    //     mode: 'onChange',
    //     resolver: yupResolver(projectScheme.addProject)
    // })

    // useEffect(() => {
    //     serviceId && dispatch(fetchProjectAction(serviceId))
    // }, [serviceId])


    // useMemo(() => {
    //     if (store.project && serviceId) {
    //         // @ts-ignore
    //         form.setValue('name', store.project?.name)
    //         // @ts-ignore
    //         form.setValue('phone', store.project?.phone)
    //         // @ts-ignore
    //         form.setValue('discription', store.project?.discription)
    //         // @ts-ignore
    //         form.setValue('clientId', store.project?.clientId)
    //         // @ts-ignore
    //         form.setValue('image', store.project?.image)
    //         // @ts-ignore
    //         form.setValue('longitude', store.project?.longitude)
    //         // @ts-ignore
    //         form.setValue('latitude', store.project?.latitude)
    //     }
    //     else {
    //         form.setValue('name', '')
    //         form.setValue('phone', '')
    //         form.setValue('discription', '')
    //         form.setValue('clientId', '')
    //         form.setValue('image', '')
    //         form.setValue('longitude', '')
    //         form.setValue('latitude', '')
    //     }
    // }, [store.project, serviceId])

    // const fetchProject = async (id: string) => {
    //     dispatch(fetchProjectAction(id))
    // }

    // const addProject = async (data: any) => {
    //     dispatch(addProjectAction({ ...data }))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 form.reset()
    //                 handleDrawer(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }

    // const updateProject = async (id: string, data: any) => {
    //     dispatch(updateProjectAction({ id, data }))
    //         .then(({ payload }: any) => {
    //             if (payload.statusCode === "10000") {
    //                 form.reset()
    //                 handleDrawer(null)
    //             } else {
    //                 console.log('============API_ERROR===============');
    //                 console.log(payload);
    //                 console.log('====================================');
    //             }
    //         })
    // }

    // const deleteProject = async (id: string) => {
    //     dispatch(deleteProjectAction(id))
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

    // const exportProjects = async () => {
    //     const projects = store.projects.map((project) => {
    //         return {
    //             db_id: project.id,
    //             image: project.image,
    //             name: project.name,
    //             phone: project.phone,
    //             discription: project.discription,
    //             client_name: project.client.client_name,
    //             client_email: project.client.client_email,
    //             client_phone: project.client.client_phone,
    //             client_telephone: project.client.client_telephone,
    //             // ...project,
    //         }
    //     })
    //     const dataToConvert = {
    //         data: projects,
    //         filename: `projects-qac-${Date.now()}`,
    //         delimiter: ',',
    //         headers: ['db Id', "image", 'Name', "Phone", "discription", "client name", "client email", "client phone", "client telephone"]
    //     }
    //     console.log('====================================');
    //     console.log(dataToConvert);
    //     console.log('====================================');
    //     await csvDownload(dataToConvert)
    // }

    // const handleProjectQuery = (query: string) => {
    //     dispatch(ProjectQueryAction(query))
    // }

    // return {
    //     store,
    //     form,
    //     fetchProject,
    //     addProject,
    //     updateProject,
    //     deleteProject,
    //     exportProjects,
    //     handleProjectQuery,
    // }
};
