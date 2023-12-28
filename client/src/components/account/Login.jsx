import {useState, useContext} from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';

import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';

//Adding CSS

const Component = styled(Box)`
     width: 400px;
     margin: auto;
     box-shadow: 5px 2px 2px rgb(0 0 0/ 0.6);
     background: #FFFFFF;
` 
;

const Image = styled('img') ({  //It passed as object
      width: 100,
      display: 'flex',
      margin: 'auto',
      padding: '50px 0 0'
      

})

const Wrapper = styled(Box)`
       margin: auto;
       display: flex;
       flex: 1;
       flex-direction: column;
       padding: 25px 35px;
       & > div , & > button , & > p{
          margin-top: 20px;
       }
`
;

const LoginButton = styled(Button)`
        text-transform: none;
        background-color: #FB641B;
        border-radius: 2px;
        color: #fff;
        height: 48px;
`;

const SignupButton = styled(Button)`
        text-transform: none;
        background: #fff;
        border-radius: 2px;
        color: #2874f0;
        height: 48px;
        box-shadow: 0 2px 4px 0 rgb(0 0 0/0.2);
`;

const Error = styled(Typography)`
        font-size: 10px;
        color: #ff6161;
        margin-top: 10px;
        line-height: 0;
        font-weight: 600;
`
const Text = styled(Typography)`
        color: #878787;
        font-size: 12px

`;


const signupInitialValues = {
    name : '',
    username : '',
    password : ''

}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {
    
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const {setAccount} = useContext(DataContext);

    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name] : e.target.value});
    }

    const signupHandler = async () => {
       let response = await API.userSignup(signup);
       if(response.isSuccess) {
         setError('');
         setSignup(signupInitialValues);
         toggleAccount('login');
       }
       else {
         setError('Something went wrong!!! Please try again later...');
       }
    }

    const onValueChange = (e) => {
        setLogin({...login,[e.target.name]: e.target.value});
    }

    const loginHandler = async() => {
        let response = await API.userLogin(login);
        if(response.isSuccess) {
            setError('');
            
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username: response.data.username, name: response.data.name});

            isUserAuthenticated(true);

            navigate('/');
            
          }
          else {
            setError('Something went wrong!!! Please try again later...');
          }
    }

    return (
        <Component>
            <Image src={imageURL} alt="login" />
            {
                account === 'login' ?
            
                <Wrapper>
                    <TextField variant='standard' value = {login.username} label='Enter Username' name='username' onChange={(e) => onValueChange(e)}/>
                    <TextField variant='standard' value = {login.password} label='Enter Password' name='password' onChange={(e) => onValueChange(e)}/>
                     
                    {error && <Error>{error}</Error>}
                    <LoginButton variant='contained' onClick={() => loginHandler()}>Login</LoginButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <SignupButton  onClick={() => toggleSignup()}>Create Account</SignupButton>
                </Wrapper>
             :
                <Wrapper>
                    <TextField variant='standard' label='Enter Name' name='name' onChange={(e) => onInputChange(e)}/>
                    <TextField variant='standard' label='Enter Username' name='username' onChange={(e) => onInputChange(e)}/>
                    <TextField variant='standard' label='Enter Password' name='password' onChange={(e) => onInputChange(e)}/>
                     
                     {error && <Error>{error}</Error>}
                    <SignupButton onClick={() => signupHandler()}>Sign Up</SignupButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <LoginButton variant='contained' onClick={() => toggleSignup()}>Already Have An Account</LoginButton>
                </Wrapper>
            }
        </Component>
    )
    
}

export default Login;