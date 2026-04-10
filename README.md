# YT Downloader

A beautiful, modern full-stack web application designed to download YouTube videos and audio at maximum quality using `yt-dlp`. 

## 🌟 Features
- **Premium Glassmorphism UI**: A vibrant React-based frontend with glowing hover animations, animated gradients, and an intuitive user experience.
- **Audio & Video Support**: Toggle seamlessly between downloading fast HD video (`.mp4`) or audio-only extraction (`.mp3`).
- **High-Performance Backend**: Powered by FastAPI to cleanly execute `yt-dlp` commands securely through an API.
- **Direct Local Saving**: Downloads are piped natively to your designated local folder `D:\Aidyn\Python\YouTube downloader\Videos\`.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Vanilla CSS 
- **Backend**: Python, FastAPI, Uvicorn, `yt-dlp`
- **Dependency Tooling**: FFmpeg (used heavily for `.mp3` audio conversions and video format merging)

## 🚀 Setup & Usage

### Prerequisites
1. **Node.js**: Required to run the frontend Vite server.
2. **Python 3.x**: Required for the backend API.
3. **FFmpeg**: Must be available at `C:\ffmpeg\bin` (if your FFmpeg is installed elsewhere, you will need to modify the path in `backend/main.py`).

### Running the Application
The easiest way to start both the frontend and the backend is to use the included batch script:

1. Double-click the `run.bat` file in the root directory.
   - *This will automatically launch two terminal windows: one to start your Python FastAPI server, and one to launch your Vite frontend.*
2. Open your browser and navigate to `http://localhost:5173`.
3. Paste a valid YouTube URL, select **Video** or **Audio** format, and click **Download**.

> **Note**: While downloading large 4K videos or long playlists, the backend works synchronously so you will see a 'Downloading...' animation until the file fully populates in your videos folder.
