import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import headCells from './utils/tableHeader';
import getColorPriority from './utils/getColorPriority';
import progressState from './utils/progressState';
const DefectTable = () => {
    const [rows, setRows] = useState([]);
    const [selectedDefect, setSelectedDefect] = useState(null);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');

    // Fetch dữ liệu từ API
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
                const data = response.data;
                setRows(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    // Hàm chọn dòng để mở modal chi tiết
    const handleOpen = (row) => {
        setSelectedDefect(row);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            {headCells.map((headcell) => {
                                return (
                                    <TableCell
                                        key={headcell.id}
                                        align={headcell.align}
                                        padding={headcell.disablePadding ? 'none' : 'normal'}
                                        sx={{ maxWidth: headcell.width, textAlign: headcell.align }}
                                    >
                                        {headcell.label}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    backgroundColor: getColorPriority(row),
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleOpen(row)}
                            >
                                <TableCell>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>{index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>
                                        {new Date(row.dateCreated).toLocaleDateString('en-GB')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>{row.roomNumber}</Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: 400 }}>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>{row.description.substring(0, 50)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>{row.reportedBy}</Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: 140, textAlign: 'center' }}>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>{progressState[row.progress]}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={row.progress === 'completed' ? '#ccc' : '#333'}>
                                        {row.dateDone ? new Date(row.dateDone).toLocaleDateString('en-GB') : ''}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        minWidth: 400,
                    }}
                >
                    {selectedDefect && (
                        <>
                            <Typography variant='h6' gutterBottom>
                                Chi tiết yêu cầu
                            </Typography>
                            <Typography>
                                <b>Mã căn hộ:</b> {selectedDefect.roomNumber}
                            </Typography>
                            <Typography>
                                <b>Mô tả:</b> {selectedDefect.description}
                            </Typography>
                            <Typography>
                                <b>Yêu cầu bởi:</b> {selectedDefect.reportedBy}
                            </Typography>
                            <Typography>
                                <b>Tiến độ:</b> {progressState[selectedDefect.progress]}
                            </Typography>
                            <Typography>
                                <b>Ngày tạo:</b> {new Date(selectedDefect.dateCreated).toLocaleDateString('vi-VN')}
                            </Typography>
                            {selectedDefect.dateDone && (
                                <Typography>
                                    <b>Ngày hoàn thành:</b> {new Date(selectedDefect.dateDone).toLocaleDateString('vi-VN')}
                                </Typography>
                            )}
                            {selectedDefect.cost > 0 && (
                                <Typography>
                                    <b>Chi phí:</b> {selectedDefect.cost.toLocaleString('vi-VN')} ₫
                                </Typography>
                            )}
                            {selectedDefect.remarks && (
                                <Typography>
                                    <b>Ghi chú:</b> {selectedDefect.remarks}
                                </Typography>
                            )}
                            <Button sx={{ mt: 2 }} variant='contained' onClick={handleClose}>
                                Đóng
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default DefectTable;
