"use strict";

/*
  Read the customer ID from the URL.

  Example:
  ?id=bsstore
*/

const urlParameters = new URLSearchParams(window.location.search);
const customerId = urlParameters.get("id") || "bsstore";

/*
  Get page elements.
*/

const loadingMessage = document.getElementById("loadingMessage");
const profileContent = document.getElementById("profileContent");
const errorMessage = document.getElementById("errorMessage");

const profileImage = document.getElementById("profileImage");
const customerName = document.getElementById("customerName");
const customerJob = document.getElementById("customerJob");

const darkModeButton = document.getElementById("darkModeButton");

const buttons = {
  whatsapp: document.getElementById("whatsappButton"),
  instapay: document.getElementById("instapayButton"),
  facebook: document.getElementById("facebookButton"),
  instagram: document.getElementById("instagramButton"),
  tiktok: document.getElementById("tiktokButton"),
  x: document.getElementById("xButton"),
  maps: document.getElementById("mapsButton")
};

/*
  Check that a link is valid.
*/

function isValidLink(link) {
  return (
    typeof link === "string" &&
    link.trim() !== "" &&
    link.trim() !== "#"
  );
}

/*
  Add a link to a button.

  If the customer does not have this link,
  the button will be hidden.
*/

function configureButton(button, link) {
  if (isValidLink(link)) {
    button.href = link.trim();
    button.classList.remove("hidden");
  } else {
    button.removeAttribute("href");
    button.classList.add("hidden");
  }
}

/*
  Display customer information.
*/

function displayCustomer(customer) {
  if (!customer || !customer.name) {
    throw new Error("Invalid customer data.");
  }

  customerName.textContent = customer.name;
  customerJob.textContent = customer.job || "";

  /*
    Display or hide the profile picture.
  */

  if (customer.image && customer.image.trim() !== "") {
    profileImage.src = customer.image;
    profileImage.alt = `${customer.name} profile picture`;
    profileImage.classList.remove("hidden");
  } else {
    profileImage.classList.add("hidden");
  }

  /*
    Apply the customer's theme color.
  */

  const themeColor = customer.themeColor || "#5b2cff";

  document.documentElement.style.setProperty(
    "--primary-color",
    themeColor
  );

  /*
    Update the browser theme color.
  */

  const themeMetaTag = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeMetaTag) {
    themeMetaTag.setAttribute("content", themeColor);
  }

  /*
    Configure all customer buttons.
  */

  configureButton(buttons.whatsapp, customer.whatsapp);
  configureButton(buttons.instapay, customer.instapay);
  configureButton(buttons.facebook, customer.facebook);
  configureButton(buttons.instagram, customer.instagram);
  configureButton(buttons.tiktok, customer.tiktok);
  configureButton(buttons.x, customer.x);
  configureButton(buttons.maps, customer.maps);

  loadingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
  profileContent.classList.remove("hidden");
}

/*
  Display an error if the profile does not exist.
*/

function displayError(error) {
  console.error(error);

  loadingMessage.classList.add("hidden");
  profileContent.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

/*
  Load the customer's JSON file.
*/

async function loadCustomer() {
  try {
    const response = await fetch(
      `data/${encodeURIComponent(customerId)}.json`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        `Customer file was not found. Status: ${response.status}`
      );
    }

    const customer = await response.json();

    displayCustomer(customer);
  } catch (error) {
    displayError(error);
  }
}

/*
  Dark Mode.
*/

function enableDarkMode() {
  document.body.classList.add("dark-mode");
  darkModeButton.textContent = "☀️";
  localStorage.setItem("onetapDarkMode", "enabled");
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  darkModeButton.textContent = "🌙";
  localStorage.setItem("onetapDarkMode", "disabled");
}

function loadDarkModePreference() {
  const savedMode = localStorage.getItem("onetapDarkMode");

  if (savedMode === "enabled") {
    enableDarkMode();
    return;
  }

  disableDarkMode();
}

darkModeButton.addEventListener("click", () => {
  const darkModeIsActive =
    document.body.classList.contains("dark-mode");

  if (darkModeIsActive) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

/*
  Show a fallback if the customer image fails.
*/

profileImage.addEventListener("error", () => {
  profileImage.src =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="300"
           height="300"
           viewBox="0 0 300 300">
        <rect width="300" height="300" fill="#eeeeee"/>
        <circle cx="150" cy="110" r="55" fill="#aaaaaa"/>
        <path d="M55 275c10-70 50-100 95-100s85 30 95 100"
              fill="#aaaaaa"/>
      </svg>
    `);
});

/*
  Start the page.
*/

loadDarkModePreference();
loadCustomer();
