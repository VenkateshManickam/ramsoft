import { fireEvent, render, screen } from "@testing-library/react";
import { ETaskStatus, ITask } from "../../interface";
import TaskTable from "../TaskTable";

const mockTaskStatus = ETaskStatus;

const mockData = { id: 1001, title: "Dashboard Widget Design", description: "New design has to be added in product page.", deadLine: "2023-08-10T00:00:00.000Z", assignedTo: 'John', status: mockTaskStatus.CLOSED };

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: () => [mockData],
    useDispatch: () => jest.fn(),
}));

const props: { tasks: ITask[] } = { tasks: [mockData] };

describe("Task Table component", () => {
    it("should render the component", () => {
        render(<TaskTable {...props} />);
        expect(screen.getByTestId('task-table-id')).toBeInTheDocument();
    });

    it("should trigger 'handleOnClickEditEmployee' function by onClick of edit button in table row", () => {
        render(<TaskTable {...props} />);
        const editBtn = screen.getByRole('button', { name: 'edit' });
        fireEvent.click(editBtn);
    });

    it("should trigger onClick function by onClick of delete button in table row", () => {
        render(<TaskTable {...props} />);
        const deleteBtn = screen.getByRole('button', { name: 'delete' });
        fireEvent.click(deleteBtn);
    });
});
