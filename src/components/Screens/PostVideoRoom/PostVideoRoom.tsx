import React from "react";
import {
  Flex,
  Card,
  Button,
  Separator,
} from "@twilio-paste/core";

import { useVideoStore, VideoAppState } from "../../../store/store";
import { CenterContent, MaxWidthDiv } from "../../styled";
import { disconnectErrors } from "../../../lib/utils/errorDictionary";
import SurveyCollection from "./SurveyCollection/SurveyCollection";
import { TEXT_COPY } from "../../../lib/constants";

export default function PostVideoRoom({}) {
  const { DISCONNECT_ERROR_HEADER } = TEXT_COPY;
  const { formData, resetState, disconnectError } = useVideoStore(
    (state: VideoAppState) => state
  );

  const errorCode = disconnectError?.code;
  const errorInfo = !!errorCode ? disconnectErrors[errorCode] : null;

  return (
    <CenterContent>
      <Flex
        hAlignContent={"center"}
        vertical
        vAlignContent={"center"}
        height="100%"
      >
        <MaxWidthDiv>
          <Card>
            <SurveyCollection />
            <Separator orientation="horizontal" verticalSpacing="space50" />
            <Flex marginTop={"space60"}>
              <Button
                type="submit"
                variant="destructive"
                style={{ background: "#F22F46" }}
                onClick={() => resetState()}
              >
                Entrar em outra sala
              </Button>
            </Flex>
          </Card>
        </MaxWidthDiv>
      </Flex>
    </CenterContent>
  );
}
