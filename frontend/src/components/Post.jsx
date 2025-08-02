import { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import img from "../images/user.png";

export function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // setIsLiked(!isLiked)
    // onLike(post.id)
  };

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // in seconds

    const times = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (const { unit, seconds } of times) {
      const value = Math.floor(diff / seconds);
      if (value >= 1) {
        return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex space-x-3">
              <Avatar>
                <img src={img} alt="img" />
                <AvatarFallback>{post?.author?.initials || ""}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {post?.author?.name}
                </h4>
                <p className="text-sm text-gray-600">{post?.userId?.name}</p>
                <p className="text-xs text-gray-500">
                  {timeAgo(post?.timestamp)} • 🌍
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 py-3">
          <p className="text-gray-900 leading-relaxed">{post?.content || ""}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="px-4 pb-3">
            <img
              src={img}
              alt="Post image"
              width={500}
              height={300}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* Engagement Stats */}
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2.5 h-2.5 text-white" />
              </div>
              <span>{post?.likes} likes</span>
            </div>
            <div className="flex space-x-4">
              <span>{post?.comments} comments</span>
              <span>{post?.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2">
          <div className="flex justify-around">
            <Button
              variant="ghost"
              size="sm"
              className={`flex-1 ${
                isLiked ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={handleLike}
            >
              <ThumbsUp
                className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
