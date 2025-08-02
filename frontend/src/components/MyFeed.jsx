import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { getMyPostsAPI } from "../Api/PostAPI/PostAPI";

export function MyFeed() {
  const [posts, setPosts] = useState([]);

  const getMyPostsFunc = () => {
    //setLoader(true);
    getMyPostsAPI().then((res) => {
      if (res.status === 200) {
        //setLoader(false);
        setPosts(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getMyPostsFunc();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
