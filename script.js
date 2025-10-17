const downloadBtn = document.getElementById("downloadBtn");
const videoUrl = document.getElementById("videoUrl");
const resultDiv = document.getElementById("result");
const downloadLink = document.getElementById("downloadLink");

const API_URL = "https://your-render-url.onrender.com/api/getvideo"; // <-- change this

downloadBtn.addEventListener("click", async () => {
  const url = videoUrl.value.trim();
  if (!url) {
    alert("Please paste a video link first!");
    return;
  }

  resultDiv.classList.remove("hidden");
  downloadLink.textContent = "Fetching...";
  downloadLink.removeAttribute("href");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) throw new Error("Failed to fetch download link");

    const data = await response.json();
    if (data.downloadUrl) {
      downloadLink.textContent = "Click here to download";
      downloadLink.href = data.downloadUrl;
    } else {
      downloadLink.textContent = "Could not extract video link.";
    }
  } catch (err) {
    console.error(err);
    downloadLink.textContent = "Error fetching video link.";
  }
});
