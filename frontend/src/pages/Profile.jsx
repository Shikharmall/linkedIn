import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
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

// Mock user data - in real app, this would come from API
const getUserData = (id) => {
  const users = {
    1: {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      fullName: "Sarah Johnson",
      title: "Senior Product Manager",
      company: "Google",
      location: "San Francisco, CA",
      profileImage: "/placeholder-user.jpg",
      coverImage: "/placeholder.svg?height=200&width=800",
      initials: "SJ",
      connections: 500,
      followers: 1200,
      isConnected: false,
      isCurrentUser: false,
      joinDate: "January 2020",
      about:
        "Passionate product manager with 8+ years of experience building user-centric products that scale. I love working at the intersection of technology, design, and business strategy to create meaningful experiences for millions of users.",
      experience: [
        {
          id: 1,
          title: "Senior Product Manager",
          company: "Google",
          location: "Mountain View, CA",
          duration: "Jan 2022 - Present",
          description:
            "Leading product strategy for Google Search features, managing a team of 12 engineers and designers. Launched 3 major features that increased user engagement by 25%.",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          title: "Product Manager",
          company: "Meta",
          location: "Menlo Park, CA",
          duration: "Jun 2019 - Dec 2021",
          description:
            "Managed Instagram Shopping features, working cross-functionally with engineering, design, and business teams. Drove $50M+ in revenue through new product initiatives.",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 3,
          title: "Associate Product Manager",
          company: "Airbnb",
          location: "San Francisco, CA",
          duration: "Aug 2017 - May 2019",
          description:
            "Focused on host experience improvements and marketplace optimization. Led A/B tests that improved host satisfaction scores by 15%.",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
      education: [
        {
          id: 1,
          school: "Stanford University",
          degree: "Master of Business Administration (MBA)",
          field: "Technology Management",
          duration: "2015 - 2017",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          school: "UC Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          duration: "2011 - 2015",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
      skills: [
        "Product Management",
        "Product Strategy",
        "User Experience Design",
        "Data Analysis",
        "A/B Testing",
        "Agile Development",
        "Cross-functional Leadership",
        "Market Research",
        "SQL",
        "Python",
      ],
      certifications: [
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
      ],
      languages: [
        { name: "English", level: "Native" },
        { name: "Spanish", level: "Professional" },
        { name: "French", level: "Conversational" },
      ],
      recentActivity: [
        {
          id: 1,
          type: "post",
          content:
            "Excited to share insights from our latest product launch...",
          timestamp: "2 days ago",
          likes: 45,
          comments: 12,
        },
        {
          id: 2,
          type: "article",
          content: "The Future of Product Management in AI Era",
          timestamp: "1 week ago",
          likes: 128,
          comments: 34,
        },
      ],
    },
  };

  return users[id] || null;
};

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const user = getUserData(1);

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
      day: "numeric",
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
                    <img src={img} alt="img" />
                    <AvatarFallback className="text-2xl">
                      {user?.initials}
                    </AvatarFallback>
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
                      {!user?.isCurrentUser && (
                        <>
                          <Button variant="outline">Edit</Button>
                        </>
                      )}
                      {user?.isCurrentUser && (
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-6 mt-4 text-sm">
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

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-4">
                {user?.experience?.map((exp) => (
                  <Card key={exp?.id}>
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <Building className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {exp?.title}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {exp?.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            {exp?.location} • {exp?.duration}
                          </p>
                          <p className="text-gray-700 mt-2 leading-relaxed">
                            {exp?.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-4">
                {user?.education?.map((edu) => (
                  <Card key={edu?.id}>
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {edu?.school}
                          </h3>
                          <p className="text-gray-700">{edu?.degree}</p>
                          <p className="text-gray-600">{edu?.field}</p>
                          <p className="text-sm text-gray-500">
                            {edu?.duration}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-4">
                {user?.recentActivity?.map((activity) => (
                  <Card key={activity?.id}>
                    <CardContent className="p-6">
                      <div className="flex space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={user?.profileImage || "/placeholder.svg"}
                          />
                          <AvatarFallback>{user?.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                              {user?.fullName}
                            </span>
                            <span className="text-sm text-gray-500">
                              • {activity?.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">
                            {activity?.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <span>{activity?.likes} likes</span>
                            <span>{activity?.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.languages?.map((lang, index) => (
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
                {user?.certifications?.map((cert) => (
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
                  <span className="text-gray-700">{user?.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{user?.company}</span>
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
