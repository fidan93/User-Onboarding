export default function Details (props){
    const {details} = props;
    return (
        <div className='friend container'>
          <h2>{details.username}</h2>
          <p>Email: {details.email}</p>
          
        </div>
      )
}