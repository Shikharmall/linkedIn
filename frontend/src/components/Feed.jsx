import { useEffect, useState } from "react";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
import { getAllPostsAPI } from "../Api/PostAPI/PostAPI";

export function Feed() {
  const [posts, setPosts] = useState([]);

  const getAllPostsFunc = () => {
    //setLoader(true);
    getAllPostsAPI().then((res) => {
      if (res.status === 200) {
        //setLoader(false);
        setPosts(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getAllPostsFunc();
  }, []);

  return (
    <div className="space-y-4">
      <CreatePost getAllPostsFunc={getAllPostsFunc} />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
