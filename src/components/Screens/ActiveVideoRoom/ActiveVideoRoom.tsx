import React, { useEffect, useState } from "react";
import { Flex, Stack } from "@twilio-paste/core";
import * as Video from "twilio-video";

import { UIStep, useVideoStore, VideoAppState } from "../../../store/store";
import { ActiveVideoRoomContainer, FooterDiv } from "../../styled";
import ConfigureSettings from "../../ConfigureSettings/ConfigureSettings";
import ToggleVideo from "./LocalControls/ToggleVideo/ToggleVideo";
import ToggleAudio from "./LocalControls/ToggleAudio/ToggleAudio";
import LeaveRoom from "./LocalControls/LeaveRoom/LeaveRoom";
import { shipRoomStats } from "../../../lib/api";
import useScreenShareParticipant from "../../../lib/hooks/useScreenShareParticipant";
import GridView from "./GridView/GridView";
import FocusedTrackView from "./FocusedTrackView/FocusedTrackView";

import { ConfigContainer } from "./styles";

interface OrderedParticipant {
  participant: Video.RemoteParticipant;
  dominantSpeakerStartTime: number;
}

export default function ActiveVideoRoom({}) {
  const { room, formData, setUIStep, localTracks, setDisconnectError } =
    useVideoStore((state: VideoAppState) => state);
  const [dominantSpeaker, setDominantSpeaker] =
    useState<Video.RemoteParticipant | null>(null);
  const [orderedParticipants, setOrderedParticipants] = useState<
    OrderedParticipant[]
  >(
    Array.from(room?.participants?.values() ?? [], (p) => ({
      participant: p,
      dominantSpeakerStartTime: 0,
    }))
  );
  const screenShareParticipant = useScreenShareParticipant(room);

  useEffect(() => {
    if (room) {
      const participantArray = Array.from(room.participants.values(), (p) => ({
        participant: p,
        dominantSpeakerStartTime: 0,
      }));
      setOrderedParticipants(participantArray);

      const handleParticipantConnected = (
        participant: Video.RemoteParticipant
      ) => {
        setOrderedParticipants((prevParticipants) => [
          ...prevParticipants,
          { participant, dominantSpeakerStartTime: 0 },
        ]);
      };

      const handleParticipantDisconnected = (
        participant: Video.RemoteParticipant
      ) => {
        setOrderedParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p.participant !== participant)
        );
      };

      const handleDominantSpeakerChanged = (
        participant: Video.RemoteParticipant
      ) => {
        if (participant) {
          setDominantSpeaker(participant);
        } else {
          setDominantSpeaker(null);
        }
      };

      room.on("participantConnected", handleParticipantConnected);
      room.on("participantDisconnected", handleParticipantDisconnected);
      room.on("dominantSpeakerChanged", handleDominantSpeakerChanged);
      room.once("disconnected", (error) => {
        localTracks.audio?.stop();
        localTracks.video?.stop();
        localTracks.screen?.stop();
        if (error) {
          setDisconnectError(error.code, error.message);
        }
        setUIStep(UIStep.VIDEO_ROOM_DISCONNECT);
      });

      return () => {
        room.off("participantConnected", handleParticipantConnected);
        room.off("participantDisconnected", handleParticipantDisconnected);
        room.off("dominantSpeakerChanged", handleDominantSpeakerChanged);
      };
    }
  }, [room]);

  useEffect(() => {
    const shipStats = setInterval(async () => {
      room
        ?.getStats()
        .then((results) => shipRoomStats(results[0]))
        .catch((error) => console.log("error gathering WebRTC stats", error));
    }, 15000);
    return () => clearInterval(shipStats);
  }, [room]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-azure-serveless.azurewebsites.net/api/data/teste");
        const data = await response.json();
        setMedications(data.medications);
        setSummaries(data.summaries);
        setSymptoms(data.symptoms);
        setData(data);
      } catch (error) {
        console.log("Error fetching data from the API:", error);
      }
    };
    fetchData();
  }, []);

  window.addEventListener("beforeunload", () => {
    room?.disconnect();
  });

  const [data, setData] = useState(null);
  const [medications, setMedications] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  return (
    <ActiveVideoRoomContainer>
      {!!screenShareParticipant &&
      screenShareParticipant !== room?.localParticipant ? (
        <FocusedTrackView
          orderedParticipants={orderedParticipants}
          dominantSpeaker={dominantSpeaker}
          screenShareParticipant={screenShareParticipant}
        />
      ) : (
        <GridView
          orderedParticipants={orderedParticipants}
          dominantSpeaker={dominantSpeaker}
        />
      )}
      <FooterDiv>
        <Flex width="100%" height="100%" vAlignContent="center">
          <Flex grow hAlignContent={"center"}>
            <Stack orientation="horizontal" spacing="space70">
              <ToggleAudio />
              <ToggleVideo />
              <LeaveRoom />
              <ConfigContainer>
                <ConfigureSettings />
              </ConfigContainer>
            </Stack>
          </Flex>
        </Flex>
      </FooterDiv>
    </ActiveVideoRoomContainer>
  );
}
/*
{data && (
        <div>
          <ul>
            {medications.map((medication, index) => (
              <li key={`medication-${index}`}>{medication}</li>
            ))}
          </ul>
          <ul>
            {summaries.map((summary, index) => (
              <li key={`summary-${index}`}>{summary}</li>
            ))}
          </ul>
          <ul>
            {symptoms.map((symptom, index) => (
              <li key={`symptom-${index}`}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}
*/