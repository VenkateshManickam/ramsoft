import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_HEADERS } from '../constants';
import { ITask } from '../interface';
import { deleteTaskAction, editTaskAction } from '../redux/action';
import TaskModal from './TaskModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TaskTable(props: { tasks: ITask[] }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const [editTask, setEditTask] = useState({});
    const data = useSelector((store: { task: ITask[] }) => store.task);

    const handleOnClickEditEmployee = (task: ITask) => {
        if (task.id) {
            const selectedTask = data.find(d => d.id === task.id);
            if (selectedTask) setEditTask(selectedTask);
        }
        setShowEditModal(true)
    };

    return (
        <>
            <TableContainer data-testid='task-table-id' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {TABLE_HEADERS.map((header, index) =>
                                <StyledTableCell key={header} align={[0, 1].includes(index) ? "left" : "right"}>{header}</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasks.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                <StyledTableCell align="left">{row.title}</StyledTableCell>
                                <StyledTableCell align="right">{row.assignedTo}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(row.deadLine).toDateString()}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleOnClickEditEmployee(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => dispatch(deleteTaskAction(row))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TaskModal
                open={showEditModal}
                title="Edit Task"
                task={editTask}
                onClose={() => setShowEditModal(false)}
                onSave={(task) => {
                    dispatch(editTaskAction(task));
                    setShowEditModal(false);
                }}
            />
        </>
    );
}