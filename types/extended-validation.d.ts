interface ExtendedValidationArguments extends ValidationArguments {
    object: {
        [REQUEST_CONTEXT]: {
            user: User;
        };
    };
}
