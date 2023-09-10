from flask import Flask, request, render_template, jsonify
from pytube import YouTube
import os

app = Flask(__name__)

# Specify the directory where converted files will be stored
DOWNLOAD_DIR = 'downloads'

# ... (Quality presets and other routes)

@app.route('/convert', methods=['POST'])
def convert():
    try:
        # Get user input from the AJAX request
        data = request.get_json()
        youtube_link = data.get('youtube_link')
        format_type = data.get('format')
        quality = data.get('quality')

        # Validate format and quality
        if format_type not in QUALITY_PRESETS or quality not in QUALITY_PRESETS[format_type]:
            return jsonify(success=False)

        # Create a YouTube object
        yt = YouTube(youtube_link)

        # Choose the stream based on format and quality
        stream = yt.streams.get_by_itag(QUALITY_PRESETS[format_type][quality])

        # Set the output file name based on video title
        output_filename = yt.title

        # Download the stream to the specified directory
        stream.download(output_path=DOWNLOAD_DIR, filename=output_filename)

        # Construct the download URL
        download_url = f'/download/{format_type}/{quality}/{output_filename}.{format_type}'

        return jsonify(success=True, download_url=download_url)

    except Exception as e:
        return jsonify(success=False)

# ... (Download route)

if __name__ == '__main__':
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)
    app.run(debug=True)
