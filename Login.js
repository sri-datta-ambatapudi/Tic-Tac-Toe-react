import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom'; 


function Login()
{
  let[silog,setsilog]=useState({email:'',password:''});
  
  let[warning,setwarning]= useState(false);
  let[loading, setloading]=useState(false);

  const navigate = useNavigate();
 

  function handellog(post){
    setsilog({...silog, email:post.target.value});

  }
  function handelpass(post){
    setsilog({...silog,password:post.target.value});
  }
  
  async function handelap(){
    
    if ( silog.email === "" || silog.password === "") {
      setwarning(true); 
      return;
    }
    
    
    if ((silog.password.length < 5) || !/[A-Z]/.test(silog.password) || !/[a-z]/.test(silog.password)) {
      setwarning(true); 
      return;
    }
    
    setwarning(false);

    try 
    {
      setloading(true);

      let api = await axios.post("http://localhost:8080/api/login", silog);

      setloading(false);
    
      if (api.status === 200 )
     {
        navigate('/Game');
        window.confirm(" " + api.data);
      }
       else 
      {
       
        window.confirm(" " + api.data);
      }
    } 
    catch (error) 
    {
      setloading(false);
      window.confirm("Error: " + error.message);
    }

  }
  
    
    return(
      <div>
             <div className="container">
           
              <div className="row">
                <div className="col-6 pt-5"> 
                    <h1> hello every one </h1>
                    <span className="text-primary"> hello everyone for unintreppted services please login</span>
                    
                </div>

                <div className="col-6 pt-5"> 
                     <div className="input-group flex-nowrap">
                       <span className="input-group-text" id="addon-wrapping">@</span>
                       <input type="text" className="form-control" onChange={post=>handellog(post)}placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping"></input>
                   </div><br/>
                    <input type="password" className="form-control" onChange={post=>handelpass(post)} placeholder="password" maxLength={5}/><br/>
                    <div>
                      <p>
                      "Password: 1 uppercase, 1 lowercase, 1 number minimum 5 characters "
                      </p>
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={e=>handelap()} >Submit</button>
                  
                    {
                      
                    warning &&(
                    <div className="alert alert-danger " role="alert">
                    ⚠️ Please fill all fields correctly and ensure password meets requirements 
                    </div>
                    )}

                   
                    
                    {
                      loading &&(
                    <div className="justify-content-center align-items-top" style={{ height: '10vh' }}>
                      <div className="spinner-border text-dark" role="status">
                         <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                   )} 
                     </div>
                </div>
            </div>
       
         <div className="last"> 
         <Footer/>
         </div>
</div>
    )
};

export default Login;