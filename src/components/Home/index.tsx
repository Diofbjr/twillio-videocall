import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video, { Room, RemoteParticipant, RemoteTrackPublication, LocalVideoTrack, LocalAudioTrack, createLocalVideoTrack, createLocalAudioTrack } from 'twilio-video';

interface RemoteVideoRefs {
  [key: string]: { current: HTMLVideoElement | null };
}

export default function Home(): JSX.Element {
  const [roomName, setRoomName] = useState<string>('');
  const [identity, setIdentity] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [room, setRoom] = useState<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteParticipantsRef = useRef<RemoteParticipant[]>([]);
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | null>(null);
  const remoteVideoRefs = useRef<RemoteVideoRefs>({});

  const handleJoinRoom = async (): Promise<void> => {
    try {
      const response = await axios.post('/api/videoconference', { roomName, identity });
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error('Erro ao criar token:', error);
    }
  };

  useEffect(() => {
    const joinRoom = async (): Promise<void> => {
      try {
        if (token) {
          if (room) {
            // Se já estiver em uma sala, desconecte antes de entrar na nova sala
            room.disconnect();
            setRoom(null);
          }

          const localAudioTrack = await createLocalAudioTrack(); // Criar faixa de áudio local

          const newRoom: Room = await Video.connect(token, {
            name: roomName,
            audio: true, // Habilitar áudio ao entrar na sala
            video: true, // Habilitar vídeo ao entrar na sala
            tracks: [localAudioTrack], // Adicionar faixa de áudio local à lista de faixas
          });

          setRoom(newRoom);
          setLocalAudioTrack(localAudioTrack); // Atualizar o estado da faixa de áudio local
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

      if (localVideoTrack) {
        setLocalVideoTrack(localVideoTrack);
        localVideoTrack.attach(localVideoRef.current);
      }
    }
  }, [room]);

  useEffect(() => {
    if (room && localVideoTrack) {
      room.localParticipant.publishTrack(localVideoTrack);
    }
  }, [room, localVideoTrack]);

  useEffect(() => {
    if (room) {
      room.on('participantConnected', (participant: RemoteParticipant) => {
        remoteParticipantsRef.current.push(participant);
      });

      room.on('participantDisconnected', (participant: RemoteParticipant) => {
        remoteParticipantsRef.current = remoteParticipantsRef.current.filter(
          (p: RemoteParticipant) => p !== participant
        );
        delete remoteVideoRefs.current[participant.identity];
      });

      room.on('trackSubscribed', (track: any, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.kind === 'video') {
          const videoElement = document.createElement('video');
          videoElement.autoplay = true;
          videoElement.srcObject = new MediaStream([track.mediaStreamTrack]);
          document.body.appendChild(videoElement);
          remoteVideoRefs.current[participant.identity] = { current: videoElement };
        }
      });

      room.on('trackUnsubscribed', (track: any, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.kind === 'video') {
          const videoElement = remoteVideoRefs.current[participant.identity]?.current;
          if (videoElement && videoElement.srcObject === new MediaStream([track.mediaStreamTrack])) {
            videoElement.srcObject = null;
            videoElement.remove();
            delete remoteVideoRefs.current[participant.identity];
          }
        }
      });
    }
  }, [room]);

  useEffect(() => {
    console.log('room:', room);
    console.log('localVideoTrack:', localVideoTrack);
    console.log('localAudioTrack:', localAudioTrack);
    console.log('remoteParticipants:', remoteParticipantsRef.current);
  }, [room, localVideoTrack, localAudioTrack]);

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
          <video ref={localVideoRef} autoPlay />
          <audio id="local-audio" autoPlay />
        </div>
      )}

      {/* Renderização dos participantes remotos */}
      <div className="video-container">
        {remoteParticipantsRef.current.map((participant: RemoteParticipant) => (
          <div key={participant.sid}>
            <p>{participant.identity}</p>
            <video
              ref={(videoRef) => {
                if (videoRef) {
                  remoteVideoRefs.current[participant.identity] = { current: videoRef };
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
