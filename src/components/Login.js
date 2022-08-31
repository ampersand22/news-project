import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Login = () => {
    const [user, setUser] = useState([])
    const [password, setPassword] = useState([])
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );



    useEffect(() => {
        axios
        .get('https://news-project-back.herokuapp.com/news')
        .then((res) => {
            setUser(res.data.user);
            setPassword(res.data.password)
        })
    }, [])

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    
    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        let { uname, pass } = document.forms[0]
        
        

    };


  return (
    <div>
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
