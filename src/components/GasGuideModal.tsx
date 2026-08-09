import React, { useState } from 'react';
import { GAS_CODE_GS, GOOGLE_SHEETS_SCHEMA } from '../data/gasScriptTemplate';
import { X, Copy, Check, Database, Code, FileSpreadsheet, RefreshCw, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';

interface GasGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gasUrl: string;
  setGasUrl: (url: string) => void;
  onTestConnect: (url: string) => Promise<boolean>;
  isLiveConnected: boolean;
}

export const GasGuideModal: React.FC<GasGuideModalProps> = ({
  isOpen,
  onClose,
  gasUrl,
  setGasUrl,
  onTestConnect,
  isLiveConnected
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'script' | 'schema'>('settings');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GAS_CODE_GS);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const ok = await onTestConnect(gasUrl);
      if (ok) {
        setTestResult({ success: true, message: '구글 시트 연동 성공! 데이터를 성공적으로 불러왔습니다.' });
      } else {
        setTestResult({ success: false, message: '연동 실패: URL이 정확한지 또는 웹앱 권한(모든 사용자 access)을 확인해 주세요.' });
      }
    } catch (e: any) {
      setTestResult({ success: false, message: `오류 발생: ${e.message || e}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-amber-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">
                구글 시트 API 연동 및 Apps Script 가이드
              </h3>
              <p className="text-xs text-slate-400">
                구글 시트를 데이터베이스로 활용하여 주보를 자동 업데이트합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub Nav */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 py-2 flex gap-2 text-xs font-medium shrink-0">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>연동 URL 설정</span>
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code.gs 코드</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>시트 4개 탭 구조</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  구글 앱스 스크립트(Google Apps Script) 웹앱 URL 등록
                </div>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  구글 스프레드시트에서 배포한 Apps Script 웹 앱 URL(Web App Exec URL)을 입력하면, 구글 시트의 4개 탭('메인', '주보내용', '명단', '보관함') 데이터가 실시간으로 웹 주보에 반영됩니다.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Google Apps Script Web App URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={gasUrl}
                    onChange={(e) => setGasUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleTest}
                    disabled={testing || !gasUrl.trim()}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    {testing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>테스트 & 저장</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  * URL을 비워두시면 기본 샘플 데모 데이터 모드로 동작합니다.
                </p>
              </div>

              {testResult && (
                <div className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                    : 'bg-rose-50 text-rose-950 border border-rose-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{testResult.message}</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">빠른 구글 시트 연동 3단계 가이드</h4>
                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>구글 드라이브에서 새 <b>Google 스프레드시트</b>를 생성하고 4개 탭 (<code>명단</code>, <code>주보내용</code>, <code>보관함</code>, <code>메인</code>)을 만듭니다.</li>
                  <li>상단 메뉴의 <b>[확장 프로그램] → [Apps Script]</b>를 클릭합니다.</li>
                  <li>상단 메뉴 <b>'Code.gs 코드'</b> 탭의 코드를 복사하여 붙여넣고 <b>[배포] → [새 배포] → 유형: 웹 앱 (액세스 권한: 모든 사용자)</b>으로 배포합니다.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Google Apps Script (`Code.gs`)</h4>
                  <p className="text-xs text-slate-500">Google Apps Script 편집기에 아래 전체 코드를 복사하여 붙여넣으세요.</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{copiedCode ? '복사 완료!' : '전체 코드 복사'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 overflow-x-auto max-h-[350px] leading-relaxed">
                {GAS_CODE_GS}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-5">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <b>구글 시트 필수 4개 탭 구조:</b> 정확히 아래의 탭 이름 및 1행 헤더 이름을 사용하셔야 호환됩니다.
              </div>

              <div className="space-y-4">
                {GOOGLE_SHEETS_SCHEMA.map((schema, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">{schema.tabName}</h5>
                    <p className="text-xs text-slate-600">{schema.description}</p>
                    <div className="text-xs font-mono bg-white p-2 rounded border border-slate-200 text-indigo-950">
                      <b>1행 컬럼 헤더:</b> {schema.columns.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
