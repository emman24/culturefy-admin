import { useDispatch, useSelector } from 'react-redux'
// ** Types import
import { RootState, AppDispatch } from 'src/store'

// ** Actions Imports
import {
  fetchOneAction,updateAction
} from 'src/store/apps/businessQuestions'



export const useBusinessQuestions = (id: string | null) => {
  // // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.businessQuestions)


  const getBusinessQuestions = async (id: string | string[]) => {
    dispatch(fetchOneAction(id))
      .then(({ payload }: any) => {
        if (payload.statusCode) {
        //   handleDrawer(null)
        console.log('============API_SUCCESS===============');
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }


  const updateBusinessQuestions = async (id: string | string[] , data: any) => {
    dispatch(updateAction({ id, data }))
      .then(({ payload }: any) => {
        if (payload.statusCode) {
        //   handleDrawer(null)
        console.log('============API_SUCCESS===============');
        } else {
          console.log('============API_ERROR===============');
          console.log(payload);
          console.log('====================================');
        }
      })
  }

  return {
    store,
    getBusinessQuestions,
    updateBusinessQuestions
  }
}
