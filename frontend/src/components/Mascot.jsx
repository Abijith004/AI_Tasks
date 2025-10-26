import React, {useState} from 'react'
import lottie from 'lottie-web'


export default function Mascot({onSend}){
    const [listening, setListening] = useState(false)


async function mockRecordAndSend(){
    setListening(true)
// placeholder for real recording
    await new Promise(r=>setTimeout(r,700))
    setListening(false)
    const text = prompt('(mock) Type what you said:')
    if(text) await onSend(text)
}


return (
    <div className="mascot">
        <div id="lottie" style={{width:200,height:200}} />
        <button onClick={mockRecordAndSend}>{listening ? 'Listening...' : 'Hold to speak'}</button>
    </div>
    )
}