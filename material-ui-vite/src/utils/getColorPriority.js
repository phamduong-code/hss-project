const getColorPriority = (row) => {
    if (row.progress === 'completed') return '#3c3c3c'; // màu xám cho đã hoàn thành
    switch (row.priority) {
        case 'emergency':
            return '#ffcccc'; // đỏ nhạt
        case 'normal':
            return '#fff7b3'; // vàng nhạt
        default:
            return 'white';
    }
};

export default getColorPriority;
