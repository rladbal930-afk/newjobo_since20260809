import React, { useState } from 'react';
import { Church, RefreshCw, Printer, Share2, Settings, HelpCircle, Calendar, CheckCircle2, AlertCircle, Lock, Unlock, X, KeyRound } from 'lucide-react';

interface HeaderProps {
  churchName: string;
  onUpdateChurchName?: (newName: string) => void;
  churchSubTitle: string;
  onUpdateChurchSubTitle?: (newSubTitle: string) => void;
  serviceDate: string;
  activeTab: 'sunday' | 'officers' | 'news';
  setActiveTab: (tab: 'sunday' | 'officers' | 'news') => void;
  gasUrl?: string;
  isLiveConnected: boolean;
  isFetching: boolean;
  onRefresh: () => void;
  onOpenGasModal: () => void;
  onOpenDeployModal: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  churchName,
  serviceDate,
  activeTab,
  setActiveTab,
  isLiveConnected,
  isFetching,
  onRefresh,
  onOpenGasModal,
  onOpenDeployModal,
  onPrint,
  onShare
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('is_church_admin') === 'true';
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '789456123') {
      setIsAdmin(true);
      localStorage.setItem('is_church_admin', 'true');
      setIsPasswordModalOpen(false);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_church_admin');
  };

  return (
    <header className="bg-white text-slate-800 border-b border-slate-200 shadow-sm print:hidden sticky top-0 z-40">
      {/* Top Banner / Status Bar */}
      <div className="max-w-5xl mx-auto px-4 py-2 border-b border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2 bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-blue-950 text-white px-2.5 py-0.5 rounded-full font-medium text-[11px] tracking-wide">
            <Calendar className="w-3 h-3 text-amber-300" />
            {serviceDate}
          </span>
          {isAdmin && (
            <button
              onClick={onOpenGasModal}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-[11px] transition-all ${
                isLiveConnected
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                  : 'bg-indigo-100 text-indigo-900 border border-indigo-200 hover:bg-indigo-200'
              }`}
              title="구글 시트 API 연동 설정"
            >
              {isLiveConnected ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  구글 시트 라이브 연동 중
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-indigo-600" />
                  데모 시트 데이터 (연동 설정)
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onRefresh}
            disabled={isFetching}
            className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
            title="시트 데이터 새로고침"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-indigo-600' : ''}`} />
            <span className="hidden sm:inline">새로고침</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
            title="주보 공유하기"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">공유</span>
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
            title="종이 주보 인쇄"
          >
            <Printer className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">인쇄</span>
          </button>

          {isAdmin ? (
            <>
              <button
                onClick={onOpenGasModal}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-900 hover:bg-indigo-800 text-white rounded transition-colors font-medium text-xs"
                title="구글 연동 스크립트"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>구글 시트 연동</span>
              </button>

              <button
                onClick={onOpenDeployModal}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors font-medium text-xs"
                title="GitHub & Netlify 배포 안내"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-300" />
                <span className="hidden md:inline">배포 가이드</span>
              </button>

              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1 px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors font-medium text-xs"
                title="담당자 로그아웃"
              >
                <Unlock className="w-3 h-3 text-emerald-600" />
                <span>로그아웃</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded transition-colors font-medium text-xs"
              title="담당자 로그인"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>담당자 인증</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Brand - Sleek Interface Style */}
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-900 flex items-center justify-center text-amber-300 shrink-0 shadow-sm">
            <Church className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-950 font-serif">
              {churchName}
            </h1>
          </div>
        </div>

        {/* Navigation Tabs - Sleek Interface Button Group */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('sunday')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'sunday'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
            }`}
          >
            주일예배
          </button>
          <button
            onClick={() => setActiveTab('officers')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'officers'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
            }`}
          >
            예배위원
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'news'
                ? 'bg-blue-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
            }`}
          >
            교회소식
          </button>
        </nav>
      </div>

      {/* Admin Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => {
                setIsPasswordModalOpen(false);
                setPasswordError('');
                setPasswordInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-950 text-amber-300 rounded-xl">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">담당자 비밀번호 인증</h3>
                <p className="text-xs text-slate-500">관리자 전용 기능 접근</p>
              </div>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  담당자 비밀번호
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="비밀번호 입력"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-600 font-medium mt-1">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordError('');
                    setPasswordInput('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-blue-950 text-white hover:bg-blue-900 rounded-xl transition-colors shadow-xs"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
