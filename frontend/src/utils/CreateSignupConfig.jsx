import { validateEntity } from "../services/EntityService";


const CreateConfig = () => {
    return {
        requestType: 'POST',
        requestPath: 'http://localhost:3000/users',
        redirectPath: '/posts',
        validateEntity: 'user',
        fields: [
            'username',
            'password',,
            'firstName',
            'lastName'
        ],
        initialState: {
            username: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }
}

export default CreateConfig;