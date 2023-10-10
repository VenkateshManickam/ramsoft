import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATUS, USER_DROPDOWN } from '../constants';
import { ITask } from '../interface';
import './index.css';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface ITaskModalProps {
    title: string;
    onSave: (task: ITask) => void;
    task: Partial<ITask>;
    open: boolean;
    onClose: () => void;
}

export default function TaskModal(props: ITaskModalProps) {
    const { onClose, onSave, open, title } = props;
    const [task, setTask] = useState<Partial<ITask>>({});
    const [showError, setShowError] = useState(false);
    const data = useSelector((store: { task: ITask[] }) => store.task);

    useEffect(() => {
        const newTask = props.task;
        if (!newTask.id) {
            const id = (data.at(-1)?.id ?? 0) + 1;
            newTask.id = id;
        }
        setTask(newTask);
    }, [props.task]);

    useEffect(() => {
        return () => {
            setTask({});
        };
    }, []);

    const handleOnChangeField = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTask({ ...task, [e.target.name]: e.target.value });

    const handleOnChangeDate = (date: moment.Moment | null) =>
        setTask({ ...task, deadLine: date ? date.toISOString() : "" });

    const handleOnClose = onClose;

    const handleOnSave = (task: ITask) => {
        if (!(task.assignedTo && task.deadLine && task.description && task.status && task.title)) {
            setShowError(true);
        } else {
            onSave(task);
        }
    }

    const handleOnCloseError = () => setShowError(false);

    return (
        <Dialog
            data-testid='task-modal-id'
            fullScreen
            open={open}
            onClose={handleOnClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleOnClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {title}
                    </Typography>
                    <Button data-testid='save-btn-id' autoFocus color="inherit" onClick={() => handleOnSave(task as ITask)}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <FormControl sx={{ m: 3 }} className='task-form'>
                <TextField
                    required
                    id="title"
                    label="Title"
                    name='title'
                    value={task.title}
                    onChange={handleOnChangeField}
                />
                <TextField
                    required
                    multiline
                    rows={3}
                    id="description"
                    label="Description"
                    name='description'
                    value={task.description}
                    onChange={handleOnChangeField}
                />
                <div className='fields'>
                    <TextField
                        disabled
                        required
                        id="task-no"
                        label="Task No"
                        value={task.id}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            format='LL'
                            label={'Target Date *'}
                            value={task.deadLine ? moment(task.deadLine) : undefined}
                            onChange={handleOnChangeDate}
                        />
                    </LocalizationProvider>
                </div>
                <div className='fields'>
                    <FormControl className='assigned-to'>
                        <InputLabel id="assigned-to-label">Assigned To *</InputLabel>
                        <Select
                            required
                            labelId="assigned-to-label"
                            id="assignedTo"
                            value={task.assignedTo}
                            label="Assigned To *"
                            name='assignedTo'
                            onChange={handleOnChangeField as any}
                        >
                            {USER_DROPDOWN.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className='status'>
                        <InputLabel id="status-label">Status *</InputLabel>
                        <Select
                            required
                            labelId="status-label"
                            id="status"
                            value={task.status}
                            label="Status *"
                            name='status'
                            onChange={handleOnChangeField as any}
                        >
                            {STATUS.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
            </FormControl>

            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showError} autoHideDuration={6000} onClose={handleOnCloseError}>
                <Alert onClose={handleOnCloseError} severity="error">
                    Please fill all the required fields!
                </Alert>
            </Snackbar>
        </Dialog>
    );
}