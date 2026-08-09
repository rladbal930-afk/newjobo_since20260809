import React, { useState } from 'react';
import { ArchiveRecord } from '../types';
import { Archive, Search, Calendar, BookOpen, User, ArrowRight } from 'lucide-react';

interface ArchiveViewProps {
  archives: ArchiveRecord[];
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ archives }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArchives = archives.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.date.toLowerCase().includes(term) ||
      item.sermonTitle.toLowerCase().includes(term) ||
      item.preacher.toLowerCase().includes(term) ||
      item.prayer.toLowerCase().includes(term) ||
      item.scripture.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header - Sleek Interface */}
      <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-md border border-blue-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-900/80 rounded-xl text-amber-300 border border-indigo-700/50">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">주보 보관함</h2>
            <p className="text-xs text-indigo-200">
              구글 시트 '보관함' 탭 연동 지나간 주보 및 예배 위원 내역입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-700 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="설교제목, 설교자, 기도자, 날짜 또는 본문 검색..."
          className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-500 hover:text-slate-800 shrink-0 font-medium px-2 py-1 rounded bg-slate-100"
          >
            초기화
          </button>
        )}
      </div>

      {/* Archive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArchives.length > 0 ? (
          filteredArchives.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-indigo-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-950 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  <Calendar className="w-3.5 h-3.5 text-indigo-700" />
                  {item.date}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  {item.serviceType}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-slate-900">
                  "{item.sermonTitle}"
                </h3>
                <p className="text-xs text-indigo-800 font-semibold mt-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
                  {item.scripture}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                <div>
                  <span className="text-slate-400 font-normal">설교:</span> {item.preacher}
                </div>
                <div>
                  <span className="text-slate-400 font-normal">기도:</span> {item.prayer}
                </div>
                <div>
                  <span className="text-slate-400 font-normal">사회:</span> {item.presider}
                </div>
                <div>
                  <span className="text-slate-400 font-normal">찬양:</span> {item.praiseLeader}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            검색 결과에 일치하는 보관함 주보 데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
