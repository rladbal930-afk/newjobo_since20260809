import React from 'react';
import { WorshipOfficer, MainSheetRow } from '../types';
import { Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface OfficersViewProps {
  officers: WorshipOfficer[];
  mainRows: MainSheetRow[];
}

export const OfficersView: React.FC<OfficersViewProps> = ({ officers, mainRows }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header - Sleek Interface */}
      <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-md border border-blue-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-900/80 rounded-xl text-amber-300 border border-indigo-700/50">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">예배 위원 안내</h2>
          </div>
        </div>
      </div>

      {/* Main Weekly Overview Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="sleek-section-title">
          <Calendar className="w-4 h-4 text-indigo-700" />
          <span>예배 위원 배치표</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-blue-950 text-white uppercase font-semibold">
              <tr>
                <th className="p-3 rounded-l-lg">예배 일자</th>
                <th className="p-3">예배 사회</th>
                <th className="p-3">대표 기도</th>
                <th className="p-3">봉헌 위원</th>
                <th className="p-3">찬양 인도</th>
                <th className="p-3">수요 사회</th>
                <th className="p-3 rounded-r-lg">본당 청소</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {mainRows.slice(0, 8).map((row, idx) => {
                const isWednesday = row.serviceType?.includes('수요') || row.date?.includes('수요일') || row.date?.includes('수)');
                let formattedDate = row.date || '';
                if (isWednesday) {
                  formattedDate = formattedDate.replace('10:00 AM', '8:00 PM').replace('7:30 PM', '8:00 PM');
                  if (!formattedDate.includes('8:00 PM') && !formattedDate.includes('PM')) {
                    formattedDate = formattedDate + ' 8:00 PM';
                  }
                }

                return (
                  <tr key={idx} className={idx === 0 ? 'bg-indigo-50/80 font-bold' : 'hover:bg-slate-50'}>
                    <td className="p-3 text-blue-950 flex items-center gap-1.5">
                      {idx === 0 && (
                        <span className="w-2 h-2 rounded-full bg-indigo-700" />
                      )}
                      {formattedDate}
                    </td>
                    <td className="p-3 text-slate-900">{isWednesday ? '-' : (row.presider || '-')}</td>
                    <td className="p-3 text-indigo-900">{isWednesday ? '-' : (row.prayer || '-')}</td>
                    <td className="p-3 text-slate-700">{isWednesday ? '-' : (row.offering || '-')}</td>
                    <td className="p-3 text-emerald-900">{isWednesday ? '-' : (row.praiseLeader || '-')}</td>
                    <td className="p-3 text-slate-700">{isWednesday ? (row.wedPresider || row.presider || '-') : '-'}</td>
                    <td className="p-3 text-slate-700">{isWednesday ? '-' : (row.cleaning || '-')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Officers Roster */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="sleek-section-title">
          <ShieldCheck className="w-4 h-4 text-indigo-700" />
          <span>금주/다음주 예배 위원 안내</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {officers.map((officer, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="sleek-praise-badge">
                  {officer.role}
                </span>
                <span className="text-xs text-slate-400 font-medium">담당 위원</span>
              </div>

              <div className="pt-1 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 text-xs font-medium">이번 주:</span>
                  <span className="font-bold text-blue-950">{officer.currentWeekName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="font-medium">다음 주:</span>
                  <span className="font-semibold text-slate-800">{officer.nextWeekName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
