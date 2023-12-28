
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { API } from "../../../service/api";
import { Box, Grid } from "@mui/material";
import Post from "./Post";

const Posts = () => {

    const[posts, setPosts] = useState([]);
    const [searchParam] = useSearchParams();
    const category = searchParam.get('category');

    useEffect(() => {
            const fetchData = async() => {
                let response = await API.getAllPosts({ category: category || ''});
                if(response.isSuccess) {
                    setPosts(response.data);
                }
            }
            fetchData();
    }, [category]);

    return(
        <>
        {
            posts && posts.length > 0 ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                  <Post post={post}/>
                </Grid>
            )) : <Box style={{fontSize: 18, margin: '30px 80px', color: '#878787'}}>No post are available</Box>

            
        }
        </>
    )
}

export default Posts;