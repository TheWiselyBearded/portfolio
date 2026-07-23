/* Renders cards, filter pills, and the shared project dialog from PROJECTS (js/projects.js). */

const ICONS = {
  code: "fas fa-code",
  paper: "fas fa-file-alt",
  video: "fas fa-play-circle",
  news: "far fa-newspaper",
  site: "fas fa-globe",
};

const LINK_LABELS = {
  code: "Code",
  paper: "Paper",
  video: "Video",
  news: "News",
  site: "Site",
};

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const dialog = document.getElementById("project-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogMeta = document.getElementById("dialog-meta");
const dialogBody = document.getElementById("dialog-body");

/* year · org (cards) or year · org · role (dialog) */
function metaLine(p, withRole) {
  const parts = [p.year];
  if (p.org) parts.push(p.org);
  if (withRole && p.role) parts.push(p.role);
  return parts.join(" · ");
}

/* Small icon-only links for cards. */
function linkIcons(links) {
  return (links || [])
    .map(
      (l) =>
        `<a class="icon-btn" href="${l.url}" target="_blank" rel="noopener" title="${l.label || LINK_LABELS[l.type] || l.type}">
          <i class="${ICONS[l.type]}"></i>
        </a>`
    )
    .join("");
}

/* Labeled pill links for the dialog. */
function linkPills(links) {
  return (links || [])
    .map(
      (l) =>
        `<a class="pill" href="${l.url}" target="_blank" rel="noopener">
          <i class="${ICONS[l.type]}"></i><span>${l.label || LINK_LABELS[l.type] || l.type}</span>
        </a>`
    )
    .join("");
}

function thumb(p) {
  if (!p.thumb) {
    return `<div class="card-thumb placeholder"><i class="${p.icon || "fas fa-cube"}"></i></div>`;
  }
  return `<img class="card-thumb" src="${p.thumb}" alt="${p.title}" loading="lazy">`;
}

function renderCards(filter) {
  const visible = PROJECTS.filter((p) =>
    filter === "selected" ? p.selected : p.year === filter
  );
  grid.innerHTML = visible
    .map(
      (p) => `
      <article class="card" data-open="${p.id}" role="button" tabindex="0" aria-label="${p.title} — view details">
        ${thumb(p)}
        <div class="card-body">
          <div class="card-meta">${metaLine(p, false)}</div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-text">${p.blurb}</p>
          <div class="card-links">${linkIcons(p.links)}</div>
        </div>
      </article>`
    )
    .join("");
}

function renderFilters() {
  const years = [...new Set(PROJECTS.map((p) => p.year))].sort((a, b) => b - a);
  filters.innerHTML =
    `<button data-filter="selected" class="active">Selected Works</button>` +
    years.map((y) => `<button data-filter="${y}">${y}</button>`).join("");
}

function figure(inner, caption) {
  return `<figure class="fig">${inner}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
}

function renderList(item) {
  const title = item.title ? `<p class="list-title">${item.title}</p>` : "";
  const lis = (item.list || []).map((li) => `<li>${li}</li>`).join("");
  return `${title}<ul class="body-list">${lis}</ul>`;
}

function renderBody(p) {
  let firstPara = true;
  return (p.body || [])
    .map((item) => {
      if (typeof item === "string") {
        const cls = firstPara ? ' class="lede"' : "";
        firstPara = false;
        return `<p${cls}>${item}</p>`;
      }
      if (item.img)
        return figure(
          `<img class="inline${item.frame ? " framed" : ""}" src="${item.img}" alt="${item.alt || p.title}" loading="lazy">`,
          item.caption
        );
      if (item.video)
        return figure(
          `<video class="inline" src="${item.video}"${item.poster ? ` poster="${item.poster}"` : ""} controls muted playsinline preload="metadata"></video>`,
          item.caption
        );
      if (item.list) return renderList(item);
      return "";
    })
    .join("");
}

function mediaMarkup(p) {
  if (!p.media) return "";
  if (p.media.type === "youtube") {
    /* Click-to-play facade: a poster + play button that swaps in the iframe on
       demand. Avoids the "Error 153 / player configuration" failures the bare
       embed hits over file:// and strict-referrer contexts, and defers the
       heavy player until the user actually wants it. */
    const id = p.media.src;
    const poster = p.media.poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    return `<div class="dialog-media yt-facade" data-yt="${id}" role="button" tabindex="0" aria-label="Play video: ${p.title}">
      <img class="yt-poster" src="${poster}" alt="${p.title} video thumbnail" loading="lazy"
           onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/hqdefault.jpg'">
      <span class="yt-play" aria-hidden="true"></span>
    </div>`;
  }
  if (p.media.type === "video")
    return `<video class="dialog-media" src="${p.media.src}"${p.media.poster ? ` poster="${p.media.poster}"` : ""} controls autoplay muted loop playsinline></video>`;
  return `<img class="dialog-media" src="${p.media.src}" alt="${p.title}">`;
}

function openProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  dialogTitle.textContent = p.title;
  dialogMeta.textContent = metaLine(p, true);

  dialogBody.innerHTML = `
    ${mediaMarkup(p)}
    ${p.links && p.links.length ? `<div class="dialog-links">${linkPills(p.links)}</div>` : ""}
    ${renderBody(p)}`;

  dialog.showModal();
  dialogBody.scrollTop = 0;
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

function closeDialog() {
  dialog.close();
}

filters.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  filters.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  renderCards(f === "selected" ? "selected" : Number(f));
});

/* Whole card opens the dialog; external links inside still navigate. */
grid.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  const el = e.target.closest("[data-open]");
  if (el) openProject(el.dataset.open);
});

grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest("[data-open]");
  if (!el) return;
  e.preventDefault();
  openProject(el.dataset.open);
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) return closeDialog(); // backdrop click
  const facade = e.target.closest(".yt-facade");
  if (facade) playFacade(facade);
});

dialog.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const facade = e.target.closest(".yt-facade");
  if (!facade) return;
  e.preventDefault();
  playFacade(facade);
});

/* Swap a YouTube facade for the real (privacy-friendly, autoplaying) player. */
function playFacade(facade) {
  const id = facade.dataset.yt;
  const iframe = document.createElement("iframe");
  iframe.className = "dialog-media";
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  iframe.title = "YouTube video player";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  facade.replaceWith(iframe);
}

/* Clearing the body stops any playing YouTube embed; drop the deep-link hash. */
dialog.addEventListener("close", () => {
  dialogBody.innerHTML = "";
  if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
});

document.getElementById("dialog-close").addEventListener("click", closeDialog);

renderFilters();
renderCards("selected");

/* Deep link: #<project-id> opens that project on load. */
if (location.hash.length > 1) openProject(location.hash.slice(1));
