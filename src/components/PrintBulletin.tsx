import React from 'react';
import { BulletinContent, WorshipOfficer } from '../types';

interface PrintBulletinProps {
  churchName: string;
  content: BulletinContent;
  officers: WorshipOfficer[];
}

export const PrintBulletin: React.FC<PrintBulletinProps> = ({ churchName, content, officers }) => {
  const prepPraise = content.praiseSongs.filter(s => s.category.includes('준비찬양'));
  const otherPraise = content.praiseSongs.filter(s => !s.category.includes('준비찬양'));

  return (
    <div className="hidden print:block print:p-0 text-black font-serif bg-white text-xs leading-relaxed">
      {/* Outer Page Frame */}
      <div className="border-4 border-double border-slate-900 p-6 m-2 space-y-4">
        
        {/* Paper Header */}
        <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
          <p className="text-xs font-sans tracking-widest text-slate-600 uppercase">Church Bulletin</p>
          <h1 className="text-2xl font-bold tracking-tight">{churchName} 주보</h1>
          <p className="text-xs font-sans font-bold">{content.serviceDate}</p>
        </div>

        {/* Worship Info Banner */}
        <div className="bg-slate-100 p-3 text-center rounded border border-slate-300">
          <p className="text-xs font-sans text-slate-600">오늘의 말씀 및 섬김이</p>
          <p className="text-xs text-slate-800 font-bold mt-1">성경본문: {content.scripture} | 설교자: {content.preacher}</p>
        </div>

        {/* 2 Column Layout for Print Paper */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          
          {/* Column 1: Order of Worship */}
          <div className="space-y-3">
            <h3 className="font-bold border-b-2 border-slate-900 pb-1 text-sm font-sans">
              [ 주일예배 순서 ]
            </h3>

            {/* Prep Praise Special Print Highlight */}
            {prepPraise.length > 0 && (
              <div className="p-2 border-2 border-slate-900 bg-slate-50 rounded text-xs space-y-1">
                <p className="font-bold font-sans flex justify-between">
                  <span>★ 준비 찬양</span>
                  <span>찬양단</span>
                </p>
                {prepPraise.map((p, i) => (
                  <p key={i} className="pl-2">
                    - {p.title} {p.songNumber ? `(${p.songNumber})` : ''}
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>준비 찬양</span>
                <span className="font-bold">찬양단</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>묵도</span>
                <span className="font-bold">다같이</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>* 개회 찬송</span>
                <span className="font-bold">{otherPraise.find(s => s.category === '개회찬송')?.title || '찬송가 21장'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>* 교독문</span>
                <span>전체</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>대표기도</span>
                <span className="font-bold">{content.prayer}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>* 전체 찬양</span>
                <span className="font-bold">{otherPraise.find(s => s.category === '전체찬송')?.title || '찬송가 301장'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>성경 봉독</span>
                <span className="font-bold">사회자</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5 font-bold">
                <span>설교</span>
                <span>{content.preacher}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>봉헌</span>
                <span>받아주옵소서</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>봉헌 기도</span>
                <span>설교자</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>* 폐회 찬송</span>
                <span>감사 사랑 영광 돌리세</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-0.5">
                <span>* 축도</span>
                <span className="font-bold">설교자</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-sans">* 표는 기립 해주시기 바랍니다.</p>
          </div>

          {/* Column 2: Scripture & Servants */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold border-b-2 border-slate-900 pb-1 text-sm font-sans mb-2">
                [ 성경 본문 ]
              </h3>
              <p className="font-bold text-xs mb-1">{content.scripture}</p>
              <div className="text-[11px] leading-relaxed whitespace-pre-line bg-slate-50 p-2 border border-slate-200 rounded">
                {content.scriptureText}
              </div>
            </div>

            <div>
              <h3 className="font-bold border-b-2 border-slate-900 pb-1 text-sm font-sans mb-2">
                [ 예배 위원 ]
              </h3>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                {officers.map((o, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-200 pb-0.5">
                    <span className="text-slate-600">{o.role}:</span>
                    <span className="font-bold">{o.currentWeekName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Announcements Section on Print */}
        <div className="pt-3 border-t-2 border-slate-900 space-y-1">
          <h3 className="font-bold text-sm font-sans">[ 교회 소식 ]</h3>
          <ul className="list-disc list-inside text-xs space-y-0.5">
            {content.announcements.map((news, i) => (
              <li key={i}>{news}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
