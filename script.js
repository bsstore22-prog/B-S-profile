"use strict";

const params = new URLSearchParams(window.location.search);

const customerId = params.get("id") || "sample";

const loading = document.getElementById("loading");
const profileContent = document.getElementById("profileContent");
const errorMessage = document.getElementById("errorMessage");

const darkModeBtn = document.getElementById("darkModeBtn");

const elements = {
  image: document.getElementById("profileImage"),
  name: document.getElementById("customerName"),
  job: document.getElementById("customerJob")
};

const buttons = {
  whatsapp: document.getElementById("whatsappBtn"),
  instapay: document.getElementById("instapayBtn"),
  facebook: document.getElementById("facebookBtn"),
  instagram: document.getElementById("instagramBtn"),
  tiktok: document.getElementById("tiktokBtn"),
  x: document.getElementById("xBtn"),
  maps: document.getElementById("mapsBtn")
};

function isValidLink(link) {
  return (
    typeof link === "string" &&
    link.trim() !== "" &&
    link.startsWith("https://")
  );
}

function configureButton(button, link) {
  if (isValidLink(link)) {
    button.href = link.trim();
    button.classList.remove("hidden");
  } else {
    button.removeAttribute("href");
    button.classList.add("hidden");
  }
}

function displayCustomer(customer) {
  elements.name.textContent = customer.name || "";
  elements.job.textContent = customer.job || "";

  elements.image.src = customer.image || "images/default.jpg";
  elements.image.alt = `${customer.name || "Customer"} profile picture`;

  const themeColor = customer.themeColor || "#111111";

  document.documentElement.style.setProperty(
    "--primary-color",
    themeColor
  );

  configureButton(buttons.whatsapp, customer.whatsapp);
  configureButton(buttons.instapay, customer.instapay);
  configureButton(buttons.facebook, customer.facebook);
  configureButton(buttons.instagram, customer.instagram);
  configureButton(buttons.tiktok, customer.tiktok);
  configureButton(buttons.x, customer.x);
  configureButton(buttons.maps, customer.maps);

  loading.classList.add("hidden");
  errorMessage.classList.add("hidden");
  profileContent.classList.remove("hidden");
}

function showError(error) {
  console.error(error);

  loading.classList.add("hidden");
  profileContent.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

async function loadCustomer() {
  try {
    const response = await fetch(
      `data/${encodeURIComponent(customerId)}.json?v=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error(
        `Customer file not found. Status: ${response.status}`
      );
    }

    const customer = await response.json();

    displayCustomer(customer);
  } catch (error) {
    showError(error);
  }
}

function enableDarkMode() {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️";
  localStorage.setItem("bsDarkMode", "enabled");
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  darkModeBtn.textContent = "🌙";
  localStorage.setItem("bsDarkMode", "disabled");
}

darkModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

elements.image.addEventListener("error", () => {
  elements.image.src = "images/default.jpg";
});

if (localStorage.getItem("bsDarkMode") === "enabled") {
  enableDarkMode();
} else {
  disableDarkMode();
}

loadCustomer();
