/*==================== SHOW MENU ====================*/

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  nav = document.getElementById(navId);
  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = winodw.pageOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[hreaf=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[hreaf=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollTop);
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// to obatin current theme and icon
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/

function scaleCv() {
  document.body.classList.add("scale-cv");
}
/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/

function removeScale() {
  document.body.classList.remove("scale-cv");
}
/*==================== GENERATE PDF ====================*/
// PDF generated area
let areaCv = document.getElementById("area-cv");
let resumeButton = document.getElementById("resume-button");
// Html2pdf options
let opt = {
  margin: 0,
  filename: "myResume.pdf",
  pagebreak: { mode: "avoid-all", before: "#page2el" },
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
};
// Function to call areaCv and Html2Pdf options

function generateResume() {
  html2pdf().set(opt).from(areaCv).save();
}

// When the button is clicked, it executes the three functions

resumeButton.addEventListener("click", () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();
  // 2. The PDF is generated
  generateResume();
  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});