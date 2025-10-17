import React, { useMemo, useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Grid } from '@mui/material';
import roomData from '../data/roomData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const DefectFormModal = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        apartment: 'EGV',
        block: 'A',
        roomNumber: '',
        progress: 'reported',
        priority: 'normal',
        reportedBy: 'CSKH',
        dateDone: '',
        cost: 0,
    });
    const [description, setDescription] = useState('');
    const [remark, setRemark] = useState('');

    // ✅ Dùng chung 1 handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, description, remark });
        onClose();
    };

    // ✅ Tối ưu với useMemo — chỉ tính lại khi phụ thuộc thay đổi
    const blockList = useMemo(() => {
        return roomData.createBlockList(roomData.roomList[formData.apartment]);
    }, [formData.apartment]);

    const roomListRender = useMemo(() => {
        return roomData.roomList[formData.apartment]?.[formData.block] || [];
    }, [formData.apartment, formData.block]);
    console.count('re-render');
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} component='form' onSubmit={handleSubmit}>
                <Typography variant='h6' mb={2}>
                    Thông tin Sự Cố
                </Typography>

                <Grid container spacing={1.5}>
                    <Grid size={7}>
                        <TextField select label='Chung cư' name='apartment' fullWidth value={formData.apartment} onChange={handleChange}>
                            <MenuItem value='EGV'>Emerald Golf View</MenuItem>
                            <MenuItem value='LVD'>New Lavida</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={5}>
                        <TextField select label='Block' name='block' fullWidth value={formData.block} onChange={handleChange}>
                            {blockList.map((block) => (
                                <MenuItem key={block} value={block}>
                                    {block}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={5}>
                        <TextField select label='Mã căn' name='roomNumber' fullWidth value={formData.roomNumber} onChange={handleChange}>
                            {roomListRender.map((room) => (
                                <MenuItem key={room} value={room}>
                                    {room}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={7}>
                        <TextField label='Yêu cầu từ' name='reportedBy' fullWidth value={formData.reportedBy} onChange={handleChange} />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label='Mô tả'
                            name='description'
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField select label='Tiến trình' name='progress' fullWidth value={formData.progress} onChange={handleChange}>
                            <MenuItem value='reported'>Chưa xử lý</MenuItem>
                            <MenuItem value='inProgress'>Đang xử lý</MenuItem>
                            <MenuItem value='completed'>Hoàn thành</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={6}>
                        <TextField select label='Mức độ ưu tiên' name='priority' fullWidth value={formData.priority} onChange={handleChange}>
                            <MenuItem value='normal'>Bình thường</MenuItem>
                            <MenuItem value='emergency'>Khẩn cấp</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label='Ngày hoàn thành'
                            name='dateDone'
                            type='date'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formData.dateDone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField label='Chi phí' name='cost' type='number' fullWidth value={formData.cost} onChange={handleChange} />
                    </Grid>

                    <Grid size={12}>
                        <TextField label='Ghi chú' name='remark' fullWidth multiline rows={3} value={formData.remark} onChange={handleChange} />
                    </Grid>
                </Grid>

                <Box display='flex' justifyContent='flex-end' mt={3}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Hủy
                    </Button>
                    <Button type='submit' variant='contained'>
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DefectFormModal;
