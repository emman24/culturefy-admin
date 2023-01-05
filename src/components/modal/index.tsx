import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import { auto } from '@popperjs/core';

export default function CustomModal(props: any) {

    return (
        <div>
            <Button onClick={props.handleOpen}>Open modal</Button>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {props.component}
            </Modal>
        </div>
    );
}