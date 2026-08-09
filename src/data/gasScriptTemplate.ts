export const GAS_CODE_GS = `/**
 * ==============================================================================
 * [스마트 교회 주보 - Google Apps Script (Code.gs)]
 * 
 * 구글 시트 4개 탭('메인', '주보내용', '명단', '보관함')의 데이터를 JSON으로 변환하여
 * 웹 애플리케이션으로 전송합니다.
 * ==============================================================================
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. '메인' 탭 데이터 읽기
    var mainSheet = ss.getSheetByName('메인');
    var mainData = mainSheet ? sheetToObjects(mainSheet) : [];
    
    // 2. '주보내용' 탭 데이터 읽기
    var contentSheet = ss.getSheetByName('주보내용');
    var contentData = contentSheet ? sheetToObjects(contentSheet) : [];
    
    // 3. '명단' 탭 데이터 읽기
    var officersSheet = ss.getSheetByName('명단');
    var officersData = officersSheet ? sheetToObjects(officersSheet) : [];
    
    // 4. '보관함' 탭 데이터 읽기
    var archiveSheet = ss.getSheetByName('보관함');
    var archiveData = archiveSheet ? sheetToObjects(archiveSheet) : [];
    
    // 주보내용 파싱 및 카테고리 매칭 (준비찬양, 본문, 광고 등)
    var parsedContent = parseBulletinContent(contentData);
    
    var result = {
      status: "success",
      lastUpdated: Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"),
      mainInfo: mainData,
      officersList: officersData,
      bulletinContent: parsedContent.sunday || null,
      wednesdayBulletin: parsedContent.wednesday || null,
      archive: archiveData,
      rawContent: contentData
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    var errorResult = {
      status: "error",
      message: err.toString()
    };
    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 시트의 헤더행(1행)을 키(Key)로 사용하는 객체 배열 반환 함수
 */
function sheetToObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  var headers = data[0].map(function(h) { return h.toString().trim(); });
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    // 빈 행 스킵
    if (row.join('').trim() === '') continue;
    
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var key = headers[j];
      var val = row[j];
      if (val instanceof Date) {
        val = Utilities.formatDate(val, "Asia/Seoul", "yyyy-MM-dd");
      }
      obj[key] = val;
    }
    result.push(obj);
  }
  return result;
}

/**
 * '주보내용' 탭의 행들을 주일예배 / 수요예배 구조로 파싱
 */
function parseBulletinContent(rows) {
  var sundayPraise = [];
  var wedPraise = [];
  var announcements = [];
  var wedAnnouncements = [];
  
  var sundayInfo = {
    serviceType: "주일예배",
    serviceDate: "",
    worshipTitle: "주일예배",
    preacher: "담임목사",
    presider: "",
    prayer: "",
    scripture: "",
    scriptureText: "",
    sermonTitle: "",
    praiseSongs: [],
    announcements: []
  };
  
  var wedInfo = {
    serviceType: "수요예배",
    serviceDate: "",
    worshipTitle: "수요기도회",
    preacher: "",
    presider: "",
    prayer: "",
    scripture: "",
    scriptureText: "",
    sermonTitle: "",
    praiseSongs: [],
    announcements: []
  };

  rows.forEach(function(row) {
    var category = (row['구분'] || row['카테고리'] || row['항목'] || '').toString().trim();
    var title = (row['내용'] || row['곡명/내용'] || row['제목'] || '').toString().trim();
    var detail = (row['상세'] || row['비고'] || row['담당/구절'] || '').toString().trim();
    var serviceType = (row['예배유형'] || '주일').toString().trim();

    if (!category && !title) return;

    if (category.indexOf('일자') !== -1 || category.indexOf('날짜') !== -1) {
      if (serviceType.indexOf('수요') !== -1) wedInfo.serviceDate = title;
      else sundayInfo.serviceDate = title;
    } else if (category.indexOf('설교제목') !== -1) {
      if (serviceType.indexOf('수요') !== -1) wedInfo.sermonTitle = title;
      else sundayInfo.sermonTitle = title;
    } else if (category.indexOf('설교자') !== -1) {
      if (serviceType.indexOf('수요') !== -1) wedInfo.preacher = title;
      else sundayInfo.preacher = title;
    } else if (category.indexOf('성경본문') !== -1 || category.indexOf('본문구절') !== -1) {
      if (serviceType.indexOf('수요') !== -1) {
        wedInfo.scripture = title;
        if (detail) wedInfo.scriptureText = detail;
      } else {
        sundayInfo.scripture = title;
        if (detail) sundayInfo.scriptureText = detail;
      }
    } else if (category.indexOf('찬양') !== -1 || category.indexOf('찬송') !== -1) {
      var songItem = {
        category: category,
        title: title,
        songNumber: detail || category,
        notes: detail
      };
      if (serviceType.indexOf('수요') !== -1) wedPraise.push(songItem);
      else sundayPraise.push(songItem);
    } else if (category.indexOf('광고') !== -1 || category.indexOf('소식') !== -1) {
      if (title) {
        if (serviceType.indexOf('수요') !== -1) wedAnnouncements.push(title);
        else announcements.push(title);
      }
    }
  });

  sundayInfo.praiseSongs = sundayPraise;
  sundayInfo.announcements = announcements;
  wedInfo.praiseSongs = wedPraise;
  wedInfo.announcements = wedAnnouncements;

  return {
    sunday: sundayInfo,
    wednesday: wedInfo
  };
}
`;

export const GOOGLE_SHEETS_SCHEMA = [
  {
    tabName: "1. '명단' 탭",
    description: "예배 봉사자 및 위원의 역할과 이번 주/다음 주 담당자 정보를 관리합니다.",
    columns: ["구분(역할)", "이번주담당자", "다음주담당자"],
    example: [
      ["주일 사회", "박성민 목사", "박성민 목사"],
      ["대표 기도", "이정호 장로", "김명철 장로"],
      ["봉헌 위원", "김은지/최현우 집사", "윤서연/박지훈 집사"],
      ["찬양 인도자", "정하은 간사", "한도현 청년"],
      ["수요 사회자", "이성민 부목사", "이성민 부목사"]
    ]
  },
  {
    tabName: "2. '주보내용' 탭",
    description: "이번 주 예배의 순서, 찬양 곡명, 성경구절, 설교 제목, 교회 광고 소식을 기록합니다.",
    columns: ["구분", "내용", "상세", "예배유형"],
    example: [
      ["일자", "2026년 8월 9일 주일 11:00 AM", "주일1/2부", "주일"],
      ["설교제목", "부족함이 없는 은혜의 샘", "시편 34편 1-10절", "주일"],
      ["설교자", "주영애 목사", "", "주일"],
      ["본문구절", "시편 34편 1절 - 10절", "1 내가 여호와를 항상 송축함이여...", "주일"],
      ["준비찬양", "은혜 (손경민)", "준비찬양 1 (15분 전)", "주일"],
      ["준비찬양", "원하고 바라고 기도합니다", "준비찬양 2", "주일"],
      ["개회찬송", "찬송가 21장 - 다 찬양하여라", "21장", "주일"],
      ["전체찬송", "찬송가 301장 - 지금까지 지내온 것", "301장", "주일"],
      ["광고", "오늘 오신 새가족분들을 환영하고 축복합니다.", "", "주일"],
      ["광고", "여름 전교인 수련회: 8월 21일~22일 가평 수련원", "", "주일"]
    ]
  },
  {
    tabName: "3. '보관함' 탭",
    description: "지나간 주보 및 예배위원 기용 내역을 보관하는 기록 탭입니다.",
    columns: ["일자", "예배유형", "설교제목", "설교자", "사회자", "기도자", "찬양인도", "성경구절"],
    example: [
      ["2026-08-02", "주일예배", "믿음으로 담대히 서라", "주영애 목사", "박성민 목사", "최승식 장로", "정하은 간사", "여호수아 1:1-9"],
      ["2026-07-26", "주일예배", "선한 목자 되신 주님", "주영애 목사", "박성민 목사", "윤형석 장로", "정하은 간사", "시편 23:1-6"]
    ]
  },
  {
    tabName: "4. '메인' 탭",
    description: "날짜 로직 및 수식에 의해 이번 주/다음 주 예배위원이 종합 표시되는 메인 요약 탭입니다.",
    columns: ["날짜", "예배유형", "사회자", "기도자", "봉헌위원", "찬양인도자", "수요사회자"],
    example: [
      ["2026-08-09 (주일)", "주일 1/2부", "박성민 목사", "이정호 장로", "김은지/최현우 집사", "정하은 간사", "이성민 부목사"],
      ["2026-08-16 (다음주)", "주일 1/2부", "박성민 목사", "김명철 장로", "윤서연/박지훈 집사", "정하은 간사", "이성민 부목사"]
    ]
  }
];
