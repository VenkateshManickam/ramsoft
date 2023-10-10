import { ETaskStatus, ITask } from "../interface";
import ACTION_TYPE from "./types";

const initialState: ITask[] = [
    { id: 1001, title: "Dashboard Widget Design", description: "New design has to be added in product page.", deadLine: "2023-08-10T00:00:00.000Z", assignedTo: 'John', status: ETaskStatus.CLOSED },
    { id: 1002, title: "Bug - Settings Page", description: "As a user, I should be able to control the settings.", deadLine: "2023-09-18T00:00:00.000Z", assignedTo: 'Amith', status: ETaskStatus.ACTIVE },
    { id: 1003, title: "Enhancement - Edit Widget", description: "As a user, I should be able to edit the widget.", deadLine: "2023-09-22T00:00:00.000Z", assignedTo: 'Zahir', status: ETaskStatus.NEW },
]

const taskReducer = (
    state = initialState,
    action: { type: ACTION_TYPE, payload: ITask }
) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TASK:
            return [...state, action.payload];
        case ACTION_TYPE.EDIT_TASK:
            const newState = state.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            })
            return newState;
        case ACTION_TYPE.DELETE_TASK:
            const data = state.filter(task => task.id !== action.payload.id)
            return data;
        default:
            return state;
    }
};

export default taskReducer;