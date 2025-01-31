import axios from 'axios';
import React, { useState } from 'react';
import Footer from './Footer';

function Signup() {
  let [signup, setsignup] = useState({ user: '', email: '', password: '' });
  let [response, setresponse]=useState('');
  let[war,setwar]=useState(false);

  let[warloding,setwarloading]=useState(false);
  

  function handleUser(event) {
    setsignup({ ...signup, user: event.target.value });
  }

  function handleEmail(event) {
    setsignup({ ...signup, email: event.target.value });
  }

  function handlePassword(event) {
    setsignup({ ...signup, password: event.target.value });
  }

  async function handleApi() {
    if (signup.user.length < 5) {
      setwar(true); 
      return;
    }
    
    if (signup.user === "" || signup.email === "" || signup.password === "") {
      setwar(true); 
      return;
    }
    
    if ((signup.password.length < 5) || !/[A-Z]/.test(signup.password) || !/[a-z]/.test(signup.password)) {
      setwar(true); 
      return;
    }
    setwar(false)
    
    try{
    
      setwarloading(true)
      let api= await axios.post("http://localhost:8080/api/post",signup)
     
      setresponse(api.data)
      if(api.status===200)
        {
        window.confirm(api.data)
        setwarloading(false)
      }
      else
      {
        setwarloading(false)
        window.confirm(api.data)
      }
     
  }
  catch (error){
    window.confirm("Error :"+error.message)
  }
}


  return (
    <div>
      
      <div className='container vh-100 d-flex justify-content-center align-items-center' >
        
        <div className='col-12 col-md-6 col-lg-4 pt-5'>

       
           { 
           warloding &&(

           <div className="d-flex justify-content-center align-items-start"  style={{ height: '10vh' }}>
              <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
             </div>
          </div>

         )} 
          <h2 className='text-center'>Signup </h2>
        <input type='text' className='form-control ' onChange={event =>handleUser(event)}  placeholder='Username'/><br />

        <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">@</span>
                      <input type="text" className="form-control" onChange={event =>handleEmail(event)}placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping"></input>
                     </div>
                     <br/>
        
        <input type='password' className='form-control' onChange={event =>handlePassword(event)} placeholder='Password'maxLength={5}/><br />
        <div>
          <p>
          "Password: 1 uppercase, 1 lowercase, 1 number" mini:5 characters:)
          </p>
        </div>
        <button className='btn btn-primary btn-lg'  onClick={handleApi}>Submit</button><br/>
      
      
        {
          war &&(
            
            <div className="alert alert-danger" role="alert">
            ⚠️ Please fill all fields correctly and ensure password meets requirements:)
         </div>
          )
        } 
        
          </div>
          </div>
          <Footer/>
    </div>
  );
}

export default Signup;
