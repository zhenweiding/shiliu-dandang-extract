
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Settings, Trash2, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtractionField {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
  example: string;
}

export const ConfigurationPanel = () => {
  const [fields, setFields] = useState<ExtractionField[]>([
    {
      id: "1",
      name: "姓名",
      type: "text",
      description: "提取文档中的人员姓名",
      required: true,
      example: "张三"
    },
    {
      id: "2",
      name: "日期",
      type: "date",
      description: "提取文档中的日期信息",
      required: false,
      example: "2024-01-01"
    }
  ]);
  
  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    description: "",
    required: false,
    example: ""
  });

  const { toast } = useToast();

  const addField = () => {
    if (!newField.name.trim()) {
      toast({
        title: "错误",
        description: "请输入字段名称",
        variant: "destructive",
      });
      return;
    }

    const field: ExtractionField = {
      id: Date.now().toString(),
      ...newField
    };

    setFields(prev => [...prev, field]);
    setNewField({
      name: "",
      type: "text",
      description: "",
      required: false,
      example: ""
    });

    toast({
      title: "添加成功",
      description: `字段"${field.name}"已添加`,
    });
  };

  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
    toast({
      title: "删除成功",
      description: "字段已删除",
    });
  };

  const saveConfiguration = () => {
    toast({
      title: "保存成功",
      description: "抽取配置已保存",
    });
  };

  const previewConfiguration = () => {
    toast({
      title: "配置预览",
      description: `当前配置包含 ${fields.length} 个抽取字段`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">关键信息配置</h2>
        <p className="text-slate-600">配置需要从文档中抽取的关键信息字段</p>
      </div>

      {/* Current Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            已配置字段 ({fields.length})
          </CardTitle>
          <CardDescription>
            管理当前的信息抽取字段配置
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-slate-800">{field.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {field.type}
                    </Badge>
                    {field.required && (
                      <Badge variant="destructive" className="text-xs">
                        必填
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{field.description}</p>
                  <p className="text-xs text-slate-500">示例：{field.example}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(field.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            {fields.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无配置字段</p>
                <p className="text-sm">请添加需要抽取的信息字段</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add New Field */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            添加新字段
          </CardTitle>
          <CardDescription>
            配置新的信息抽取字段
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="field-name">字段名称 *</Label>
              <Input
                id="field-name"
                placeholder="例如：姓名、金额、日期"
                value={newField.name}
                onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="field-type">字段类型</Label>
              <Select
                value={newField.type}
                onValueChange={(value) => setNewField(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">文本</SelectItem>
                  <SelectItem value="number">数字</SelectItem>
                  <SelectItem value="date">日期</SelectItem>
                  <SelectItem value="email">邮箱</SelectItem>
                  <SelectItem value="phone">电话</SelectItem>
                  <SelectItem value="url">网址</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="field-description">字段描述</Label>
            <Textarea
              id="field-description"
              placeholder="描述这个字段的用途和抽取规则"
              value={newField.description}
              onChange={(e) => setNewField(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="field-example">示例值</Label>
            <Input
              id="field-example"
              placeholder="提供一个示例值帮助AI理解"
              value={newField.example}
              onChange={(e) => setNewField(prev => ({ ...prev, example: e.target.value }))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="field-required"
              checked={newField.required}
              onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: checked }))}
            />
            <Label htmlFor="field-required">必填字段</Label>
          </div>
          
          <Button onClick={addField} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Plus className="w-4 h-4 mr-2" />
            添加字段
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {fields.length > 0 && (
        <div className="flex gap-4">
          <Button 
            onClick={previewConfiguration}
            variant="outline" 
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            预览配置
          </Button>
          <Button 
            onClick={saveConfiguration}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Save className="w-4 h-4 mr-2" />
            保存配置
          </Button>
        </div>
      )}
    </div>
  );
};
