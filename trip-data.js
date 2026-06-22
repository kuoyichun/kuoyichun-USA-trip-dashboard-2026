window.TRIP_DATA = {
  meta: {
    title: "2026 美國行程控制台",
    dateRange: "2026-06-21 至 2026-07-06",
    homeTimeZone: "Asia/Taipei",
    note: "航班時間依使用者提供的機票資訊整理；公開版不包含確認碼、票號或原始截圖。"
  },
  airports: {
    TPE: {
      code: "TPE",
      cityZh: "台北 / 桃園",
      cityEn: "Taipei / Taoyuan",
      airportZh: "臺灣桃園國際機場",
      airportEn: "Taiwan Taoyuan International Airport",
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
      airportZh: "西雅圖-塔科馬國際機場",
      airportEn: "Seattle-Tacoma International Airport",
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
      airportZh: "夏洛特道格拉斯國際機場",
      airportEn: "Charlotte Douglas International Airport",
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
      airportZh: "丹佛國際機場",
      airportEn: "Denver International Airport",
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
      airportZh: "洛杉磯國際機場",
      airportEn: "Los Angeles International Airport",
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
      fromDetail: "TPE 第 2 航廈",
      toDetail: "SEA 航廈待確認",
      note: "直飛。抵達西雅圖後接美國國內線，需預留入境與安檢時間。"
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
      fromDetail: "SEA 航廈待確認",
      toDetail: "CLT Gate 待確認",
      note: "西雅圖轉機 5 小時 25 分；請確認行李是否需重新托運。"
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
      fromDetail: "CLT Gate 待確認",
      toDetail: "DEN Gate 待確認",
      note: "確認碼與座位不放在公開版；報到前請以航空公司 App 或私人資料確認。"
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
      fromDetail: "DEN Gate 待確認",
      toDetail: "LAX 0 航廈",
      note: "抵達 LAX 後 4 小時 42 分接返台航班。"
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
      fromDetail: "LAX B 航廈",
      toDetail: "TPE 第 2 航廈",
      note: "跨日返台，台灣時間 7/6 清晨抵達。"
    }
  ],
  layovers: [
    {
      id: "sea-transfer",
      label: "SEA 轉機",
      duration: "5 小時 25 分",
      note: "國際線抵達美國第一站，常見流程為入境、領行李、海關、重新托運、安檢。"
    },
    {
      id: "lax-transfer",
      label: "LAX 返台前緩衝",
      duration: "4 小時 42 分",
      note: "晚間抵達 LAX 後接 00:35 星宇返台航班，需確認 AA 與星宇行李銜接。"
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
      nextLabel: "下一步：20:10 從 TPE 起飛",
      mapQuery: "Taiwan Taoyuan International Airport"
    },
    {
      id: "flight-tpe-sea",
      title: "飛往西雅圖",
      subtitle: "JX032 台北到西雅圖，抵達後進行美國入境與轉機。",
      locationLabel: "飛行中",
      timezone: "Asia/Taipei",
      startIso: "2026-06-21T20:10:00+08:00",
      endIso: "2026-06-21T16:10:00-07:00",
      nextLabel: "下一步：SEA 入境與轉機",
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
      subtitle: "AA2793 西雅圖到夏洛特，台灣時間 6/22 傍晚抵達。",
      locationLabel: "飛行中",
      timezone: "America/New_York",
      startIso: "2026-06-21T21:35:00-07:00",
      endIso: "2026-06-22T05:39:00-04:00",
      nextLabel: "下一步：抵達 CLT 後前往 Hyatt Place Charlotte",
      mapQuery: "Charlotte Douglas International Airport"
    },
    {
      id: "charlotte-stay",
      title: "夏洛特停留",
      subtitle: "住宿 Hyatt Place Charlotte / University Research Park；這幾天會去 UNC Charlotte。",
      locationLabel: "夏洛特",
      timezone: "America/New_York",
      startIso: "2026-06-22T05:39:00-04:00",
      endIso: "2026-06-28T08:40:00-04:00",
      nextLabel: "下一步：6/28 08:40 從 CLT 飛往丹佛",
      mapQuery: "Hyatt Place Charlotte/University Research Park 640 University Center Blvd Charlotte NC"
    },
    {
      id: "flight-clt-den",
      title: "夏洛特飛丹佛",
      subtitle: "UA1963 前往丹佛，抵達後前往 Laramie / Airbnb。",
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
      subtitle: "住宿 766 Hyacinth House；這幾天會去 University of Wyoming。",
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
      subtitle: "住宿 Hyatt Place Pena Station Denver Airport，7/4 15:00 先還車，再飛往 LAX。",
      locationLabel: "丹佛機場",
      timezone: "America/Denver",
      startIso: "2026-07-03T15:00:00-06:00",
      endIso: "2026-07-04T18:12:00-06:00",
      nextLabel: "下一步：7/4 15:00 還車，18:12 從 DEN 飛往 LAX",
      mapQuery: "24050 E 78th Ave Denver CO 80249"
    },
    {
      id: "flight-den-lax",
      title: "丹佛飛洛杉磯",
      subtitle: "AA4958 前往 LAX，抵達後銜接返台航班。",
      locationLabel: "飛行中",
      timezone: "America/Los_Angeles",
      startIso: "2026-07-04T18:12:00-06:00",
      endIso: "2026-07-04T19:53:00-07:00",
      nextLabel: "下一步：LAX 轉機返台",
      mapQuery: "Los Angeles International Airport"
    },
    {
      id: "transfer-lax",
      title: "LAX 返台前轉機",
      subtitle: "晚間抵達 LAX，接 7/5 00:35 星宇 JX001 返台。",
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
      subtitle: "JX001 洛杉磯到桃園，台灣時間 7/6 清晨抵達。",
      locationLabel: "飛行中",
      timezone: "Asia/Taipei",
      startIso: "2026-07-05T00:35:00-07:00",
      endIso: "2026-07-06T05:05:00+08:00",
      nextLabel: "下一步：7/6 05:05 抵達 TPE",
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
      shortLabel: "Hyatt CLT",
      dateRange: "6/22-6/28",
      checkIn: "2026/6/22",
      checkOut: "2026/6/28",
      address: "640 University Center Blvd, University City Area, Charlotte, NC 28262-1513, United States",
      mapQuery: "Hyatt Place Charlotte/University Research Park 640 University Center Blvd Charlotte NC",
      purpose: "住宿期間會去北卡羅來納大學夏洛特分校",
      nearbyName: "UNC Charlotte",
      nearbyQuery: "University of North Carolina at Charlotte"
    },
    {
      id: "stay-laramie-airbnb",
      type: "Airbnb",
      city: "DEN",
      title: "766 Hyacinth House",
      shortLabel: "Airbnb Laramie",
      dateRange: "6/28-7/3",
      checkIn: "6/28 16:00",
      checkOut: "7/3 10:00",
      address: "766 North 12th Street, Laramie, WY 82072, United States",
      mapQuery: "766 North 12th Street Laramie WY 82072",
      purpose: "住宿期間會去懷俄明大學",
      nearbyName: "University of Wyoming",
      nearbyQuery: "University of Wyoming"
    },
    {
      id: "stay-denver-hyatt",
      type: "飯店",
      city: "DEN",
      title: "Hyatt Place Pena Station Denver Airport",
      shortLabel: "Hyatt DEN",
      dateRange: "7/3-7/4",
      checkIn: "2026/7/3",
      checkOut: "2026/7/4",
      address: "6110 North Panasonic Way, Denver International Airport, Denver, CO 80249-6702, United States",
      mapQuery: "Hyatt Place Pena Station Denver Airport 6110 North Panasonic Way Denver CO",
      purpose: "丹佛機場前一晚住宿，隔天飛往 LAX",
      nearbyName: "Denver International Airport",
      nearbyQuery: "Denver International Airport"
    }
  ],
  rentals: [
    {
      id: "rental-denver-airport",
      type: "租車",
      provider: "United 航空租車",
      title: "丹佛機場租車",
      shortLabel: "DEN 租車",
      pickup: "6/28 11:30",
      dropoff: "7/4 15:00",
      pickupLocation: "丹佛機場",
      dropoffLocation: "丹佛機場",
      address: "24050 E 78th Ave, Denver, CO 80249",
      phone: "303-342-9001",
      shuttle: "提車方式：免費接駁車。若搭飛機抵達，租賃櫃台在航站樓內有穿梭車。",
      mapQuery: "24050 E 78th Ave Denver CO 80249",
      note: "6/28 抵達 DEN 後取車前往 Laramie；7/4 飛 LAX 前 15:00 還車。"
    }
  ],
  keyPlaces: [
    {
      id: "place-unc-charlotte",
      label: "UNC Charlotte",
      title: "北卡羅來納大學夏洛特分校",
      city: "CLT",
      mapQuery: "University of North Carolina at Charlotte",
      note: "夏洛特住宿期間會前往。"
    },
    {
      id: "place-university-wyoming",
      label: "University of Wyoming",
      title: "懷俄明大學",
      city: "DEN",
      mapQuery: "University of Wyoming",
      note: "Airbnb / Laramie 停留期間會前往。"
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
      notes: "JX032 + AA2793；台灣時間 6/22 17:39 抵達 CLT。",
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
      notes: "入住 6/22，退房 6/28。地址：640 University Center Blvd, Charlotte, NC。住宿期間會去 UNC Charlotte。",
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
      notes: "UA1963；確認碼與座位請保留在私人資料，不放公開版。",
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
      notes: "6/28 16:00 入住，7/3 10:00 退房。地址：766 North 12th Street, Laramie, WY 82072。住宿期間會去 University of Wyoming。",
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
      title: "丹佛飛洛杉磯，LAX 轉機返台",
      date: "2026-07-04",
      time: "18:12",
      city: "DEN",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Denver+International+Airport",
      notes: "AA4958 + JX001；台灣時間 7/6 05:05 抵達 TPE。",
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
      notes: "7/4 15:00 在丹佛機場還車；之後搭 18:12 AA4958 前往 LAX。",
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
      detail: "UNC Charlotte 與 University of Wyoming 已加入；其他景點可用 Google Maps 連結繼續補。"
    },
    {
      id: "lax-buffer",
      type: "交通",
      city: "LAX",
      title: "LAX 轉機備案",
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
      note: "開啟航班通知，將確認碼與航班加入。"
    },
    {
      id: "sea-entry",
      title: "SEA 入境轉機準備",
      note: "把旅館地址、回程航班與行程摘要放隨身。"
    },
    {
      id: "luggage",
      title: "行李規則與直掛確認",
      note: "特別確認 SEA 與 LAX 的行李流程。"
    },
    {
      id: "esim",
      title: "eSIM / 漫遊",
      note: "抵達 SEA 前先準備可用網路。"
    },
    {
      id: "hotel-screenshots",
      title: "住宿截圖交給網站更新",
      note: "入住/退房日期、地址、訂房編號都以截圖為準。"
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
