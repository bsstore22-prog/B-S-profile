/* ============================================================
   CUSTOMER DATA
   Edit only this object to create a new profile.
   - whatsapp: phone number in international format, digits only
               (e.g. "201500068841"), no "+" or spaces.
   - instapay: either a full InstaPay link ("https://...")
               or just a username/handle (e.g. "@johndoe").
               If it's a link, the button opens it directly.
               If it's not a link, the button copies it to the clipboard.
   - Facebook, instigram, X, tiktok: full profile links.
   - image: URL or relative path to the profile picture.
============================================================ */
const customer = {
  name: "bASEL Elsohaby",
  job: "Founder",
  whatsapp: "01003232820",
  instapay: "https://ipn.eg/S/abdelrahman_elsohaby/instapay/4myqnA",
  Facebook: "https://www.facebook.com/share/18irmzwFqu/?mibextid=wwXIfr",
  instigram: "https://www.instagram.com/baselelsohaby?utm_source=qr",
  tiktok: "https://vt.tiktok.com/ZSCw3UNmw/",
  X: "https://x.com/donateello?s=21",
  image: "D:\\files (1)\\2025_08_15_03_01_IMG_7384.JPG",
};

/* ============================================================
   RENDER LOGIC — no need to edit below this line
============================================================ */
(function renderProfile() {
  const nameEl = document.getElementById("name");
  const jobEl = document.getElementById("job");
  const avatarEl = document.getElementById("avatar");
  const instapayLabelEl = document.getElementById("instapayLabel");

  nameEl.textContent = customer.name || "";
  jobEl.textContent = customer.job || "";
  avatarEl.src = customer.image || "";
  avatarEl.alt = customer.name ? `${customer.name}'s profile picture` : "Profile picture";

  const isInstapayLink = /^https?:\/\//i.test(customer.instapay || "");
  instapayLabelEl.textContent = isInstapayLink ? "InstaPay" : "InstaPay · Copy Username";
})();

/* Helper: open a link in a new tab if it exists */
function openLink(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* WhatsApp button: opens a chat with the stored number */
document.getElementById("whatsappBtn").addEventListener("click", function () {
  const digits = (customer.whatsapp || "").replace(/[^0-9]/g, "");
  if (!digits) return;
  openLink(`https://wa.me/${digits}`);
});

/* InstaPay button: opens the link if provided, otherwise copies the username */
document.getElementById("instapayBtn").addEventListener("click", async function () {
  const value = customer.instapay || "";
  const isLink = /^https?:\/\//i.test(value);

  if (isLink) {
    openLink(value);
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    showToast("Username copied!");
  } catch (err) {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast("Username copied!");
  }
});

/* Social buttons: simply open the stored links */
document.getElementById("facebookBtn").addEventListener("click", function () {
  openLink(customer.Facebook);
});

document.getElementById("instagramBtn").addEventListener("click", function () {
  openLink(customer.instigram);
});

document.getElementById("tiktokBtn").addEventListener("click", function () {
  openLink(customer.tiktok);
});

document.getElementById("xBtn").addEventListener("click", function () {
  openLink(customer.X);
});

/* Small toast feedback for the copy action */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}
