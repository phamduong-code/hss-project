import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import TestTable from './TestTable';
import MenuBar from './MenuBar';
import AddNewDefect from './AddNewDefect';
import DefectTable from './DefectTable';
import DefectFormModal from './components/DefectFormModal';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

export default function App() {
    const [open, setOpen] = useState(false);
    const [openSnake, setOpenSnake] = useState(false);
    const [snakeMessage, setSnakeMessage] = useState('');
    const handleSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}`, data);
            //const result = await response.data;
            setSnakeMessage('Successfull!');
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        console.log('Dữ liệu gửi lên:', data);
    };

    return (
        <Container maxWidth='xl'>
            <MenuBar />
            <AddNewDefect setOpenForm={() => setOpen(true)} />
            <DefectFormModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />

            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
                    Thông tin sự cố
                </Typography>
                <DefectTable />
                <Copyright />
            </Box>
        </Container>
    );
}
