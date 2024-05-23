import { validateEntity } from "../services/EntityService";


const CreateConfig = () => {
    return {
        requestType: 'POST',
        requestPath: 'https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/users',
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