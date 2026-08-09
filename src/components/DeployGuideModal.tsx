import React, { useState } from 'react';
import { X, Github, Globe, ExternalLink, Check, Copy, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">
                GitHub & Netlify 무료 호스팅 배포 가이드
              </h3>
              <p className="text-xs text-slate-400">
                무료 주소(예: mychurch.netlify.app)를 만들어 교인들과 스마트 주보를 공유하세요.
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          {/* STEP 1 */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>GitHub 저장소(Repository) 생성 및 코드 업로드</span>
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-bold">GitHub.com</a>에 로그인한 후 <b>[New Repository]</b>를 클릭합니다.</li>
              <li>저장소 이름(Repository Name)에 <code>church-bulletin</code>을 입력하고 <b>[Create Repository]</b>를 누릅니다.</li>
              <li>이 프로젝트 코드를 다운로드(Export) 받아 터미널 또는 VS Code에서 아래 명령어 실행:</li>
            </ol>

            <div className="bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-lg flex items-center justify-between">
              <code>git init &amp;&amp; git add . &amp;&amp; git commit -m "Initial Church Bulletin"</code>
              <button
                onClick={() => copyToClipboard('git init && git add . && git commit -m "Initial Church Bulletin"', 'git1')}
                className="text-xs text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded"
              >
                {copiedCode === 'git1' ? '복사완료' : '복사'}
              </button>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Netlify 가입 및 GitHub 계정 연동</span>
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
              <li><a href="https://www.netlify.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-bold">Netlify.com</a>에 접속하여 <b>[Sign Up] → [Log in with GitHub]</b>로 가입/로그인합니다.</li>
              <li>Netlify 대시보드에서 <b>[Add new site] → [Import an existing project]</b>를 클릭합니다.</li>
              <li><b>[GitHub]</b>를 선택하고 1단계에서 만든 <code>church-bulletin</code> 저장소를 지정합니다.</li>
            </ol>
          </div>

          {/* STEP 3 */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>빌드 설정 및 배포 (Deploy Site)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 font-mono text-slate-700">
              <p><b>Build Command:</b> <code>npm run build</code></p>
              <p><b>Publish Directory:</b> <code>dist</code></p>
            </div>
            <p className="text-xs text-slate-600">
              <b>[Deploy Site]</b> 버튼을 누르면 약 1분 이내에 주보 웹사이트 무료 링크(예: <code>https://jusarang-church.netlify.app</code>)가 자동 생성됩니다!
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Netlify는 SSL 보안 인증서(https)와 고성능 글로벌 CDN을 무료로 제공하여 스마트폰 카카오톡 공유 시 아주 빠르게 열립니다.</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
