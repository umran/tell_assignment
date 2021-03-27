export const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
  
export const removeItemAtIndex = (arr, index) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const replaceItemWithId = (arr, id, newValue) => {
    return arr.map(item => {
        if (item.id == id) {
            return newValue
        }

        return item
    })
}

export const removeItemWithId = (arr, id) => {
    return arr.filter(item => item.id !== id)
}