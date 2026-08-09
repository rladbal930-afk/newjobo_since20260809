import { FullBulletinData } from '../types';

export const defaultBulletinData: FullBulletinData = {
  lastUpdated: '2026-08-09 10:00:00',
  mainServiceDate: '2026년 8월 9일 (주일)',
  mainInfo: [
    {
      date: '2026년 8월 9일 주일 10:00 AM',
      serviceType: '주일예배',
      presider: '정순정 강도사',
      prayer: '조금옥 권사',
      offering: '홍정주 집사',
      praiseLeader: '진은정 목사',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 12일 수요일 8:00 PM',
      serviceType: '수요예배',
      presider: '',
      prayer: '기도회 인도',
      offering: '자율 봉헌',
      praiseLeader: '찬양팀',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 16일 주일 10:00 AM',
      serviceType: '주일예배',
      presider: '김유미 강도사',
      prayer: '이영숙 권사',
      offering: '박성남 권사',
      praiseLeader: '박재범 집사',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 19일 수요일 8:00 PM',
      serviceType: '수요예배',
      presider: '',
      prayer: '기도회 인도',
      offering: '자율 봉헌',
      praiseLeader: '찬양팀',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 23일 주일 10:00 AM',
      serviceType: '주일예배',
      presider: '정순정 강도사',
      prayer: '조금옥 권사',
      offering: '홍정주 집사',
      praiseLeader: '진은정 목사',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 26일 수요일 8:00 PM',
      serviceType: '수요예배',
      presider: '',
      prayer: '기도회 인도',
      offering: '자율 봉헌',
      praiseLeader: '찬양팀',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 8월 30일 주일 10:00 AM',
      serviceType: '주일예배',
      presider: '김유미 강도사',
      prayer: '이영숙 권사',
      offering: '박성남 권사',
      praiseLeader: '박재범 집사',
      wedPresider: '정주열 목사',
    },
    {
      date: '2026년 9월 2일 수요일 8:00 PM',
      serviceType: '수요예배',
      presider: '',
      prayer: '기도회 인도',
      offering: '자율 봉헌',
      praiseLeader: '찬양팀',
      wedPresider: '정주열 목사',
    },
  ],
  officersList: [
    { role: '주일 예배 사회', currentWeekName: '박성민 목사', nextWeekName: '박성민 목사' },
    { role: '대표 기도', currentWeekName: '이정호 장로', nextWeekName: '김명철 장로' },
    { role: '봉헌 위원', currentWeekName: '김은지/최현우 집사', nextWeekName: '윤서연/박지훈 집사' },
    { role: '찬양 인도자', currentWeekName: '정하은 간사', nextWeekName: '한도현 청년' },
    { role: '수요예배 사회', currentWeekName: '이성민 부목사', nextWeekName: '이성민 부목사' },
  ],
  bulletinContent: {
    serviceDate: '2026년 8월 9일 주일 10:00 AM',
    serviceType: '주일예배',
    worshipTitle: '하나님의 선하심을 맛보아 알지어다',
    preacher: '주영애 목사',
    presider: '박성민 목사',
    prayer: '이정호 장로',
    scripture: '시편 34편 1절 - 10절',
    scriptureText: `1 내가 여호와를 항상 송축함이여 내 입술로 항상 주를 찬양하리이다
2 내 영혼이 여호와를 자랑하리니 곤고한 자들이 이를 듣고 기뻐하리로다
3 나와 함께 여호와를 광대하시다 하며 함께 그의 이름을 높이세
4 내가 여호와께 간구하매 내게 응답하시고 내 모든 두려움에서 나를 건지셨도다
5 그들이 주를 바라보고 기채를 얻었으니 그들의 얼굴은 부끄럽지 아니하리로다
6 이 곤고한 자가 부르짖으매 여호와께서 들으시고 그의 모든 환난에서 구원하셨도다
7 여호와의 천사가 주를 경외하는 자를 둘러 진치고 그들을 건지시는도다
8 너희는 여호와의 선하심과 인두하심을 맛보아 알지어다 그에게 피하는 자는 복이 있도다
9 너희 성도들아 여호와를 경외하라 그를 경외하는 자에게는 부족함이 없도다
10 젊은 사자는 궁핍하여 줄릴지라도 여호와를 찾는 자는 모든 좋은 것에 부족함이 없으리로다`,
    sermonTitle: '부족함이 없는 은혜의 샘',
    praiseSongs: [
      {
        category: '준비찬양',
        title: '은혜 (손경민)',
        songNumber: '준비찬양 1',
        notes: '예배 15분 전 찬양 인도'
      },
      {
        category: '준비찬양',
        title: '원하고 바라고 기도합니다',
        songNumber: '준비찬양 2',
        notes: '마음의 문을 열며'
      },
      {
        category: '준비찬양',
        title: '꽃들도 (이곳에 생명 샘 넘쳐나)',
        songNumber: '준비찬양 3',
        notes: '기쁨의 감사 찬양'
      },
      {
        category: '개회찬송',
        title: '찬송가 21장 - 다 찬양하여라',
        songNumber: '찬송가 21장',
      },
      {
        category: '전체찬송',
        title: '찬송가 301장 - 지금까지 지내온 것',
        songNumber: '찬송가 301장',
      },
      {
        category: '응답찬송',
        title: '주님 말씀하시면 (뜻하신 그곳에)',
        songNumber: '결단 찬양',
      },
      {
        category: '봉헌찬송',
        title: '찬송가 50장 - 내게 있는 모든 것을',
        songNumber: '찬송가 50장',
      }
    ],
    offeringServant: '김은지 집사 / 최현우 집사',
    announcements: [
      '환영: 오늘 본 교회에 새로 오신 모든 성도님들을 주님의 이름으로 진심으로 환영하고 축복합니다.',
      '여름 전교인 수련회: 8월 21일(금) ~ 22일(토) 가평 수련원에서 열립니다. 성도님들의 많은 기도와 참여를 바랍니다.',
      '수요기도회: 매주 수요일 저녁 7시 30분 비전홀에서 말씀과 기도회가 진행됩니다.',
      '식당 봉사: 이번 주 식당봉사는 제2여전도회에서 수고해 주십니다.',
      '교우 동정: 박철민 집사/윤미경 권사 가정 득남 (축하해 주시기 바랍니다).'
    ]
  },
  wednesdayBulletin: {
    serviceDate: '2026년 8월 12일 수요일 저녁 7:30',
    serviceType: '수요예배',
    worshipTitle: '말씀과 기도로 거룩해지는 저녁',
    preacher: '이성민 부목사',
    presider: '이성민 부목사',
    prayer: '한영숙 권사',
    scripture: '디모데전서 4장 4절 - 5절',
    scriptureText: `4 하나님께서 지으신 모든 것이 선하매 감사함으로 받으면 버릴 것이 없나니
5 하나님의 말씀과 기도로 거룩하여짐이라`,
    sermonTitle: '거룩한 삶의 두 기둥',
    praiseSongs: [
      {
        category: '준비찬양',
        title: '주의 음성을 내가 들으니',
        songNumber: '찬송가 540장',
        notes: '은혜로운 준비 찬양'
      },
      {
        category: '전체찬송',
        title: '찬송가 310장 - 아 하나님의 은혜로',
        songNumber: '찬송가 310장',
      }
    ],
    announcements: [
      '수요성경공부: 예배 후 각 다락방별 나눔의 시간이 있습니다.',
      '금요기도회: 8월 14일(금) 저녁 9시 대예배실에서 통성기도회가 있습니다.'
    ]
  },
  archive: [
    {
      id: '2026-08-02',
      date: '2026년 8월 2일',
      serviceType: '주일예배',
      sermonTitle: '믿음으로 담대히 서라',
      preacher: '주영애 목사',
      presider: '박성민 목사',
      prayer: '최승식 장로',
      praiseLeader: '정하은 간사',
      scripture: '여호수아 1장 1절 - 9절'
    },
    {
      id: '2026-07-26',
      date: '2026년 7월 26일',
      serviceType: '주일예배',
      sermonTitle: '선한 목자 되신 주님',
      preacher: '주영애 목사',
      presider: '박성민 목사',
      prayer: '윤형석 장로',
      praiseLeader: '정하은 간사',
      scripture: '시편 23편 1절 - 6절'
    },
    {
      id: '2026-07-19',
      date: '2026년 7월 19일',
      serviceType: '주일예배',
      sermonTitle: '기도의 능력을 경험하라',
      preacher: '이성민 부목사',
      presider: '박성민 목사',
      prayer: '김철수 장로',
      praiseLeader: '한도현 청년',
      scripture: '야고보서 5장 13절 - 18절'
    }
  ]
};
