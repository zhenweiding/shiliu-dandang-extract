
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Upload, Download, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const navItems = [
    { id: "overview", label: "概览", icon: Sparkles },
    { id: "upload", label: "文档上传", icon: Upload },
    { id: "config", label: "信息配置", icon: Settings },
    { id: "results", label: "抽取结果", icon: Download }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                石榴当当
              </h1>
              <p className="text-xs text-slate-500">智能文档抽取</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`flex items-center space-x-2 ${
                  activeTab === item.id 
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200" 
                    : "hover:bg-slate-100"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              免费试用
            </Badge>
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              登录
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
