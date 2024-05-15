import { validateEntity } from "../services/EntityService";


const CreateConfig = () => {
    return {
        requestType: 'POST',
        requestPath: 'http://localhost:8080/api/users',
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