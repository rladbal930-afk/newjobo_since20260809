export interface WorshipOfficer {
  role: string;          // 예: 주일 사회, 기도, 봉헌, 찬양인도자, 수요 사회자
  currentWeekName: string; // 이번 주 담당자
  nextWeekName: string;    // 다음 주 담당자
}

export interface PraiseSong {
  category: '준비찬양' | '개회찬송' | '전체찬송' | '응답찬송' | '봉헌찬송';
  title: string;
  songNumber?: string;
  notes?: string;
}

export interface BulletinContent {
  serviceDate: string;       // 날짜 (예: 2026년 8월 9일)
  serviceType: '주일예배' | '수요예배';
  worshipTitle: string;      // 예: 은혜의 단비를 사모하며
  preacher: string;          // 설교자 (예: 주영애 목사)
  presider: string;          // 사회자
  prayer: string;            // 기도자
  scripture: string;         // 본문 구절 (예: 로마서 8장 28절 - 30절)
  scriptureText?: string;    // 성경 본문 전체 텍스트
  sermonTitle: string;       // 설교 제목
  praiseSongs: PraiseSong[]; // 찬양 곡명 목록
  offeringServant?: string;  // 봉헌 위원
  announcements: string[];   // 주보 소식 / 광고
}

export interface ArchiveRecord {
  id: string;
  date: string;
  serviceType: string;
  sermonTitle: string;
  preacher: string;
  presider: string;
  prayer: string;
  praiseLeader: string;
  scripture: string;
}

export interface MainSheetRow {
  date: string;
  serviceType: string;
  presider: string;
  prayer: string;
  offering: string;
  praiseLeader: string;
  wedPresider: string;
}

export interface FullBulletinData {
  lastUpdated: string;
  mainServiceDate: string;
  mainInfo: MainSheetRow[];
  officersList: WorshipOfficer[];
  bulletinContent: BulletinContent;
  wednesdayBulletin?: BulletinContent;
  archive: ArchiveRecord[];
}
