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
      hourCycle: "h23"
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
    const formatter = new Intl.DateTimeFormat("zh-TW", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    });
    const parts = formatter.formatToParts(sourceDate);
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
    const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
    const safeHour = hour === 24 ? 0 : hour;
    const time = `${String(safeHour).padStart(2, "0")}:${minute}`;
    const day = new Intl.DateTimeFormat("zh-TW", {
      timeZone,
      month: "numeric",
      day: "numeric",
      weekday: "short"
    }).format(sourceDate);
    const period = dayPeriod(safeHour);
    return { time, period, displayTime: `${period} ${time}`, date: day };
  }

  function dayPeriod(hour) {
    if (hour < 5) return "凌晨";
    if (hour < 11) return "早上";
    if (hour < 13) return "中午";
    if (hour < 18) return "下午";
    if (hour < 23) return "晚上";
    return "深夜";
  }

  function formatDateTimeWithPeriod(iso, timeZone) {
    const date = new Date(iso);
    const clock = formatClock(timeZone, date);
    return {
      ...clock,
      full: `${clock.date} ${clock.displayTime}`
    };
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

  function mapRouteDirectionsUrl(origin, destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
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

  function googleMapDirectionsEmbedUrl(origin, destination) {
    return googleMapEmbedUrl({
      f: "d",
      saddr: origin,
      daddr: destination
    });
  }

  function googleMapRouteEmbedUrl(points = data.route.map((code) => airports[code].mapQuery)) {
    const routePoints = points;
    const destination = routePoints.slice(1).join(" to: ");
    return googleMapEmbedUrl({
      f: "d",
      saddr: routePoints[0],
      daddr: destination
    });
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

  function stageClockInfo(stage) {
    const byStage = {
      "flight-tpe-sea": { displayCode: "SEA", highlightCode: "SEA", label: "目的地：西雅圖 SEA 時間", badge: "飛行目的地" },
      "transfer-sea": { displayCode: "SEA", highlightCode: "SEA", label: "西雅圖 SEA 當地時間", badge: "目前所在地" },
      "flight-sea-clt": { displayCode: "CLT", highlightCode: "CLT", label: "目的地：夏洛特 CLT 時間", badge: "飛行目的地" },
      "charlotte-stay": { displayCode: "CLT", highlightCode: "CLT", label: "夏洛特 CLT 當地時間", badge: "目前所在地" },
      "flight-clt-den": { displayCode: "DEN", highlightCode: "DEN", label: "目的地：丹佛 DEN 時間", badge: "飛行目的地" },
      "den-to-laramie": { displayCode: "DEN", highlightCode: "DEN", label: "丹佛 / Laramie 當地時間", badge: "目前所在地" },
      "laramie-airbnb": { displayCode: "DEN", highlightCode: "DEN", label: "Laramie / 丹佛時區當地時間", badge: "目前所在地" },
      "laramie-to-denver-hotel": { displayCode: "DEN", highlightCode: "DEN", label: "Laramie 到丹佛當地時間", badge: "目前所在地" },
      "denver-airport-hotel": { displayCode: "DEN", highlightCode: "DEN", label: "丹佛 DEN 當地時間", badge: "目前所在地" },
      "flight-den-lax": { displayCode: "LAX", highlightCode: "LAX", label: "目的地：洛杉磯 LAX 時間", badge: "飛行目的地" },
      "transfer-lax": { displayCode: "LAX", highlightCode: "LAX", label: "洛杉磯 LAX 當地時間", badge: "目前所在地" },
      "flight-lax-tpe": { displayCode: "TPE", highlightCode: "", label: "目的地：台北 / 桃園 TPE 時間", badge: "" }
    };
    return byStage[stage?.id] || { displayCode: "TPE", highlightCode: "", label: `${stage?.locationLabel || "台灣"} 當地時間`, badge: "" };
  }

  function renderClocks() {
    const codes = ["TPE", "SEA", "CLT", "DEN", "LAX"];
    const stage = currentJourneyStage();
    const clockInfo = stageClockInfo(stage);
    $("#clockGrid").innerHTML = codes.map((code) => {
      const airport = airports[code];
      const clock = formatClock(airport.timezone);
      const isActive = code === clockInfo.highlightCode && code !== "TPE";
      return `
        <div class="clock-card ${isActive ? "is-active" : ""}">
          ${isActive ? `<span class="clock-focus-label">${escapeHtml(clockInfo.badge)}</span>` : ""}
          <strong>${escapeHtml(clock.displayTime)}</strong>
          <span>${escapeHtml(code)} · ${escapeHtml(airport.cityZh)} / ${escapeHtml(airport.airportZh)}</span>
          <span>${escapeHtml(clock.date)}</span>
        </div>
      `;
    }).join("");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function stageIdSet(stageIdList = []) {
    return new Set(stageIdList);
  }

  function activeTimelineTarget(stage) {
    const stageId = stage?.id;
    const timeline = data.journeyTimeline || { nodes: [], links: [] };
    const activeLink = timeline.links.find((link) => stageIdSet(link.activeStages).has(stageId));
    const activeNode = timeline.nodes.find((node) => stageIdSet(node.activeStages).has(stageId));
    return { linkId: activeLink?.id || "", nodeId: activeNode?.id || "" };
  }

  function renderJourneyTimeline(stage) {
    const timeline = data.journeyTimeline;
    if (!timeline?.nodes?.length) return;
    const active = activeTimelineTarget(stage);
    const nodeById = new Map(timeline.nodes.map((node) => [node.id, node]));
    const parts = [];

    timeline.nodes.forEach((node, index) => {
      const isActiveNode = node.id === active.nodeId;
      parts.push(`
        <div class="timeline-node ${isActiveNode ? "is-active" : ""}">
          <span class="timeline-dot" aria-hidden="true"></span>
          <strong>${escapeHtml(node.label)}</strong>
          <small>${escapeHtml(node.date)} · ${escapeHtml(node.detail)}</small>
        </div>
      `);

      const nextNode = timeline.nodes[index + 1];
      const link = nextNode ? timeline.links.find((item) => item.from === node.id && item.to === nextNode.id) : null;
      if (link && nodeById.has(link.to)) {
        const isActiveLink = link.id === active.linkId;
        parts.push(`
          <div class="timeline-link ${isActiveLink ? "is-active" : ""}" style="--link-weight: ${Number(link.weight || 1)}">
            <span></span>
            <strong>${escapeHtml(link.label)}</strong>
            <small>${escapeHtml(link.duration)}</small>
          </div>
        `);
      }
    });

    $("#journeyTimeline").innerHTML = parts.join("");
  }

  function renderDurationStrip() {
    const items = data.durationSummary || [];
    $("#durationStrip").innerHTML = items.map((item) => `
      <article>
        <span>${escapeHtml(item.dates)}</span>
        <strong>${escapeHtml(item.label)} · ${escapeHtml(item.duration)}</strong>
        <small>${escapeHtml(item.note)}</small>
      </article>
    `).join("");
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
    const clockInfo = stageClockInfo(stage);
    const displayAirport = airports[clockInfo.displayCode];
    const displayTimeZone = displayAirport?.timezone || stage.timezone;
    const localClock = formatClock(displayTimeZone, now);
    const taiwanClock = formatClock(HOME_TZ, now);

    $("#currentStageTitle").textContent = stage.title;
    $("#currentStageSubtitle").textContent = stage.subtitle;
    $("#currentLocalLabel").textContent = clockInfo.label;
    $("#currentLocalTime").textContent = localClock.displayTime;
    $("#currentLocalDate").textContent = localClock.date;
    $("#currentTaiwanTime").textContent = taiwanClock.displayTime;
    $("#currentTaiwanDate").textContent = taiwanClock.date;
    $("#currentNextStep").textContent = stage.nextLabel;
    renderJourneyTimeline(stage);
    renderDurationStrip();
    const stageMap = $("#currentStageMap");
    stageMap.href = mapSearchUrl(stage.mapQuery || stage.locationLabel);
  }

  function renderFlights() {
    $("#flightList").innerHTML = data.flights.map((flight) => {
      const from = airports[flight.from];
      const to = airports[flight.to];
      const departLocal = formatDateTimeWithPeriod(flight.departIso, from.timezone);
      const arriveLocal = formatDateTimeWithPeriod(flight.arriveIso, to.timezone);
      const departTw = formatDateTimeWithPeriod(flight.departIso, HOME_TZ);
      const arriveTw = formatDateTimeWithPeriod(flight.arriveIso, HOME_TZ);
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
              <strong>${escapeHtml(departLocal.displayTime)}</strong>
              <span class="code">${escapeHtml(flight.from)} ${escapeHtml(from.cityZh)}</span>
              <span class="airport-name">${escapeHtml(from.airportZh)}</span>
              <span class="airport-name">${escapeHtml(from.airportEn)}</span>
              <span class="airport-name">${escapeHtml(departLocal.full)} ${escapeHtml(zoneAbbr(flight.departIso, from.timezone))}</span>
            </div>
            <div class="flight-arrow" aria-hidden="true">→</div>
            <div class="time-block">
              <strong>${escapeHtml(arriveLocal.displayTime)}</strong>
              <span class="code">${escapeHtml(flight.to)} ${escapeHtml(to.cityZh)}</span>
              <span class="airport-name">${escapeHtml(to.airportZh)}</span>
              <span class="airport-name">${escapeHtml(to.airportEn)}</span>
              <span class="airport-name">${escapeHtml(arriveLocal.full)} ${escapeHtml(zoneAbbr(flight.arriveIso, to.timezone))}</span>
            </div>
          </div>
          <div class="taiwan-time">
            台灣時間：${escapeHtml(departTw.full)} 出發 · ${escapeHtml(arriveTw.full)} 抵達
          </div>
          <div class="flight-meta">${escapeHtml(detailBits)}</div>
          <div class="tag-row">${confirmation}${seat}<span class="tag">${escapeHtml(flight.fromDetail)}</span><span class="tag">${escapeHtml(flight.toDetail)}</span></div>
          <p class="card-muted">${escapeHtml(flight.note)}</p>
          <div class="flight-actions">
            <a class="ghost-button" href="${mapSearchUrl(from.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">⌖</span>${escapeHtml(from.cityZh)}地圖</a>
            <a class="ghost-button" href="${mapDirectionsUrl(to.mapQuery)}" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>導航到${escapeHtml(to.cityZh)}</a>
            <button class="icon-button" type="button" data-copy-flight="${escapeHtml(flight.id)}" aria-label="複製 ${escapeHtml(flight.id)} 摘要">⧉</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function distanceKm(a, b) {
    const radius = 6371;
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * radius * Math.asin(Math.sqrt(h));
  }

  function distanceLabel(points) {
    const valid = points.filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lon));
    if (valid.length < 2) return "";
    const km = valid.slice(1).reduce((sum, point, index) => sum + distanceKm(valid[index], point), 0);
    const miles = km * 0.621371;
    return `直線距離約 ${km.toLocaleString("zh-TW", { maximumFractionDigits: 0 })} km / ${miles.toLocaleString("en-US", { maximumFractionDigits: 0 })} mi`;
  }

  function normalizePreviewPoints(points) {
    const valid = points.filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lon));
    if (!valid.length) return [];
    const rawLons = valid.map((point) => point.lon);
    const rawRange = Math.max(...rawLons) - Math.min(...rawLons);
    const adjusted = valid.map((point) => ({
      ...point,
      previewLon: rawRange > 180 && point.lon < 0 ? point.lon + 360 : point.lon
    }));
    const lats = adjusted.map((point) => point.lat);
    const lons = adjusted.map((point) => point.previewLon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const latRange = Math.max(maxLat - minLat, 0.01);
    const lonRange = Math.max(maxLon - minLon, 0.01);
    const padding = valid.length === 1 ? 0 : 12;
    const span = 100 - padding * 2;
    return adjusted.map((point) => ({
      ...point,
      x: valid.length === 1 ? 50 : padding + ((point.previewLon - minLon) / lonRange) * span,
      y: valid.length === 1 ? 50 : padding + ((maxLat - point.lat) / latRange) * span
    }));
  }

  function routePreviewHtml(target) {
    const points = normalizePreviewPoints(target.points || []);
    if (!points.length) {
      return `
        <div class="route-preview route-preview-empty">
          <strong>${escapeHtml(target.label || "自訂地標")}</strong>
          <span>下方 Google Maps 顯示目前選取的地點。</span>
        </div>
      `;
    }

    const polyline = points.length > 1
      ? `<polyline points="${points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ")}"></polyline>`
      : "";
    const pins = points.map((point, index) => `
      <span class="map-pin" style="left: ${point.x.toFixed(2)}%; top: ${point.y.toFixed(2)}%;">
        <i>${index + 1}</i>
        <b>${escapeHtml(point.label)}</b>
      </span>
    `).join("");

    return `
      <div class="route-preview">
        <div class="route-preview-meta">
          <strong>${escapeHtml(target.label)}</strong>
          <span>${escapeHtml(distanceLabel(target.points || []) || target.caption || "")}</span>
        </div>
        <svg class="route-preview-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${polyline}</svg>
        ${pins}
      </div>
    `;
  }

  function fullRouteUrl(points) {
    return `https://www.google.com/maps/dir/${points.map((point) => encodeURIComponent(point.query)).join("/")}`;
  }

  function mapTargets() {
    return (data.mapSegments || []).map((segment) => {
      const points = segment.points || [];
      const queries = points.map((point) => point.query).filter(Boolean);
      const hasRoute = queries.length > 1;
      return {
        ...segment,
        caption: segment.caption || "目前選取的路線段。",
        src: hasRoute ? googleMapRouteEmbedUrl(queries) : googleMapPlaceEmbedUrl(queries[0] || segment.label, 13),
        actionUrl: hasRoute ? fullRouteUrl(points) : mapSearchUrl(queries[0] || segment.label),
        actionLabel: segment.actionLabel || (hasRoute ? "開 Google Maps 導航" : "開 Google Maps")
      };
    });
  }

  function renderMapTarget(target) {
    $("#routeMap").innerHTML = `
      ${routePreviewHtml(target)}
      <iframe id="googleMapFrame" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="${escapeHtml(target.src)}" title="Google Maps - ${escapeHtml(target.label)}"></iframe>
      <div class="map-frame-caption">
        <span id="mapCaptionText">${escapeHtml(target.caption)}</span>
        <a class="text-button" href="${escapeHtml(target.actionUrl)}" target="_blank" rel="noreferrer">${escapeHtml(target.actionLabel)}</a>
      </div>
    `;
  }

  function setEmbeddedMap(targetIdOrQuery, label = "", zoom = 13) {
    const targets = mapTargets();
    const target = targets.find((item) => item.id === targetIdOrQuery) || {
      id: "",
      label: label || targetIdOrQuery,
      caption: label ? `目前顯示：${label}` : "目前顯示自訂地標",
      points: [],
      src: googleMapPlaceEmbedUrl(targetIdOrQuery, zoom),
      actionUrl: mapSearchUrl(targetIdOrQuery),
      actionLabel: "開 Google Maps"
    };
    renderMapTarget(target);
    document.querySelectorAll("[data-map-target]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mapTarget === target.id));
    });
  }

  function renderRouteMap() {
    const targets = mapTargets();
    $("#mapToolbar").innerHTML = targets.map((target, index) => `
      <button type="button" data-map-target="${escapeHtml(target.id)}" aria-pressed="${index === 0 ? "true" : "false"}">${escapeHtml(target.label)}</button>
    `).join("");
    if (targets[0]) renderMapTarget(targets[0]);
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
        ${stay.image ? `<img class="stay-photo" src="${escapeHtml(stay.image)}" alt="${escapeHtml(stay.title)} 外觀或住宿照片" loading="lazy">` : ""}
        <span class="stay-type">${escapeHtml(stay.type)} · ${escapeHtml(stay.dateRange)}</span>
        <h3>${escapeHtml(stay.title)}</h3>
        <dl class="stay-detail-list">
          <div><dt>停留</dt><dd>${escapeHtml(stay.durationLabel || stay.dateRange)}</dd></div>
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
            <span class="tag">${escapeHtml(`${airport.cityZh} ${slot.city}`)}</span>
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
    const departLocal = formatDateTimeWithPeriod(flight.departIso, from.timezone);
    const arriveLocal = formatDateTimeWithPeriod(flight.arriveIso, to.timezone);
    const departTw = formatDateTimeWithPeriod(flight.departIso, HOME_TZ);
    const arriveTw = formatDateTimeWithPeriod(flight.arriveIso, HOME_TZ);
    const summary = [
      `${flight.id} ${flight.from}-${flight.to}`,
      `${from.cityZh} ${from.airportZh} ${departLocal.full} ${zoneAbbr(flight.departIso, from.timezone)}`,
      `${to.cityZh} ${to.airportZh} ${arriveLocal.full} ${zoneAbbr(flight.arriveIso, to.timezone)}`,
      `台灣時間：${departTw.full} 出發 / ${arriveTw.full} 抵達`,
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
      const departTw = formatDateTimeWithPeriod(flight.departIso, HOME_TZ);
      const arriveTw = formatDateTimeWithPeriod(flight.arriveIso, HOME_TZ);
      const description = [
        flight.note,
        `台灣時間：${departTw.full} 出發 / ${arriveTw.full} 抵達`,
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
