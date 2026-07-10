const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "bsstroe";

fetch(`data/${id}.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Customer not found");
    }
    return response.json();
  })
  .then(customer => {
    document.getElementById("profileImage").src = customer.image;
    document.getElementById("customerName").textContent = customer.name;
    document.getElementById("customerJob").textContent = customer.job;

    document.getElementById("whatsappBtn").href = customer.whatsapp;
    document.getElementById("instapayBtn").href = customer.instapay;
    document.getElementById("facebookBtn").href = customer.facebook;
    document.getElementById("instagramBtn").href = customer.instagram;
    document.getElementById("tiktokBtn").href = customer.tiktok;
    document.getElementById("xBtn").href = customer.x;
  })
  .catch(() => {
    document.querySelector(".profile-card").innerHTML = `
      <h1>Customer Not Found</h1>
      <p>Please check the profile link.</p>
    `;
  });