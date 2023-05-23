import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video, { Room, RemoteParticipant } from 'twilio-video';

export default function Home() {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

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

  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);

  useEffect(() => {
    if (room) {
      const participantConnected = (participant: RemoteParticipant) => {
        setParticipants((prevParticipants) => [...prevParticipants, participant]);
      };

      const participantDisconnected = (participant: RemoteParticipant) => {
        setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
      };

      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);

      return () => {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
      };
    }
  }, [room]);

  useEffect(() => {
    remoteVideoRefs.current = participants.map(() => null);

    const createVideoTracks = async () => {
      const videoTracks = await Promise.all(participants.map(() => Video.createLocalVideoTrack()));
      videoTracks.forEach((track, index) => {
        const videoRef = document.createElement('video');
        videoRef.autoplay = true;
        if (track) {
          remoteVideoRefs.current[index] = videoRef;
          track.attach(videoRef);
        }
      });
    };

    createVideoTracks();

    return () => {
      remoteVideoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          videoRef.srcObject = null;
          videoRef.pause();
          videoRef.remove();
        }
      });
    };
  }, [participants]);

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

      {/* Renderização dos vídeos dos participantes remotos */}
      {participants.map((participant, index) => (
        <div key={participant.sid}>
          <video ref={(el) => (remoteVideoRefs.current[index] = el)} autoPlay />
        </div>
      ))}
    </div>
  );
}
