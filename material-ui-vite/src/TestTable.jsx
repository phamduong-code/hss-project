import * as React from 'react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const createData = (serialNumber, requestedAt, roomNumber, content, requestedBy, progress, priority, endDate, remark) => {
    return {
        serialNumber,
        requestedAt,
        roomNumber,
        content,
        requestedBy,
        progress,
        priority,
        endDate,
        remark,
    };
};

const rows = [
    createData(1, '01/08/2025', 'B0101', 'Cupcake', 'Alice', 'In Progress', 'High', '05/08/2025', 'No remarks'),
    createData(2, '02/08/2025', 'B0102', 'Donut', 'Bob', 'Completed', 'Medium', '06/08/2025', 'No remarks'),
    createData(3, '03/08/2025', 'B0103', 'Eclair', 'Charlie', 'Pending', 'Low', '07/08/2025', 'No remarks'),
    createData(4, '04/08/2025', 'B0104', 'Frozen yoghurt', 'David', 'In Progress', 'High', '08/08/2025', 'No remarks'),
    createData(5, '05/08/2025', 'B0105', 'Gingerbread', 'Eve', 'Completed', 'Medium', '09/08/2025', 'No remarks'),
    createData(6, '06/08/2025', 'B0106', 'Honeycomb', 'Frank', 'Pending', 'Low', '10/08/2025', 'No remarks'),
    createData(7, '07/08/2025', 'B0107', 'Ice cream sandwich', 'Grace', 'In Progress', 'High', '11/08/2025', 'No remarks'),
    createData(8, '08/08/2025', 'B0108', 'Jelly Bean', 'Heidi', 'Completed', 'Medium', '12/08/2025', 'No remarks'),
    createData(9, '09/08/2025', 'B0109', 'KitKat', 'Ivan', 'Pending', 'Low', '13/08/2025', 'No remarks'),
    createData(10, '10/08/2025', 'B0110', 'Lollipop', 'Judy', 'In Progress', 'High', '14/08/2025', 'No remarks'),
    createData(11, '11/08/2025', 'B0111', 'Marshmallow', 'Karl', 'Completed', 'Medium', '15/08/2025', 'No remarks'),
    createData(12, '12/08/2025', 'B0112', 'Nougat', 'Laura', 'Pending', 'Low', '16/08/2025', 'No remarks'),
    createData(13, '13/08/2025', 'B0113', 'Oreo', 'Mike', 'In Progress', 'High', '17/08/2025', 'No remarks'),
];

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
    {
        id: 'serialNumber',
        disablePadding: true,
        label: 'STT',
        width: 80,
    },
    {
        id: 'date',
        disablePadding: true,
        label: 'Ngày',
        width: 30,
    },
    {
        id: 'roomNumber',
        disablePadding: true,
        label: 'Mã căn hộ',
        width: 30,
    },
    {
        id: 'content',
        disablePadding: true,
        label: 'Nội dung',
        width: 200,
    },
    {
        id: 'process',
        disablePadding: true,
        label: 'Tiến độ',
        width: 30,
    },
    {
        id: 'requestedBy',
        disablePadding: true,
        label: 'Người yêu cầu',
        width: 30,
    },

    {
        id: 'priority',
        disablePadding: true,
        label: 'Loại ưu tiên',
        width: 30,
    },
    {
        id: 'endDate',
        disablePadding: true,
        label: 'Ngày hoàn thành',
        width: 30,
    },
    {
        id: 'remark',
        disablePadding: true,
        label: 'Ghi chú',
        width: 60,
    },
];

const EnhancedTableHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ width: headCell.width }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 0 },
                    pr: { xs: 0, sm: 0 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Danh sách chi tiết
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Filter list'>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('requestedAt');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.serialNumber);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () => [...rows].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 30 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.serialNumber);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.serialNumber)}
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.serialNumber}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align='left'>{row.serialNumber}</TableCell>
                                        <TableCell align='left'>{row.requestedAt}</TableCell>
                                        <TableCell align='left'>{row.roomNumber}</TableCell>
                                        <TableCell align='left'>{row.content}</TableCell>
                                        <TableCell align='center'>{row.progress}</TableCell>
                                        <TableCell align='center'>{row.requestedBy}</TableCell>
                                        <TableCell align='center'>{row.priority}</TableCell>
                                        <TableCell align='center'>{row.endDate}</TableCell>
                                        <TableCell align='left'>{row.remark}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
        </Box>
    );
};

export default EnhancedTable;
