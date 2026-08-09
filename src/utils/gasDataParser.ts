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
    mainServiceDate: '주일예배',
    mainInfo: [
      {
        date: '주일예배',
        serviceType: '주일예배',
        presider: '로딩중...',
        prayer: '로딩중...',
        offering: '로딩중...',
        praiseLeader: '로딩중...',
        wedPresider: '로딩중...',
      }
    ],
    officersList: [
      { role: '주일 사회', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
      { role: '대표 기도', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
      { role: '봉헌 위원', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
      { role: '찬양 인도자', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
      { role: '수요예배 사회', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
    ],
    bulletinContent: {
      serviceDate: '주일예배',
      serviceType: '주일예배',
      worshipTitle: '로딩중...',
      preacher: '주영애 목사',
      presider: '로딩중...',
      prayer: '로딩중...',
      offeringServant: '로딩중...',
      scripture: '성경 본문',
      scriptureText: '구글 시트에서 주보 데이터를 불러오는 중입니다 (로딩중...)',
      praiseSongs: [
        { category: '준비찬양', songNumber: '준비찬양 1', title: '로딩중...' },
      ],
      announcements: [
        '구글 시트에서 교회 소식을 불러오는 중입니다 (로딩중...)',
      ],
    },
    wednesdayBulletin: {
      serviceDate: '수요예배',
      serviceType: '수요예배',
      worshipTitle: '로딩중...',
      preacher: '로딩중...',
      presider: '로딩중...',
      prayer: '로딩중...',
      offeringServant: '로딩중...',
      scripture: '로딩중...',
      scriptureText: '구글 시트에서 주보 데이터를 불러오는 중입니다 (로딩중...)',
      praiseSongs: [
        { category: '준비찬양', songNumber: '준비찬양 1', title: '로딩중...' },
      ],
      announcements: [
        '구글 시트에서 교회 소식을 불러오는 중입니다 (로딩중...)',
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
      { role: '주일 사회', currentWeekName: sundayMainRow.presider || '-', nextWeekName: nextSundayMainRow?.presider || '-' },
      { role: '대표 기도', currentWeekName: sundayMainRow.prayer || '-', nextWeekName: nextSundayMainRow?.prayer || '-' },
      { role: '봉헌 위원', currentWeekName: sundayMainRow.offering || '-', nextWeekName: nextSundayMainRow?.offering || '-' },
      { role: '찬양 인도자', currentWeekName: sundayMainRow.praiseLeader || '-', nextWeekName: nextSundayMainRow?.praiseLeader || '-' },
      { role: '수요예배 사회', currentWeekName: wedMainRow?.presider || '-', nextWeekName: wedMainRow?.presider || '-' },
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
            const rawFirstLine = value.split('\n')[0].trim();
            const cleanRef = rawFirstLine.replace(/[<>]/g, '').trim();
            if (cleanRef && cleanRef.length < 40) {
              sundayContent.scripture = cleanRef;
            } else if (!sundayContent.scripture || sundayContent.scripture === '로딩중...') {
              sundayContent.scripture = '성경 본문';
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
