export const getPropertyName = <T>(object?: T): T => {
    return new Proxy(
        {},
        {
            get({}, property) {
                return property;
            },
        }
    ) as T;
};
