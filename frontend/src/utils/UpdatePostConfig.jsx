import { AppContext } from "../App";
import { useContext } from "react";

const CreateConfig = (id, post) => {
    const { token, userList } = useContext(AppContext);

    return {
        requestType: 'PUT',
        requestPath: 'http://localhost:3000/posts/' + id,
        redirectPath: '/posts',
        validateEntity: 'post',
        fields: [
            'title',
            'description',
            'upvotes',
            'datePosted'
        ],
        initialState: {
            username: userList.find(user => user.id === token.id).username,
            title: post.title,
            description: post.description,
            upvotes: post.upvotes,
            datePosted: post.datePosted
        }
    }
}

export default CreateConfig;