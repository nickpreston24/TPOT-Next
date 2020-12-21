export const permissions = [
    // Wordpress Permissions
    {
        app: "Scribe",
        title: "View Wordpress Papers", // how the user sees it.
        field: "canViewWordpressDraft", // our ICommand name.
        enabled: true,
        description: "When enabled, a user can view an existing draft and its details",
    },
    {
        app: "Scribe",
        title: "Checkout Wordpress Papers", // how the user sees it.
        field: "canEditWordpressDraft", // our ICommand name.
        enabled: true,
        description: "When enabled, an user can pull down and edit an existing draft"
    },
]

export type Permission = {

    app: string,
    title: string, // how the user sees it.
    field: string, // our ICommand name.
    enabled: true,
    description: string,
}