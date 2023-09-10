from flask import Flask, request, render_template, redirect, url_for, send_from_directory
from pytube import YouTube
import os

app = Flask(__name__)

# Specify the directory where converted files will be stored
DOWNLOAD_DIR = 'downloads'

# Define quality presets for both MP3 and MP4
QUALITY_PRESETS = {
    'mp3': {
        '320kbps': '140',
        '192kbps': '140',
        '128kbps': '140',
        '96kbps': '140',
        '32kbps': '140',
    },
    'mp4': {
        '1080p': '137',
        '720p': '22',
        '360p': '18',
        '240p': '133',
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    try:
        # Get user input from the HTML form
        youtube_link = request.form['youtube_link']
        format_type = request.form['format']
        quality = request.form['quality']

        # Validate format and quality
        if format_type not in QUALITY_PRESETS or quality not in QUALITY_PRESETS[format_type]:
            return redirect(url_for('index'))

        # Create a YouTube object
        yt = YouTube(youtube_link)

        # Choose the stream based on format and quality
        stream = yt.streams.get_by_itag(QUALITY_PRESETS[format_type][quality])

        # Set the output file name based on video title
        output_filename = yt.title

        # Download the stream to the specified directory
        stream.download(output_path=DOWNLOAD_DIR, filename=output_filename)

        return redirect(url_for('download', format=format_type, quality=quality, filename=f'{output_filename}.{format_type}'))
    
    except Exception as e:
        return redirect(url_for('index'))

@app.route('/download/<format>/<quality>/<filename>')
def download(format, quality, filename):
    return send_from_directory(DOWNLOAD_DIR, filename, as_attachment=True)

if __name__ == '__main__':
    # Create the download directory if it doesn't exist
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    # Run the Flask app
    app.run(debug=True)
