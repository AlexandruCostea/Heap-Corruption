const deleteEntity = (list, setList, entityToDelete) => {
    const updatedList = list.filter(entity => entity.id !== entityToDelete.id);
    setList(updatedList);
}

const addEntity = (list, setList, newEntity) => {
    const newList = [...list];
    newList.push(newEntity);
    setList(newList);
}

const updateEntity = (list, setList, updatedEntity, id) => {
    const newList = [...list];
    const index = newList.findIndex(entity => entity.id == id);
    newList[index] = updatedEntity;

    setList(newList);
}

const validateEntity = (type, formData, parentEntityList = null) => {
    if (type === "post") {
        return validatePost(formData, parentEntityList);
    } else {
        return validateUser(formData);
    }
}

const validatePost = (formData, parentEntityList) => {
    for (const key in formData) {
        if (formData[key] === "") {
            return {status: false, entity: null, message: "All fields are required"};
        }
    }
    if (isNaN(formData.upvotes)) {
        return {status: false, entity: null, message: "Upvotes must be a number"};
    }
    formData.upvotes = parseInt(formData.upvotes);
    const date = new Date(formData.datePosted);

    if (isNaN(date.getTime())) {
        return {status: false, entity: null, message: "Date must be a valid date"};
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.datePosted) || date > new Date() || date.getFullYear() < 2022) {
        return {status: false, entity: null, message: "Date must be in the format YYYY-MM-DD, not in the future, and not before 2022"};
    }

    if (!parentEntityList) {
        return {status: false, entity: null, message: "Parent entity list is required"};
    }

    if (!parentEntityList.some(entity => entity.username === formData.username)) {
        return {status: false, entity: null, message: "Username not found"};
    }

    const data = {
        userId: parentEntityList.find(entity => entity.username === formData.username).id,
        title: formData.title,
        description: formData.description,
        upvotes: formData.upvotes,
        datePosted: formData.datePosted
    }

    return {status: true, entity: data, message: null};
}

const validateUser = (formData) => {
}

export { deleteEntity, addEntity, updateEntity, validateEntity };