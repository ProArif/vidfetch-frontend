// Replace with your Render backend URL
const backendUrl = "https://loadly.onrender.com";

// DOM elements
const videoUrlInput = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");
const downloadLinkContainer = document.getElementById("downloadLink");

downloadBtn.addEventListener("click", async () => {
  const url = videoUrlInput.value.trim();
  statusText.textContent = "";
  downloadLinkContainer.innerHTML = "";

  if (!url) {
    statusText.textContent = "Please enter a video URL";
    return;
  }

  statusText.textContent = "Fetching download link...";
  downloadBtn.disabled = true;

  try {
    const response = await fetch(`${backendUrl}/api/getvideo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.downloadUrl) {
      statusText.textContent = "✅ Download ready!";

      // Trigger automatic download
      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.download = "video.mp4";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Optional: clickable fallback link
      downloadLinkContainer.innerHTML = `<a href="${data.downloadUrl}" target="_blank">Click here if download didn’t start automatically</a>`;
    } else {
      statusText.textContent = `Error: ${data.error || "Failed to fetch video URL"}`;
    }
  } catch (err) {
    console.error("Error connecting to backend:", err);
    statusText.textContent = "Error connecting to backend";
  } finally {
    downloadBtn.disabled = false;
  }
});
