
const CreateConfig = (id, post, userList) => {
    return {
        requestType: 'PUT',
        requestPath: 'http://localhost:8080/api/posts/' + id,
        redirectPath: '/posts',
        fields: [
            'username',
            'title',
            'description',
            'upvotes',
            'datePosted'
        ],
        initialState: {
            username: userList.find(user => user.id === post.userId).username,
            title: post.title,
            description: post.description,
            upvotes: post.upvotes,
            datePosted: post.datePosted
        }
    }
}

export default CreateConfig;