import { Link } from 'react-router-dom';
import Footer from './Footer';
function App() {





  return (
    <div>
    <section className="bg-light text-dark py-5 py-md-5">
    <div className="container text-center py-5">
      <h1 className="display-4 font-weight-bold">
        Welcome back!!
        <span className="text-primary"> Login In to Your Account</span> 
      </h1>
      <p className="mt-4 mb-5 lead">
       signup if you dont have Account !!.  Already a Member? Log In
      </p>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-outline-dark btn-lg mx-2" to={'/Signup'}>Signup</Link>
        <Link className="btn btn-outline-dark btn-lg mx-2" to={'/Login'}>Login</Link>
      </div>
    </div>
  </section>
  <Footer/>
  </div>
  )
}

export default App;
