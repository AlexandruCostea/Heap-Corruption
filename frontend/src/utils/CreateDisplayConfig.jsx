const CreateConfig = (displayField, updatePath, detailsPath, deletePath, entityName) => {
    return {
        displayField: displayField,
        updatePath: updatePath,
        detailsPath: detailsPath,
        deleteConfirmationMessage: "Are you sure you want to delete this " + entityName + "?",
        deletePath: deletePath
    }
}

export default CreateConfig;