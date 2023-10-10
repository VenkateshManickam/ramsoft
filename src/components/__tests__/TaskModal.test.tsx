import { fireEvent, render, screen } from "@testing-library/react";
import { ETaskStatus } from "../../interface";
import TaskModal, { ITaskModalProps } from "../TaskModal";

const mockTaskStatus = ETaskStatus;

const mockData = { id: 1001, title: "Dashboard Widget Design", description: "New design has to be added in product page.", deadLine: "2023-08-10T00:00:00.000Z", assignedTo: 'John', status: mockTaskStatus.CLOSED };

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: () => [mockData],
}));

const props: ITaskModalProps = {
    title: 'Add Task',
    onSave: jest.fn(),
    task: mockData,
    open: true,
    onClose: jest.fn(),
};

describe("Task Modal component", () => {
    it("should render the component", () => {
        render(<TaskModal {...props} />);
        expect(screen.getByTestId('task-modal-id')).toBeInTheDocument();
    });

    it("should trigger 'handleOnClose' function by onClicking of Close icon on the modal", () => {
        render(<TaskModal {...props} />);
        const closeBtn = screen.getByRole('button', { name: 'close' });
        fireEvent.click(closeBtn);
        expect(props.onClose).toBeCalled();
    });

    it("should trigger 'handleOnSaveTask' function by onClicking of 'Save' button on the modal", () => {
        render(<TaskModal {...props} />);
        const saveBtn = screen.getByTestId('save-btn-id');
        fireEvent.click(saveBtn);
        expect(props.onSave).toBeCalled();
    });

    it("should trigger 'handleOnChangeField' function by onChange of field", () => {
        render(<TaskModal {...props} />);
        const titleField = screen.getAllByRole('textbox')[0];
        fireEvent.change(titleField);
    });
});
