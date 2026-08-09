import { FullBulletinData } from '../types';

export const defaultBulletinData: FullBulletinData = {
  lastUpdated: '-',
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
    { role: '주일 예배 사회', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
    { role: '대표 기도', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
    { role: '봉헌 위원', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
    { role: '찬양 인도자', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
    { role: '수요예배 사회', currentWeekName: '로딩중...', nextWeekName: '로딩중...' },
  ],
  bulletinContent: {
    serviceDate: '주일예배',
    serviceType: '주일예배',
    worshipTitle: '로딩중...',
    preacher: '로딩중...',
    presider: '로딩중...',
    prayer: '로딩중...',
    scripture: '로딩중...',
    scriptureText: '구글 시트에서 주보 데이터를 불러오는 중입니다 (로딩중...)',
    sermonTitle: '로딩중...',
    praiseSongs: [
      {
        category: '준비찬양',
        title: '로딩중...',
        songNumber: '준비찬양 1',
      }
    ],
    offeringServant: '로딩중...',
    announcements: [
      '구글 시트에서 교회 소식을 불러오는 중입니다 (로딩중...)'
    ]
  },
  wednesdayBulletin: {
    serviceDate: '수요예배',
    serviceType: '수요예배',
    worshipTitle: '로딩중...',
    preacher: '로딩중...',
    presider: '로딩중...',
    prayer: '로딩중...',
    scripture: '로딩중...',
    scriptureText: '구글 시트에서 주보 데이터를 불러오는 중입니다 (로딩중...)',
    sermonTitle: '로딩중...',
    praiseSongs: [
      {
        category: '준비찬양',
        title: '로딩중...',
        songNumber: '준비찬양 1',
      }
    ],
    announcements: [
      '구글 시트에서 교회 소식을 불러오는 중입니다 (로딩중...)'
    ]
  },
  archive: []
};

