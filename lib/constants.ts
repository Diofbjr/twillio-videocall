// TODO: Use DEFAULT_VIDEO_CONSTRAINTS
export const DEFAULT_VIDEO_CONSTRAINTS: MediaStreamConstraints["video"] = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

// These are used to store the selected media devices in localStorage
export const SELECTED_AUDIO_INPUT_KEY = "TwilioVideoApp-selectedAudioInput";
export const SELECTED_AUDIO_OUTPUT_KEY = "TwilioVideoApp-selectedAudioOutput";
export const SELECTED_VIDEO_INPUT_KEY = "TwilioVideoApp-selectedVideoInput";

export const GALLERY_VIEW_ASPECT_RATIO = 9 / 16; // 16:9
export const GALLERY_VIEW_MARGIN = 4;

// List of possible issues to select in post-video room survey
export const ROOM_ISSUES_FEEDBACK_OPTIONS = [
  "Couldn't hear",
  "Others couldn't hear",
  "Video was low quality",
  "Video froze or was choppy",
  "Couldn't see participants",
  "Sound didn't match video",
  "Participants couldn't see me",
  "Other issue",
];

// Static strings of text used throughout the applcation
export const TEXT_COPY = {
  ROOM_NAME_INPUT_DISABLED: "Room name was auto-populated by invite URL",
  ROOM_NAME_INPUT_ENABLED:
    "",
  PERMISSIONS_CHECK_WARNING:
    "Para participar ativamente na vídeo-chamada, esta aplicação necessitará de permissão para aceder à sua câmara e microfone.",
  HELP_TEXT_PRELIGHT_PASSED: "",
  HELP_TEXT_PRELIGHT_FAILED:
    "",
  CONFIGURE_SETTINGS_HEADER: "Audio & Video Settings",
  CONFIGURE_SETTINGS_DESCRIPTION: "Configure as definições de áudio e vídeo",
  LEAVE_ROOM_CONFIRMATION_HEADER: "Leave Room?",
  LEAVE_ROOM_CONFIRMATION_DESCRIPTION:
    "Are you sure you want to leave the video room?",
  DISCONNECT_ERROR_HEADER:
    "You were disconnected from the room due to an error:",
  SURVEY_COLLECTION_HEADER: "Survey / Experience Collection",
  SURVEY_COLLECTION_DESCRIPTION:
    "Use this state of the application to gather post video room surveys (gauge the overall experience, issues faced, etc.)",
};
