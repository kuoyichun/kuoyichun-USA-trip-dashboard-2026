window.TRIP_DATA = {
  meta: {
    title: "2026 美國行程控制台",
    dateRange: "2026-06-21 至 2026-07-06",
    homeTimeZone: "Asia/Taipei",
    note: "手機快速查閱版。"
  },
  airports: {
    TPE: {
      code: "TPE",
      cityZh: "台北 / 桃園",
      cityEn: "Taipei / Taoyuan",
      airportZh: "台灣 TPE",
      airportEn: "TPE",
      countryZh: "台灣",
      timezone: "Asia/Taipei",
      lat: 25.0797,
      lon: 121.2342,
      terminalHint: "第 2 航廈",
      weatherUrl: "https://www.cwa.gov.tw/V8/C/W/OBS_Airport.html",
      mapQuery: "Taiwan Taoyuan International Airport"
    },
    SEA: {
      code: "SEA",
      cityZh: "西雅圖",
      cityEn: "Seattle",
      airportZh: "西雅圖 SEA",
      airportEn: "SEA",
      countryZh: "美國",
      timezone: "America/Los_Angeles",
      lat: 47.4502,
      lon: -122.3088,
      terminalHint: "轉機航廈待航空公司通知",
      weatherUrl: "https://forecast.weather.gov/MapClick.php?lat=47.4502&lon=-122.3088",
      mapQuery: "Seattle-Tacoma International Airport"
    },
    CLT: {
      code: "CLT",
      cityZh: "夏洛特",
      cityEn: "Charlotte",
      airportZh: "夏洛特 CLT",
      airportEn: "CLT",
      countryZh: "美國",
      timezone: "America/New_York",
      lat: 35.214,
      lon: -80.9431,
      terminalHint: "Gate 待航空公司通知",
      weatherUrl: "https://forecast.weather.gov/MapClick.php?lat=35.214&lon=-80.9431",
      mapQuery: "Charlotte Douglas International Airport"
    },
    DEN: {
      code: "DEN",
      cityZh: "丹佛",
      cityEn: "Denver",
      airportZh: "丹佛 DEN",
      airportEn: "DEN",
      countryZh: "美國",
      timezone: "America/Denver",
      lat: 39.8561,
      lon: -104.6737,
      terminalHint: "Gate 待航空公司通知",
      weatherUrl: "https://forecast.weather.gov/MapClick.php?lat=39.8561&lon=-104.6737",
      mapQuery: "Denver International Airport"
    },
    LAX: {
      code: "LAX",
      cityZh: "洛杉磯",
      cityEn: "Los Angeles",
      airportZh: "洛杉磯 LAX",
      airportEn: "LAX",
      countryZh: "美國",
      timezone: "America/Los_Angeles",
      lat: 33.9416,
      lon: -118.4085,
      terminalHint: "星宇回程截圖顯示 B 航廈",
      weatherUrl: "https://forecast.weather.gov/MapClick.php?lat=33.9416&lon=-118.4085",
      mapQuery: "Los Angeles International Airport"
    }
  },
  route: ["TPE", "SEA", "CLT", "DEN", "LAX", "TPE"],
  flights: [
    {
      id: "JX032",
      airline: "STARLUX Airlines",
      airlineZh: "星宇航空",
      carrierClass: "starlux",
      cabin: "經濟艙",
      aircraft: "Airbus A350-900",
      from: "TPE",
      to: "SEA",
      departIso: "2026-06-21T20:10:00+08:00",
      arriveIso: "2026-06-21T16:10:00-07:00",
      duration: "11 小時 0 分鐘",
      fromDetail: "台北/桃園 TPE 第 2 航廈",
      toDetail: "西雅圖 SEA 航廈待確認",
      note: "抵達西雅圖後轉國內線。"
    },
    {
      id: "AA2793",
      airline: "American Airlines",
      airlineZh: "美國航空",
      carrierClass: "american",
      cabin: "經濟艙",
      aircraft: "Airbus A321",
      from: "SEA",
      to: "CLT",
      departIso: "2026-06-21T21:35:00-07:00",
      arriveIso: "2026-06-22T05:39:00-04:00",
      duration: "5 小時 4 分鐘",
      fromDetail: "西雅圖 SEA 航廈待確認",
      toDetail: "夏洛特 CLT Gate 待確認",
      note: "西雅圖轉機 5 小時 25 分。"
    },
    {
      id: "UA1963",
      airline: "United Airlines",
      airlineZh: "聯合航空",
      carrierClass: "united",
      cabin: "United Economy (W)",
      aircraft: "機型待航空公司確認",
      from: "CLT",
      to: "DEN",
      departIso: "2026-06-28T08:40:00-04:00",
      arriveIso: "2026-06-28T10:27:00-06:00",
      duration: "3 小時 47 分鐘",
      fromDetail: "夏洛特 CLT Gate 待確認",
      toDetail: "丹佛 DEN Gate 待確認",
      note: ""
    },
    {
      id: "AA4958",
      airline: "American Eagle / SkyWest",
      airlineZh: "美國航空聯營 SkyWest",
      carrierClass: "american",
      cabin: "經濟艙",
      aircraft: "Embraer 175",
      from: "DEN",
      to: "LAX",
      departIso: "2026-07-04T18:12:00-06:00",
      arriveIso: "2026-07-04T19:53:00-07:00",
      duration: "2 小時 41 分鐘",
      fromDetail: "丹佛 DEN Gate 待確認",
      toDetail: "洛杉磯 LAX 0 航廈",
      note: "洛杉磯 LAX 轉機 4 小時 42 分。"
    },
    {
      id: "JX001",
      airline: "STARLUX Airlines",
      airlineZh: "星宇航空",
      carrierClass: "starlux",
      cabin: "經濟艙",
      aircraft: "Airbus A350-900",
      from: "LAX",
      to: "TPE",
      departIso: "2026-07-05T00:35:00-07:00",
      arriveIso: "2026-07-06T05:05:00+08:00",
      duration: "13 小時 30 分鐘",
      fromDetail: "洛杉磯 LAX B 航廈",
      toDetail: "台北/桃園 TPE 第 2 航廈",
      note: "跨日返台，台灣時間 7/6 凌晨 05:05 抵達。"
    }
  ],
  layovers: [
    {
      id: "sea-transfer",
      label: "西雅圖 SEA 轉機",
      duration: "5 小時 25 分",
      note: "國際線抵達美國第一站，常見流程為入境、領行李、海關、重新托運、安檢。"
    },
    {
      id: "lax-transfer",
      label: "洛杉磯 LAX 返台前緩衝",
      duration: "4 小時 42 分",
      note: "晚間抵達洛杉磯 LAX 後接 00:35 星宇返台航班，需確認 AA 與星宇行李銜接。"
    }
  ],
  durationSummary: [
    {
      id: "charlotte",
      label: "夏洛特",
      dates: "6/22-6/28",
      duration: "6 晚 / 約 6 天",
      note: "住宿 Hyatt Place Charlotte；安排北卡羅來納大學夏洛特分校 UNC Charlotte。"
    },
    {
      id: "laramie",
      label: "Laramie",
      dates: "6/28-7/3",
      duration: "5 晚 / 約 5 天",
      note: "住宿 Airbnb 766 Hyacinth House；安排懷俄明大學 University of Wyoming。"
    },
    {
      id: "denver",
      label: "丹佛機場",
      dates: "7/3-7/4",
      duration: "1 晚",
      note: "還車與隔天飛洛杉磯前的機場住宿。"
    },
    {
      id: "transfers",
      label: "轉機緩衝",
      dates: "SEA / LAX",
      duration: "5 小時 25 分 / 4 小時 42 分",
      note: "西雅圖入境轉機；洛杉磯返台前轉機。"
    }
  ],
  journeyTimeline: {
    nodes: [
      { id: "tpe-start", label: "台北/桃園", date: "6/21", detail: "出發", activeStages: ["pre-departure"] },
      { id: "sea", label: "西雅圖機場", date: "6/21", detail: "入境轉機", activeStages: ["transfer-sea"] },
      { id: "clt", label: "夏洛特", date: "6/22", detail: "住 6 晚", activeStages: [] },
      { id: "den", label: "丹佛機場", date: "6/28", detail: "取車", activeStages: [] },
      { id: "laramie", label: "Laramie", date: "6/28", detail: "住 5 晚", activeStages: [] },
      { id: "den-hotel", label: "丹佛機場飯店", date: "7/3", detail: "住 1 晚", activeStages: [] },
      { id: "lax", label: "洛杉磯機場", date: "7/4", detail: "返台前轉機", activeStages: ["transfer-lax"] },
      { id: "tpe-return", label: "台北/桃園", date: "7/6", detail: "抵達", activeStages: ["arrived-home"] }
    ],
    links: [
      { id: "tpe-sea", from: "tpe-start", to: "sea", label: "飛西雅圖", duration: "約 10 小時", weight: 1.5, activeStages: ["flight-tpe-sea"] },
      { id: "sea-clt", from: "sea", to: "clt", label: "轉機後飛夏洛特", duration: "隔夜", weight: 1.7, activeStages: ["flight-sea-clt"] },
      { id: "clt-den", from: "clt", to: "den", label: "夏洛特 6 晚", duration: "6/22-6/28", weight: 6, activeStages: ["charlotte-stay", "flight-clt-den"] },
      { id: "den-laramie", from: "den", to: "laramie", label: "取車前往 Laramie", duration: "半天", weight: 1.1, activeStages: ["den-to-laramie"] },
      { id: "laramie-den-hotel", from: "laramie", to: "den-hotel", label: "Laramie 5 晚", duration: "6/28-7/3", weight: 5, activeStages: ["laramie-airbnb", "laramie-to-denver-hotel"] },
      { id: "den-hotel-lax", from: "den-hotel", to: "lax", label: "丹佛 1 晚後飛洛杉磯", duration: "7/3-7/4", weight: 1.8, activeStages: ["denver-airport-hotel", "flight-den-lax"] },
      { id: "lax-tpe", from: "lax", to: "tpe-return", label: "返台飛行", duration: "7/5-7/6", weight: 2.1, activeStages: ["flight-lax-tpe"] }
    ]
  },
  mapSegments: [
    {
      id: "route-overview",
      label: "全程主要點",
      caption: "整趟旅程的主要機場、住宿與兩間大學位置。",
      actionLabel: "開完整路線",
      points: [
        { label: "台北/桃園 TPE", query: "Taiwan Taoyuan International Airport", lat: 25.0797, lon: 121.2342 },
        { label: "西雅圖 SEA", query: "Seattle-Tacoma International Airport", lat: 47.4502, lon: -122.3088 },
        { label: "夏洛特 CLT", query: "Charlotte Douglas International Airport", lat: 35.214, lon: -80.9431 },
        { label: "UNC Charlotte", query: "University of North Carolina at Charlotte", lat: 35.3071, lon: -80.7352 },
        { label: "Laramie Airbnb", query: "766 North 12th Street Laramie WY 82072", lat: 41.3182, lon: -105.5792 },
        { label: "University of Wyoming", query: "University of Wyoming", lat: 41.3149, lon: -105.5666 },
        { label: "丹佛 DEN", query: "Denver International Airport", lat: 39.8561, lon: -104.6737 },
        { label: "洛杉磯 LAX", query: "Los Angeles International Airport", lat: 33.9416, lon: -118.4085 },
        { label: "台北/桃園 TPE", query: "Taiwan Taoyuan International Airport", lat: 25.0797, lon: 121.2342 }
      ]
    },
    {
      id: "tpe-sea",
      label: "台北/桃園 → 西雅圖",
      caption: "JX032：台北/桃園 TPE 到西雅圖 SEA。",
      points: [
        { label: "台北/桃園 TPE", query: "Taiwan Taoyuan International Airport", lat: 25.0797, lon: 121.2342 },
        { label: "西雅圖 SEA", query: "Seattle-Tacoma International Airport", lat: 47.4502, lon: -122.3088 }
      ]
    },
    {
      id: "sea-clt",
      label: "西雅圖 → 夏洛特",
      caption: "AA2793：西雅圖 SEA 到夏洛特 CLT。",
      points: [
        { label: "西雅圖 SEA", query: "Seattle-Tacoma International Airport", lat: 47.4502, lon: -122.3088 },
        { label: "夏洛特 CLT", query: "Charlotte Douglas International Airport", lat: 35.214, lon: -80.9431 }
      ]
    },
    {
      id: "clt-den",
      label: "夏洛特 → 丹佛",
      caption: "UA1963：夏洛特 CLT 到丹佛 DEN。",
      points: [
        { label: "夏洛特 CLT", query: "Charlotte Douglas International Airport", lat: 35.214, lon: -80.9431 },
        { label: "丹佛 DEN", query: "Denver International Airport", lat: 39.8561, lon: -104.6737 }
      ]
    },
    {
      id: "den-laramie",
      label: "丹佛機場 → Laramie",
      caption: "取車後從丹佛機場前往 Laramie Airbnb。",
      points: [
        { label: "丹佛租車", query: "24050 E 78th Ave Denver CO 80249", lat: 39.8395, lon: -104.7074 },
        { label: "Laramie Airbnb", query: "766 North 12th Street Laramie WY 82072", lat: 41.3182, lon: -105.5792 }
      ]
    },
    {
      id: "charlotte-unc",
      label: "夏洛特飯店 → UNC Charlotte",
      caption: "夏洛特住宿到北卡羅來納大學夏洛特分校。",
      points: [
        { label: "夏洛特飯店", query: "Hyatt Place Charlotte/University Research Park 640 University Center Blvd Charlotte NC", lat: 35.3097, lon: -80.7521 },
        { label: "UNC Charlotte", query: "University of North Carolina at Charlotte", lat: 35.3071, lon: -80.7352 }
      ]
    },
    {
      id: "laramie-uw",
      label: "Airbnb → 懷俄明大學",
      caption: "Laramie Airbnb 到懷俄明大學 University of Wyoming。",
      points: [
        { label: "Laramie Airbnb", query: "766 North 12th Street Laramie WY 82072", lat: 41.3182, lon: -105.5792 },
        { label: "University of Wyoming", query: "University of Wyoming", lat: 41.3149, lon: -105.5666 }
      ]
    },
    {
      id: "laramie-den-hotel",
      label: "Laramie → 丹佛機場飯店",
      caption: "Airbnb 退房後移動到丹佛機場 Hyatt Place。",
      points: [
        { label: "Laramie Airbnb", query: "766 North 12th Street Laramie WY 82072", lat: 41.3182, lon: -105.5792 },
        { label: "丹佛機場飯店", query: "Hyatt Place Pena Station Denver Airport 6110 North Panasonic Way Denver CO", lat: 39.8154, lon: -104.7747 }
      ]
    },
    {
      id: "den-lax",
      label: "丹佛 → 洛杉磯",
      caption: "AA4958：丹佛 DEN 到洛杉磯 LAX。",
      points: [
        { label: "丹佛 DEN", query: "Denver International Airport", lat: 39.8561, lon: -104.6737 },
        { label: "洛杉磯 LAX", query: "Los Angeles International Airport", lat: 33.9416, lon: -118.4085 }
      ]
    },
    {
      id: "lax-tpe",
      label: "洛杉磯 → 台北/桃園",
      caption: "JX001：洛杉磯 LAX 返台到台北/桃園 TPE。",
      points: [
        { label: "洛杉磯 LAX", query: "Los Angeles International Airport", lat: 33.9416, lon: -118.4085 },
        { label: "台北/桃園 TPE", query: "Taiwan Taoyuan International Airport", lat: 25.0797, lon: 121.2342 }
      ]
    }
  ],
  climate: [
    {
      code: "SEA",
      dateRange: "6/21 轉機",
      temp: "約 12-24°C",
      summary: "初夏偏涼、日照長，室內外溫差明顯。薄外套放隨身行李，遇延誤也比較好應對。",
      pack: "薄外套、可折傘、轉機用盥洗包"
    },
    {
      code: "CLT",
      dateRange: "6/22-6/28",
      temp: "約 21-33°C",
      summary: "夏洛特炎熱潮濕，午後雷陣雨常見。戶外行程排早上或傍晚較穩。",
      pack: "透氣衣物、防曬、雨具、補水"
    },
    {
      code: "DEN",
      dateRange: "6/28-7/4",
      temp: "約 14-31°C",
      summary: "丹佛高海拔乾燥，日夜溫差大，午後短暫雷雨機率高。第一天避免排太硬。",
      pack: "防曬、護唇膏、水瓶、薄外套"
    },
    {
      code: "LAX",
      dateRange: "7/4-7/5",
      temp: "約 18-27°C",
      summary: "洛杉磯沿海乾燥溫和，夜間機場與航廈可能偏涼。轉機時間不長，行李動線優先。",
      pack: "薄外套、充電線、機場餐食備案"
    },
    {
      code: "TPE",
      dateRange: "6/21 出發 / 7/6 抵達",
      temp: "約 26-34°C",
      summary: "台灣夏季濕熱且可能有午後雨，出發與返台交通都建議保留雨天緩衝。",
      pack: "輕便雨具、返台交通備案"
    }
  ],
  journeyStages: [
    {
      id: "pre-departure",
      title: "台灣出發準備",
      subtitle: "前往桃園機場，準備搭 JX032 飛往西雅圖。",
      locationLabel: "台北 / 桃園",
      timezone: "Asia/Taipei",
      startIso: "2026-06-21T00:00:00+08:00",
      endIso: "2026-06-21T20:10:00+08:00",
      nextLabel: "下一步：20:10 從台北/桃園 TPE 起飛",
      mapQuery: "Taiwan Taoyuan International Airport"
    },
    {
      id: "flight-tpe-sea",
      title: "飛往西雅圖",
      subtitle: "JX032 台北/桃園 TPE 到西雅圖 SEA；西雅圖當地 6/21 下午 16:10 抵達，台灣時間 6/22 早上 07:10。",
      locationLabel: "飛行中",
      timezone: "Asia/Taipei",
      startIso: "2026-06-21T20:10:00+08:00",
      endIso: "2026-06-21T16:10:00-07:00",
      nextLabel: "下一步：西雅圖 SEA 入境與轉機",
      mapQuery: "Seattle-Tacoma International Airport"
    },
    {
      id: "transfer-sea",
      title: "西雅圖轉機",
      subtitle: "美國第一站，通常要入境、領行李、海關與重新安檢。",
      locationLabel: "西雅圖 SEA",
      timezone: "America/Los_Angeles",
      startIso: "2026-06-21T16:10:00-07:00",
      endIso: "2026-06-21T21:35:00-07:00",
      nextLabel: "下一步：21:35 搭 AA2793 前往夏洛特",
      mapQuery: "Seattle-Tacoma International Airport"
    },
    {
      id: "flight-sea-clt",
      title: "飛往夏洛特",
      subtitle: "AA2793 西雅圖 SEA 到夏洛特 CLT；夏洛特當地 6/22 凌晨 05:39 抵達，台灣時間 6/22 下午 17:39。",
      locationLabel: "飛行中",
      timezone: "America/New_York",
      startIso: "2026-06-21T21:35:00-07:00",
      endIso: "2026-06-22T05:39:00-04:00",
      nextLabel: "下一步：抵達夏洛特 CLT 後前往 Hyatt Place Charlotte",
      mapQuery: "Charlotte Douglas International Airport"
    },
    {
      id: "charlotte-stay",
      title: "夏洛特停留",
      subtitle: "住宿 Hyatt Place Charlotte / University Research Park；這幾天會去北卡羅來納大學夏洛特分校 UNC Charlotte。",
      locationLabel: "夏洛特",
      timezone: "America/New_York",
      startIso: "2026-06-22T05:39:00-04:00",
      endIso: "2026-06-28T08:40:00-04:00",
      nextLabel: "下一步：6/28 08:40 從夏洛特 CLT 飛往丹佛",
      mapQuery: "Hyatt Place Charlotte/University Research Park 640 University Center Blvd Charlotte NC"
    },
    {
      id: "flight-clt-den",
      title: "夏洛特飛丹佛",
      subtitle: "UA1963 夏洛特 CLT 到丹佛 DEN；丹佛當地 6/28 早上 10:27 抵達，台灣時間 6/29 凌晨 00:27。",
      locationLabel: "飛行中",
      timezone: "America/Denver",
      startIso: "2026-06-28T08:40:00-04:00",
      endIso: "2026-06-28T10:27:00-06:00",
      nextLabel: "下一步：前往 Laramie Airbnb",
      mapQuery: "Denver International Airport"
    },
    {
      id: "den-to-laramie",
      title: "取車後前往 Laramie / Airbnb",
      subtitle: "11:30 在丹佛機場租車櫃台取車，搭免費接駁車，再開往 Laramie。",
      locationLabel: "丹佛到 Laramie",
      timezone: "America/Denver",
      startIso: "2026-06-28T10:27:00-06:00",
      endIso: "2026-06-28T16:00:00-06:00",
      nextLabel: "下一步：11:30 取車，16:00 Airbnb 入住",
      mapQuery: "24050 E 78th Ave Denver CO 80249"
    },
    {
      id: "laramie-airbnb",
      title: "Laramie / Airbnb 停留",
      subtitle: "住宿 766 Hyacinth House；這幾天會去懷俄明大學 University of Wyoming。",
      locationLabel: "Laramie, Wyoming",
      timezone: "America/Denver",
      startIso: "2026-06-28T16:00:00-06:00",
      endIso: "2026-07-03T10:00:00-06:00",
      nextLabel: "下一步：7/3 10:00 Airbnb 退房，移動到丹佛機場飯店",
      mapQuery: "766 North 12th Street Laramie WY 82072"
    },
    {
      id: "laramie-to-denver-hotel",
      title: "前往丹佛機場飯店",
      subtitle: "Airbnb 退房後，移動到 Hyatt Place Pena Station Denver Airport。",
      locationLabel: "Laramie 到丹佛",
      timezone: "America/Denver",
      startIso: "2026-07-03T10:00:00-06:00",
      endIso: "2026-07-03T15:00:00-06:00",
      nextLabel: "下一步：入住丹佛機場飯店",
      mapQuery: "Hyatt Place Pena Station Denver Airport 6110 North Panasonic Way Denver CO"
    },
    {
      id: "denver-airport-hotel",
      title: "丹佛機場住宿",
      subtitle: "住宿 Hyatt Place Pena Station Denver Airport，7/4 15:00 先還車，再飛往洛杉磯 LAX。",
      locationLabel: "丹佛機場",
      timezone: "America/Denver",
      startIso: "2026-07-03T15:00:00-06:00",
      endIso: "2026-07-04T18:12:00-06:00",
      nextLabel: "下一步：7/4 15:00 還車，18:12 從丹佛 DEN 飛往洛杉磯 LAX",
      mapQuery: "24050 E 78th Ave Denver CO 80249"
    },
    {
      id: "flight-den-lax",
      title: "丹佛飛洛杉磯",
      subtitle: "AA4958 丹佛 DEN 到洛杉磯 LAX；洛杉磯當地 7/4 晚上 19:53 抵達，台灣時間 7/5 早上 10:53。",
      locationLabel: "飛行中",
      timezone: "America/Los_Angeles",
      startIso: "2026-07-04T18:12:00-06:00",
      endIso: "2026-07-04T19:53:00-07:00",
      nextLabel: "下一步：洛杉磯 LAX 轉機返台",
      mapQuery: "Los Angeles International Airport"
    },
    {
      id: "transfer-lax",
      title: "洛杉磯 LAX 返台前轉機",
      subtitle: "晚間抵達洛杉磯 LAX，接 7/5 00:35 星宇 JX001 返台。",
      locationLabel: "洛杉磯 LAX",
      timezone: "America/Los_Angeles",
      startIso: "2026-07-04T19:53:00-07:00",
      endIso: "2026-07-05T00:35:00-07:00",
      nextLabel: "下一步：00:35 搭 JX001 返台",
      mapQuery: "Los Angeles International Airport"
    },
    {
      id: "flight-lax-tpe",
      title: "返台飛行",
      subtitle: "JX001 洛杉磯 LAX 到台北/桃園 TPE；台灣時間 7/6 凌晨 05:05 抵達。",
      locationLabel: "飛行中",
      timezone: "Asia/Taipei",
      startIso: "2026-07-05T00:35:00-07:00",
      endIso: "2026-07-06T05:05:00+08:00",
      nextLabel: "下一步：7/6 05:05 抵達台北/桃園 TPE",
      mapQuery: "Taiwan Taoyuan International Airport"
    },
    {
      id: "arrived-home",
      title: "已抵達台灣",
      subtitle: "旅程結束，確認返家交通與休息。",
      locationLabel: "台灣",
      timezone: "Asia/Taipei",
      startIso: "2026-07-06T05:05:00+08:00",
      endIso: "2026-07-07T23:59:00+08:00",
      nextLabel: "旅程完成",
      mapQuery: "Taiwan Taoyuan International Airport"
    }
  ],
  stays: [
    {
      id: "stay-charlotte-hyatt",
      type: "飯店",
      city: "CLT",
      title: "Hyatt Place Charlotte / University Research Park",
      shortLabel: "夏洛特飯店",
      dateRange: "6/22-6/28",
      durationLabel: "6 晚 / 約 6 天",
      checkIn: "2026/6/22",
      checkOut: "2026/6/28",
      address: "640 University Center Blvd, University City Area, Charlotte, NC 28262-1513, United States",
      image: "assets/hyatt-charlotte.png",
      mapQuery: "Hyatt Place Charlotte/University Research Park 640 University Center Blvd Charlotte NC",
      purpose: "住宿期間會去北卡羅來納大學夏洛特分校",
      nearbyName: "北卡羅來納大學夏洛特分校 UNC Charlotte",
      nearbyQuery: "University of North Carolina at Charlotte"
    },
    {
      id: "stay-laramie-airbnb",
      type: "Airbnb",
      city: "DEN",
      title: "766 Hyacinth House",
      shortLabel: "Airbnb Laramie",
      dateRange: "6/28-7/3",
      durationLabel: "5 晚 / 約 5 天",
      checkIn: "6/28 16:00",
      checkOut: "7/3 10:00",
      address: "766 North 12th Street, Laramie, WY 82072, United States",
      image: "assets/airbnb-laramie.png",
      mapQuery: "766 North 12th Street Laramie WY 82072",
      purpose: "住宿期間會去懷俄明大學",
      nearbyName: "懷俄明大學 University of Wyoming",
      nearbyQuery: "University of Wyoming"
    },
    {
      id: "stay-denver-hyatt",
      type: "飯店",
      city: "DEN",
      title: "Hyatt Place Pena Station Denver Airport",
      shortLabel: "丹佛機場飯店",
      dateRange: "7/3-7/4",
      durationLabel: "1 晚",
      checkIn: "2026/7/3",
      checkOut: "2026/7/4",
      address: "6110 North Panasonic Way, Denver International Airport, Denver, CO 80249-6702, United States",
      image: "assets/hyatt-denver-airport.png",
      mapQuery: "Hyatt Place Pena Station Denver Airport 6110 North Panasonic Way Denver CO",
      purpose: "丹佛機場前一晚住宿，隔天飛往洛杉磯 LAX",
      nearbyName: "丹佛國際機場 DEN",
      nearbyQuery: "Denver International Airport"
    }
  ],
  rentals: [
    {
      id: "rental-denver-airport",
      type: "租車",
      provider: "United 航空租車",
      title: "丹佛機場租車",
      shortLabel: "丹佛租車",
      pickup: "6/28 11:30",
      dropoff: "7/4 15:00",
      pickupLocation: "丹佛機場",
      dropoffLocation: "丹佛機場",
      address: "24050 E 78th Ave, Denver, CO 80249",
      image: "assets/rental-car.png",
      phone: "303-342-9001",
      shuttle: "提車方式：免費接駁車。若搭飛機抵達，租賃櫃台在航站樓內有穿梭車。",
      mapQuery: "24050 E 78th Ave Denver CO 80249",
      note: "6/28 抵達丹佛 DEN 後取車前往 Laramie；7/4 飛洛杉磯 LAX 前 15:00 還車。"
    }
  ],
  keyPlaces: [
    {
      id: "place-unc-charlotte",
      label: "北卡羅來納大學夏洛特分校 UNC Charlotte",
      title: "北卡羅來納大學夏洛特分校",
      city: "CLT",
      image: "assets/unc-charlotte.png",
      mapQuery: "University of North Carolina at Charlotte",
      note: "夏洛特住宿期間會前往。"
    },
    {
      id: "place-university-wyoming",
      label: "懷俄明大學 University of Wyoming",
      title: "懷俄明大學",
      city: "DEN",
      image: "assets/university-wyoming.png",
      mapQuery: "University of Wyoming",
      note: "Airbnb / Laramie 停留期間會前往。"
    }
  ],
  transitAreas: [
    {
      id: "transit-charlotte",
      city: "CLT",
      cityLabel: "夏洛特",
      title: "夏洛特：CATS 輕軌與電車系統",
      summary: "用 Blue Line 判斷南北向景點，用 Gold Line 判斷 Uptown 東西向景點。點任何站名會顯示英文全名，並把右側 Google Maps 切到該站。",
      mapQuery: "CATS LYNX Blue Line Charlotte NC",
      mapZoom: 11,
      officialLinks: [
        { label: "CATS Rail", url: "https://www.charlottenc.gov/CATS/Ride/Rail/Rail-Routes-and-Schedules" },
        { label: "Gold Line", url: "https://www.charlottenc.gov/CATS/Ride/Rail/Gold-Line-Streetcar" }
      ],
      systems: [
        {
          id: "clt-blue",
          name: "LYNX Blue Line",
          type: "Light Rail",
          color: "#2563eb",
          description: "南北向主線：I-485 / South Boulevard 到 UNC Charlotte Main。",
          stations: [
            { label: "I-485", name: "I-485 / South Boulevard Station", query: "I-485 South Boulevard Station Charlotte NC" },
            { label: "Sharon Rd W", name: "Sharon Road West Station", query: "Sharon Road West Station Charlotte NC" },
            { label: "Arrowood", name: "Arrowood Station", query: "Arrowood Station Charlotte NC" },
            { label: "Archdale", name: "Archdale Station", query: "Archdale Station Charlotte NC" },
            { label: "Tyvola", name: "Tyvola Station", query: "Tyvola Station Charlotte NC" },
            { label: "Woodlawn", name: "Woodlawn Station", query: "Woodlawn Station Charlotte NC" },
            { label: "Scaleybark", name: "Scaleybark Station", query: "Scaleybark Station Charlotte NC" },
            { label: "New Bern", name: "New Bern Station", query: "New Bern Station Charlotte NC" },
            { label: "East/West", name: "East / West Boulevard Station", query: "East West Boulevard Station Charlotte NC" },
            { label: "Bland St", name: "Bland Street Station", query: "Bland Street Station Charlotte NC" },
            { label: "Carson", name: "Carson Station", query: "Carson Station Charlotte NC" },
            { label: "Brooklyn Village", name: "Brooklyn Village Station", query: "Brooklyn Village Station Charlotte NC" },
            { label: "3rd St", name: "3rd Street / Convention Center Station", query: "3rd Street Convention Center Station Charlotte NC" },
            { label: "CTC/Arena", name: "Charlotte Transportation Center / Arena Station", query: "CTC Arena Station Charlotte NC" },
            { label: "7th St", name: "7th Street Station", query: "7th Street Station Charlotte NC" },
            { label: "9th St", name: "9th Street Station", query: "9th Street Station Charlotte NC" },
            { label: "Parkwood", name: "Parkwood Station", query: "Parkwood Station Charlotte NC" },
            { label: "25th St", name: "25th Street Station", query: "25th Street Station Charlotte NC" },
            { label: "36th St", name: "36th Street Station", query: "36th Street Station Charlotte NC" },
            { label: "Sugar Creek", name: "Sugar Creek Station", query: "Sugar Creek Station Charlotte NC" },
            { label: "Old Concord Rd", name: "Old Concord Road Station", query: "Old Concord Road Station Charlotte NC" },
            { label: "Tom Hunter", name: "Tom Hunter Station", query: "Tom Hunter Station Charlotte NC" },
            { label: "University City Blvd", name: "University City Boulevard Station", query: "University City Boulevard Station Charlotte NC" },
            { label: "McCullough", name: "McCullough Station", query: "McCullough Station Charlotte NC" },
            { label: "JW Clay", name: "JW Clay Boulevard / UNC Charlotte Station", query: "JW Clay Boulevard UNC Charlotte Station Charlotte NC" },
            { label: "UNC Main", name: "UNC Charlotte Main Station", query: "UNC Charlotte Main Station Charlotte NC" }
          ]
        },
        {
          id: "clt-gold",
          name: "CityLYNX Gold Line",
          type: "Streetcar",
          color: "#b45309",
          description: "Uptown 東西向電車：French Street 到 Sunnyside Avenue，CTC/Arena 可接 Blue Line。",
          stations: [
            { label: "French St", name: "French Street Stop", query: "French Street CityLYNX Gold Line Charlotte NC" },
            { label: "JCSU", name: "Johnson C. Smith University Stop", query: "Johnson C Smith University Gold Line Charlotte NC" },
            { label: "Bruns Ave", name: "Bruns Avenue Stop", query: "Bruns Avenue Gold Line Charlotte NC" },
            { label: "Wesley Heights", name: "Wesley Heights Stop", query: "Wesley Heights Gold Line Charlotte NC" },
            { label: "Irwin Ave", name: "Irwin Avenue Stop", query: "Irwin Avenue Gold Line Charlotte NC" },
            { label: "Johnson & Wales", name: "Johnson & Wales University Stop", query: "Johnson and Wales University Gold Line Charlotte NC" },
            { label: "Gateway", name: "Charlotte Gateway Station Stop", query: "Charlotte Gateway Station Gold Line Charlotte NC" },
            { label: "Mint St", name: "Mint Street Stop", query: "Mint Street Gold Line Charlotte NC" },
            { label: "Tryon St", name: "Tryon Street Stop", query: "Tryon Street Gold Line Charlotte NC" },
            { label: "CTC/Arena", name: "CTC / Arena Stop", query: "CTC Arena Gold Line Charlotte NC" },
            { label: "Davidson St", name: "Davidson Street Stop", query: "Davidson Street Gold Line Charlotte NC" },
            { label: "McDowell St", name: "McDowell Street Stop", query: "McDowell Street Gold Line Charlotte NC" },
            { label: "CPCC", name: "Central Piedmont Community College Stop", query: "CPCC Gold Line Charlotte NC" },
            { label: "Elizabeth & Hawthorne", name: "Elizabeth & Hawthorne Stop", query: "Elizabeth Hawthorne Gold Line Charlotte NC" },
            { label: "Hawthorne & 5th", name: "Hawthorne & 5th Street Stop", query: "Hawthorne 5th Street Gold Line Charlotte NC" },
            { label: "8th St", name: "8th Street Stop", query: "8th Street Gold Line Charlotte NC" },
            { label: "Sunnyside", name: "Sunnyside Avenue Stop", query: "Sunnyside Avenue Gold Line Charlotte NC" }
          ]
        }
      ],
      bikeStations: [
        { label: "Uptown / CTC", name: "Bike share near Charlotte Transportation Center", query: "bike share near Charlotte Transportation Center Charlotte NC", detail: "市中心與 Blue/Gold 轉乘點附近。" },
        { label: "South End Rail Trail", name: "Bike share near Charlotte Rail Trail South End", query: "bike share near Charlotte Rail Trail South End Charlotte NC", detail: "Blue Line 沿線餐廳與酒吧密集區。" },
        { label: "7th Street", name: "Bike share near 7th Street Station", query: "bike share near 7th Street Station Charlotte NC", detail: "Discovery Place、7th Street Public Market 周邊。" },
        { label: "UNC Charlotte", name: "Bike rental near UNC Charlotte", query: "bike rental near UNC Charlotte Charlotte NC", detail: "學校與 University City 周邊單車租借查詢。" }
      ]
    },
    {
      id: "transit-laramie",
      city: "DEN",
      cityLabel: "Laramie",
      title: "Laramie：UW Roundup 公車與校園核心點",
      summary: "Laramie 沒有輕軌或電車。這裡改顯示 UW Roundup 公車系統與校園核心點；點地點可看英文全名與 Google Maps 位置。",
      mapQuery: "University of Wyoming Transit Services Laramie WY",
      mapZoom: 14,
      officialLinks: [
        { label: "UW Transit", url: "https://www.uwyo.edu/tps/transit/index.html" }
      ],
      systems: [
        {
          id: "laramie-roundup",
          name: "UW Roundup Transit",
          type: "Campus Bus",
          color: "#6d28d9",
          description: "官方系統含 Express、Link、Evening 等路線；實際停靠與班距以 UW Transit 即時資訊為準。",
          stations: [
            { label: "Airbnb", name: "766 North 12th Street", query: "766 North 12th Street Laramie WY 82072" },
            { label: "UW Campus", name: "University of Wyoming", query: "University of Wyoming Laramie WY" },
            { label: "Wyoming Union", name: "Wyoming Union", query: "Wyoming Union Laramie WY" },
            { label: "Coe Library", name: "William Robertson Coe Library", query: "William Robertson Coe Library Laramie WY" },
            { label: "Engineering", name: "Engineering Education and Research Building", query: "Engineering Education and Research Building University of Wyoming" },
            { label: "Half Acre", name: "Half Acre Recreation and Wellness Center", query: "Half Acre Recreation and Wellness Center Laramie WY" },
            { label: "Stadium", name: "War Memorial Stadium", query: "War Memorial Stadium Laramie WY" },
            { label: "Downtown", name: "Downtown Laramie", query: "Downtown Laramie WY" }
          ]
        }
      ],
      bikeStations: [
        { label: "UW Outdoor Program", name: "University of Wyoming Outdoor Program", query: "University of Wyoming Outdoor Program Laramie WY", detail: "校內戶外活動與裝備租借入口，是否提供單車需以現場/官網為準。" },
        { label: "校園周邊", name: "Bike rental near University of Wyoming", query: "bike rental near University of Wyoming Laramie WY", detail: "查詢校園附近可租借或維修單車的地點。" },
        { label: "市中心周邊", name: "Bike rental near Downtown Laramie", query: "bike rental near Downtown Laramie WY", detail: "查詢 Downtown Laramie 周邊租借點與車店。" }
      ]
    },
    {
      id: "transit-denver-airport",
      city: "DEN",
      cityLabel: "丹佛機場",
      title: "丹佛：RTD A Line 機場鐵路",
      summary: "顯示 A Line 全線站點，從 Denver Airport 到 Union Station。點站名可看英文全名與地圖，方便判斷之後加的景點是否靠近鐵路。",
      mapQuery: "RTD A Line Denver rail map",
      mapZoom: 10,
      officialLinks: [
        { label: "RTD Rail", url: "https://www.rtd-denver.com/routes-services/rail" },
        { label: "RTD Airport", url: "https://www.rtd-denver.com/routes-services/airport" }
      ],
      systems: [
        {
          id: "den-a",
          name: "RTD A Line",
          type: "Commuter Rail",
          color: "#2563eb",
          description: "機場線：Denver Airport Station 到 Union Station。",
          stations: [
            { label: "Union", name: "Union Station Transit Center", query: "Union Station Transit Center Denver CO" },
            { label: "38th / Blake", name: "38th / Blake Station", query: "38th Blake Station Denver CO" },
            { label: "40th / Colorado", name: "40th / Colorado Station", query: "40th Colorado Station Denver CO" },
            { label: "Central Park", name: "Central Park Station", query: "Central Park Station Denver CO" },
            { label: "Peoria", name: "Peoria Station", query: "Peoria Station Denver CO" },
            { label: "40th & Airport", name: "40th Avenue & Airport Boulevard / Gateway Park Station", query: "40th Avenue Airport Boulevard Gateway Park Station Denver CO" },
            { label: "61st & Peña", name: "61st / Peña Station", query: "61st and Pena Station Denver CO" },
            { label: "DEN Airport", name: "Denver Airport Station", query: "Denver Airport Station Denver CO" }
          ]
        }
      ],
      bikeStations: [
        { label: "61st & Peña", name: "Shared bikes / scooters near 61st & Peña Station", query: "shared bikes scooters near 61st and Pena Station Denver CO", detail: "飯店附近主要查詢點。" },
        { label: "Union Station", name: "Shared bikes / scooters near Union Station", query: "shared bikes scooters near Union Station Denver CO", detail: "市中心最方便的轉乘點。" },
        { label: "Central Park", name: "Shared bikes / scooters near Central Park Station", query: "shared bikes scooters near Central Park Station Denver CO", detail: "A Line 中段可作為景點延伸判斷。" },
        { label: "Denver Airport", name: "Bike racks / shared mobility near Denver Airport Station", query: "bike share near Denver Airport Station Denver CO", detail: "機場站附近以 Google Maps 與 RTD 設施資訊為準。" }
      ]
    }
  ],
  defaultItems: [
    {
      id: "default-flight-tpe-sea-clt",
      type: "航班",
      title: "台北出發，西雅圖轉機後抵達夏洛特",
      date: "2026-06-21",
      time: "20:10",
      city: "TPE",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Taiwan+Taoyuan+International+Airport",
      notes: "JX032 + AA2793；台灣時間 6/22 17:39 抵達夏洛特 CLT。",
      locked: true
    },
    {
      id: "default-charlotte-stay",
      type: "住宿",
      title: "Hyatt Place Charlotte / University Research Park",
      date: "2026-06-22",
      time: "",
      city: "CLT",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Hyatt+Place+Charlotte%2FUniversity+Research+Park+640+University+Center+Blvd+Charlotte+NC",
      notes: "入住 6/22，退房 6/28。地址：640 University Center Blvd, Charlotte, NC。住宿期間會去北卡羅來納大學夏洛特分校 UNC Charlotte。",
      locked: true
    },
    {
      id: "default-unc-charlotte",
      type: "景點",
      title: "北卡羅來納大學夏洛特分校 UNC Charlotte",
      date: "2026-06-23",
      time: "",
      city: "CLT",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=University+of+North+Carolina+at+Charlotte",
      notes: "夏洛特住宿期間要去的主要地點，實際日期可之後再調整。",
      locked: true
    },
    {
      id: "default-flight-clt-den",
      type: "航班",
      title: "夏洛特飛丹佛",
      date: "2026-06-28",
      time: "08:40",
      city: "CLT",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Charlotte+Douglas+International+Airport",
      notes: "UA1963；夏洛特飛丹佛。",
      locked: true
    },
    {
      id: "default-denver-stay",
      type: "住宿",
      title: "Airbnb：766 Hyacinth House",
      date: "2026-06-28",
      time: "16:00",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=766+North+12th+Street+Laramie+WY+82072",
      notes: "6/28 16:00 入住，7/3 10:00 退房。地址：766 North 12th Street, Laramie, WY 82072。住宿期間會去懷俄明大學 University of Wyoming。",
      locked: true
    },
    {
      id: "default-denver-rental-pickup",
      type: "租車",
      title: "丹佛機場租車取車",
      date: "2026-06-28",
      time: "11:30",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=24050+E+78th+Ave+Denver+CO+80249",
      notes: "United 航空租車。提車方式：免費接駁車。地址：24050 E 78th Ave, Denver, CO 80249。櫃台電話：303-342-9001。",
      locked: true
    },
    {
      id: "default-university-wyoming",
      type: "景點",
      title: "懷俄明大學 University of Wyoming",
      date: "2026-06-29",
      time: "",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=University+of+Wyoming",
      notes: "Laramie / Airbnb 停留期間要去的主要地點，實際日期可之後再調整。",
      locked: true
    },
    {
      id: "default-denver-airport-hotel",
      type: "住宿",
      title: "Hyatt Place Pena Station Denver Airport",
      date: "2026-07-03",
      time: "",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Hyatt+Place+Pena+Station+Denver+Airport+6110+North+Panasonic+Way+Denver+CO",
      notes: "入住 7/3，退房 7/4。地址：6110 North Panasonic Way, Denver, CO 80249-6702。",
      locked: true
    },
    {
      id: "default-flight-den-lax-tpe",
      type: "航班",
      title: "丹佛飛洛杉磯，洛杉磯 LAX 轉機返台",
      date: "2026-07-04",
      time: "18:12",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Denver+International+Airport",
      notes: "AA4958 + JX001；台灣時間 7/6 05:05 抵達台北/桃園 TPE。",
      locked: true
    },
    {
      id: "default-denver-rental-dropoff",
      type: "租車",
      title: "丹佛機場租車還車",
      date: "2026-07-04",
      time: "15:00",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=24050+E+78th+Ave+Denver+CO+80249",
      notes: "7/4 15:00 在丹佛機場還車；之後搭 18:12 AA4958 前往洛杉磯 LAX。",
      locked: true
    }
  ],
  pendingSlots: [
    {
      id: "food",
      type: "餐廳",
      city: "CLT",
      title: "餐廳清單",
      date: "2026-06-22",
      dateRange: "夏洛特 / 丹佛",
      detail: "可直接新增 Google Maps 地標，並在備註放訂位時間或必點菜。"
    },
    {
      id: "places",
      type: "景點",
      city: "DEN",
      title: "景點與每日安排",
      date: "2026-06-28",
      dateRange: "夏洛特 / Laramie / 丹佛",
      detail: "北卡羅來納大學夏洛特分校 UNC Charlotte 與懷俄明大學 University of Wyoming 已加入；其他景點可用 Google Maps 連結繼續補。"
    },
    {
      id: "lax-buffer",
      type: "交通",
      city: "LAX",
      title: "洛杉磯 LAX 轉機備案",
      date: "2026-07-04",
      dateRange: "7/4 晚間至 7/5 凌晨",
      detail: "確認行李直掛、航廈移動方式、餐食與延誤時的航空公司櫃台位置。"
    }
  ],
  checklist: [
    {
      id: "passport-esta",
      title: "護照與 ESTA / 簽證",
      note: "確認效期、姓名拼音與機票一致。"
    },
    {
      id: "airline-apps",
      title: "安裝星宇、AA、United App",
      note: "開啟航班通知。"
    },
    {
      id: "sea-entry",
      title: "西雅圖 SEA 入境轉機準備",
      note: "把旅館地址、回程航班與行程摘要放隨身。"
    },
    {
      id: "luggage",
      title: "行李規則與直掛確認",
      note: "特別確認西雅圖 SEA 與洛杉磯 LAX 的行李流程。"
    },
    {
      id: "esim",
      title: "eSIM / 漫遊",
      note: "抵達西雅圖 SEA 前先準備可用網路。"
    },
    {
      id: "hotel-screenshots",
      title: "住宿截圖交給網站更新",
      note: "入住/退房日期與地址以截圖為準。"
    },
    {
      id: "den-altitude",
      title: "丹佛高海拔備品",
      note: "水瓶、防曬、護唇膏、薄外套。"
    },
    {
      id: "calendar",
      title: "加入手機行事曆",
      note: "下載航班 .ics 後匯入，並開啟提醒。"
    }
  ]
};
