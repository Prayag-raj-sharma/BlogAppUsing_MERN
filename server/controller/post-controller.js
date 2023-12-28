import Post from "../model/post.js";

export const createPost = async(request,response) => {
      try {
          const post = await new Post(request.body);
          post.save();

          return response.status(200).json("post saved successfully");
      }
      catch(error) {
           return response.status(500).json(error);
      }
}

export const getAllPosts = async(request,response) => {
    let category = request.query.category;
    let post;
    try {
        if(category) {
            post = await Post.find({ categories: category});
        }
        else {
            post = await Post.find({});
        }

        return response.status(200).json(post);
    }
    catch(error) {
         return response.status(500).json(error.message);
    }
}