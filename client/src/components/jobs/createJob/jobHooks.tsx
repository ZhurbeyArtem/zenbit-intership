export const getNameTags = (tags) =>{

    const list = []
    tags?.forEach(e => {
        list.push(<Option key={e.name}>{e.name}</Option>)
    })
    return list
}