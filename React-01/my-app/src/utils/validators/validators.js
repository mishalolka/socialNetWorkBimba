
export const required = value =>
{
    if (value) return undefined;

    return "Field required";
}

export const maxLengthCreator = (maxLength) => value =>
{
    if (value.length > maxLength) return "max length 30";

    return undefined;
}
