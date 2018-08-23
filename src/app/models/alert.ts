export class Alert {
    type: AlertType;
    key: string;
    message: string;
    count: number;
}

export enum AlertType {
    Success,
    Info,
    Warning,
    Error
}
