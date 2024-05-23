import { AppContext } from "../App";
import { useContext } from "react";

const CreateConfig = () => {
    const { token, userList } = useContext(AppContext);
    return {
        requestType: 'POST',
        requestPath: 'https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/posts',
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
            title: '',
            description: '',
            upvotes: '',
            datePosted: ''
        }
    }
}

export default CreateConfig;