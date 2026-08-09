import { FullBulletinData, MainSheetRow, WorshipOfficer, BulletinContent, PraiseSong, ArchiveRecord } from '../types';

function formatDateString(dateStr: string): string {
  if (!dateStr || dateStr === '-') return '';
  if (dateStr.includes('년') && dateStr.includes('월')) {
    if (dateStr.includes('수요일') || dateStr.includes('수)')) {
      return dateStr.replace('10:00 AM', '8:00 PM').replace('7:30 PM', '8:00 PM');
    }
    return dateStr;
  }

  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      // Add 9 hours for KST (UTC+9)
      const kstDate = new Date(d.getTime() + (9 * 60 * 60 * 1000));
      const year = kstDate.getUTCFullYear();
      const month = kstDate.getUTCMonth() + 1;
      const day = kstDate.getUTCDate();
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayName = dayNames[kstDate.getUTCDay()];

      const isSunday = dayName === '일';
      const isWednesday = dayName === '수';
      const timeStr = isWednesday ? '8:00 PM' : '10:00 AM';
      return `${year}년 ${month}월 ${day}일 ${isSunday ? '주일' : dayName + '요일'} ${timeStr}`;
    }
  } catch (e) {
    // Ignore formatting error
  }
  return dateStr;
}

export function parseGasResponse(json: any, fallbackData: Partial<FullBulletinData> = {}): FullBulletinData {
  const defaultData: FullBulletinData = {
    lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19),
    mainServiceDate: '2026년 8월 9일 주일 10:00 AM',
    mainInfo: [
      {
        date: '2026년 8월 9일 주일 10:00 AM',
        serviceType: '주일예배',
        presider: '정순정 강도사',
        prayer: '조금옥 권사',
        offering: '홍정주 집사',
        praiseLeader: '진은정 목사',
        wedPresider: '정주열 목사',
      }
    ],
    officersList: [
      { role: '주일 사회', currentWeekName: '정순정 강도사', nextWeekName: '김유미 강도사' },
      { role: '대표 기도', currentWeekName: '조금옥 권사', nextWeekName: '이영숙 권사' },
      { role: '봉헌 위원', currentWeekName: '홍정주 집사', nextWeekName: '박성남 권사' },
      { role: '찬양 인도자', currentWeekName: '진은정 목사', nextWeekName: '박재범 집사' },
      { role: '수요예배 사회', currentWeekName: '정주열 목사', nextWeekName: '정주열 목사' },
    ],
    bulletinContent: {
      serviceDate: '2026년 8월 9일 주일 10:00 AM',
      serviceType: '주일예배',
      worshipTitle: '하나님의 선하심을 맛보아 알지어다',
      preacher: '주영애 목사',
      presider: '정순정 강도사',
      prayer: '조금옥 권사',
      offeringServant: '홍정주 집사',
      scripture: '벧전5:8-9/고전15:58/마24:13/엡4:27',
      scriptureText: '벧전 5:8 근신하라 깨어라 너희 대적 마귀가 우는 사자 같이 두루 다니며 삼킬 자를 찾나니\n벧전 5:9 너희는 믿음을 굳건하게 하여 그를 대적하라 이는 세상에 있는 너희 형제들도 동일한 고난을 당하는 줄 함이라\n\n고전 15:58 그러므로 내 사랑하는 형제들아 견실하며 흔들리지 말고 항상 주의 일에 더욱 힘쓰는 자들이 되라 이는 너희 수고가 주 안에서 무익하지 않은 줄 앎이라\n\n마 24:13 그러나 끝까지 견디는 자는 구원을 얻으리라\n\n엡 4:27 마귀에게 틈을 주지 말라',
      praiseSongs: [
        { category: '준비찬양', songNumber: '곡명1', title: '1.하나님 궁 계절마다 아름답다', notes: '//가변데이터' },
        { category: '준비찬양', songNumber: '곡명2', title: '2.내가 길이다 생명이다' },
        { category: '준비찬양', songNumber: '곡명3', title: '3.주님께 맡겨버려라' },
        { category: '개회찬송', songNumber: '개회찬송', title: '기도는 일이다' },
        { category: '전체찬양', songNumber: '전체찬양', title: '죄악 벗고 마귀들과 싸워 이겨라' },
      ],
      announcements: [
        '주일 예배 참석 시 마스크 착용을 권장합니다.',
        '다음 주 예배 후 각 부서별 월례회가 있습니다.',
      ],
    },
    wednesdayBulletin: {
      serviceDate: '2026년 8월 12일 수요일 7:30 PM',
      serviceType: '수요예배',
      worshipTitle: '성령의 열매를 맺는 삶',
      preacher: '정주열 목사',
      presider: '정주열 목사',
      prayer: '기도회 인도',
      offeringServant: '자율 봉헌',
      scripture: '갈라디아서 5장 22-23절',
      scriptureText: '오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제니 이같은 것을 금지할 법이 없느니라',
      praiseSongs: [
        { category: '준비찬양', songNumber: '1', title: '찬송가 182장 (구주의 십자가 보혈 고기)' },
        { category: '개회찬송', songNumber: '2', title: '찬송가 191장 (내가 매일 기쁘게)' },
      ],
      announcements: [
        '매주 수요일 저녁 7시 30분 본당에서 수요기도회가 진행됩니다.',
      ],
    },
    archive: [],
    ...(fallbackData as any)
  };

  if (!json) return defaultData;

  const root = json.data || json;

  const rawMain = root.main || root.mainInfo || root.mainSheet || [];
  const rawContent = root.content || root.bulletinContent || root.contentSheet || root.rawContent || [];
  const rawMembers = root.members || root.officers || root.officersList || [];
  const rawArchive = root.archive || root.archiveSheet || [];

  // 1. Parse '메인' Sheet Rows
  let mainInfo: MainSheetRow[] = [];

  if (Array.isArray(rawMain) && rawMain.length > 0) {
    if (Array.isArray(rawMain[0])) {
      const headers: string[] = rawMain[0].map((h: any) => (h || '').toString().trim());

      const findIdx = (keywords: string[]) =>
        headers.findIndex(h => keywords.some(k => h.includes(k)));

      const dateIdx = findIdx(['날짜', '일자', 'date']);
      const typeIdx = findIdx(['구분', '예배', 'type']);
      const presiderIdx = findIdx(['사회', 'presider']);
      const prayerIdx = findIdx(['대표기도', '기도', 'prayer']);
      const offeringIdx = findIdx(['봉헌', 'offering']);
      const praiseLeaderIdx = findIdx(['찬양인도', '찬양', 'leader']);

      const dataRows = rawMain.slice(1);
      mainInfo = dataRows.map((row: any[]) => {
        const rawDate = dateIdx !== -1 ? row[dateIdx] : row[0];
        const rawType = typeIdx !== -1 ? row[typeIdx] : row[1];
        const presider = presiderIdx !== -1 ? row[presiderIdx] : row[2];
        const prayer = prayerIdx !== -1 ? row[prayerIdx] : row[3];
        const offering = offeringIdx !== -1 ? row[offeringIdx] : row[4];
        const praiseLeader = praiseLeaderIdx !== -1 ? row[praiseLeaderIdx] : row[5];

        return {
          date: formatDateString(rawDate || ''),
          serviceType: (rawType || '주일예배').toString().trim(),
          presider: (presider || '').toString().trim(),
          prayer: (prayer || '').toString().trim(),
          offering: (offering || '').toString().trim(),
          praiseLeader: (praiseLeader || '').toString().trim(),
          wedPresider: (rawType || '').toString().includes('수요') ? (presider || '').toString().trim() : ''
        };
      }).filter((m: MainSheetRow) => m.date || m.presider);

    } else {
      mainInfo = rawMain.map((row: any) => ({
        date: formatDateString(row['날짜'] || row['일자'] || row['date'] || ''),
        serviceType: row['예배유형'] || row['구분'] || row['serviceType'] || '주일예배',
        presider: row['사회자'] || row['사회'] || row['presider'] || '',
        prayer: row['기도자'] || row['대표기도'] || row['prayer'] || '',
        offering: row['봉헌위원'] || row['봉헌자'] || row['봉헌'] || row['offering'] || '',
        praiseLeader: row['찬양인도자'] || row['찬양인도'] || row['praiseLeader'] || '',
        wedPresider: row['수요사회자'] || row['수요사회'] || row['wedPresider'] || '',
      }));
    }
  }

  if (mainInfo.length === 0) {
    mainInfo = defaultData.mainInfo;
  }

  const sundayMainRow = mainInfo.find(m => m.serviceType.includes('주일')) || mainInfo[0] || defaultData.mainInfo[0];
  const sundayMainRows = mainInfo.filter(m => m.serviceType.includes('주일'));
  const nextSundayMainRow = sundayMainRows[1] || sundayMainRow;
  const wedMainRow = mainInfo.find(m => m.serviceType.includes('수요')) || mainInfo[1];

  // 2. Parse Officers List
  let officersList: WorshipOfficer[] = [];

  if (sundayMainRow) {
    officersList = [
      { role: '주일 사회', currentWeekName: sundayMainRow.presider || '정순정 강도사', nextWeekName: nextSundayMainRow?.presider || '김유미 강도사' },
      { role: '대표 기도', currentWeekName: sundayMainRow.prayer || '조금옥 권사', nextWeekName: nextSundayMainRow?.prayer || '이영숙 권사' },
      { role: '봉헌 위원', currentWeekName: sundayMainRow.offering || '홍정주 집사', nextWeekName: nextSundayMainRow?.offering || '박성남 권사' },
      { role: '찬양 인도자', currentWeekName: sundayMainRow.praiseLeader || '진은정 목사', nextWeekName: nextSundayMainRow?.praiseLeader || '박재범 집사' },
      { role: '수요예배 사회', currentWeekName: wedMainRow?.presider || '정주열 목사', nextWeekName: wedMainRow?.presider || '정주열 목사' },
    ];
  } else {
    officersList = defaultData.officersList;
  }

  // 3. Parse Content Sheet
  let sundayContent: BulletinContent = { ...defaultData.bulletinContent };
  let wednesdayContent: BulletinContent = defaultData.wednesdayBulletin!;

  if (sundayMainRow) {
    if (sundayMainRow.date) sundayContent.serviceDate = sundayMainRow.date;
    if (sundayMainRow.presider) sundayContent.presider = sundayMainRow.presider;
    if (sundayMainRow.prayer) sundayContent.prayer = sundayMainRow.prayer;
    if (sundayMainRow.offering) sundayContent.offeringServant = sundayMainRow.offering;
  }

  if (wedMainRow) {
    if (wedMainRow.date) wednesdayContent.serviceDate = wedMainRow.date;
    if (wedMainRow.presider) {
      wednesdayContent.presider = wedMainRow.presider;
      wednesdayContent.preacher = wedMainRow.presider;
    }
  }

  if (Array.isArray(rawContent) && rawContent.length > 0) {
    const prepSongs: PraiseSong[] = [];
    const otherPraiseSongs: PraiseSong[] = [];
    const announcements: string[] = [];

    rawContent.forEach((row: any) => {
      let key = '';
      let value = '';
      let detail = '';

      if (Array.isArray(row)) {
        key = (row[0] || '').toString().trim();
        value = (row[1] || '').toString().trim();
        detail = (row[2] || '').toString().trim();
      } else if (typeof row === 'object' && row !== null) {
        key = (row['구분'] || row['카테고리'] || row['항목'] || row['category'] || '').toString().trim();
        value = (row['내용'] || row['곡명/내용'] || row['제목'] || row['title'] || '').toString().trim();
        detail = (row['상세'] || row['비고'] || row['detail'] || '').toString().trim();
      }

      if (!key && !value) return;

      if (key.includes('곡명') || key.includes('준비찬양') || key.includes('준비')) {
        if (value) {
          prepSongs.push({
            category: '준비찬양',
            title: value,
            songNumber: key,
            notes: detail
          });
        }
      } else if (key.includes('개회찬송') || key.includes('개회')) {
        if (value) {
          otherPraiseSongs.push({
            category: '개회찬송',
            title: value,
            songNumber: detail || '개회찬송',
          });
        }
      } else if (key.includes('전체찬양') || key.includes('전체찬송') || key.includes('전체')) {
        if (value) {
          otherPraiseSongs.push({
            category: '전체찬송',
            title: value,
            songNumber: detail || '전체찬송',
          });
        }
      } else if (key.includes('성경본문') || key.includes('성경') || key.includes('본문') || key.includes('구절') || key.toLowerCase().includes('b7')) {
        if (value) {
          if (detail) {
            sundayContent.scripture = value;
            sundayContent.scriptureText = detail;
          } else {
            sundayContent.scriptureText = value;
            if (!sundayContent.scripture) {
              const firstLine = value.split('\n')[0];
              sundayContent.scripture = firstLine.length < 35 ? firstLine : '성경 본문';
            }
          }
        }
      } else if (key.includes('설교제목') || key.includes('말씀제목')) {
        if (value) sundayContent.sermonTitle = value;
      } else if (key.includes('설교자')) {
        if (value) sundayContent.preacher = value;
      } else if (key.includes('광고') || key.includes('소식') || key.toLowerCase().includes('b8')) {
        if (value) {
          const lines = value.split('\n').map(s => s.trim()).filter(Boolean);
          if (lines.length > 0) {
            announcements.push(...lines);
          }
        }
      }
    });

    // Fallback B7 & B8 checking if rawContent is 2D array without matching headers
    if (Array.isArray(rawContent) && rawContent.length >= 7) {
      const row7 = rawContent[6]; // B7 cell (row index 6)
      if (Array.isArray(row7) && row7[1]) {
        const b7Val = row7[1].toString().trim();
        if (b7Val) {
          sundayContent.scriptureText = b7Val;
        }
      }
    }
    if (Array.isArray(rawContent) && rawContent.length >= 8) {
      const row8 = rawContent[7]; // B8 cell (row index 7)
      if (Array.isArray(row8) && row8[1]) {
        const b8Val = row8[1].toString().trim();
        if (b8Val && announcements.length === 0) {
          const lines = b8Val.split('\n').map((s: string) => s.trim()).filter(Boolean);
          announcements.push(...lines);
        }
      }
    }

    if (prepSongs.length > 0 || otherPraiseSongs.length > 0) {
      sundayContent.praiseSongs = [...prepSongs, ...otherPraiseSongs];
    }
    if (announcements.length > 0) {
      sundayContent.announcements = announcements;
    }
  }

  // 4. Parse Archive
  let archive: ArchiveRecord[] = [];
  if (Array.isArray(rawArchive) && rawArchive.length > 0) {
    if (Array.isArray(rawArchive[0])) {
      const dataRows = rawArchive.slice(1);
      archive = dataRows.map((row: any[], idx: number) => ({
        id: `archive-${idx}`,
        date: formatDateString(row[0] || ''),
        serviceType: (row[1] || '주일예배').toString().trim(),
        presider: (row[2] || '').toString().trim(),
        prayer: (row[3] || '').toString().trim(),
        offering: (row[4] || '').toString().trim(),
        praiseLeader: (row[5] || '').toString().trim(),
        sermonTitle: '주일예배',
        preacher: (row[2] || '').toString().trim(),
        scripture: '',
      })).filter((a: ArchiveRecord) => a.date && a.date !== '-');
    } else {
      archive = rawArchive.map((row: any, idx: number) => ({
        id: row.id || `archive-${idx}`,
        date: formatDateString(row['일자'] || row['날짜'] || row['date'] || ''),
        serviceType: row['예배유형'] || row['serviceType'] || '주일예배',
        sermonTitle: row['설교제목'] || row['sermonTitle'] || '',
        preacher: row['설교자'] || row['preacher'] || '',
        presider: row['사회자'] || row['presider'] || '',
        prayer: row['기도자'] || row['prayer'] || '',
        praiseLeader: row['찬양인도'] || row['praiseLeader'] || '',
        scripture: row['성경구절'] || row['scripture'] || '',
      })).filter((a: ArchiveRecord) => a.sermonTitle || a.date);
    }
  } else {
    archive = defaultData.archive;
  }

  return {
    lastUpdated: root.lastUpdated || new Date().toISOString().replace('T', ' ').substring(0, 19),
    mainServiceDate: sundayContent.serviceDate || sundayMainRow.date || defaultData.mainServiceDate,
    mainInfo: mainInfo.length > 0 ? mainInfo : defaultData.mainInfo,
    officersList: officersList.length > 0 ? officersList : defaultData.officersList,
    bulletinContent: sundayContent,
    wednesdayBulletin: wednesdayContent,
    archive: archive.length > 0 ? archive : defaultData.archive,
  };
}
