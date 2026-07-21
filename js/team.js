const teamHeader = document.querySelector(".team-header");
const teamMenuButton = document.querySelector(".team-menu-button");
const teamMobileMenu = document.querySelector(".team-mobile-menu");
const teamMenuOverlay = document.querySelector(".team-menu-overlay");
const teamMenuLinks = document.querySelectorAll(".team-mobile-menu a");

function updateTeamHeader() {
  if (!teamHeader) return;
  teamHeader.classList.toggle("scrolled", window.scrollY > 40);
}

function setTeamMenu(open) {
  if (!teamMenuButton || !teamMobileMenu || !teamMenuOverlay) return;

  teamMenuButton.classList.toggle("is-open", open);
  teamMobileMenu.classList.toggle("is-open", open);
  teamMenuOverlay.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);

  teamMenuButton.setAttribute("aria-expanded", String(open));
  teamMenuButton.setAttribute(
    "aria-label",
    open ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"
  );

  teamMobileMenu.setAttribute("aria-hidden", String(!open));
  teamMenuOverlay.setAttribute("aria-hidden", String(!open));
}

if (teamMenuButton) {
  teamMenuButton.addEventListener("click", () => {
    setTeamMenu(!teamMobileMenu.classList.contains("is-open"));
  });
}

if (teamMenuOverlay) {
  teamMenuOverlay.addEventListener("click", () => setTeamMenu(false));
}

teamMenuLinks.forEach((link) => {
  link.addEventListener("click", () => setTeamMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setTeamMenu(false);
  }
});

window.addEventListener("scroll", updateTeamHeader, { passive: true });
updateTeamHeader();

const figmaResumeEmbeds = document.querySelectorAll(".figma-resume-embed");

figmaResumeEmbeds.forEach((embed, index) => {
  const iframe = embed.querySelector("iframe");
  if (!iframe) return;

  const panel = document.createElement("div");
  const panelInner = document.createElement("div");
  const button = document.createElement("button");
  const panelId = `figma-resume-panel-${index + 1}`;

  panel.className = "figma-resume-panel";
  panel.id = panelId;
  panel.setAttribute("aria-hidden", "true");
  panelInner.className = "figma-resume-panel-inner";

  button.type = "button";
  button.className = "figma-resume-toggle";
  button.setAttribute("aria-controls", panelId);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = `
    <span class="figma-resume-toggle-label">이력서 펼쳐보기</span>
    <span class="figma-resume-toggle-icon" aria-hidden="true"></span>
  `;

  const iframeParent = iframe.parentNode;

  iframeParent.insertBefore(panel, iframe);
  panel.appendChild(panelInner);
  panelInner.appendChild(iframe);
  iframeParent.insertBefore(button, panel);

  button.addEventListener("click", () => {
    const isOpen = embed.classList.toggle("is-figma-open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector(".figma-resume-toggle-label").textContent = isOpen
      ? "이력서 접기"
      : "이력서 펼쳐보기";
    panel.setAttribute("aria-hidden", String(!isOpen));
    iframe.setAttribute("tabindex", isOpen ? "0" : "-1");
  });

  iframe.setAttribute("tabindex", "-1");
});

const revealTargets = document.querySelectorAll(".team-reveal");

if ("IntersectionObserver" in window) {
  const teamObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${(index % 4) * 0.07}s`;
    teamObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => {
    target.classList.add("is-visible");
  });
}
