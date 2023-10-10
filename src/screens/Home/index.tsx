import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "../../components/TaskModal";
import TaskTable from "../../components/TaskTable";
import { ITask } from "../../interface";
import { addTaskAction } from "../../redux/action";
import './index.css';

export default function Home() {
    const data = useSelector((store: { task: ITask[] }) => store.task);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleOnClickNewEmployee = () => setShowModal(true);

    const handleOnSaveTask = (task: ITask) => {
        dispatch(addTaskAction(task));
        setShowModal(false);
    }

    return (
        <div className="home-container" data-testid='home-id'>
            <div className="new-user">
                <Button data-testid='new-task-id' variant="contained" onClick={handleOnClickNewEmployee}>
                    + New Task
                </Button>
                <TaskModal
                    open={showModal}
                    title="Add Task"
                    task={{}}
                    onClose={() => setShowModal(false)}
                    onSave={handleOnSaveTask}
                />
            </div>
            <TaskTable tasks={data} />
        </div>
    );
}