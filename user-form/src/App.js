
import React,{useState,useEffect} from 'react'
import './App.css';
import axios from 'axios';
import schema from './validation/Schema';
import * as yup from 'yup';
import Form from './components/Form';
import Details from './components/Details'

// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)

//initial values
const initialValues = {
  username: '',
  email: '',
  password: '',
  terms: false
}
const initialErrors = {
  username: '',
  email:'',
  password:'',
  terms:''
}
//////////////////

function App() {
  //states
const [formValues, setFormValues] = useState(initialValues);
const [user,setUser] = useState([]);
const [disabled, setDisabled] = useState(true);
const [formErrors, setFormErrors] = useState(initialErrors);

//update value function
const update = (name,value)=>{
  //validation
yup.reach(schema,name)
.validate(value)
.then(()=>{
  setFormErrors({
    
    ...formErrors,[name]: '',
  });
})
.catch((err)=>{
  setFormErrors({
    ...formErrors,
    [name]:err.errors[0]
  })
})
setFormValues({
  ...formValues,
  [name]: value
 })
}
const getUser =()=>{
  axios 
  .get('https://reqres.in/api/users')
  .then((res)=>{
    console.log(res.data.data)
   setUser(res.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })
}
const postUser=(newUser)=>{
//post newUser to server
axios
.post('https://reqres.in/api/users',newUser)
.then((res)=>{
 
  setUser([res.data,...user]);
  setFormValues(initialValues)
})
.catch((err) => {
  console.log(err)
})
}
//submit function
const submit = ()=>{
  // new user to submit
  const newUser ={
    username: formValues.username.trim(),
    email: formValues.email.trim(),
    term: formValues.terms,
    password: formValues.password
  }
  postUser(newUser);
}
useEffect(()=>{
schema.isValid(formValues)
.then((valid)=>{
  setDisabled(!valid);
});
},[formValues])

useEffect(()=>{
getUser()
},[])
  return (
    <div className="App">
     <Form values = {formValues} disabled = {disabled} errors={formErrors} submit={submit} update = {update}/>
     {user.map((us)=>{
       return  <Details key={us.id} details={us}/>
     })}
    
    </div>
  );
}

export default App;
