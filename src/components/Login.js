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
        axios.post('https://news-project-back.herokuapp.com/createaccount', userObj).then((response) => {
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
        axios.put('https://news-project-back.herokuapp.com/login', userObj).then((response) => {
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
        <div className="App" style = {{paddingTop: "150px"}}>
            <div>
            {toggleLogout ?
                <button className="btn btn-outline-primary logoutBtn" onClick={handleLogout}>Logout</button> :
                <div className='appFormDiv'>
                {toggleLogin ?
                  //login form
                <div className="formContainer">
                    <h1 className='formTitle'>Login Here</h1>
                    <form onSubmit={handleLogin} className='inputForm'>
                        <input type='text' placeholder='username' className='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                        <input type='password' placeholder='password' className='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                        {toggleError ?
                        <h5 className='errorMsg'>{errorMessage}</h5>
                        :
                        null
                        }
                        <input type='submit' value='Login'  className='submitBtn btn btn-outline-primary'/>
                    </form>
                </div>
                :
                // new user form
                <div className="App formContainer">
                    <h1 className='formTitle'>Create an Account</h1>
                    <form onSubmit={handleCreateUser} className='inputForm'>
                    <input type='text' placeholder='username' className='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                    <input type='password' placeholder='password' className='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                    {toggleError ?
                        <h5 className='errorMsg'>{errorMessage}</h5>
                        :
                        null
                    }
                        <input type='submit' value='Register' className='submitBtn btn btn-outline-primary'/>
                    </form>
                </div>
                }
                <button onClick={handleToggleForm} className='accountBtn btn btn-outline-primary'>{toggleLogin ? 'New Account?' : 'Login'}</button>
            </div>
            }
    
    
        </div>
        {currentUser.username ?
            <div className='loggedInDiv'>
            <p>Logged in as <span style={{ color: 'blue' }}> {currentUser.username} </span></p>
                </div>
                :
                null
            }
        </div>
        );
    }
    
export default Login;
