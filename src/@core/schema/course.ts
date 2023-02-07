// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        title: yup.string().required(),
        number_of_lessons: yup.number().required(),
        duration: yup.string().required(),
        // instructor: yup.string().required(),
        details: yup.string().required(),
        thumbnail: yup.string().required(),
        // attachment: yup.array(),
        // isPublish: yup.bool().required(),
    })
}
