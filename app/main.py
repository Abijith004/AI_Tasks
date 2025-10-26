from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from .rag_pipeline import RAG
from .stt import transcribe_audio
from .tts import synthesize_text


app = FastAPI(title="AI Tutor - Open Source RAG")
rag = RAG()


class QueryIn(BaseModel):
    query: str


class ChatIn(BaseModel):
    messages: list # [{"role":"user","text":"..."}, ...]


@app.post('/query')
async def query_endpoint(payload: QueryIn):
    answer, emotion = rag.answer(payload.query)
    return {"text": answer, "emotion": emotion}


@app.post('/chat')
async def chat_endpoint(payload: ChatIn):
# simple sequential handling; extend with memory
    last_user = payload.messages[-1]['text'] if payload.messages else ''
    answer, emotion = rag.answer(last_user, history=payload.messages)
    return {"text": answer, "emotion": emotion}


@app.post('/stt')
async def stt_endpoint(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    text = transcribe_audio(audio_bytes)
    return {"text": text}


@app.post('/tts')
async def tts_endpoint(payload: QueryIn):
    audio_path = synthesize_text(payload.query)
    return {"audio_path": audio_path}