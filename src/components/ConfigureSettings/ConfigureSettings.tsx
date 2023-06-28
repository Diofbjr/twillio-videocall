import React, { useEffect, useState } from "react";
import * as Video from "twilio-video";
import {
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
  Paragraph,
  Select,
  Option,
  Flex,
  Stack,
  useToaster,
}from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/uid-library";
import { BsThreeDotsVertical } from "react-icons/bs";

import useDevices from "../../lib/hooks/useDevices";
import useMediaStreamTrack from "../../lib/hooks/useMediaStreamTrack";
import VideoPreview from "../Screens/PreJoinScreen/VideoPreview/VideoPreview";
import { useVideoStore, VideoAppState } from "../../store/store";
import { findDeviceByID } from "../../lib/utils/devices";
import {
  TEXT_COPY,
  SELECTED_AUDIO_INPUT_KEY,
  SELECTED_AUDIO_OUTPUT_KEY,
  SELECTED_VIDEO_INPUT_KEY,
} from "../../lib/constants";
import {Container, SubContainer, ModalContainer} from './styles';

interface ConfigureSettingsProps {}

export default function ConfigureSettings({}: ConfigureSettingsProps) {
  const toaster = useToaster();
  const { CONFIGURE_SETTINGS_HEADER, CONFIGURE_SETTINGS_DESCRIPTION } =
    TEXT_COPY;
  const {
    localTracks,
    formData,
    devicePermissions,
    activeSinkId,
    setActiveSinkId,
    room,
  } = useVideoStore((state: VideoAppState) => state);
  const localVideo = localTracks.video;
  const localAudio = localTracks.audio;
  const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
    localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
  );
  const [storedLocalAudioInputDeviceId, setStoredLocalAudioInputDeviceId] =
    useState(localStorage.getItem(SELECTED_AUDIO_INPUT_KEY));
  const [storedLocalAudioOutputDeviceId, setStoredLocalAudioOutputDeviceId] =
    useState(localStorage.getItem(SELECTED_AUDIO_OUTPUT_KEY));
  const { videoInputDevices, audioInputDevices, audioOutputDevices } =
    useDevices(devicePermissions);

  // Faixas de visualização padrão para faixas de vídeo e áudio locais (se existirem)
  const [previewVideo, setPreviewVideo] = useState(localVideo);
  const [previewAudio, setPreviewAudio] = useState(localAudio);

  // É necessário que o MediaStreamTrack seja capaz de reagir (e renderizar novamente) em reinícios de pista
  const previewMediaStreamTrack = useMediaStreamTrack(previewVideo);

  // Obter a ID do dispositivo da trilha ativa, ou a ID do dispositivo preferencial do armazenamento local, ou o primeiro dispositivo de entrada
  const videoInputDeviceId =
    previewMediaStreamTrack?.getSettings().deviceId ||
    storedLocalVideoDeviceId ||
    videoInputDevices?.find((device) => device.kind === "videoinput")?.deviceId;
  const audioInputDeviceId =
    storedLocalAudioInputDeviceId ||
    audioInputDevices?.find((device) => device.kind === "audioinput")?.deviceId;
  const audioOutputDeviceId =
    storedLocalAudioOutputDeviceId ||
    activeSinkId ||
    audioOutputDevices?.find((device) => device.kind === "audioinput")
      ?.deviceId;

  const { identity } = formData;
  const modalHeadingID = useUID();

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    if (devicePermissions.camera && videoInputDeviceId) {
      // Use a trilha ativa como visualização (se houver uma), caso contrário, crie a trilha de visualização
      if (localVideo) {
        setPreviewVideo(localVideo);
      } else {
        // Iniciar visualização. Se a trilha de visualização tiver sido interrompida no fechamento anterior, reinicie-a
        generatePreviewVideoTrack(videoInputDeviceId);
      }
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    // Pare a faixa de visualização se ela não for a faixa ativa (ou seja, desligue a luz da câmera!)
    if (!localVideo) {
      previewVideo?.stop();
    }
    setIsOpen(false);
  };

  function deviceChange(
    deviceID: string,
    type: "video" | "audioInput" | "audioOutput"
  ) {
    const deviceList =
      type === "video"
        ? videoInputDevices
        : type === "audioInput"
        ? audioInputDevices
        : audioOutputDevices;
    const device = findDeviceByID(deviceID, deviceList);
    console.log(`changed ${type} to `, device?.label);

  /* TODO: NECESSIDADE DE ADICIONAR NA CONFIGURAÇÃO DO DISPOSITIVO A COMUTAÇÃO PARA ENTRADA E SAÍDA DE ÁUDIO */
    if (type === "video" && previewVideo?.mediaStreamTrack.id !== deviceID) {
      setStoredLocalVideoDeviceId(deviceID);
      localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, deviceID);
      generatePreviewVideoTrack(deviceID);
    }
    if (type === "audioInput") {
      setStoredLocalAudioInputDeviceId(deviceID);
      localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, deviceID);
      generatePreviewAudioTrack(deviceID);
    }
    if (type === "audioOutput") {
      setStoredLocalAudioOutputDeviceId(deviceID);
      localStorage.setItem(SELECTED_AUDIO_OUTPUT_KEY, deviceID);
      setActiveSinkId(deviceID);
    }
  }

  function generatePreviewVideoTrack(deviceID: string) {
    if (previewVideo) {
      previewVideo.restart({
        deviceId: { exact: deviceID },
      });
    } else {
      Video.createLocalVideoTrack({
        deviceId: { exact: deviceID },
      })
        .then((newTrack) => {
          setPreviewVideo(newTrack);
        })
        .catch((error) => {
          toaster.push({
            message: `Error creating local track - ${error.message}`,
            variant: "error",
          });
        });
    }
  }

  function generatePreviewAudioTrack(deviceID: string) {
    if (previewAudio) {
      previewAudio.restart({
        deviceId: { exact: deviceID },
      });
    } else {
      Video.createLocalAudioTrack({
        deviceId: { exact: deviceID },
      })
        .then((newTrack) => {
          setPreviewAudio(newTrack);
        })
        .catch((error) => {
          toaster.push({
            message: `Error creating local track - ${error.message}`,
            variant: "error",
          });
        });
    }
  }

  useEffect(() => {
    console.log("useEffect > ConfigureSettings");
    console.log("devicePermissions", devicePermissions);
  }, [devicePermissions]);

  return (
    <Flex hAlignContent={"center"} width="100%">
      <SubContainer>
        <div className="custom-buttom custom-button-1">
          <button onClick={handleOpen}>
            <BsThreeDotsVertical/>
            {!room ? "Configurações" : null}
          </button>
        </div>
      </SubContainer>
      <ModalContainer>
        <Modal
          ariaLabelledby={modalHeadingID}
          isOpen={isOpen}
          onDismiss={handleClose}
          size="default"
        >
          <ModalHeader>
            <ModalHeading as="h3" id={modalHeadingID}>
              {CONFIGURE_SETTINGS_HEADER}
            </ModalHeading>
          </ModalHeader>
          <ModalBody>
            <Paragraph>{CONFIGURE_SETTINGS_DESCRIPTION}</Paragraph>
            <Stack orientation={"vertical"} spacing="space60">
              {devicePermissions.camera && (
                <VideoPreview
                  identity={identity ?? "Guest"}
                  localVideo={previewVideo}
                />
              )}
              <Stack orientation="vertical" spacing="space30">
                <Label htmlFor="author">
                  Video{" "}
                  {devicePermissions.camera && localVideo === undefined
                    ? "(desabilitado)"
                    : localVideo?.isStopped
                    ? "(interrompido)"
                    : ""}
                </Label>
                <Select
                  id="author"
                  onChange={(e) => deviceChange(e.target.value, "video")}
                  defaultValue={
                    devicePermissions.camera
                      ? videoInputDeviceId ?? ""
                      : "no-cam-permission"
                  }
                  disabled={
                    videoInputDevices.length < 2 || !devicePermissions.camera
                  }
                >
                  {devicePermissions.camera ? (
                    videoInputDevices.map((videoInput: MediaDeviceInfo) => (
                      <Option
                        key={videoInput.deviceId}
                        value={videoInput.deviceId}
                      >
                        {videoInput.label}
                      </Option>
                    ))
                  ) : (
                    <Option key="no-cam-permission" value="no-cam-permission">
                      As permissões da câmara não foram concedidas no browser
                    </Option>
                  )}
                </Select>
              </Stack>
              <Stack orientation="vertical" spacing="space30">
                <Label htmlFor="author">Entrada de áudio</Label>
                <Select
                  id="author"
                  onChange={(e) => deviceChange(e.target.value, "audioInput")}
                  defaultValue={
                    devicePermissions.microphone
                      ? audioInputDeviceId
                      : "no-mic-permission"
                  }
                  disabled={
                    audioInputDevices.length < 2 || !devicePermissions.microphone
                  }
                >
                  {devicePermissions.microphone ? (
                    audioInputDevices.map((audioInput: MediaDeviceInfo) => (
                      <Option
                        key={audioInput.deviceId}
                        value={audioInput.deviceId}
                      >
                        {audioInput.label}
                      </Option>
                    ))
                  ) : (
                    <Option key="no-mic-permission" value="no-mic-permission">
                      As permissões de microfone não foram concedidas no browser
                    </Option>
                  )}
                </Select>
              </Stack>
              <Stack orientation="vertical" spacing="space30">
                <Label htmlFor="author">Saída de áudio</Label>
                <Select
                  id="author"
                  onChange={(e) => deviceChange(e.target.value, "audioOutput")}
                  defaultValue={
                    devicePermissions.microphone
                      ? audioOutputDeviceId
                      : "no-mic-permission"
                  }
                >
                  {devicePermissions.microphone ? (
                    audioOutputDevices.map((audioOutput: MediaDeviceInfo) => (
                      <Option
                        key={audioOutput.deviceId}
                        value={audioOutput.deviceId}
                      >
                        {audioOutput.label}
                      </Option>
                    ))
                  ) : (
                    <Option key="no-mic-permission" value="no-mic-permission">
                      As permissões de microfone não foram concedidas no navegador
                    </Option>
                  )}
                </Select>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ModalFooterActions>
              <button onClick={handleClose}>Fechar</button>
            </ModalFooterActions>
          </ModalFooter>
        </Modal>
      </ModalContainer>
    </Flex>
  );
}
