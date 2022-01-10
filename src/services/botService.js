import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/bot';

async function getBots() {
  const response = await http.get(apiEndpoint + '/', {});

  return response;
}

async function createBot(credentials) {
  const response = await http.post(apiEndpoint + '/', credentials);

  return response;
}

async function deleteBot(botId) {
  const response = await http.delete(apiEndpoint + '/' + botId);

  return response;
}

async function setActiveValue(botId, isActive) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/isActive', {
    isActive,
  });

  return response;
}

async function editCredentials(botId, username, password) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/credentials', {
    username,
    password,
  });

  return response;
}

async function editDefaultReply(botId, defaultReply) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/default-reply', {
    defaultReply,
  });

  return response;
}

//=========================Replies=========================//

async function getReplies(botId, pageNum, pageSize) {
  const response = await http.get(apiEndpoint + '/' + botId + '/reply', {
    params: { pageNum: pageNum || 1, pageSize: pageSize || 10 },
  });
  return response;
}

async function addReply(botId, keywords, answer) {
  const response = await http.post(apiEndpoint + '/' + botId + '/reply', {
    keywords,
    answer,
  });

  return response;
}

async function editReply(botId, replyId, keywords, answer) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/reply/' + replyId, {
    keywords,
    answer,
  });
  return response;
}

async function deleteReply(botId, replyId) {
  const response = await http.delete(apiEndpoint + '/' + botId + '/reply/' + replyId);
  return response;
}

async function setReplyActiveValue(botId, replyId, isActive) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/reply/' + replyId+ '/isActive', {
    isActive,
  });
  return response;
}
//=========================Moderators=========================//

async function inviteModerator(userToInviteEmail, botId) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/invite-moderator', {
    userToInviteEmail,
  });
  return response;
}

async function removeModerator(userToRemoveId, botId) {
  const response = await http.patch(apiEndpoint + '/' + botId + '/remove-moderator', {
    userToRemoveId,
  });
  return response;
}

export const botService = {
  getBots,
  createBot,
  deleteBot,
  getReplies,
  addReply,
  deleteReply,
  editReply,
  setReplyActiveValue,
  inviteModerator,
  removeModerator,
  setActiveValue,
  editCredentials,
  editDefaultReply,
};
