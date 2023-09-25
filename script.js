document.addEventListener("DOMContentLoaded", function() {
    const videoURL = document.getElementById("videoURL");
    const resultDiv = document.getElementById("result");
    const progressDiv = document.getElementById("progress");

    const convertButton = document.querySelector("button");
    const downloadLink = document.getElementById("downloadLink");

    convertButton.addEventListener("click", function() {
        const videoURLValue = videoURL.value;

        if (videoURLValue) {
            // Show the progress bar
            progressDiv.style.display = "block";
            progressDiv.innerHTML = "Converting...";

            // Simulate a conversion delay (replace with actual logic)
            let progress = 0;
            const progressInterval = setInterval(function() {
                progress++;
                progressDiv.innerHTML = "Converting" + ".".repeat(progress % 4);
                if (progress === 3) {
                    clearInterval(progressInterval);

                    // Hide the progress bar when the conversion is complete
                    progressDiv.style.display = "none";

                    resultDiv.innerHTML = "Conversion complete!";
                    // Display the download link
                    downloadLink.href = "#"; // Set your download link here
                    downloadLink.textContent = "Download MP3";
                    downloadLink.style.display = "block";
                }
            }, 1000);
        } else {
            resultDiv.innerHTML = "Please enter a valid YouTube URL.";
        }
    });
});
