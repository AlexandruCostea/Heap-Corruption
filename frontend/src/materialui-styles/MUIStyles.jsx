const paperStyle = {
    bgcolor: '#242424',
}

const rowStyle = {
    backgroundColor: '#242424',
    border: '3px solid white',
    '&:hover': {
        backgroundColor: 'white',
        '& .MuiTableCell-root': {
            color: '#242424',
            '& .MuiButton-root': {
                color: '#242424',
                fontWeight: 'bold',
            },
        },
    },
}

const cellStyle = {
    color: 'white',
    fontSize: '2em',
    fontWeight: 'bold',
    border: '3px solid white',
    '&:hover': {
        color: '#242424',
    },
}

const postCellStyle = {
    color: 'white',
    fontSize: '2em',
    fontWeight: 'bold',
    '& .table_cell': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '2em',
    },
    '&:hover': {
        '& .table_cell': {
            color: '#242424',
        },
    },
}


const deleteButtonStyle = {
    color: '#242424',
    fontWeight: 'bold',
    backgroundColor: '#535bf2',
    '&:hover': {
        backgroundColor: 'red',
        color: '#242424',
    },
}

const updateButtonStyle = {
    color: '#242424',
    fontWeight: 'bold',
    backgroundColor: '#535bf2',
    '&:hover': {
        backgroundColor: 'green',
        color: '#242424',
    },
}

const backButtonStyle = {
    color: '#242424',
    fontWeight: 'bold',
    backgroundColor: '#535bf2',
    position: 'absolute',
    left: '2%',
    top: '4%',
    '&:hover': {
        backgroundColor: 'red',
        color: '#242424',
    },
}


const fromFieldStyle = {
    width: '100%',
    '& .MuiInputLabel-root': {
        color: '#535bf2',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
}

export { paperStyle, rowStyle, cellStyle, postCellStyle, deleteButtonStyle, updateButtonStyle, backButtonStyle, fromFieldStyle};