
// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().email().required(),
        date_of_birth: yup.date().required(),
        phone: yup.string().required(),
        password: yup.string().required(),
        gender: yup.string().required(),
        // location: yup.string().required(),
        // permissions: yup.mixed().required(),
        business: yup.string().required(),
        role: yup.string().required(),
    })
}
