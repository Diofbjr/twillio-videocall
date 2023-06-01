import { useState, useEffect, useRef, ChangeEvent } from 'react';
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
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteParticipantsRef = useRef<RemoteParticipant[]>([]);
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | null>(null);
  const remoteVideoRefs = useRef<RemoteVideoRefs>({});

  const handleJoinRoom = async (): Promise<void> => {
    try {
      const response = await axios.post<{ token: string }>('/api/videoconference', { roomName, identity });
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
            room.disconnect();
            setRoom(null);
          }

          const newRoom: Room = await Video.connect(token, {
            name: roomName,
            audio: true, // Habilitar o uso de áudio na sala
            video: true, // Habilitar o uso de vídeo na sala
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
      }
    }
  }, [room]);

  useEffect(() => {
    if (room && localVideoTrack && localAudioTrack) {
      room.localParticipant.publishTrack(localVideoTrack);
      room.localParticipant.publishTrack(localAudioTrack);
    }
  }, [room, localVideoTrack, localAudioTrack]);

  useEffect(() => {
    if (room) {
      room.on('participantConnected', (participant: RemoteParticipant) => {
        remoteParticipantsRef.current.push(participant);
        console.log('participantConnected:', participant.identity);
      });

      room.on('participantDisconnected', (participant: RemoteParticipant) => {
        remoteParticipantsRef.current = remoteParticipantsRef.current.filter(
          (p: RemoteParticipant) => p !== participant
        );
        delete remoteVideoRefs.current[participant.identity];
        console.log('participantDisconnected:', participant.identity);
      });

      room.on('trackSubscribed', (track: any, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.kind === 'video') {
          const videoElement = document.createElement('video');
          videoElement.autoplay = true;
          videoElement.srcObject = new MediaStream([track.mediaStreamTrack]);
          document.body.appendChild(videoElement);
          remoteVideoRefs.current[participant.identity] = { current: videoElement };
          console.log('trackSubscribed - Video:', participant.identity);
        } else if (track.kind === 'audio') {
          console.log('trackSubscribed - Audio:', participant.identity);
        }
      });

      room.on('trackUnsubscribed', (track: any, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.kind === 'video') {
          const videoElement = remoteVideoRefs.current[participant.identity]?.current;
          if (videoElement && videoElement.srcObject === new MediaStream([track.mediaStreamTrack])) {
            videoElement.srcObject = null;
            videoElement.remove();
            delete remoteVideoRefs.current[participant.identity];
            console.log('trackUnsubscribed - Video:', participant.identity);
          }
        } else if (track.kind === 'audio') {
          console.log('trackUnsubscribed - Audio:', participant.identity);
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

  const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoomName(e.target.value);
  };

  const handleIdentityChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIdentity(e.target.value);
  };

  return (
    <div>
      <h1>Videoconferência</h1>
      <input
        type="text"
        placeholder="Nome da sala"
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <input
        type="text"
        placeholder="Seu nome"
        value={identity}
        onChange={handleIdentityChange}
      />
      <button onClick={handleJoinRoom}>Entrar na sala</button>

      {/* Renderização da chamada de vídeo */}
      {room && (
        <div>
          <video ref={localVideoRef} autoPlay />
          <audio ref={localAudioRef} autoPlay /> {/* Adicione esta linha para reproduzir o áudio local */}
        </div>
      )}

      {/* Renderização dos participantes remotos */}
      <div className="video-container">
        {remoteParticipantsRef.current.map((participant: RemoteParticipant) => (
          <div key={participant.sid}>
            <p>{participant.identity}</p>
            <video
              ref={remoteVideoRefs.current[participant.identity]}
              autoPlay
            />
          </div>
        ))}
      </div>
    </div>
  );
}
