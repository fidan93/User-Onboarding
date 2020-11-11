import * as yup from 'yup';
export default yup.object().shape({
    username: yup
    .string()
    .required('username is required')
    .min(3,'Minimum length is 3 chars'),
    email: yup
    .string()
    .email('Must be a valid email address')
    .required('email is required'),
    password: yup
    .string()
    .required("Enter your password")
    .min(6,"Minimum length is 6"),
    terms: yup
    .boolean()
    

})