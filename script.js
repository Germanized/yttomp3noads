document.addEventListener("DOMContentLoaded", function() {
    const videoURL = document.getElementById("videoURL");
    const resultDiv = document.getElementById("result");
    const progressDiv = document.getElementById("progress");
    const downloadLink = document.getElementById("downloadLink");
    const convertButton = document.getElementById("convertButton");

    async function convertVideo() {
        const videoURLValue = videoURL.value;

        if (videoURLValue) {
            // Display the progress bar
            progressDiv.style.display = "block";
            
            // Use ytdl-core-browser to fetch video info and obtain the MP3 stream URL
            try {
                const ytdl = require('ytdl-core-browser');
                const info = await ytdl.getInfo(videoURLValue);
                const audioURL = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' }).url;
                downloadLink.href = audioURL;
                downloadLink.style.display = "block";
                downloadLink.innerHTML = "Download MP3";
                progressDiv.style.display = "none"; // Hide the progress bar
                resultDiv.innerHTML = "Conversion complete!";
            } catch (error) {
                resultDiv.innerHTML = "Error: " + error;
            }
        } else {
            resultDiv.innerHTML = "Please enter a valid YouTube URL.";
        }
    }

    convertButton.addEventListener("click", convertVideo);
});
