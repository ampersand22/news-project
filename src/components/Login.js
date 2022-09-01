import React, {useState} from 'react'
import axios from 'axios'


const Login = () => {
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toggleLogout, setToggleLogout] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    const handleCreateUser = (event) => {
        event.preventDefault()
        event.currentTarget.reset()
        let userObj = {
            username,
            password,
        }
        setUsername('')
        setPassword('')
        axios.post('http://localhost:3003/createaccount', userObj).then((response) => {
            if(response.data.username){
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                setCurrentUser(response.data)
                handleToggleLogout()
            } else {
                setErrorMessage(response.data)
                setToggleError(true)
            }
        })
    }
    
    const handleLogin = (event) => {
        event.preventDefault()
        event.currentTarget.reset()
        let userObj = {
            username: username,
            password: password
        }
        setUsername('')
        setPassword('')
        axios.put('http://localhost:3003/login', userObj).then((response) => {
            if(response.data.username){
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                setCurrentUser(response.data)
                handleToggleLogout()
            } else {
                console.log(response);
                setToggleError(true)
                setErrorMessage(response.data)
            }
        })
    }
    
    const handleLogout = () => {
        setCurrentUser({})
        handleToggleLogout()
    }
    
    const handleToggleForm = () => {
        setToggleError(false)
        if(toggleLogin === true) {
            setToggleLogin(false)
        } else {
            setToggleLogin(true)
        }
    }
    
    const handleToggleLogout = () => {
        if(toggleLogout) {
            setToggleLogout(false)
        } else {
            setToggleLogout(true)
        }
    }

    return (
        <div className="App">
            <div>
            {toggleLogout ?
                <button className="btn btn-outline-primary" onClick={handleLogout} class='logoutBtn'>Logout</button> :
                <div class='appFormDiv'>
                {toggleLogin ?
                  //login form
                <div className="formContainer">
                    <h1 class='formTitle'>Login Here</h1>
                    <form onSubmit={handleLogin} class='inputForm'>
                        <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                        <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                        {toggleError ?
                        <h5 class='errorMsg'>{errorMessage}</h5>
                        :
                        null
                        }
                        <input type='submit' value='Login'  class='submitBtn btn btn-outline-primary'/>
                    </form>
                </div>
                :
                // new user form
                <div className="App" class='formContainer'>
                    <h1 class='formTitle'>Create an Account</h1>
                    <form onSubmit={handleCreateUser} class='inputForm'>
                    <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                    <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                    {toggleError ?
                        <h5 class='errorMsg'>{errorMessage}</h5>
                        :
                        null
                    }
                        <input type='submit' value='Register' class='submitBtn btn btn-outline-primary'/>
                    </form>
                </div>
                }
                <button onClick={handleToggleForm} class='accountBtn btn btn-outline-primary'>{toggleLogin ? 'New Account?' : 'Login'}</button>
            </div>
            }
    
    
        </div>
        {currentUser.username ?
            <div class='loggedInDiv'>
            <p>Logged in as <span style={{ color: 'blue' }}> {currentUser.username} </span></p>
                </div>
                :
                null
            }
        </div>
        );
    }
    
export default Login;
