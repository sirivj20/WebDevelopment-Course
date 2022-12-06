import React from "react";
import { useState } from "react";

function Register (props) {

    const[regName,setName] = useState('');
    const[regEmail,setEmail] = useState('');
    const[regPassword,setPassword] = useState('');


    const onNameChange =(e)=>{
        setName(e.target.value);
    }

    const onEmailChange =(e)=>{
        setEmail(e.target.value);
    }

    const onPasswordChange =(e)=>{
        setPassword(e.target.value);
    }
    const onSubmit =(event) => {
        event.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: regEmail,
                password: regPassword,
                name:regName
            })
        })
        .then(Response => Response.json())
        .then(user =>{
            if(user){
                props.loadUser(user);
                props.onRouteChange('home');  
            }
            else{
                console.log("error Logging in");
            }
        })
    }
    return (
        
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                            <input onChange = {onNameChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="Name" name="Name" id="Name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange = {onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange = {onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                        
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                </form>
            </main>
        </article>
    );
}
export default Register;