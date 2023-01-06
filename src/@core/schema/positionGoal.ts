
// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        title: yup.string().required(),
    })
}
