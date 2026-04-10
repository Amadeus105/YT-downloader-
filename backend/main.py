from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp
import os

app = FastAPI(title="YouTube Downloader API")

# Enable CORS since our frontend will run on a different port (e.g. Vite default 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DownloadRequest(BaseModel):
    url: str
    format_type: str = "video"

@app.post("/api/download")
async def download_video(req: DownloadRequest):
    if not req.url:
        raise HTTPException(status_code=400, detail="URL is required")

    ydl_opts = {
        'outtmpl': r'D:\"Write here path"\Python\YouTube downloader\Videos\%(title)s.%(ext)s',
        'ffmpeg_location': r'C:\ffmpeg\bin',
        'noplaylist': True,
    }

    if req.format_type == "audio":
        ydl_opts['format'] = 'bestaudio/best'
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]
    else:
        ydl_opts['format'] = 'bestvideo+bestaudio'
        ydl_opts['merge_output_format'] = 'mp4'

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Note: This is synchronous and could block the asyncio event loop for large downloads,
            # but it is perfectly fine for a localized personal tool.
            info = ydl.extract_info(req.url, download=True)
            return {
                "status": "success", 
                "title": info.get("title", "Unknown Video"),
                "message": f"Successfully downloaded '{info.get('title')}'!"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
