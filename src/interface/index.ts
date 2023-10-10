export interface IHocProps {
    children: React.ReactElement
}

export interface IUserCredential {
    username: string;
    password: string;
}

export enum ETaskStatus {
    NEW = 'NEW', ACTIVE = 'ACTIVE', BLOCKED = 'BLOCKED', CLOSED = 'CLOSED'
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    deadLine: string;
    assignedTo: string;
    status: ETaskStatus
}