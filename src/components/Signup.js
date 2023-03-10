import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {useState, useContext} from 'react'
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal"



function Signup ({handleSignupClose}){
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    // const [avatar, setAvatar] = useState ({})
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("")
    const [seeking_relationship, setSeeking_Relationship] = useState (false)
//    const [errors, setErrors] = useState([]);
const [isLoading, setIsLoading] = useState(false);
   const {setUser} = useContext(UserContext)
   const navigate = useNavigate()
   const [ errors, setErrors ] = useState(null)

    function handleUserSubmit(e) {
      e.preventDefault();
      setIsLoading(true)
      setErrors(null)
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
          first_name,
          last_name,
          email,
          password,
          passwordConfirmation,
          age,
          address,
          seeking_relationship,
        }),
           
      }).then((r) => {
        setIsLoading(false)
        if (r.ok) {
          r.json().then((user) => setUser(user));
          navigate("/HomePage")
        } else {
           r.json().then((err) => (setErrors(err.errors)))
      }
      });
    }


    // setUser(user)






 return(


  <div className='back-sign'>
    <Form onSubmit={handleUserSubmit}> 
       <div className='sign_up_errors'>
              {errors ? errors.map((e) =>
                  <Alert severity="error" >{e}</Alert>) : null}
          </div> 
          <button className='bcksign-btn' onClick={handleSignupClose}>
          ??? Back
          </button>

    <div className='sign-form'>
    
      <h1 className="slogan">Where Pet Pal Meets Tinder </h1>
      <h3>Sign Up Below </h3>

      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          type="name" 
          placeholder="First Name"
          value={first_name}
          onChange={(e) =>setFirst_name(e.target.value)}
        />
      </Form.Group>
     

      <Form.Group>
                <Form.Label>Last Name</Form.Label>
                        <Form.Control type="name" placeholder="Last Name"
                                value={last_name}
                                onChange={(e) =>setLast_name(e.target.value)}/>
         </Form.Group>

         <Form.Group>
                <Form.Label>Email address</Form.Label>
                   <Form.Control type="email" placeholder="Enter email"
                       value={email}
                          onChange={(e) =>setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                               We'll never share your email with anyone else.
                                        </Form.Text>
        </Form.Group>

        <Form.Group >
                <Form.Label>Password</Form.Label>
                   <Form.Control type="password" placeholder="Password"
                       value={password}
                         onChange={(e) =>setPassword(e.target.value)} />
                            <Form.Text className="text-muted">
                                        </Form.Text>
        </Form.Group>
        <Form.Group >
                <Form.Label>Password Confirmation </Form.Label>
                   <Form.Control type="password" 
                   placeholder="Password Confirmation"   
                       value={passwordConfirmation}
                         onChange={(e) =>setPasswordConfirmation(e.target.value)} />
                            <Form.Text className="text-muted">
                                        </Form.Text>
        </Form.Group>

        <Form.Group>
                 <Form.Label>Age</Form.Label>
                    <Form.Control type="age"
                     placeholder="Must Be 18 or Older to pet ????"  
                        value={age}
                            onChange={(e) =>setAge(e.target.value)}/>
      </Form.Group>


      <Form.Group>
        <Form.Label>Address</Form.Label>
             <Form.Control type="address" placeholder="Address"
                 value={address}
                    onChange={(e) =>setAddress(e.target.value)}  />
      </Form.Group>

       <br></br>
       <Form.Group 
    
           className="x" controlId="formBasicCheckbox">
               <p> Are you seeking a Relationship with lenders as well ?</p>
                <Form.Check type="checkbox" 
                    label="yes I am seeking a relationship"
                        value={seeking_relationship}
                            onChange={(e) =>setSeeking_Relationship(true)} />
      </Form.Group>

      {/* <Form.Group>
        <Form.Label>Upload Profile Image </Form.Label>
             <Form.Control
           input type="file" 
      
              // value={address}
              // onChange={(e) =>setAddress(e.target.value)}/>
              />
      </Form.Group> */}
      
      <Button 
       type="submit" variant="dark" >
      {isLoading ? "Loading..." : "Sign Up"}

      </Button>





      </div>
      </Form>
      </div>
  
 )

}


export default Signup;