export interface ConfrimationDialogData{
    header: string,
    text: string,
    mode?: 'decision' | 'info',
    confirmFn: () => void,
    rejectFn: () => void
}