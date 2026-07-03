export const USER_PATTERNS = {
  REGISTER: { cmd: 'usuarios.register' },
  LOGIN: { cmd: 'usuarios.login' },
  FIND_ALL: { cmd: 'usuarios.find_all' },
  FIND_ONE: { cmd: 'usuarios.find_one' },
  UPDATE: { cmd: 'usuarios.update' },
  DELETE: { cmd: 'usuarios.delete' },

  CREATE_PHOTO: { cmd: 'usuarios.create_photo' },
  FIND_PHOTOS_BY_USER: { cmd: 'usuarios.find_photos_by_user' },

  CREATE_SUBSCRIPTION: { cmd: 'usuarios.create_subscription' },
  FIND_SUBSCRIPTION_BY_USER: { cmd: 'usuarios.find_subscription_by_user' },
};

export const MATCH_PATTERNS = {
  CREATE_INTERACTION: { cmd: 'matches.create_interaction' },
  FIND_INTERACTIONS_BY_USER: { cmd: 'matches.find_interactions_by_user' },
  FIND_MATCHES_BY_USER: { cmd: 'matches.find_matches_by_user' },
  FIND_MATCH_BY_ID: { cmd: 'matches.find_match_by_id' },
};

export const MESSAGE_PATTERNS = {
  CREATE_CHAT: { cmd: 'mensajeria.create_chat' },
  FIND_CHAT_BY_ID: { cmd: 'mensajeria.find_chat_by_id' },
  SEND_MESSAGE: { cmd: 'mensajeria.send_message' },
  GET_MESSAGES_BY_CHAT: { cmd: 'mensajeria.get_messages_by_chat' },
};

export const EVENTS = {
  MATCH_CREATED: 'match.created',
};
