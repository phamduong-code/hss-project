import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DefectFormModal from './components/DefectFormModal';
const AddNewDefect = ({ setOpenForm }) => {
    return (
        <Button
            variant='contained'
            color='primary'
            sx={{
                position: 'fixed', // cố định vị trí
                top: 80, // cách mép dưới 16px
                right: 16, // cách mép trái 16px
                zIndex: 1200, // nổi lên trên
                borderRadius: 3, // bo góc
                boxShadow: 3, // đổ bóng
            }}
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
        >
            Add new
        </Button>
    );
};

export default AddNewDefect;
