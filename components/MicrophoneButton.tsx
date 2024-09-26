import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { FaMicrophone } from 'react-icons/fa';

interface MicrophoneButtonProps {
    assistantId: string;
    publicKey: string;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ assistantId, publicKey }) => {
    const [isCalling, setIsCalling] = useState(false);
    const vapiRef = useRef<Vapi | null>(null);

    useEffect(() => {
        if (!publicKey || !assistantId) {
            console.error('Vapi public key and assistant ID are required.');
            return;
        }

        vapiRef.current = new Vapi(publicKey);

        const handleCallStart = () => {
            console.log('Call has started.');
            setIsCalling(true);
        };

        const handleCallEnd = () => {
            console.log('Call has ended.');
            setIsCalling(false);
        };

        const handleSpeechStart = () => {
            console.log('Assistant speech has started.');
        };

        const handleSpeechEnd = () => {
            console.log('Assistant speech has ended.');
        };

        const handleError = (e: unknown) => {
            console.error('An error occurred:', e);
        };

        const handleMessage = (message: any) => {
            console.log('Received message:', message);
            // Process the message as needed
        };

        vapiRef.current.on('call-start', handleCallStart);
        vapiRef.current.on('call-end', handleCallEnd);
        vapiRef.current.on('speech-start', handleSpeechStart);
        vapiRef.current.on('speech-end', handleSpeechEnd);
        vapiRef.current.on('error', handleError);
        vapiRef.current.on('message', handleMessage);

        return () => {
            if (vapiRef.current) {
                vapiRef.current.stop();
                vapiRef.current.off('call-start', handleCallStart);
                vapiRef.current.off('call-end', handleCallEnd);
                vapiRef.current.off('speech-start', handleSpeechStart);
                vapiRef.current.off('speech-end', handleSpeechEnd);
                vapiRef.current.off('error', handleError);
                vapiRef.current.off('message', handleMessage);
            }
        };
    }, [publicKey, assistantId]);

    const handleClick = () => {
        if (!isCalling) {
            vapiRef.current?.start(assistantId);
        } else {
            vapiRef.current?.stop();
        }
    };

    const toggleMute = () => {
        if (vapiRef.current) {
            const currentMuteState = vapiRef.current.isMuted();
            vapiRef.current.setMuted(!currentMuteState);
            console.log(`Microphone ${!currentMuteState ? 'muted' : 'unmuted'}`);
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                style={{
                    borderRadius: '50%',
                    width: '64px',
                    height: '64px',
                    backgroundColor: isCalling ? 'green' : 'red',
                    color: 'white',
                    fontSize: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                <FaMicrophone />
            </button>
            <button onClick={toggleMute}>Toggle Mute</button>
        </div>
    );
};

export default MicrophoneButton;