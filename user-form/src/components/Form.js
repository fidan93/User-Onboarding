export default function Form (props){

    const { values,submit,update,disabled,errors } = props;

     const change = (evt) => {
         const { name,value,checked,type } = evt.target;
         const newValue = type === 'checkbox' ? checked : value;
         update(name,newValue);
     }

     const onSubmit = (evt)=>{
     evt.preventDefault();
     submit();
     };

    return(
    <form onSubmit={onSubmit}>
        <div>
            <div>{errors.username}</div>
            <div>{errors.email}</div>
            <div>{errors.terms}</div>
            <div>{errors.password}</div>
        </div>

        <label>
            Username:
            <input name = "username"
            type = "text"
            value = {values.username}
            onChange = {change} 
            />
        </label>
        <label>
            Email:
            <input name = "email"
            type = "text"
            value = {values.email}
            onChange = {change} 
            />
        </label>
        <label>
           Password:
            <input name = "password"
            type = "password"
            value = {values.password}
            onChange = {change} 
            />
        </label>
        <label>
            Terms of service: Agree
            <input name ="terms"
            type="checkbox"
            checked = {values.terms}
            onChange= {change}
            />
        </label>

     <button disabled = {disabled}>Submit</button>
     </form>
    )
}