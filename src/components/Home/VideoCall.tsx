import { useEffect, useRef } from 'react';
import { connect, createLocalVideoTrack } from 'twilio-video';

type VideoCallProps = {
  roomName: string;
  token: string;
};

const VideoCall: React.FC<VideoCallProps> = ({ roomName, token }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const videoTrack = await createLocalVideoTrack();
        const room = await connect(token, {
          name: roomName,
          tracks: [videoTrack],
        });

        const videoContainer = videoRef.current;
        if (videoContainer) {
          videoContainer.appendChild(videoTrack.attach());
        }
      } catch (error) {
        console.error('Erro ao entrar na sala:', error);
      }
    };

    joinRoom();
  }, [roomName, token]);

  return <div ref={videoRef} id="video-container"></div>;
};

export default VideoCall;
