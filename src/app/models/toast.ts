export class Toast {
    type: ToastType;
    message: string;
}

export enum ToastType {
    Success,
    Info,
    Warning,
    Error
}
