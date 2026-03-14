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
    <div className="flex h-full min-h-0 flex-col p-5 text-white/90">
      <div className="mb-5 flex items-center gap-3">
        <Users className="h-5 w-5 text-sky-200/90" />
        <h2 className="text-base font-semibold tracking-tight text-white/90">名单管理</h2>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto space-y-6 pr-2">
        {/* File Upload */}
        <div className="space-y-3">
          <label className="text-xs font-semibold tracking-wide text-slate-200/70">导入名单文件</label>
          <label className="mac-card group flex h-32 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-white/15 bg-white/5 transition-colors hover:bg-white/[0.07]">
            <Upload className="mb-2 h-8 w-8 text-slate-200/55 transition-colors group-hover:text-slate-200/80" />
            <span className="text-sm text-slate-200/65 group-hover:text-slate-100/90">点击上传 CSV / Excel</span>
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
          <label className="text-xs font-semibold tracking-wide text-slate-200/70">手动输入 (每行一个)</label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="mac-input h-40 w-full resize-none p-3 text-sm text-white/90 placeholder:text-white/25"
            placeholder="张三&#10;李四&#10;王五..."
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="mac-button mac-button-primary w-full py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            添加至奖池
          </button>
        </div>
      </div>

      {/* Stats & Reset */}
      <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
        <div className="mac-card flex items-center justify-between rounded-2xl px-4 py-3">
          <span className="text-sm text-slate-200/70">当前奖池人数</span>
          <span className="text-2xl font-mono font-bold text-white/90">{poolCount}</span>
        </div>
        
        <button
          onClick={onReset}
          className="mac-button w-full border border-red-400/25 py-2.5 text-sm font-semibold text-red-200/90 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
          清空所有数据
        </button>
      </div>
    </div>
  );
}
