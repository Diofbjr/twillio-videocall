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
  "Não conseguia ouvir",
  "Outros não conseguiram ouvir",
  "O vídeo era de baixa qualidade",
  "O vídeo congelou ou ficou instável",
  "Não foi possível ver os participantes",
  "O som não correspondia ao vídeo",
  "Os participantes não conseguiam me ver",
  "Outro problema",
];

// Static strings of text used throughout the applcation
export const TEXT_COPY = {
  ROOM_NAME_INPUT_DISABLED: "O nome da sala foi preenchido automaticamente pelo URL do convite",
  ROOM_NAME_INPUT_ENABLED:
    "",
  PERMISSIONS_CHECK_WARNING:
    "Para participar ativamente da chamada de vídeo, este aplicativo precisará de permissão para acessar sua câmera e seu microfone. Após a confirmação, o navegador solicitará a permissão.",
  HELP_TEXT_PRELIGHT_PASSED: "",
  HELP_TEXT_PRELIGHT_FAILED:
    "",
  CONFIGURE_SETTINGS_HEADER: "Configurações de audio e video",
  CONFIGURE_SETTINGS_DESCRIPTION: "Configure as definições de áudio e vídeo",
  LEAVE_ROOM_CONFIRMATION_HEADER: "Sair da chamada?",
  LEAVE_ROOM_CONFIRMATION_DESCRIPTION:
    "Tem certeza de que deseja sair da sala de vídeo?",
  DISCONNECT_ERROR_HEADER:
    "Você foi desconectado da sala devido a um erro:",
  SURVEY_COLLECTION_HEADER: "Pesquisa / Coleta de experiências",
  SURVEY_COLLECTION_DESCRIPTION:
    "Use esse estado do aplicativo para coletar pesquisas pós-sala de vídeo (avaliar a experiência geral, os problemas enfrentados, etc.)",
};
