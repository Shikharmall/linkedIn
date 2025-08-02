import { useEffect, useState } from "react";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
import { getAllPostsAPI } from "../Api/PostAPI/PostAPI";
import { Oval } from "react-loader-spinner";

export function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPostsFunc = () => {
    setIsLoading(true);
    getAllPostsAPI().then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Oval
            visible={true}
            height="30"
            width="30"
            color="#3375e8"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </>
      )}
    </div>
  );
}
