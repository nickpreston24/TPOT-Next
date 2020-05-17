export enum CheckoutStatus {
    InProgress = 'In Progress', // In Progress, but not Checked Out.
    NotStarted = 'Not Started', // Not started as in Progress and not Checked out.
    CheckedOut = 'Checked Out', //Checked out by another User.
    FirstDraft = 'First Draft', // Is in the 'Draft' mode in Wordpress; Additionally, the paper is In-Progress.
    Published = 'Published', // Is completely finalized in WP (as Victor) and cannot be updated in WP, except as a Super User (Victor, Ronnie, MP, BP)
}

export const CheckoutColors = new Map<string, string>([
    [CheckoutStatus.InProgress, '#c3e3ff'],
    [CheckoutStatus.NotStarted, '#ffe8c6'],
    [CheckoutStatus.CheckedOut, '#ffc6c8'],
    [CheckoutStatus.Published, '#a6ffc6'],
    [CheckoutStatus.FirstDraft, '#a4a8f7'],
])