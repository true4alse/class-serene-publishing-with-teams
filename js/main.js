const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const siteHeader = document.getElementById("siteHeader");
const menuLinks = mobileMenu.querySelectorAll("a");

function setMenu(open) {
  menuButton.classList.toggle("is-open", open);
  mobileMenu.classList.toggle("is-open", open);
  menuOverlay.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"
  );

  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuOverlay.setAttribute("aria-hidden", String(!open));
}

menuButton.addEventListener("click", () => {
  setMenu(!mobileMenu.classList.contains("is-open"));
});

menuOverlay.addEventListener("click", () => setMenu(false));

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

function updateHeader() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* 패럴랙스 애니메이션 */
const storySection = document.getElementById("story");
const rainbowLayer = document.getElementById("rainbowLayer");
const cloudLeft = document.getElementById("cloudLeft");
const cloudRight = document.getElementById("cloudRight");

const state = {
  rainbowY: 120,
  leftX: -200,
  rightX: 200,
  cloudY: 0,
  cloudOpacity: 0
};

const target = { ...state };

function clamp(min, max, value) {
  return Math.min(max, Math.max(min, value));
}

function lerp(current, destination, factor) {
  return current + (destination - current) * factor;
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const normalized = clamp(0, 1, (value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * normalized;
}

function updateParallaxTargets() {
  const rect = storySection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = clamp(
    0,
    1,
    (windowHeight - rect.top) / (windowHeight + rect.height)
  );

  target.rainbowY = 120 + (-160 - 120) * progress;

  const cloudVisibility = clamp(
    0,
    1,
    mapRange(progress, 0.12, 0.34, 0, 1) -
      mapRange(progress, 0.75, 0.92, 0, 1)
  );

  target.leftX = -200 + 200 * cloudVisibility;
  target.rightX = 200 - 200 * cloudVisibility;
  target.cloudY = progress * -50;
  target.cloudOpacity = cloudVisibility;
}

function renderParallax() {
  state.rainbowY = lerp(state.rainbowY, target.rainbowY, 0.06);
  state.leftX = lerp(state.leftX, target.leftX, 0.04);
  state.rightX = lerp(state.rightX, target.rightX, 0.04);
  state.cloudY = lerp(state.cloudY, target.cloudY, 0.04);
  state.cloudOpacity = lerp(
    state.cloudOpacity,
    target.cloudOpacity,
    0.04
  );

  rainbowLayer.style.transform =
    `translate3d(0, ${state.rainbowY}px, 0)`;

  cloudLeft.style.transform =
    `translate3d(${state.leftX}px, ${state.cloudY}px, 0)`;

  cloudRight.style.transform =
    `translate3d(${state.rightX}px, ${state.cloudY}px, 0) scaleX(-1)`;

  cloudLeft.style.opacity = state.cloudOpacity.toFixed(3);
  cloudRight.style.opacity = state.cloudOpacity.toFixed(3);

  requestAnimationFrame(renderParallax);
}

window.addEventListener("scroll", updateParallaxTargets, {
  passive: true
});
window.addEventListener("resize", updateParallaxTargets);

updateParallaxTargets();
renderParallax();

/* 자동 재생이 차단될 경우를 대비 */
const heroVideo = document.querySelector(".hero-video");

heroVideo.addEventListener("error", () => {
  heroVideo.style.display = "none";
});

heroVideo.play().catch(() => {
  /* 자동 재생 정책으로 실행되지 않아도 CSS 배경은 유지됩니다. */
});
