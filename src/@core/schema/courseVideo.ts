// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        videoTitle: yup.string().required(),
        courseId: yup.number().required(),
        source: yup.string().required(),
    })
}
