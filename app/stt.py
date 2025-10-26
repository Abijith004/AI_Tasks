import tempfile
from whispercpp import Whisper

# Correct way to load a pretrained Whisper model
model = Whisper.from_pretrained("base.en")

def transcribe_audio(audio_bytes: bytes) -> str:
    """Transcribe audio using whispercpp (CPU-friendly and Windows compatible)."""
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    result = model.transcribe(tmp_path)
    # whispercpp returns a dict with key 'text'
    return result.get("text", "").strip()
