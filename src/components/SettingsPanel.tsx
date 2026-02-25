import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Upload, Users, Trash2 } from 'lucide-react';

interface SettingsPanelProps {
  onAddParticipants: (names: string[]) => void;
  poolCount: number;
  onReset: () => void;
}

export function SettingsPanel({ onAddParticipants, poolCount, onReset }: SettingsPanelProps) {
  const [textInput, setTextInput] = useState('');

  const handleTextSubmit = () => {
    const names = textInput.split('\n').map(n => n.trim()).filter(Boolean);
    if (names.length > 0) {
      onAddParticipants(names);
      setTextInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        Papa.parse(csvData, {
          complete: (results) => {
            // Assume names are in the first column
            const names = results.data.map((row: any) => row[0]).filter(Boolean);
            onAddParticipants(names);
          }
        });
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Convert to array of arrays
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const names = json.map((row: any) => row[0]).filter(Boolean);
        onAddParticipants(names);
      };
      reader.readAsArrayBuffer(file);
    }
    
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="w-80 bg-black/40 backdrop-blur-md border-r border-yellow-500/20 h-full p-6 flex flex-col text-white/90">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-yellow-500 tracking-wider">名单管理</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
        {/* File Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-yellow-500/80 uppercase tracking-wider">导入名单文件</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-yellow-500/30 rounded-xl hover:bg-yellow-500/5 hover:border-yellow-500/50 transition-colors cursor-pointer group">
            <Upload className="w-8 h-8 text-yellow-500/50 group-hover:text-yellow-500 mb-2 transition-colors" />
            <span className="text-sm text-white/60 group-hover:text-white/90">点击上传 CSV / Excel</span>
            <input 
              type="file" 
              accept=".csv, .xlsx, .xls" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Text Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-yellow-500/80 uppercase tracking-wider">手动输入 (每行一个)</label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-40 bg-black/50 border border-yellow-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500/70 resize-none placeholder:text-white/20"
            placeholder="张三&#10;李四&#10;王五..."
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="w-full py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-500/30"
          >
            添加至奖池
          </button>
        </div>
      </div>

      {/* Stats & Reset */}
      <div className="pt-6 border-t border-yellow-500/20 space-y-4 mt-4">
        <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-yellow-500/10">
          <span className="text-white/60">当前奖池人数</span>
          <span className="text-2xl font-mono font-bold text-yellow-500">{poolCount}</span>
        </div>
        
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          清空所有数据
        </button>
      </div>
    </div>
  );
}
