import React, { useState } from 'react';
import { BulletinContent } from '../types';
import { Music, BookOpen, Calendar, Volume2, ChevronDown, ChevronUp, Sparkles, Clock, MapPin } from 'lucide-react';

interface WednesdayServiceViewProps {
  content?: BulletinContent;
}

export const WednesdayServiceView: React.FC<WednesdayServiceViewProps> = ({ content }) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isScriptureExpanded, setIsScriptureExpanded] = useState<boolean>(true);

  if (!content) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-sm border border-slate-200">
        등록된 수요예배 데이터가 없습니다.
      </div>
    );
  }

  const prepPraiseSongs = content.praiseSongs.filter(s => s.category.includes('준비찬양'));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Sleek Interface */}
      <div className="bg-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/80 text-indigo-100 border border-indigo-700/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            수요기도회 주보
          </span>
          <span className="text-xs text-indigo-200/90 font-medium">
            {content.serviceDate}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white mb-3">
          "{content.worshipTitle}"
        </h2>

        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300 pt-3 border-t border-blue-900/80">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-300" />
            <span>매주 수요일 저녁 7시 30분</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-300" />
            <span>비전홀 (대예배실)</span>
          </div>
          <div>
            <span className="text-indigo-300 font-semibold">설교/사회:</span> {content.preacher || '이성민 부목사'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Order of Worship & Prep Praise */}
        <div className="lg:col-span-7 space-y-6">

          {/* Wednesday Praise List */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <Music className="w-4 h-4 text-indigo-700" />
              <span>수요 찬양 및 준비기도</span>
            </div>

            <div className="space-y-3">
              {content.praiseSongs.map((song, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="sleek-praise-badge shrink-0 mt-0.5">
                      {song.category}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {song.title}
                      </h4>
                      {song.notes && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {song.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const query = encodeURIComponent(`${song.title} 찬양`);
                      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                    }}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>듣기</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Wednesday Order */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="sleek-section-title">
              <span>수요기도회 순서</span>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">찬양 및 사회</span>
                <span className="text-slate-900 font-bold">{content.presider || '인도자'}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">성경봉독</span>
                <span className="text-indigo-900 font-bold">{content.scripture}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between bg-amber-50/80 -mx-3 px-3 rounded-lg border border-amber-200/50">
                <span className="font-bold text-amber-900">말씀선포</span>
                <span className="text-amber-950 font-bold">"{content.sermonTitle}" ({content.preacher})</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">합심기도 (통성기도)</span>
                <span className="text-slate-900 font-medium">교회와 나라, 이웃을 위한 기도</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-600">주기도문 (축도)</span>
                <span className="text-slate-900 font-medium">다같이</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scripture + Sermon Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-950" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  성경 본문
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                  className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
                >
                  {fontSize === 'normal' ? '글자 크게' : '글자 보통'}
                </button>
              </div>
            </div>

            <div className="sleek-verse-box">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-blue-950 font-serif">
                  {content.scripture}
                </span>
                <button
                  onClick={() => setIsScriptureExpanded(!isScriptureExpanded)}
                  className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1 font-semibold"
                >
                  {isScriptureExpanded ? '접기' : '펼치기'}
                  {isScriptureExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isScriptureExpanded && content.scriptureText && (
                <div className={`mt-3 text-slate-800 font-serif whitespace-pre-line border-t border-slate-200 pt-3 ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-sm leading-relaxed'}`}>
                  {content.scriptureText}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 rounded-2xl p-5 shadow-sm border border-amber-200">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 inline-block mb-2">
              수요 설교 주제
            </span>
            <h3 className="text-xl font-bold font-serif text-slate-900">
              "{content.sermonTitle}"
            </h3>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              설교: {content.preacher}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
