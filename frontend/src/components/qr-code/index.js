import React, { useState } from "react";
import axios from 'axios'



const QrCodePage = () => {
    const [url, setUrl] = useState('');
    const [sid, setSid] = useState('')

    const handleQRcode = async () => {
        const response =await axios.get('http://localhost:8000/generate-qr');
        console.log('----- response --------', response);
        setUrl(response.data.qrCode);


        let nonce = response.data.nonce;
        let sessionId = response.data.sessionId;
        setSid(sessionId)
        let data = await axios.post('http://localhost:8000/authenticate', {
            nonce,sessionId
            
        })

        console.log('=== a ====', data)
    }


    const click = () => {
        const sessionId = sid; // Replace with your actual session ID
        const socket = new WebSocket(`ws://localhost:8080/${sessionId}`);

        socket.onopen = () => {
            // console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        // socket.onclose = () => {
        //     console.log('WebSocket connection closed');
        // };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
 
    return(
        <div>
            <button onClick={handleQRcode}> generate QRCode</button>
            <button onClick={click}> click</button>
            <img src={url}/>
        </div>
    )
} 



export default QrCodePage;