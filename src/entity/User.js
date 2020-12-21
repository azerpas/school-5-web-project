module.exports = {
    name: "User", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        password: {
            type: "string"
        }
    }
};