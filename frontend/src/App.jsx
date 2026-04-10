import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [formatType, setFormatType] = useState('video'); // 'video' or 'audio'
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [responseMsg, setResponseMsg] = useState('');

  const handleDownload = async () => {
    if (!url.trim()) return;

    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url.trim(),
          format_type: formatType
        })
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.detail || 'Download failed!');

      setStatus('success');
      setResponseMsg(data.message || 'File downloaded successfully!');
      setUrl(''); // clear input on success

    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMsg(err.message || 'Something went wrong. Check backend connection.');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>YT Downloader</h1>
        <p>Premium downloads, straight to your drive.</p>
      </div>

      <div className="format-toggle">
        <button 
          className={formatType === 'video' ? 'active' : ''} 
          onClick={() => {if(status !== 'loading') setFormatType('video')}}
        >
          🎥 Fast Video
        </button>
        <button 
          className={formatType === 'audio' ? 'active' : ''} 
          onClick={() => {if(status !== 'loading') setFormatType('audio')}}
        >
          🎵 Audio Only
        </button>
      </div>

      <div className="input-container">
        <input 
          type="text" 
          placeholder="Paste YouTube Link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
          disabled={status === 'loading'}
        />
        <button 
          className="btn" 
          onClick={handleDownload}
          disabled={status === 'loading' || !url.trim()}
        >
          {status === 'loading' ? (
            <>
              <div className="spinner"></div> Downloading...
            </>
          ) : (
            'Download'
          )}
        </button>
      </div>

      {status && status !== 'loading' && (
        <div className={`status-message ${status}`}>
          {responseMsg}
        </div>
      )}
    </div>
  );
}

export default App;
