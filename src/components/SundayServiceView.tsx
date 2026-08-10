import React, { useState } from 'react';
import { BulletinContent, WorshipOfficer, MainSheetRow } from '../types';
import { Music, BookOpen, User, Volume2, ChevronDown, ChevronUp, Sparkles, Award } from 'lucide-react';

interface SundayServiceViewProps {
  content: BulletinContent;
  officers: WorshipOfficer[];
  sundayCleaning?: { currentWeekName: string; nextWeekName: string };
  mainRow?: MainSheetRow;
  onUpdateScripture?: (scriptureTitle: string, scriptureText: string) => void;
}

export const openGospelApp = (songTitle: string) => {
  // 곡 제목에서 번호 및 접두사를 정리하여 검색어 생성
  const cleanTitle = songTitle.replace(/^[0-9]+\.\s*/, '').trim();
  const query = encodeURIComponent(`${cleanTitle} 찬양`);
  window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
};

export const SundayServiceView: React.FC<SundayServiceViewProps> = ({
  content,
  officers,
  sundayCleaning,
  mainRow
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isScriptureExpanded, setIsScriptureExpanded] = useState<boolean>(true);

  // Servant details from Main Sheet row or fallback to content
  const heroPreacher = (content.preacher && content.preacher !== '로딩중...') ? content.preacher : '주영애 목사';
  const heroPresider = mainRow?.presider || content.presider || '로딩중...';
  const heroPrayer = mainRow?.prayer || content.prayer || '로딩중...';
  const heroOffering = mainRow?.offering || content.offeringServant || '로딩중...';

  // Extract praise songs by category
  const prepPraiseSongs = content.praiseSongs.filter(s => s.category === '준비찬양');
  const otherPraiseSongs = content.praiseSongs.filter(s => s.category !== '준비찬양');

  // Helper to extract clean scripture title
  const getScriptureTitle = () => {
    if (content.scripture && content.scripture !== '로딩중...') {
      return content.scripture;
    }
    if (content.scriptureText && content.scriptureText !== '로딩중...') {
      const rawFirstLine = content.scriptureText.split('\n')[0].trim();
      const cleanRef = rawFirstLine.replace(/[<>]/g, '').trim();
      if (cleanRef && cleanRef.length < 40) {
        return cleanRef;
      }
    }
    return '성경 본문';
  };

  // Font size class mapper
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg leading-relaxed';
      case 'xlarge': return 'text-xl leading-loose';
      default: return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner Header - Sleek Interface Style */}
      <div className="bg-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold bg-indigo-900/80 text-indigo-100 border border-indigo-700/50">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {content.serviceType}
            </span>
            <div className="text-right flex items-center">
              <span className="text-base sm:text-lg font-bold font-serif text-amber-300 tracking-wide block">
                {content.serviceDate || '2026년 8월 9일 주일 10:00 AM'}
              </span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200 border-t border-blue-900/80">
            <div>
              <span className="text-indigo-300 font-bold">설교자 :</span> {heroPreacher}
            </div>
            <div>
              <span className="text-indigo-300 font-bold">사회자 :</span> {heroPresider}
            </div>
            <div>
              <span className="text-indigo-300 font-bold">대표 기도 :</span> {heroPrayer}
            </div>
            <div>
              <span className="text-indigo-300 font-bold">봉헌 :</span> {heroOffering}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Order of Worship + Praise Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Main Column: Order of Worship */}
        <div className="lg:col-span-7 space-y-6">

          {/* 준비 찬양 Highlight Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <Music className="w-4 h-4 text-indigo-700" />
              <span>준비 찬양</span>
            </div>

            <div className="space-y-3">
              {prepPraiseSongs.length > 0 ? (
                prepPraiseSongs.map((song, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="sleek-praise-badge shrink-0">
                        {song.songNumber || `준비찬양 ${idx + 1}`}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-serif tracking-wide">
                          {song.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => openGospelApp(song.title)}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
                      title="[유튜브] 찬양 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>찬양듣기</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  등록된 준비찬양이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Full Order of Worship Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <Award className="w-4 h-4 text-indigo-700" />
              <span>주일예배 순서</span>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-2.5 flex items-center justify-between bg-indigo-50/60 -mx-3 px-3 rounded-lg border border-indigo-100/80">
                <span className="font-medium text-indigo-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-700" />
                  준비 찬양
                </span>
                <span className="text-indigo-900 font-medium text-right">찬양단</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">묵도</span>
                <span className="text-slate-900 font-bold text-right">{heroPresider}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">* 개회 찬송</span>
                <span className="text-slate-900 font-bold text-right">
                  {otherPraiseSongs.find(s => s.category === '개회찬송')?.title || '찬송가 21장 (다 찬양하여라)'}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">* 교독문</span>
                <span className="text-slate-900 font-medium">전체</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">대표기도</span>
                <span className="text-slate-900 font-bold">{heroPrayer}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">* 전체 찬양</span>
                <span className="text-slate-900 font-bold text-right">
                  {otherPraiseSongs.find(s => s.category === '전체찬송')?.title || '찬송가 301장 (다같이)'}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">성경 봉독</span>
                <span className="text-slate-900 font-medium">사회자</span>
              </div>

              <div className="py-2.5 flex items-center justify-between bg-amber-50/80 -mx-3 px-3 rounded-lg border border-amber-200/50">
                <span className="font-medium text-amber-900">설교</span>
                <span className="text-amber-950 font-bold">{heroPreacher}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">봉헌</span>
                <span className="text-slate-900 font-medium">받아주옵소서</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">봉헌 기도</span>
                <span className="text-slate-900 font-medium">설교자</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">* 폐회 찬송</span>
                <span className="text-slate-900 font-bold">감사 사랑 영광 돌리세</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">* 축도</span>
                <span className="text-slate-900 font-medium">설교자</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">영상 & 교회 광고</span>
                <span className="text-slate-900 font-medium">사회자</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-right font-sans font-medium">
              * 표는 기립 해주시기 바랍니다.
            </p>
          </div>
        </div>

        {/* Right Column: Scripture Passage + Servants List */}
        <div className="lg:col-span-5 space-y-6">

          {/* Scripture Passage Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-950" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  성경 본문
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">크기:</span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${fontSize === 'normal' ? 'bg-blue-950 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  기본
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${fontSize === 'large' ? 'bg-blue-950 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  중간
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${fontSize === 'xlarge' ? 'bg-blue-950 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  크게
                </button>
              </div>
            </div>

            <div className="sleek-verse-box">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-blue-950 text-base font-serif">
                  {getScriptureTitle()}
                </span>
                <button
                  onClick={() => setIsScriptureExpanded(!isScriptureExpanded)}
                  className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1 font-semibold"
                >
                  {isScriptureExpanded ? '접기' : '본문 전체보기'}
                  {isScriptureExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isScriptureExpanded && (
                <div className={`mt-3 text-slate-800 font-serif whitespace-pre-line border-t border-slate-200 pt-3 ${getFontSizeClass()}`}>
                  {content.scriptureText || content.scripture || '성경 본문 내용이 준비 중입니다.'}
                </div>
              )}
            </div>
          </div>

          {/* Worship Officers / Servants Quick List */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <User className="w-4 h-4 text-indigo-700" />
              <span>예배 위원 안내</span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {officers.map((officer, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-600">{officer.role}</span>
                  <div className="text-right">
                    <span className="font-bold text-blue-950">{officer.currentWeekName}</span>
                    <span className="text-slate-400 text-xs ml-2">(다음주 예배위원: {officer.nextWeekName})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sunday Sanctuary Cleaning */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span>주일 본당 청소</span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-600">주일 본당 청소</span>
                <div className="text-right">
                  <span className="font-bold text-blue-950">{sundayCleaning?.currentWeekName || '조미영 집사'}</span>
                  <span className="text-slate-400 text-xs ml-2">
                    (다음주 본당 청소: {sundayCleaning?.nextWeekName || '-'})
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
