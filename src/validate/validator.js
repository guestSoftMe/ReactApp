const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export let max10 = maxLength(10)

// export const emails = value =>
//     value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//         'Invalid email address' : undefined

export const numberValid=value=>
    value && isNaN(value) ? `Must be number` : undefined