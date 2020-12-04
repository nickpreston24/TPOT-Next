// Model
export class Setting {
  app: string; // | ToolboxApp  <== Define this later.
  title: string; // Friendly name of the setting for the user.
  field: string; // field name or label.
  value?: string | boolean; // Bool for toggles, string for text.
}