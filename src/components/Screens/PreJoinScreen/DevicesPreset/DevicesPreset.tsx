import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Video from "twilio-video";
import { Flex, useToaster, Text, Stack, } from "@twilio-paste/core";
import { BsCameraVideoFill, BsCameraVideoOff, BsMicFill, BsMicMuteFill, } from "react-icons/bs";
import { UIStep, useVideoStore, VideoAppState } from "../../../../store/store";
import { Container, SubContainer } from "./styles";
import Logo from '../../../../assets/Logo.png';

import VideoPreview from "../VideoPreview/VideoPreview";
import ConfigureSettings from "../../../ConfigureSettings/ConfigureSettings";
import { SELECTED_VIDEO_INPUT_KEY, SELECTED_AUDIO_INPUT_KEY, TEXT_COPY, } from "../../../../lib/constants";
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
  const [micEnabled, setMicEnabled] = useState(false);
  const [camEnabled, setCamEnabled] = useState(false);
  const [preflightStatus, setPreflightStatus] = useState("idle");

  const { roomName, identity } = formData;
  const { data, status: tokenStatus } = useGetToken(roomName, identity);
  const [loading, setLoading] = useState(false);

  const localVideo = localTracks.video;
  const localAudio = localTracks.audio;

  const joinVideoClicked = async () => {
    setLoading(true);

    const dataTrack = new Video.LocalDataTrack({
      name: "emoji",
    });
    setLocalTracks("data", dataTrack);
    let tracks: (
      | Video.LocalVideoTrack
      | Video.LocalDataTrack
      | Video.LocalAudioTrack
    )[] = [dataTrack];

    if (localVideo) {
      tracks.push(localVideo);
    }

    if (localTracks.audio) {
      tracks.push(localTracks.audio);
    }

    if (data.token) {
      Video.connect(data.token, {
        tracks,
        dominantSpeaker: true,
        networkQuality: { local: 1, remote: 1 },
      })
        .then((room: Video.Room) => setActiveRoom(room))
        .then(() => setUIStep(UIStep.VIDEO_ROOM))
        .catch((error) => {
          toaster.push({
            message: `Error joining room - ${error.message}`,
            variant: "error",
          });
        });
    }

    setLoading(false);
  };

  function joinButtonText() {
    switch (preflightStatus) {
      case "idle":
        return "Um momento!";
      case "loading":
        return "Carregando...";
      case "passed":
        return "Participar";
      case "failed":
        return "Não é possível entrar";
    }
  }

  async function microphoneToggle() {
    if (micEnabled) {
      localTracks.audio?.stop();
      clearTrack("audio");
      setMicEnabled(false);
    } else {
      let localAudioInputDeviceId = localStorage.getItem(
        SELECTED_AUDIO_INPUT_KEY
      );

      if (!!localAudio) {
        localVideo?.restart();
        setMicEnabled(true);
      } else {
        if (!localAudioInputDeviceId) {
          const newDeviceID = await navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              const newDeviceId = devices.find(
                (device) => device.kind === "audioinput"
              )?.deviceId;
              return newDeviceId ?? null;
            });
          localAudioInputDeviceId = newDeviceID;
        }

        if (localAudioInputDeviceId) {
          Video.createLocalTracks({
            audio: { deviceId: localAudioInputDeviceId },
            video: false,
          })
            .then((localTracks) => {
              setLocalTracks("audio", localTracks[0]);
              setMicEnabled(true);
              setDevicePermissions("camera", true);
            })
            .catch((error) => {
              toaster.push({
                message: `Error: ${error.message}`,
                variant: "error",
              });
              setMicEnabled(false);
            });
        } else {
          toaster.push({
            message: `Error: No video device found`,
            variant: "error",
          });
          setMicEnabled(false);
        }
      }
    }
  }

  async function cameraToggle() {
    if (camEnabled) {
      localVideo?.stop();
      clearTrack("video");
      setCamEnabled(false);
    } else {
      let localVideoDeviceId = localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

      if (!!localVideo) {
        localVideo?.restart();
        setCamEnabled(true);
      } else {
        if (!localVideoDeviceId) {
          const newDeviceID = await navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              const newDeviceId = devices.find(
                (device) => device.kind === "videoinput"
              )?.deviceId;
              return newDeviceId ?? null;
            });
          localVideoDeviceId = newDeviceID;
        }

        if (localVideoDeviceId) {
          Video.createLocalTracks({
            video: { deviceId: localVideoDeviceId },
            audio: false,
          })
            .then((localTracks) => {
              setLocalTracks("video", localTracks[0]);
              setCamEnabled(true);
              setDevicePermissions("camera", true);
            })
            .catch((error) => {
              toaster.push({
                message: `Error: ${error.message}`,
                variant: "error",
              });
              setCamEnabled(false);
            });
        } else {
          toaster.push({
            message: `Error: No video device found`,
            variant: "error",
          });
          setCamEnabled(false);
        }
      }
    }
  }

  useEffect(() => {
    if (tokenStatus === "success") {
      setPreflightStatus("loading");
      const { token } = data;
      const preflightTest = Video.runPreflight(token);

      preflightTest.on("progress", (progress: any) => {
        console.log("progress ", progress);
      });

      preflightTest.on("completed", (report: any) => {
        console.log("completed", report);
        toaster.push({
          message: "Preflight test passed! 👌",
          variant: "success",
          dismissAfter: 3000,
        });
        setPreflightStatus("passed");
      });

      preflightTest.on("failed", (error: any) => {
        console.log("failed", error);
        toaster.push({
          message: "Preflight test failed 🙁",
          variant: "error",
        });
        setPreflightStatus("failed");
      });
    }
  }, [tokenStatus]);

  return (
    <Container>
      <SubContainer>
        <div className="logo">
        <Image src={Logo} alt='Logo Precision Data'/>
        </div>
        <div className="video">
          <VideoPreview identity={identity ?? "Guest"} localVideo={localVideo} />
          <div className='camAndMic'>
              <button onClick={() => {microphoneToggle();}}>{micEnabled ? (<BsMicFill/>):(<BsMicMuteFill/>)}
              </button>
              <button onClick={() =>{cameraToggle();}}>{camEnabled ? (<BsCameraVideoFill/>):(<BsCameraVideoOff/>)}</button>
          </div>

          {(!devicePermissions.camera || !devicePermissions.microphone) && (
            <PermissionsWarning />
          )}
          <div className="settings">
            <ConfigureSettings />
          </div>
          <Flex hAlignContent={"center"} width="100%">
            <Stack orientation="vertical" spacing="space30">
              
              {preflightStatus !== "failed" ? (
                <span
                  style={{
                    color: "#000000",
                    lineHeight: 1,
                    fontSize: "12px",
                    letterSpacing: "wider",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  {HELP_TEXT_PRELIGHT_PASSED}
                </span>
              ) : (
                <Flex marginTop="space20">
                  <Text as="p" fontSize="fontSize20">
                    {HELP_TEXT_PRELIGHT_FAILED}
                  </Text>
                </Flex>
              )}
            </Stack>
          </Flex>
        </div>
        <div className="join">
          <h1>Sua consulta Irá começar</h1>
          <h5>Paciente: João Silva</h5>
          <div className="buttons-container">
            <button className='log-on' onClick={async () => await joinVideoClicked()} disabled={preflightStatus !== "passed"}>
              {joinButtonText()}
            </button>
            <button className='back'>Voltar</button>
          </div>
      </div>
      </SubContainer>
      
    </Container>
  );
}
