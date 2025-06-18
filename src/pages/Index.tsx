import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Download, Upload, Sparkles, Users, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ConfigurationPanel } from "@/components/ConfigurationPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: Settings,
      title: "关键信息配置",
      description: "智能配置需要抽取的文档信息字段，支持自定义规则",
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "批量抽取",
      description: "一键批量处理多个文档，自动抽取关键信息",
      color: "bg-gradient-to-br from-blue-500 to-purple-500"
    },
    {
      icon: Download,
      title: "Excel导出",
      description: "将抽取结果导出为Excel表格，方便后续数据处理",
      color: "bg-gradient-to-br from-green-500 to-teal-500"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "活跃用户" },
    { icon: FileText, value: "500,000+", label: "处理文档" },
    { icon: TrendingUp, value: "99.9%", label: "准确率" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "overview" && (
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/8a9fa116-f435-4628-81b9-495b1ec37f2a.png" 
                    alt="石榴当当 Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              石榴当当
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              智能文档抽取SaaS平台，让文档处理更高效
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                智能抽取
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                批量处理
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                一键导出
              </Badge>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setActiveTab("upload")}
            >
              开始使用
              <Upload className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                  <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
              核心功能
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">
                准备开始您的智能文档处理之旅吗？
              </h3>
              <p className="text-orange-100 mb-6 max-w-md mx-auto">
                立即体验石榴当当的强大功能，让AI为您的办公效率加速
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-orange-50"
                onClick={() => setActiveTab("upload")}
              >
                免费试用
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "upload" && (
        <div className="container mx-auto px-4 py-8">
          <DocumentUpload />
        </div>
      )}

      {activeTab === "config" && (
        <div className="container mx-auto px-4 py-8">
          <ConfigurationPanel />
        </div>
      )}

      {activeTab === "results" && (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                抽取结果
              </CardTitle>
              <CardDescription>
                查看和导出文档抽取结果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600 mb-4">暂无抽取结果</p>
                <p className="text-sm text-slate-500">请先上传文档并完成信息抽取</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
