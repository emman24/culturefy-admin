
// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        // _id: yup.string(),
        business: yup.string().required(),
        // colors: yup.array().of(yup.string()),
        logos: yup.array().of(yup.string()),
        fonts: yup.array().of(yup.string()),
        // createdAt: yup.string(),
        // updatedAt: yup.string(),
    })
}
