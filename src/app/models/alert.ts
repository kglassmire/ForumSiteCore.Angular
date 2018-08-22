export class Alert {
    type: AlertType;
    message: string;

    enumToString(): string {
        return AlertType[this.type];
    }
}

export enum AlertType {
    Success,
    Info,
    Warning,
    Error
}
