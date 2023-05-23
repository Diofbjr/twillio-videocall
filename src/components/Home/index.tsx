import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video, { Room, RemoteParticipant } from 'twilio-video';

export default function Home() {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteParticipantsRef = useRef<RemoteParticipant[]>([]);

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
      const localVideoTrack = Array.from(participant.videoTracks.values())[0]?.track;
      const localAudioTrack = Array.from(participant.audioTracks.values())[0]?.track;

      if (localVideoTrack) {
        localVideoTrack.attach(localVideoRef.current);
      }
      if (localAudioTrack) {
        localAudioTrack.attach(document.getElementById('local-audio') as HTMLAudioElement);
      }
    }
  }, [room]);

  useEffect(() => {
    if (room) {
      room.on('participantConnected', participant => {
        remoteParticipantsRef.current.push(participant);
      });

      room.on('participantDisconnected', participant => {
        remoteParticipantsRef.current = remoteParticipantsRef.current.filter(p => p !== participant);
      });

      room.participants.forEach(participant => {
        const remoteVideoTrack = Array.from(participant.videoTracks.values())[0]?.track;
        const remoteAudioTrack = Array.from(participant.audioTracks.values())[0]?.track;

        if (remoteVideoTrack) {
          const videoElement = document.createElement('video');
          remoteVideoTrack.attach(videoElement);
          document.body.appendChild(videoElement);
        }

        if (remoteAudioTrack) {
          const audioElement = document.createElement('audio');
          remoteAudioTrack.attach(audioElement);
          document.body.appendChild(audioElement);
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
      {room && (
        <div>
          <video ref={localVideoRef} autoPlay muted />
          <audio id="local-audio" autoPlay />
        </div>
      )}

      {/* Renderização dos participantes remotos */}
      <div className="video-container">
        {remoteParticipantsRef.current.map(participant => (
          <div key={participant.sid}>
            <video autoPlay />
            <audio autoPlay />
          </div>
        ))}
      </div>
    </div>
  );
}
