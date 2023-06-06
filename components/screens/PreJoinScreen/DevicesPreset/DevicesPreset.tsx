import React, { useEffect, useState } from "react";
import * as Video from "twilio-video";
import { useToaster } from "@twilio-paste/core/toast";
import { MdErrorOutline } from "react-icons/md";

import {
  UIStep,
  useVideoStore,
  VideoAppState,
} from "../../../../store/store";
import { MaxWidthDiv } from "../../../styled";
import { SELECTED_VIDEO_INPUT_KEY, TEXT_COPY } from "../../../../lib/constants";
import { useGetToken } from "../../../../lib/api";
import PermissionsWarning from "../PermissionsWarning/PermissionsWarning";

interface DevicesPresetProps {}

export default function DevicesPreset({}: DevicesPresetProps) {
  const toaster = useToaster();
  const { HELP_TEXT_PRELIGHT_FAILED, HELP_TEXT_PRELIGHT_PASSED } = TEXT_COPY;
  const { formData } = useVideoStore((state: VideoAppState) => state);
  const {
    localTracks,
    setLocalTracks,
    clearTrack,
    setActiveRoom,
    setUIStep,
    devicePermissions,
    setDevicePermissions,
  } = useVideoStore((state: VideoAppState) => state);
  const [preflightStatus, setPreflightStatus] = useState("idle");

  const { roomName, identity } = formData;
  const { data, status: tokenStatus } = useGetToken(roomName, identity);
  const [loading, setLoading] = useState(false);

  const localVideo = localTracks.video;
  const localAudio = localTracks.audio;

  const joinVideoClicked = async () => {
    setLoading(true);

    // Setup a local data track to be used per participant
    const dataTrack = new Video.LocalDataTrack({
      name: "emoji",
    });
    setLocalTracks("data", dataTrack);
    let tracks: (
      | Video.LocalVideoTrack
      | Video.LocalDataTrack
      | Video.LocalAudioTrack
    )[] = [dataTrack];

    if (data.token) {
      Video.connect(data.token, {
        tracks,
        dominantSpeaker: true,
        networkQuality: { local: 1, remote: 1 },
      })
        .then((room: Video.Room) => setActiveRoom(room))
        .then(() => setUIStep(UIStep.VIDEO_ROOM))
        .catch((error) => {
          console.log("Error joining room:", error);
        });
    }

    setLoading(false);
  };

  // useEffect to run preflight test
  useEffect(() => {
    if (tokenStatus === "success") {
      setPreflightStatus("loading");
      const { token } = data;
      const preflightTest = Video.runPreflight(token);

      preflightTest.on("progress", (progress: any) => {
        console.log("progress ", progress);
      });

      preflightTest.on("completed", (report: any) => {
        console.log("completed ", report);
        setPreflightStatus("passed");
      });

      preflightTest.on("failed", (error: any) => {
        console.log("failed", error);
        setPreflightStatus("failed");
      });
    }
  }, [tokenStatus]);

  useEffect(() => {
    if (preflightStatus === "passed") {
      joinVideoClicked();
    }
  }, [preflightStatus]);

  return (
    <MaxWidthDiv>
      {preflightStatus === "loading" ? (
        <p>Carregando...</p>
      ) : (
        <>
          {preflightStatus === "failed" && (
            <div>
              <MdErrorOutline />
              <p>{HELP_TEXT_PRELIGHT_FAILED}</p>
            </div>
          )}
        </>
      )}
    </MaxWidthDiv>
  );
}
