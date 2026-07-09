const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "abdelrahman";

let currentLang = "ar";

const text = {
  ar: {
    whatsapp: "واتساب",
    instapay: "إنستا باي",
    facebook: "فيسبوك",
    instagram: "إنستجرام",
    tiktok: "تيك توك",
    x: "X",
    maps: "الموقع على الخريطة",
    qr: "امسح QR Code",
    langBtn: "EN"
  },
  en: {
    whatsapp: "WhatsApp",
    instapay: "InstaPay",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    x: "X",
    maps: "Google Maps",
    qr: "Scan QR Code",
    langBtn: "AR"
  }
};

fetch(`data/${id}.json`)
  .then(res => res.json())
  .then(customer => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";

    document.body.style.setProperty("--primary", customer.themeColor || "#111111");

    document.getElementById("profileImage").src = customer.image;
    document.getElementById("customerName").textContent = customer.name;
    document.getElementById("customerJob").textContent = customer.job;

    document.getElementById("whatsappBtn").href = customer.whatsapp;
    document.getElementById("instapayBtn").href = customer.instapay;
    document.getElementById("facebookBtn").href = customer.facebook;
    document.getElementById("instagramBtn").href = customer.instagram;
    document.getElementById("tiktokBtn").href = customer.tiktok;
    document.getElementById("xBtn").href = customer.x;
    document.getElementById("mapsBtn").href = customer.maps;

    const profileUrl = window.location.href;
    document.getElementById("qrImage").src =
      `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profileUrl)}`;

    updateLanguage();
  });

function updateLanguage() {
  const t = text[currentLang];

  document.getElementById("whatsappBtn").textContent = t.whatsapp;
  document.getElementById("instapayBtn").textContent = t.instapay;
  document.getElementById("facebookBtn").textContent = t.facebook;
  document.getElementById("instagramBtn").textContent = t.instagram;
  document.getElementById("tiktokBtn").textContent = t.tiktok;
  document.getElementById("xBtn").textContent = t.x;
  document.getElementById("mapsBtn").textContent = t.maps;
  document.getElementById("qrTitle").textContent = t.qr;
  document.getElementById("langBtn").textContent = t.langBtn;

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
}

document.getElementById("langBtn").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  updateLanguage();
});

document.getElementById("modeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("modeBtn").textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});
