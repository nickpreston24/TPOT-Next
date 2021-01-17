export enum CheckoutStatus {
  InProgress = 'In Progress',
  NotStarted = 'Not Started',
  CheckedOut = 'Checked Out',
  FirstDraft = 'First Draft',
  Published = 'Published',
  SetAside = 'Set Aside',
}

export const CheckoutColors = new Map<string, string>([
  [CheckoutStatus.InProgress, '#c3e3ff'],
  [CheckoutStatus.NotStarted, '#ffe8c6'],
  [CheckoutStatus.CheckedOut, '#ffc6c8'],
  [CheckoutStatus.Published, '#a6ffc6'],
  [CheckoutStatus.FirstDraft, '#a4a8f7'],
  [CheckoutStatus.SetAside, '#445882'],
])
