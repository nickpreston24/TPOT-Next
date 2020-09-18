// Model
export interface Setting {
  app: string; // | ToolboxApp  <== Define this later.
  title: string;
  field: string;
  value?: string | boolean; // Bool for toggles, string for text.
}
