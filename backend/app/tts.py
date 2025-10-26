# Simple wrapper for pyttsx3 or Coqui
import os


def synthesize_text(text: str) -> str:
    # TODO: use Coqui TTS or pyttsx3 to generate a .wav and return path
    out = '/tmp/ai_tts_out.wav'
    # generate or reuse placeholder
    return out