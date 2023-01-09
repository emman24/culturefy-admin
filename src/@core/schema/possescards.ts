
// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        color: yup.string().required(),
        text_color: yup.string().required(),
        image: yup.string().required(),
    })
}
