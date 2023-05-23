import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video, { Room } from 'twilio-video';

export default function Home() {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post('/api/videoconference', { roomName, identity });
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error('Erro ao criar token:', error);
    }
  };

  useEffect(() => {
    const joinRoom = async () => {
      try {
        if (token) {
          if (room) {
            // Se já estiver em uma sala, desconecte antes de entrar na nova sala
            room?.disconnect();
            setRoom(null);
          }

          const newRoom = await Video.connect(token, {
            name: roomName,
          });

          setRoom(newRoom);
        }
      } catch (error) {
        console.error('Erro ao entrar na sala:', error);
      }
    };

    joinRoom();
  }, [token, roomName]);

  useEffect(() => {
    if (room && localVideoRef.current) {
      const participant = room.localParticipant;
      const localVideoTrack = Array.from(participant.videoTracks.values())[0].track;
      const localAudioTrack = Array.from(participant.audioTracks.values())[0].track;

      localVideoTrack.attach(localVideoRef.current);
      localAudioTrack.attach(document.getElementById('local-audio') as HTMLAudioElement);

      room.on('trackSubscribed', (track, participant) => {
        if (track.kind === 'video' && remoteVideoRef.current) {
          track.attach(remoteVideoRef.current);
        }
      });

      room.on('trackUnsubscribed', (track, participant) => {
        if (track.kind === 'video' && remoteVideoRef.current) {
          track.detach(remoteVideoRef.current);
        }
      });
    }
  }, [room]);

  return (
    <div>
      <h1>Videoconferência</h1>
      <input
        type="text"
        placeholder="Nome da sala"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Seu nome"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Entrar na sala</button>
      
      {/* Renderização da chamada de vídeo */}
      <div>
        <video ref={localVideoRef} autoPlay muted />
        <video ref={remoteVideoRef} autoPlay />
        <audio id="local-audio" autoPlay />
      </div>
    </div>
  );
}
