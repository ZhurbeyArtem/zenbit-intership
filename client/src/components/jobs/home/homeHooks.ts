const getTags = (item) => {
    const arr = []
    item.tagsToJobs.forEach(e => {
        arr.push(e.tags.name + ' ')
    })
    return arr
}

export {
    getTags
};
