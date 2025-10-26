from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class RAG:
    def __init__(self, index_path='data/faiss.index'):
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = None
        self.docs = []
        # Load a small, open model
        self.tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2")
        self.model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2")

    ...
    def simple_generate(self, prompt: str):
        """Generate a small, context-aware answer locally."""
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
        outputs = self.model.generate(**inputs, max_new_tokens=128)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
