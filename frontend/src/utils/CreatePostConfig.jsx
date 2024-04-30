const CreateConfig = () => {
    return {
        requestType: 'POST',
        requestPath: 'http://localhost:8080/api/posts',
        redirectPath: '/posts',
        fields: [
            'username',
            'title',
            'description',
            'upvotes',
            'datePosted'
        ],
        initialState: {
            username: '',
            title: '',
            description: '',
            upvotes: '',
            datePosted: ''
        }
    }
}

export default CreateConfig;