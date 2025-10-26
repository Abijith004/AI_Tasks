import React, { useState } from 'react';
import Mascot from './components/Mascot';
import MicButton from './components/MicButton';


export default function App() {
const [messages, setMessages] = useState([]);


async function handleQuery(text) {
setMessages(prev => [...prev, { role: 'user', text }]);
const res = await fetch('http://localhost:8000/query', {
method: 'POST',
headers: { 'content-type': 'application/json' },
body: JSON.stringify({ query: text }),
});
const data = await res.json();
setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
}


return (
<div className="app">
<div className="chat">
<div className="messages">
{messages.map((m, i) => (
<div key={i} className={`msg ${m.role}`}>
{m.text}
</div>
))}
</div>
<div className="controls">
<MicButton onTranscribe={handleQuery} />
<Mascot />
</div>
</div>
</div>
);
}