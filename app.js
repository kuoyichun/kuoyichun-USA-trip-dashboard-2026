(function () {
  const data = window.TRIP_DATA;
  const airports = data.airports;
  const HOME_TZ = data.meta.homeTimeZone;
  const STORAGE_KEY = "codex-trip-custom-items-v1";
  const CHECK_KEY = "codex-trip-checklist-v1";

  let customItems = loadJson(STORAGE_KEY, []);
  let checkedItems = loadJson(CHECK_KEY, {});
  let activeFilter = "全部";

  const $ = (selector) => document.querySelector(selector);

  function loadJson(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatInZone(iso, timeZone, options = {}) {
    const defaults = {
      timeZone,
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };
    return new Intl.DateTimeFormat("zh-TW", { ...defaults, ...options }).format(new Date(iso));
  }

  function zoneAbbr(iso, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).formatToParts(new Date(iso));
    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  }

  function formatClock(timeZone, sourceDate = new Date()) {
    const time = new Intl.DateTimeFormat("zh-TW", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(sourceDate);
    const day = new Intl.DateTimeFormat("zh-TW", {
      timeZone,
      month: "numeric",
      day: "numeric",
      weekday: "short"
    }).format(sourceDate);
    return { time, date: day };
  }

  function formatDateLabel(dateValue) {
    if (!dateValue) return "日期未定";
    const date = new Date(`${dateValue}T12:00:00+08:00`);
    return new Intl.DateTimeFormat("zh-TW", {
      month: "numeric",
      day: "numeric",
      weekday: "short"
    }).format(date);
  }

  function mapSearchUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function mapDirectionsUrl(query) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
  }

  function safeMapUrl(value, cityCode, title) {
    const raw = String(value ?? "").trim();
    if (raw) {
      try {
        const url = new URL(raw);
        if (url.protocol === "http:" || url.protocol === "https:") return url.href;
      } catch (_error) {
        return mapSearchUrl(raw);
      }
    }
    const airport = airports[cityCode];
    return mapSearchUrl(title || airport?.mapQuery || "Google Maps");
  }

  function queryFromMapUrl(value) {
    const raw = String(value ?? "").trim();
    if (!raw) return "";
    try {
      const url = new URL(raw);
      const query = url.searchParams.get("query") || url.searchParams.get("q");
      if (query) return query;
      const placeMatch = url.pathname.match(/\/place\/([^/]+)/);
      if (placeMatch) return decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
      return "";
    } catch (_error) {
      return raw;
    }
  }

  function itemMapQuery(item) {
    const parsedMapQuery = queryFromMapUrl(item.mapUrl);
    if (parsedMapQuery) return parsedMapQuery;
    const airport = airports[item.city];
    return [item.title, airport?.cityEn].filter(Boolean).join(" ");
  }

  function googleMapEmbedUrl(params) {
    const url = new URL("https://maps.google.com/maps");
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
    url.searchParams.set("hl", "zh-TW");
    url.searchParams.set("output", "embed");
    return url.href;
  }

  function googleMapPlaceEmbedUrl(query, zoom = 12) {
    return googleMapEmbedUrl({ q: query, z: String(zoom) });
  }

  function googleMapRouteEmbedUrl() {
    const routePoints = data.route.map((code) => airports[code].mapQuery);
    const destination = routePoints.slice(1).join(" to: ");
    return googleMapEmbedUrl({
      f: "d",
      saddr: routePoints[0],
      daddr: destination
    });
  }

  function flightStatusUrl(flight) {
    const from = airports[flight.from];
    const date = formatInZone(flight.departIso, from.timezone, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: undefined,
      hour: undefined,
      minute: undefined
    });
    return `https://www.google.com/search?q=${encodeURIComponent(`${flight.id} flight status ${date}`)}`;
  }

  function typeClass(type) {
    const map = {
      航班: "flight",
      住宿: "hotel",
      景點: "place",
      餐廳: "food",
      租車: "car",
      交通: "car"
    };
    return map[type] || "";
  }

  function allItems() {
    return [...data.defaultItems, ...customItems].sort((a, b) => {
      const dateA = `${a.date || "9999-12-31"}T${a.time || "23:59"}`;
      const dateB = `${b.date || "9999-12-31"}T${b.time || "23:59"}`;
      return dateA.localeCompare(dateB);
    });
  }

  function showToast(message) {
    const dialog = $("#toastDialog");
    $("#toastText").textContent = message;
    if (dialog.open) dialog.close();
    dialog.show();
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      if (dialog.open) dialog.close();
    }, 2200);
  }

  function renderClocks() {
    const codes = ["TPE", "SEA", "CLT", "DEN", "LAX"];
    $("#clockGrid").innerHTML = codes.map((code) => {
      const airport = airports[code];
      const clock = formatClock(airport.timezone);
      return `
        <div class="clock-card">
          <strong>${escapeHtml(clock.time)}</strong>
          <span>${escapeHtml(code)} · ${escapeHtml(airport.cityZh)}</span>
          <span>${escapeHtml(clock.date)}</span>
        </div>
      `;
    }).join("");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function currentJourneyStage(now = new Date()) {
    const stages = data.journeyStages || [];
    if (!stages.length) return null;
    const first = stages[0];
    const last = stages[stages.length - 1];
    if (now < new Date(first.startIso)) {
      return {
        ...first,
        title: "尚未出發",
        subtitle: "旅程還沒開始，先確認護照、住宿、交通與行李。",
        nextLabel: first.nextLabel
      };
    }
    return stages.find((stage) => {
      const start = new Date(stage.startIso);
      const end = new Date(stage.endIso);
      return now >= start && now < end;
    }) || last;
  }

  function renderTripStatus() {
    const now = new Date();
    const stage = currentJourneyStage(now);
    if (!stage) return;
    const localClock = formatClock(stage.timezone, now);
    const taiwanClock = formatClock(HOME_TZ, now);
    const tripStart = new Date(data.journeyStages[0].startIso);
    const tripArrival = new Date((data.journeyStages.find((item) => item.id === "arrived-home") || data.journeyStages.at(-1)).startIso);
    const progress = clamp(((now - tripStart) / (tripArrival - tripStart)) * 100, 0, 100);

    $("#currentStageTitle").textContent = stage.title;
    $("#currentStageSubtitle").textContent = stage.subtitle;
    $("#currentLocalLabel").textContent = `${stage.locationLabel} 當地時間`;
    $("#currentLocalTime").textContent = localClock.time;
    $("#currentLocalDate").textContent = localClock.date;
    $("#currentTaiwanTime").textContent = taiwanClock.time;
    $("#currentTaiwanDate").textContent = taiwanClock.date;
    $("#currentNextStep").textContent = stage.nextLabel;
    $("#tripProgressBar").style.width = `${progress.toFixed(0)}%`;
    $("#tripProgressLabel").textContent = `整趟旅程進度約 ${progress.toFixed(0)}%`;
    const stageMap = $("#currentStageMap");
    stageMap.href = mapSearchUrl(stage.mapQuery || stage.locationLabel);
  }

  function renderFlights() {
    $("#flightList").innerHTML = data.flights.map((flight) => {
      const from = airports[flight.from];
      const to = airports[flight.to];
      const departLocal = formatInZone(flight.departIso, from.timezone);
      const arriveLocal = formatInZone(flight.arriveIso, to.timezone);
      const departTw = formatInZone(flight.departIso, HOME_TZ);
      const arriveTw = formatInZone(flight.arriveIso, HOME_TZ);
      const detailBits = [flight.aircraft, flight.duration, flight.cabin].filter(Boolean).join(" · ");
      const confirmation = flight.confirmation ? `<span class="tag">確認碼 ${escapeHtml(flight.confirmation)}</span>` : "";
      const seat = flight.seat ? `<span class="tag">座位 ${escapeHtml(flight.seat)}</span>` : "";

      return `
        <article class="flight-card">
          <div class="flight-topline">
            <div>
              <span class="flight-number">${escapeHtml(flight.id)}</span>
              <span class="flight-airline">${escapeHtml(flight.airlineZh)} · ${escapeHtml(flight.airline)}</span>
            </div>
            <span class="flight-badge ${escapeHtml(flight.carrierClass)}">${escapeHtml(flight.cabin)}</span>
          </div>
          <div class="flight-path">
            <div class="time-block">
              <strong>${escapeHtml(departLocal.split(" ").at(-1))}</strong>
              <span class="code">${escapeHtml(flight.from)}</span>
              <span class="airport-name">${escapeHtml(from.airportZh)}</span>
              <span class="airport-name">${escapeHtml(departLocal)} ${escapeHtml(zoneAbbr(flight.departIso, from.timezone))}</span>
            </div>
            <div class="flight-arrow" aria-hidden="true">→</div>
            <div class="time-block">
              <strong>${escapeHtml(arriveLocal.split(" ").at(-1))}</strong>
              <span class="code">${escapeHtml(flight.to)}</span>
              <span class="airport-name">${escapeHtml(to.airportZh)}</span>
              <span class="airport-name">${escapeHtml(arriveLocal)} ${escapeHtml(zoneAbbr(flight.arriveIso, to.timezone))}</span>
            </div>
          </div>
          <div class="taiwan-time">
            台灣時間：${escapeHtml(departTw)} 出發 · ${escapeHtml(arriveTw)} 抵達
          </div>
          <div class="flight-meta">${escapeHtml(detailBits)}</div>
          <div class="tag-row">${confirmation}${seat}<span class="tag">${escapeHtml(flight.fromDetail)}</span><span class="tag">${escapeHtml(flight.toDetail)}</span></div>
          <p class="card-muted">${escapeHtml(flight.note)}</p>
          <div class="flight-actions">
            <a class="ghost-button" href="${mapSearchUrl(from.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">⌖</span>${escapeHtml(flight.from)}</a>
            <a class="ghost-button" href="${mapDirectionsUrl(to.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>${escapeHtml(flight.to)}</a>
            <a class="ghost-button" href="${flightStatusUrl(flight)}" target="_blank" rel="noreferrer"><span aria-hidden="true">◷</span>狀態</a>
            <button class="icon-button" type="button" data-copy-flight="${escapeHtml(flight.id)}" aria-label="複製 ${escapeHtml(flight.id)} 摘要">⧉</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function mapTargets() {
    return [
      {
        id: "route",
        label: "整趟路線",
        caption: "Google Maps 互動路線，可放大縮小；跨海航段若無法計算，請切換單一機場地標查看。",
        src: googleMapRouteEmbedUrl()
      },
      ...Object.values(airports).map((airport) => ({
        id: airport.code,
        label: `${airport.code} ${airport.cityZh}`,
        caption: `${airport.airportZh} / ${airport.airportEn}`,
        src: googleMapPlaceEmbedUrl(airport.mapQuery, 12)
      })),
      ...(data.stays || []).map((stay) => ({
        id: stay.id,
        label: stay.shortLabel || stay.title,
        caption: `${stay.title}：${stay.address}`,
        src: googleMapPlaceEmbedUrl(stay.mapQuery, 14)
      })),
      ...(data.rentals || []).map((rental) => ({
        id: rental.id,
        label: rental.shortLabel || rental.title,
        caption: `${rental.title}：${rental.address}`,
        src: googleMapPlaceEmbedUrl(rental.mapQuery, 14)
      })),
      ...(data.keyPlaces || []).map((place) => ({
        id: place.id,
        label: place.label,
        caption: `${place.title}：${place.note}`,
        src: googleMapPlaceEmbedUrl(place.mapQuery, 14)
      }))
    ];
  }

  function setEmbeddedMap(targetIdOrQuery, label = "", zoom = 13) {
    const targets = mapTargets();
    const target = targets.find((item) => item.id === targetIdOrQuery) || {
      id: "",
      label,
      caption: label ? `目前顯示：${label}` : "目前顯示自訂地標",
      src: googleMapPlaceEmbedUrl(targetIdOrQuery, zoom)
    };
    const iframe = $("#googleMapFrame");
    const caption = $("#mapCaptionText");
    if (!iframe || !caption) return;
    iframe.src = target.src;
    iframe.title = `Google Maps - ${target.label}`;
    caption.textContent = target.caption;
    document.querySelectorAll("[data-map-target]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mapTarget === target.id));
    });
  }

  function renderRouteMap() {
    const targets = mapTargets();
    $("#mapToolbar").innerHTML = targets.map((target, index) => `
      <button type="button" data-map-target="${escapeHtml(target.id)}" aria-pressed="${index === 0 ? "true" : "false"}">${escapeHtml(target.label)}</button>
    `).join("");
    $("#routeMap").innerHTML = `
      <iframe id="googleMapFrame" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="${targets[0].src}" title="Google Maps - ${escapeHtml(targets[0].label)}"></iframe>
      <div class="map-frame-caption">
        <span id="mapCaptionText">${escapeHtml(targets[0].caption)}</span>
        <a class="text-button" href="https://www.google.com/maps/dir/Taiwan+Taoyuan+International+Airport/Seattle-Tacoma+International+Airport/Charlotte+Douglas+International+Airport/Denver+International+Airport/Los+Angeles+International+Airport/Taiwan+Taoyuan+International+Airport" target="_blank" rel="noreferrer">開啟完整地圖</a>
      </div>
    `;
  }

  function renderAirports() {
    $("#airportGrid").innerHTML = Object.values(airports).map((airport) => `
      <article class="airport-card">
        <h3>${escapeHtml(airport.code)} · ${escapeHtml(airport.cityZh)} / ${escapeHtml(airport.cityEn)}</h3>
        <p class="card-muted">${escapeHtml(airport.airportZh)}<br>${escapeHtml(airport.airportEn)}</p>
        <dl>
          <dt>時區</dt><dd>${escapeHtml(airport.timezone)}</dd>
          <dt>座標</dt><dd>${escapeHtml(airport.lat)}, ${escapeHtml(airport.lon)}</dd>
          <dt>航廈</dt><dd>${escapeHtml(airport.terminalHint)}</dd>
        </dl>
        <div class="location-actions">
          <a class="ghost-button" href="${mapSearchUrl(airport.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">⌖</span>地圖</a>
          <a class="ghost-button" href="${mapDirectionsUrl(airport.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>導航</a>
          <a class="ghost-button" href="${airport.weatherUrl}" target="_blank" rel="noreferrer"><span aria-hidden="true">◷</span>天氣</a>
        </div>
      </article>
    `).join("");
  }

  function renderClimate() {
    $("#climateGrid").innerHTML = data.climate.map((item) => {
      const airport = airports[item.code];
      return `
        <article class="climate-card">
          <div>
            <h3>${escapeHtml(airport.cityZh)} / ${escapeHtml(airport.cityEn)}</h3>
            <span class="card-muted">${escapeHtml(item.dateRange)}</span>
          </div>
          <span class="temp">${escapeHtml(item.temp)}</span>
          <p>${escapeHtml(item.summary)}</p>
          <div class="tag-row">
            <span class="tag">${escapeHtml(item.pack)}</span>
          </div>
          <a class="ghost-button" href="${airport.weatherUrl}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>查看即時預報</a>
        </article>
      `;
    }).join("");
  }

  function renderStays() {
    const stays = data.stays || [];
    const stayCards = stays.map((stay) => `
      <article class="stay-card">
        <span class="stay-type">${escapeHtml(stay.type)} · ${escapeHtml(stay.dateRange)}</span>
        <h3>${escapeHtml(stay.title)}</h3>
        <dl class="stay-detail-list">
          <div><dt>入住</dt><dd>${escapeHtml(stay.checkIn)}</dd></div>
          <div><dt>退房</dt><dd>${escapeHtml(stay.checkOut)}</dd></div>
          <div><dt>地址</dt><dd>${escapeHtml(stay.address)}</dd></div>
          <div><dt>重點</dt><dd>${escapeHtml(stay.purpose)}</dd></div>
        </dl>
        <div class="card-actions">
          <button class="ghost-button" type="button" data-focus-map-query="${escapeHtml(stay.mapQuery)}" data-focus-map-label="${escapeHtml(stay.title)}"><span aria-hidden="true">⌖</span>小地圖</button>
          <a class="ghost-button" href="${mapSearchUrl(stay.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>住宿地圖</a>
          <a class="ghost-button" href="${mapSearchUrl(stay.nearbyQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>${escapeHtml(stay.nearbyName)}</a>
        </div>
      </article>
    `);
    const rentalCards = (data.rentals || []).map((rental) => `
      <article class="stay-card rental-card">
        <span class="stay-type">${escapeHtml(rental.type)} · ${escapeHtml(rental.provider)}</span>
        <h3>${escapeHtml(rental.title)}</h3>
        <dl class="stay-detail-list">
          <div><dt>取車</dt><dd>${escapeHtml(rental.pickup)} · ${escapeHtml(rental.pickupLocation)}</dd></div>
          <div><dt>還車</dt><dd>${escapeHtml(rental.dropoff)} · ${escapeHtml(rental.dropoffLocation)}</dd></div>
          <div><dt>地址</dt><dd>${escapeHtml(rental.address)}</dd></div>
          <div><dt>電話</dt><dd><a href="tel:${escapeHtml(rental.phone)}">${escapeHtml(rental.phone)}</a></dd></div>
          <div><dt>方式</dt><dd>${escapeHtml(rental.shuttle)}</dd></div>
          <div><dt>備註</dt><dd>${escapeHtml(rental.note)}</dd></div>
        </dl>
        <div class="card-actions">
          <button class="ghost-button" type="button" data-focus-map-query="${escapeHtml(rental.mapQuery)}" data-focus-map-label="${escapeHtml(rental.title)}"><span aria-hidden="true">⌖</span>小地圖</button>
          <a class="ghost-button" href="${mapSearchUrl(rental.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>租車地圖</a>
          <a class="ghost-button" href="tel:${escapeHtml(rental.phone)}"><span aria-hidden="true">☎</span>打電話</a>
        </div>
      </article>
    `);
    $("#stayGrid").innerHTML = [...stayCards, ...rentalCards].join("");
  }

  function renderCityOptions() {
    const select = $("#citySelect");
    select.innerHTML = Object.values(airports).map((airport) => (
      `<option value="${escapeHtml(airport.code)}">${escapeHtml(airport.code)} · ${escapeHtml(airport.cityZh)}</option>`
    )).join("");
  }

  function renderFilters() {
    const types = ["全部", ...new Set(allItems().map((item) => item.type))];
    $("#filterTabs").innerHTML = types.map((type) => `
      <button type="button" data-filter="${escapeHtml(type)}" aria-pressed="${type === activeFilter ? "true" : "false"}">${escapeHtml(type)}</button>
    `).join("");
  }

  function renderItinerary() {
    const filtered = allItems().filter((item) => activeFilter === "全部" || item.type === activeFilter);
    if (!filtered.length) {
      $("#itineraryList").innerHTML = `<div class="empty-state">目前沒有符合篩選的行程。</div>`;
      return;
    }
    $("#itineraryList").innerHTML = filtered.map((item) => {
      const airport = airports[item.city] || airports.TPE;
      const mapUrl = safeMapUrl(item.mapUrl, item.city, item.title);
      const deleteButton = item.locked ? "" : `<button class="icon-button" type="button" data-delete-item="${escapeHtml(item.id)}" aria-label="刪除 ${escapeHtml(item.title)}">×</button>`;
      const timeText = item.time ? `${item.time}` : "時間未定";
      return `
        <article class="itinerary-card">
          <div class="date-pill">
            ${escapeHtml(formatDateLabel(item.date))}
            <span>${escapeHtml(timeText)}</span>
          </div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <div class="card-muted">${escapeHtml(airport.cityZh)} / ${escapeHtml(airport.cityEn)}</div>
            <p class="card-muted">${escapeHtml(item.notes || "待補細節")}</p>
            <div class="tag-row">
              <span class="tag ${typeClass(item.type)}">${escapeHtml(item.type)}</span>
              ${item.locked ? `<span class="tag">截圖資料</span>` : `<span class="tag">自加</span>`}
            </div>
          </div>
          <div class="card-actions">
            <button class="ghost-button" type="button" data-focus-map-item="${escapeHtml(item.id)}"><span aria-hidden="true">⌖</span>小地圖</button>
            <a class="ghost-button" href="${mapUrl}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>地圖</a>
            ${deleteButton}
          </div>
        </article>
      `;
    }).join("");
  }

  function renderPending() {
    $("#pendingGrid").innerHTML = data.pendingSlots.map((slot) => {
      const airport = airports[slot.city];
      return `
        <article class="pending-card">
          <div>
            <h3>${escapeHtml(slot.title)}</h3>
            <div class="slot-meta">${escapeHtml(airport.cityZh)} · ${escapeHtml(slot.dateRange)}</div>
          </div>
          <p class="card-muted">${escapeHtml(slot.detail)}</p>
          <div class="tag-row">
            <span class="tag ${typeClass(slot.type)}">${escapeHtml(slot.type)}</span>
            <span class="tag">${escapeHtml(slot.city)}</span>
          </div>
          <div class="card-actions">
            <button class="ghost-button" type="button" data-prefill-slot="${escapeHtml(slot.id)}"><span aria-hidden="true">＋</span>套入表單</button>
            <a class="ghost-button" href="${mapSearchUrl(airport.cityEn)}" target="_blank" rel="noreferrer"><span aria-hidden="true">⌖</span>城市地圖</a>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderChecklist() {
    $("#checklistBox").innerHTML = data.checklist.map((item) => {
      const checked = Boolean(checkedItems[item.id]);
      return `
        <label class="check-item ${checked ? "is-done" : ""}">
          <input type="checkbox" data-check-id="${escapeHtml(item.id)}" ${checked ? "checked" : ""}>
          <span>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.note)}</span>
          </span>
        </label>
      `;
    }).join("");
  }

  function rerenderPlanner() {
    renderFilters();
    renderItinerary();
  }

  function prefillEntry(slotId) {
    const slot = data.pendingSlots.find((item) => item.id === slotId);
    if (!slot) return;
    const form = $("#entryForm");
    form.elements.type.value = slot.type;
    form.elements.title.value = slot.title;
    form.elements.date.value = slot.date || "";
    form.elements.time.value = "";
    form.elements.city.value = slot.city;
    form.elements.mapUrl.value = "";
    form.elements.notes.value = slot.detail;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    form.elements.title.focus();
  }

  function addCustomItem(form) {
    const formData = new FormData(form);
    const item = {
      id: `custom-${Date.now()}`,
      type: String(formData.get("type") || "其他"),
      title: String(formData.get("title") || "").trim(),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      city: String(formData.get("city") || "TPE"),
      mapUrl: String(formData.get("mapUrl") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      locked: false
    };
    if (!item.title) return;
    customItems.push(item);
    saveJson(STORAGE_KEY, customItems);
    activeFilter = "全部";
    form.reset();
    form.elements.city.value = item.city;
    rerenderPlanner();
    showToast("已加入行程。");
  }

  function deleteCustomItem(id) {
    customItems = customItems.filter((item) => item.id !== id);
    saveJson(STORAGE_KEY, customItems);
    rerenderPlanner();
    showToast("已刪除。");
  }

  function exportData() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      customItems,
      checkedItems
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "2026-us-trip-data.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result || "{}"));
        customItems = Array.isArray(payload.customItems) ? payload.customItems : [];
        checkedItems = payload.checkedItems && typeof payload.checkedItems === "object" ? payload.checkedItems : {};
        saveJson(STORAGE_KEY, customItems);
        saveJson(CHECK_KEY, checkedItems);
        rerenderPlanner();
        renderChecklist();
        showToast("已匯入資料。");
      } catch (_error) {
        showToast("匯入失敗，請確認是此網站匯出的 JSON。");
      }
    };
    reader.readAsText(file);
  }

  function copyFlightSummary(flightId) {
    const flight = data.flights.find((item) => item.id === flightId);
    if (!flight) return;
    const from = airports[flight.from];
    const to = airports[flight.to];
    const summary = [
      `${flight.id} ${flight.from}-${flight.to}`,
      `${from.airportZh} ${formatInZone(flight.departIso, from.timezone)} ${zoneAbbr(flight.departIso, from.timezone)}`,
      `${to.airportZh} ${formatInZone(flight.arriveIso, to.timezone)} ${zoneAbbr(flight.arriveIso, to.timezone)}`,
      `台灣時間：${formatInZone(flight.departIso, HOME_TZ)} 出發 / ${formatInZone(flight.arriveIso, HOME_TZ)} 抵達`,
      flight.confirmation ? `確認碼：${flight.confirmation}` : "",
      flight.seat ? `座位：${flight.seat}` : ""
    ].filter(Boolean).join("\n");

    navigator.clipboard?.writeText(summary)
      .then(() => showToast("已複製航班摘要。"))
      .catch(() => showToast("瀏覽器未允許複製，可手動選取航班資訊。"));
  }

  function escapeIcs(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  }

  function toIcsDate(iso) {
    return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function downloadFlightsIcs() {
    const events = data.flights.map((flight) => {
      const from = airports[flight.from];
      const to = airports[flight.to];
      const uid = `${flight.id}-${flight.departIso}@codex-trip`;
      const description = [
        flight.note,
        `台灣時間：${formatInZone(flight.departIso, HOME_TZ)} 出發 / ${formatInZone(flight.arriveIso, HOME_TZ)} 抵達`,
        flight.confirmation ? `確認碼：${flight.confirmation}` : "",
        flight.seat ? `座位：${flight.seat}` : ""
      ].filter(Boolean).join("\\n");
      return [
        "BEGIN:VEVENT",
        `UID:${escapeIcs(uid)}`,
        `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
        `DTSTART:${toIcsDate(flight.departIso)}`,
        `DTEND:${toIcsDate(flight.arriveIso)}`,
        `SUMMARY:${escapeIcs(`${flight.id} ${flight.from}-${flight.to}`)}`,
        `LOCATION:${escapeIcs(`${from.airportEn} to ${to.airportEn}`)}`,
        `DESCRIPTION:${escapeIcs(description)}`,
        "END:VEVENT"
      ].join("\r\n");
    }).join("\r\n");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Codex Trip Dashboard//2026 US Trip//ZH-TW",
      "CALSCALE:GREGORIAN",
      events,
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "2026-us-trip-flights.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function bindEvents() {
    $("#entryForm").addEventListener("submit", (event) => {
      event.preventDefault();
      addCustomItem(event.currentTarget);
    });

    $("#filterTabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      rerenderPlanner();
    });

    $("#mapToolbar").addEventListener("click", (event) => {
      const button = event.target.closest("[data-map-target]");
      if (!button) return;
      setEmbeddedMap(button.dataset.mapTarget);
    });

    $("#itineraryList").addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-delete-item]");
      if (deleteButton) {
        deleteCustomItem(deleteButton.dataset.deleteItem);
        return;
      }
      const focusMapButton = event.target.closest("[data-focus-map-item]");
      if (!focusMapButton) return;
      const item = allItems().find((entry) => entry.id === focusMapButton.dataset.focusMapItem);
      if (!item) return;
      setEmbeddedMap(itemMapQuery(item), item.title, 14);
      document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    $("#pendingGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-prefill-slot]");
      if (button) prefillEntry(button.dataset.prefillSlot);
    });

    $("#stayGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-focus-map-query]");
      if (!button) return;
      setEmbeddedMap(button.dataset.focusMapQuery, button.dataset.focusMapLabel, 14);
      document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    $("#checklistBox").addEventListener("change", (event) => {
      const input = event.target.closest("[data-check-id]");
      if (!input) return;
      checkedItems[input.dataset.checkId] = input.checked;
      saveJson(CHECK_KEY, checkedItems);
      renderChecklist();
    });

    $("#flightList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-copy-flight]");
      if (button) copyFlightSummary(button.dataset.copyFlight);
    });

    $("#exportBtn").addEventListener("click", exportData);
    $("#downloadIcsBtn").addEventListener("click", downloadFlightsIcs);

    $("#importInput").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) importData(file);
      event.target.value = "";
    });

    $("#resetItemsBtn").addEventListener("click", () => {
      if (!customItems.length) {
        showToast("目前沒有自加資料。");
        return;
      }
      if (window.confirm("確定清除自行新增的行程資料？")) {
        customItems = [];
        saveJson(STORAGE_KEY, customItems);
        rerenderPlanner();
        showToast("自加資料已清除。");
      }
    });
  }

  function init() {
    renderTripStatus();
    renderClocks();
    window.setInterval(() => {
      renderTripStatus();
      renderClocks();
    }, 60000);
    renderFlights();
    renderRouteMap();
    renderAirports();
    renderClimate();
    renderStays();
    renderCityOptions();
    rerenderPlanner();
    renderPending();
    renderChecklist();
    bindEvents();
  }

  init();
})();
