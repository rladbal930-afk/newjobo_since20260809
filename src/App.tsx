import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SundayServiceView } from './components/SundayServiceView';
import { WednesdayServiceView } from './components/WednesdayServiceView';
import { OfficersView } from './components/OfficersView';
import { ChurchNewsView } from './components/ChurchNewsView';
import { ArchiveView } from './components/ArchiveView';
import { GasGuideModal } from './components/GasGuideModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { PrintBulletin } from './components/PrintBulletin';
import { defaultBulletinData } from './data/mockData';
import { FullBulletinData } from './types';
import { parseGasResponse } from './utils/gasDataParser';
import { Church, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'sunday' | 'officers' | 'news'>('sunday');
  const [churchName, setChurchName] = useState<string>(() => {
    return localStorage.getItem('church_name') || '통영주사랑교회';
  });
  const [churchSubTitle, setChurchSubTitle] = useState<string>(() => {
    return localStorage.getItem('church_sub_title') || 'TONGYEONG JUSARANG CHURCH';
  });
  const [bulletinData, setBulletinData] = useState<FullBulletinData>(() => {
    const savedAnnouncements = localStorage.getItem('church_announcements');
    if (savedAnnouncements) {
      try {
        const parsed = JSON.parse(savedAnnouncements);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            ...defaultBulletinData,
            bulletinContent: {
              ...defaultBulletinData.bulletinContent,
              announcements: parsed
            }
          };
        }
      } catch (e) {
        // ignore parse error
      }
    }
    return defaultBulletinData;
  });
  const [gasUrl, setGasUrl] = useState<string>(() => {
    return localStorage.getItem('church_gas_url') || 'https://script.google.com/macros/s/AKfycbz6kycbCzItC2_asGYOKFzhZ4uaPSkkClMH82iASxS7XoFCf9st3cTK7P-gSeANp4hgwQ/exec?api=true';
  });
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  // Save Church Name to LocalStorage
  useEffect(() => {
    if (churchName) {
      localStorage.setItem('church_name', churchName);
    }
  }, [churchName]);

  // Save Church SubTitle to LocalStorage
  useEffect(() => {
    if (churchSubTitle) {
      localStorage.setItem('church_sub_title', churchSubTitle);
    }
  }, [churchSubTitle]);

  // Save GAS URL to LocalStorage
  useEffect(() => {
    if (gasUrl) {
      localStorage.setItem('church_gas_url', gasUrl);
    } else {
      localStorage.removeItem('church_gas_url');
    }
  }, [gasUrl]);

  // Initial Data Fetch if GAS URL is present
  useEffect(() => {
    if (gasUrl.trim()) {
      fetchGasData(gasUrl);
    }
  }, []);

  const handleUpdateScripture = (scriptureTitle: string, scriptureText: string) => {
    setBulletinData(prev => ({
      ...prev,
      bulletinContent: {
        ...prev.bulletinContent,
        scripture: scriptureTitle,
        scriptureText: scriptureText,
      }
    }));
  };

  const handleUpdateAnnouncements = (newAnnouncements: string[]) => {
    localStorage.setItem('church_announcements', JSON.stringify(newAnnouncements));
    setBulletinData(prev => ({
      ...prev,
      bulletinContent: {
        ...prev.bulletinContent,
        announcements: newAnnouncements,
      }
    }));
  };

  const fetchGasData = async (urlToFetch: string): Promise<boolean> => {
    if (!urlToFetch || !urlToFetch.trim()) return false;
    setIsFetching(true);
    try {
      let cleanUrl = urlToFetch.trim();
      if (!cleanUrl.includes('api=true')) {
        cleanUrl += cleanUrl.includes('?') ? '&api=true' : '?api=true';
      }
      const response = await fetch(cleanUrl);
      const json = await response.json();

      if (json && (json.status === 'success' || json.data || json.main || json.mainInfo || json.content || json.bulletinContent)) {
        const parsed = parseGasResponse(json, defaultBulletinData);
        setBulletinData(parsed);
        setIsLiveConnected(true);
        setIsFetching(false);
        return true;
      } else {
        setIsLiveConnected(false);
        setIsFetching(false);
        return false;
      }
    } catch (err) {
      console.warn('Google Apps Script fetch error, falling back to cached state:', err);
      setIsLiveConnected(false);
      setIsFetching(false);
      return false;
    }
  };

  const handleManualRefresh = () => {
    if (gasUrl.trim()) {
      fetchGasData(gasUrl);
    } else {
      // Simulate quick refresh with mock data
      setIsFetching(true);
      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${churchName} 스마트 주보`,
        text: `${bulletinData.bulletinContent.serviceDate} ${churchName} 스마트 주보입니다.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      
      {/* Printable Paper Layout for print window */}
      <PrintBulletin
        churchName={churchName}
        content={bulletinData.bulletinContent}
        officers={bulletinData.officersList}
      />

      {/* Screen Web App View */}
      <div className="print:hidden">
        {/* Header Navigation */}
        <Header
          churchName={churchName}
          onUpdateChurchName={(newName) => setChurchName(newName)}
          churchSubTitle={churchSubTitle}
          onUpdateChurchSubTitle={(newSubTitle) => setChurchSubTitle(newSubTitle)}
          serviceDate={bulletinData.mainServiceDate}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gasUrl={gasUrl}
          isLiveConnected={isLiveConnected}
          isFetching={isFetching}
          onRefresh={handleManualRefresh}
          onOpenGasModal={() => setIsGasModalOpen(true)}
          onOpenDeployModal={() => setIsDeployModalOpen(true)}
          onPrint={handlePrint}
          onShare={handleShare}
        />

        {/* Share Toast Notification */}
        {showShareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2 text-xs font-medium animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>스마트 주보 링크가 클립보드에 복사되었습니다!</span>
          </div>
        )}

        {/* Loading Indicator Notification */}
        {isFetching && (
          <div className="max-w-5xl mx-auto px-4 mt-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium shadow-xs animate-pulse">
              <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
              <span>구글 시트에서 주보 데이터를 불러오는 중입니다 (로딩중...)</span>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-4 pt-6 sm:pt-8">
          {activeTab === 'sunday' && (
            <SundayServiceView
              content={bulletinData.bulletinContent}
              officers={bulletinData.officersList}
              mainRow={bulletinData.mainInfo[0]}
              onUpdateScripture={handleUpdateScripture}
            />
          )}

          {activeTab === 'officers' && (
            <OfficersView
              officers={bulletinData.officersList}
              mainRows={bulletinData.mainInfo}
            />
          )}

          {activeTab === 'news' && (
            <ChurchNewsView
              announcements={bulletinData.bulletinContent.announcements || []}
              onUpdateAnnouncements={handleUpdateAnnouncements}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-xs border-t border-slate-800 print:hidden mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-slate-200 font-serif text-sm">
          <Church className="w-4 h-4 text-amber-400" />
          <span>{churchName} 스마트 주보</span>
        </div>
      </footer>

      {/* Modals */}
      <GasGuideModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        gasUrl={gasUrl}
        setGasUrl={setGasUrl}
        onTestConnect={fetchGasData}
        isLiveConnected={isLiveConnected}
      />

      <DeployGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

    </div>
  );
}
