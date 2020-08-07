export type AppAction = {
    title: string;
    onClick: Function;
    activationRoute?: string;
    icon?: string;
    toolTipText?: string;
};