import { MediaObject, MediaFigure, MediaBody, Text } from "@twilio-paste/core";
import Image from "next/image";
import React from "react";

interface RoomInfoProps {
  roomName: string | undefined;
  numParticipants: number;
}

export default function RoomInfo({ roomName, numParticipants }: RoomInfoProps) {
  return (
    <MediaObject as="div" verticalAlign="center">
      <MediaFigure as="div" spacing="space30">
        <Image src={"https://hosted-assets-2838-dev.twil.io/twl-vid.png"} alt={""}height={28}/>
      </MediaFigure>
      <MediaBody as="div">
        <Text as="p" fontSize="fontSize30" fontWeight="fontWeightMedium">
          {roomName}
        </Text>
        <Text as="p" fontSize="fontSize20">
          {numParticipants} participant{numParticipants > 1 && "s"}
        </Text>
      </MediaBody>
    </MediaObject>
  );
}
