import {Box, Button, FormControl, InputBase, TextareaAutosize, styled} from '@mui/material';
import {AddCircle as Add} from '@mui/icons-material';
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataProvider';
import {API} from '../../service/api'; 

const Container = styled(Box) `
      margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'

})

const StyledFormControl = styled(FormControl) `
      margin-top: 10px;
      display: flex;
      flex-direction: row;
`

const InputField = styled(InputBase) `
       flex:1;
       margin: 0 30px;
       font-size: 25px;

`;

const TextArea = styled(TextareaAutosize) `
       margin-top: 50px;
       width: 100%;
       font-size: 18px;
       border: none;
       &:focus-visible {
          outline: none;
       }

`;

const PublishButton = styled(Button) `
       background: #FFAA80;
`;

const initialPost = {
       title: '',
       description: '',
       picture: '',
       username: '',
       categories: '',
       createDate: new Date()
}

const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const url = post.picture? post.picture:"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
     
    const location = useLocation();
    const navigate = useNavigate();
    const {account} = useContext(DataContext);

    useEffect(() => {
       const getImage = async() => {
              if(file) {
                     const data = new FormData();
                     data.append('name',file.name);
                     data.append('file',file);
                     
                     // Api call done here
                     const response = await API.uploadFile(data);
                     post.picture = response.data;
              }
       }
       getImage();
       post.categories = location.search?.split('=')[1]||'All';
       post.username = account.username;
    }, [file]);

    const changeHandler = (e) => {
       setPost({...post,[e.target.name]: e.target.value});
    }

    const savePost = async() => {
       let response = await API.createPost(post);
       if(response.isSuccess) {
              navigate('/');
       }
    }
      return(
        <Container>
               <Image src={url} alt = "banner"></Image>

               <StyledFormControl>
                   <label htmlFor='fileInput'>
                    <Add fontSize='large' color='action'/>
                   </label>
                   <input type='file' 
                   id='fileInput' 
                   style={{display:'none'}}
                   onChange={(e) =>setFile(e.target.files[0])}>
                   </input>

                   <InputField placeholder='Enter Title' onChange={(e) => changeHandler(e)} name='title'></InputField>
                   <PublishButton variant="contained" onClick={() => savePost()}>Publish</PublishButton>
               </StyledFormControl>
               <TextArea minRows={5} placeholder='Tell Your Story...' onChange={(e) => changeHandler(e)} name='description'></TextArea>
               
        </Container>
          
      )
}

export default CreatePost;