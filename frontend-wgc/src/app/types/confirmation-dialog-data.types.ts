export interface ConfrimationDialogData{
    header: string,
    text: string,
    confirmFn: () => void,
    rejectFn: () => void
}