import { fireEvent, render, screen } from "@testing-library/react";
import Home from "..";
import { ETaskStatus } from "../../../interface";

const mockTaskStatus = ETaskStatus;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: () => [{ id: 1001, title: "Dashboard Widget Design", description: "New design has to be added in product page.", deadLine: "2023-08-10T00:00:00.000Z", assignedTo: 'John', status: mockTaskStatus.CLOSED }],
    useDispatch: jest.fn(),
}));

describe("Home Page component", () => {
    it("should render the component", () => {
        render(<Home />);
        expect(screen.getByTestId('home-id')).toBeInTheDocument();
    });

    it("should show 'Add Task' modal by onClicking of '+ New Task' button", async () => {
        render(<Home />);
        const addBtn = screen.getByTestId('new-task-id');
        fireEvent.click(addBtn);
        const task = await screen.findByTestId('task-modal-id')
        expect(task).toBeInTheDocument();
    });

    // it("should close 'Add Task' modal by onClicking of Close icon on the modal", async () => {
    //     render(<Home />);
    //     const addBtn = screen.getByTestId('new-task-id');
    //     fireEvent.click(addBtn);
    //     let task = await screen.findByTestId('task-modal-id')
    //     expect(task).toBeInTheDocument();
    //     const closeBtn = await screen.findByRole('button', { name: 'close' });
    //     fireEvent.click(closeBtn);
    //     task = await screen.findByTestId('task-modal-id')
    //     expect(task).not.toBeInTheDocument();
    // });

    it("should trigger 'handleOnSaveTask' function by onClicking of 'Save' button on the modal", async () => {
        render(<Home />);
        const addBtn = screen.getByTestId('new-task-id');
        fireEvent.click(addBtn);
        const saveBtn = await screen.findByTestId('save-btn-id')
        fireEvent.click(saveBtn);
    });
});
