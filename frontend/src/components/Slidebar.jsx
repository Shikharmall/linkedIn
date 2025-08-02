import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { Eye, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import img from "../images/user.png";
import { useEffect, useState } from "react";
import { getUserDetailsAPI } from "../Api/UserAPI/UserAPI";

export function Sidebar() {
  const [profileData, setProfileData] = useState({});

  const getUserDetailsFunc = () => {
    getUserDetailsAPI().then((res) => {
      if (res.status === 200) {
        setProfileData(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getUserDetailsFunc();
  }, []);

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-0">
          <Link to={"/profile"} className="relative">
            <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
            <Avatar className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 border-2 border-white">
              <img src={img} alt="img" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
          <Link to={"/profile"} className="pt-8 pb-4 px-4 text-center">
            <h3 className="font-semibold text-gray-900">{profileData?.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{profileData?.bio}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-xs text-gray-500">Profile views</p>
                <p className="font-semibold text-blue-600">127</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Connections</p>
                <p className="font-semibold text-blue-600">500+</p>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer pt-5">
              <Eye className="w-4 h-4" />
              <span>Who viewed your profile</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <Bookmark className="w-4 h-4" />
              <span>Saved items</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3 pt-5">Recent</h4>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              # JavaScript Developers
            </div>
            <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              # React Community
            </div>
            <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              # Tech Startups
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
