import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Plus, X } from "lucide-react";
import img from "../images/user.png";

export function RightSidebar() {
  const suggestedConnections = [
    {
      name: "Alex Thompson",
      title: "Frontend Developer at Netflix",
      mutualConnections: 12,
      avatar: "/placeholder-user.jpg",
      initials: "AT",
    },
    {
      name: "Lisa Wang",
      title: "Data Scientist at Tesla",
      mutualConnections: 8,
      avatar: "/placeholder-user.jpg",
      initials: "LW",
    },
    {
      name: "David Kim",
      title: "Product Designer at Spotify",
      mutualConnections: 15,
      avatar: "/placeholder-user.jpg",
      initials: "DK",
    },
  ];

  const trendingNews = [
    {
      title: "Tech layoffs continue across industry",
      timeAgo: "2h ago",
      readers: "1,234 readers",
    },
    {
      title: "AI adoption in enterprise reaches new high",
      timeAgo: "4h ago",
      readers: "2,567 readers",
    },
    {
      title: "Remote work policies evolving post-pandemic",
      timeAgo: "6h ago",
      readers: "3,891 readers",
    },
  ];

  return (
    <div className="space-y-4">
      {/* People You May Know */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">People you may know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedConnections.map((person, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex space-x-3">
                <Avatar className="w-12 h-12">
                  <img src={img} alt="img"/>
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900">
                    {person.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">{person.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {person.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-1 h-8 w-8 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-sm text-gray-600">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* LinkedIn News */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">LinkedIn News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingNews.map((news, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded"
            >
              <h4 className="font-medium text-sm text-gray-900 leading-tight">
                {news.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {news.timeAgo} • {news.readers}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-gray-500 space-y-2 px-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="hover:text-blue-600 cursor-pointer">About</span>
          <span className="hover:text-blue-600 cursor-pointer">
            Accessibility
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Help Center
          </span>
          <span className="hover:text-blue-600 cursor-pointer">Privacy</span>
          <span className="hover:text-blue-600 cursor-pointer">Terms</span>
        </div>
        <p>LinkedIn Corporation © 2024</p>
      </div>
    </div>
  );
}
