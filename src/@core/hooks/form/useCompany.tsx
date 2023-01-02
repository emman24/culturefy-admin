
// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** API services
import { userSchema } from 'src/@core/schema'

// export interface IFormValues {
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     confirm_password?: string;
//     gender: string;
//     API_ERROR?: {};
// }

const defaultValues = {
    name: '',
    email: '',
    phone: '',
    website: '',
    longitude: '',
    latitude: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    API_ERROR: {}
}

export const useCompany = () => { // : { form: UseFormReturn<IFormValues> }

    // ** Hook
    const form = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(userSchema.createCompany)
    })

    return { form }
};
