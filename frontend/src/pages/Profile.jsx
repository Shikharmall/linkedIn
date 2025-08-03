import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarFallback } from "../components/ui/Avatar";
import {
  MapPin,
  Calendar,
  Users,
  Eye,
  MoreHorizontal,
  Building,
  GraduationCap,
  Award,
  ExternalLink,
  Edit,
} from "lucide-react";
import img from "../images/user.png";
import img2 from "../images/coverImg.jpg";
import { Header } from "../components/Header";
import { getUserDetailsAPI } from "../Api/UserAPI/UserAPI";
import { MyFeed } from "../components/MyFeed";
import { useNavigate } from "react-router-dom";

const certifications = [
  {
    id: 1,
    name: "Certified Product Manager",
    issuer: "Product Management Institute",
    date: "2021",
    credentialId: "PM-2021-1234",
  },
  {
    id: 2,
    name: "Google Analytics Certified",
    issuer: "Google",
    date: "2022",
    credentialId: "GA-2022-5678",
  },
];

const languages = [
  { name: "English", level: "Native" },
  { name: "Spanish", level: "Professional" },
  { name: "French", level: "Conversational" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");

  const [profileData, setProfileData] = useState({});

  const getUserDetailsFunc = () => {
    //setLoader(true);
    getUserDetailsAPI().then((res) => {
      if (res.status === 200) {
        //setLoader(false);
        setProfileData(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  function formatToReadableDate(isoString) {
    const date = new Date(isoString);
    const options = {
      //day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleDateString("en-IN", options);
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      navigate("/");
    }
    getUserDetailsFunc();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="relative">
            {/* Cover Image */}
            <div
              className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 sm:mb-0">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <img src={img} alt="profile-img" />
                  </Avatar>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profileData?.name}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {profileData?.bio}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          Google
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          San Francisco, CA
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>

                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                    <div className="flex items-center text-blue-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-semibold">500</span>
                      <span className="ml-1 text-gray-600">connections</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>1200 followers</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        Joined {formatToReadableDate(profileData?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: "about", label: "About" },
              { id: "myPost", label: "My Posts" },
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab?.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* About Tab */}
            {activeTab === "about" && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {profileData?.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === "myPost" && <MyFeed />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {languages?.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-900">{lang?.name}</span>
                    <span className="text-gray-600 text-sm">{lang?.level}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications?.map((cert) => (
                  <div key={cert?.id} className="flex space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {cert?.name}
                      </h4>
                      <p className="text-sm text-gray-600">{cert?.issuer}</p>
                      <p className="text-xs text-gray-500">
                        Issued {cert?.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">New Delhi, India</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Google</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View full contact info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
