
import { useEffect, useMemo } from 'react';

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
// import csvDownload from 'json-to-csv-export'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from 'src/types/api'

// ** import API services
import { EmployeeServices } from 'src/services'
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
// import {
//     fetchEmployeeAction,
//     fetchEmployeesAction,
//     deleteEmployeeAction,
//     addEmployeeAction,
//     updateEmployeeAction
// } from 'src/store/apps/employee'

import schema from 'src/@core/schema/employee'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "MALE",
    phone: "",
    batchId: "",
    image: "",
    role: "ADMIN",
}

export const useEmployee = (serviceId: string | null) => {

    // ** Hook
    // const { handleDrawer, handleModal } = useToggleDrawer();
    // const store = useSelector((state: RootState) => state.employee)
    // const dispatch = useDispatch<AppDispatch>()
    // const form = useForm({
    //     defaultValues,
    //     mode: 'onChange',
    //     resolver: yupResolver(schema.addEmployee),
    //     // resolver: serviceId ? yupResolver(schema.updateEmployee) : yupResolver(schema.addEmployee),
    //     // resolver: yupResolver(serviceId ? schema.updateEmployee : schema.addEmployee)
    // })

    // useEffect(() => {
    //     serviceId && dispatch(fetchEmployeeAction(serviceId))
    // }, [serviceId])

    // useMemo(() => {
    //     if (store.employee && serviceId) {
    //         // @ts-ignore
    //         form.setValue('first_name', store.employee?.first_name)
    //         // @ts-ignore
    //         form.setValue('last_name', store.employee?.last_name)
    //         // @ts-ignore
    //         form.setValue('email', store.employee?.email)
    //         // @ts-ignore
    //         form.setValue('password', '')
    //         form.setValue('confirm_password', '')
    //         // @ts-ignore
    //         form.setValue('gender', store.employee?.gender)
    //         // @ts-ignore
    //         form.setValue('phone', store.employee?.phone)
    //         // @ts-ignore
    //         form.setValue('batchId', store.employee?.batchId)
    //         // @ts-ignore
    //         form.setValue('role', store.employee?.role_code)
    //         // @ts-ignore
    //         form.setValue('image', store.employee?.image)
    //     } else {
    //         form.setValue('first_name', '')
    //         form.setValue('last_name', '')
    //         form.setValue('email', '')
    //         form.setValue('password', '')
    //         form.setValue('confirm_password', '')
    //         form.setValue('gender', '')
    //         form.setValue('phone', '')
    //         form.setValue('batchId', '')
    //         form.setValue('role', '')
    //         form.setValue('image', '')
    //     }
    // }, [store.employee, serviceId])

    // const getEmployee = async (id: string) => {
    //     dispatch(fetchEmployeeAction(id))
    // }

    // const getEmployees = async ({ query }: ApiParams) => {
    //     dispatch(fetchEmployeesAction({ query }))
    // }

    // const addEmployee = async (data: any) => {
    //     dispatch(addEmployeeAction({ ...data }))
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

    // const updateEmployee = async (id: string, data: any) => {
    //     dispatch(updateEmployeeAction({ id, data }))
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

    // const deleteEmployee = async (id: string) => {
    //     dispatch(deleteEmployeeAction(id))
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

    // const exportEmployees = async () => {
    //     csvDownload('employees', store.employees)
    // }

    // return {
    //     form, store,
    //     getEmployee, getEmployees, addEmployee, updateEmployee, deleteEmployee, exportEmployees
    // }
};
