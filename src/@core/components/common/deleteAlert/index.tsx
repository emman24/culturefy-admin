
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

const DeleteAlert = ({
    title = 'records',
    onAgree,
}: { title?: string, onAgree: () => void }) => {

    // ** hooks
    const { isModalOpen, handleModal } = useToggleDrawer();
    const handleClose = () => handleModal(null)

    return (
        <Dialog
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>Are you sure want to delete this {title}?</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Do you really want to delete these {title}?
                    this process cannot be undo.
                </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={onAgree}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAlert
