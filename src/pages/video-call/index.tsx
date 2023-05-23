import { useRouter } from 'next/router';
import VideoConference from '../../components/Video/VideoConference';

const RoomPage = () => {
  const router = useRouter();
  const { roomName } = router.query;

  return (
    <div>
      <h1>Videoconferência - Sala {roomName}</h1>
      <VideoConference roomName={roomName as string} token="" />
    </div>
  );
};

export default RoomPage;
