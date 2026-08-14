import React from 'react';
import { Bell, Calendar, CreditCard } from 'lucide-react';

interface ChurchNewsViewProps {
  announcements: string[];
  onUpdateAnnouncements?: (newAnnouncements: string[]) => void;
}

export const ChurchNewsView: React.FC<ChurchNewsViewProps> = ({ announcements }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Sleek Interface */}
      <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-md border border-blue-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-900/80 rounded-xl text-amber-300 border border-indigo-700/50">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">교회 소식 &amp; 알림</h2>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="sleek-section-title">
            <Bell className="w-4 h-4 text-indigo-700" />
            <span>주보 광고 소식</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">총 {announcements.length}건</span>
        </div>

        <div className="space-y-3">
          {announcements.length > 0 ? (
            announcements.map((news, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 transition-colors flex items-start gap-3.5"
              >
                <span className="shrink-0 w-6 h-6 rounded-md bg-blue-950 text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-xs">
                  {idx + 1}
                </span>
                <div className="text-sm text-slate-800 leading-relaxed pt-0.5 whitespace-pre-line break-words flex-1">
                  {news}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              등록된 교회소식이 없습니다. 구글 시트 주보내용 b8 셀에 입력하면 표시됩니다.
            </div>
          )}
        </div>
      </div>

      {/* Weekly Schedule & Online Offering Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 주중 예배 시간 안내 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="sleek-section-title">
            <Calendar className="w-4 h-4 text-indigo-700" />
            <span>주중 예배 안내</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between p-3 rounded-lg bg-indigo-50/80 border border-indigo-100">
              <span className="font-bold text-indigo-950">주일 예배</span>
              <span className="text-indigo-900 font-bold">주일 오전 10:00</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">수요예배</span>
              <span className="text-blue-950 font-bold">수요일 저녁 8:00</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">새벽 예배</span>
              <span className="text-blue-950 font-bold">월~토 오전 5:00</span>
            </div>
          </div>
        </div>

        {/* 온라인 헌금 계좌 안내 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="sleek-section-title mb-3">
              <CreditCard className="w-4 h-4 text-indigo-700" />
              <span>온라인 헌금 계좌 안내</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed">
              <p className="font-bold text-amber-950 text-sm sm:text-base flex items-center gap-1">
                *🌳온라인헌금 안내🌳
              </p>
              
              <div className="p-3 bg-white/90 rounded-lg border border-amber-200/80 font-bold text-slate-900 text-xs sm:text-sm">
                &lt;계좌: 농협 301-0067-6067-21 예금주: 통영주사랑교회&gt;
              </div>

              <div className="space-y-1 text-slate-700 bg-amber-100/50 p-3 rounded-lg border border-amber-200/50 text-xs sm:text-sm">
                <p className="font-bold text-amber-950 mb-1">(입금자명 예시)</p>
                <p className="flex items-center gap-1">🌻십일조: ○○○십일조</p>
                <p className="flex items-center gap-1">🌻주일헌금: ○○○주일</p>
                <p className="flex items-center gap-1">🌻감사헌금: ○○○감사</p>
              </div>

              <p className="text-xs text-amber-900 pt-1 border-t border-amber-200/60 leading-relaxed">
                입금자&amp;헌금명 표기가 누락되었거나 오기일 경우 재정부장(010-7471-1837)에게 전화나 개인톡또는 문자주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
