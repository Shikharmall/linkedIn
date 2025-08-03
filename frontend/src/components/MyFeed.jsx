import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { getMyPostsAPI } from "../Api/PostAPI/PostAPI";
import { Oval } from "react-loader-spinner";

export function MyFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyPostsFunc = () => {
    setIsLoading(true);
    getMyPostsAPI().then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
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
          <div className="flex justify-center">
            {posts?.length === 0 && <p>No posts found.</p>}
          </div>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </>
      )}
    </div>
  );
}
