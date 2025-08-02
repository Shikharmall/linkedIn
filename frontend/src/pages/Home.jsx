import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Slidebar";
import { Feed } from "../components/Feed";
import { useNavigate } from "react-router-dom";
import { RightSidebar } from "../components/RightSlidebar";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
          <div className="lg:col-span-2">
            <Feed />
          </div>
          <div className="lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
