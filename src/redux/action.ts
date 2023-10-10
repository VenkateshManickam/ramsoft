import { ITask } from "../interface";
import ACTION_TYPE from "./types";

export const addTaskAction = (task: ITask) => ({ type: ACTION_TYPE.ADD_TASK, payload: task })

export const editTaskAction = (task: ITask) => ({ type: ACTION_TYPE.EDIT_TASK, payload: task })

export const deleteTaskAction = (task: ITask) => ({ type: ACTION_TYPE.DELETE_TASK, payload: task })