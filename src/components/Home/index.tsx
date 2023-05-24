import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video, { Room, RemoteParticipant, RemoteTrackPublication, LocalVideoTrack, LocalAudioTrack } from 'twilio-video';

export default function Home() {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteParticipantsRef = useRef<RemoteParticipant[]>([]);
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | null>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

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
            room.disconnect();
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
        setLocalVideoTrack(localVideoTrack);
        localVideoTrack.attach(localVideoRef.current);
      }
      if (localAudioTrack) {
        setLocalAudioTrack(localAudioTrack);
        localAudioTrack.attach(document.getElementById('local-audio') as HTMLMediaElement);
      }
    }
  }, [room]);

  useEffect(() => {
    if (room && localVideoTrack) {
      room.localParticipant.publishTrack(localVideoTrack);
    }
  }, [room, localVideoTrack]);

  useEffect(() => {
    if (room && localAudioTrack) {
      room.localParticipant.publishTrack(localAudioTrack);
    }
  }, [room, localAudioTrack]);

  useEffect(() => {
    if (room) {
      room.on('participantConnected', participant => {
        remoteParticipantsRef.current.push(participant);
      });

      room.on('participantDisconnected', participant => {
        remoteParticipantsRef.current = remoteParticipantsRef.current.filter(p => p !== participant);
        delete remoteVideoRefs.current[participant.identity];
      });

      room.on('trackSubscribed', (track, publication, participant) => {
        if (track.kind === 'video') {
          const videoElement = document.createElement('video');
          videoElement.autoplay = true;
          videoElement.srcObject = new MediaStream([track.mediaStreamTrack]);
          document.body.appendChild(videoElement);
          remoteVideoRefs.current[participant.identity] = videoElement;
        }
      });

      room.on('trackUnsubscribed', (track, publication, participant) => {
        if (track.kind === 'video') {
          const videoElement = remoteVideoRefs.current[participant.identity];
          if (videoElement && videoElement.srcObject === new MediaStream([track.mediaStreamTrack])) {
            videoElement.srcObject = null;
            videoElement.remove();
            delete remoteVideoRefs.current[participant.identity];
          }
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
            <p>{participant.identity}</p>
            <video
              ref={(videoRef) => {
                if (videoRef) {
                  remoteVideoRefs.current[participant.identity] = videoRef;
                }
              }}
              autoPlay
            />
          </div>
        ))}
      </div>
    </div>
  );
}
