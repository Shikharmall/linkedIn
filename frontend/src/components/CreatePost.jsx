import { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { ImageIcon, Video, Calendar, FileText } from "lucide-react";
import { addPostAPI } from "../Api/PostAPI/PostAPI";
import img from "../images/user.png";

export function CreatePost({ getAllPostsFunc }) {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNewPost = () => {
    addPostAPI(formData).then((res) => {
      if (res.status === 201) {
        setFormData({ content: "" });
        setIsExpanded(false);
        getAllPostsFunc();
      } else {
        if (res?.response?.status === 400) {
          res?.response?.data?.errors?.map((value, index) => toast(value.msg));
        } else {
          toast(res?.response?.data?.message);
        }
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-3 pt-5">
          <Avatar>
            <img src={img} alt="img" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={formData.content || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              onFocus={() => setIsExpanded(true)}
              className="min-h-[60px] border-0 resize-none focus:ring-0 text-lg placeholder:text-gray-500"
            />

            {isExpanded && (
              <div className="mt-4 space-y-4">

                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:flex md:flex-row md:space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100"
                    >
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100"
                    >
                      <Video className="w-5 h-5 mr-2" />
                      Video
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Event
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Article
                    </Button>
                  </div>
                </div>

                <div className="flex justify-start md:justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNewPost}
                    disabled={!formData?.content?.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
