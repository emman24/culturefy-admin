// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        title: yup.string().required(),
        // course: yup.object().required(),
        course: yup.mixed().required(),
        require_test: yup.boolean().required()
    })
}
