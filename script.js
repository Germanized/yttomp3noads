document.addEventListener("DOMContentLoaded", function() {
    const videoURL = document.getElementById("videoURL");
    const resultDiv = document.getElementById("result");
    const progressDiv = document.getElementById("progress");
    const downloadLink = document.getElementById("downloadLink");
    const convertButton = document.getElementById("convertButton");

    function updateProgress() {
        let progress = 0;
        const dots = ["", ".", "..", "..."];
        const progressInterval = setInterval(function() {
            progressDiv.textContent = "Converting" + dots[progress % 4];
            progress++;
        }, 1000);

        return progressInterval;
    }

    function completeConversion() {
        clearInterval(progressInterval);
        progressDiv.style.display = "none";
        resultDiv.innerHTML = "Conversion complete!";
        downloadLink.href = "#"; // Set your download link here
        downloadLink.style.display = "block";
    }

    let progressInterval;

    function convertVideo() {
        const videoURLValue = videoURL.value;

        if (videoURLValue) {
            // Show the progress bar
            progressDiv.style.display = "block";
            progressInterval = updateProgress();

            // Simulate a conversion delay (replace with actual logic)
            setTimeout(completeConversion, 3000);
        } else {
            resultDiv.innerHTML = "Please enter a valid YouTube URL.";
        }
    }

    // Attach the `convertVideo` function to the button's click event
    convertButton.addEventListener("click", convertVideo);
});
