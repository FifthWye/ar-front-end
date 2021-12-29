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
  const response = await http.delete(apiEndpoint + '/', {
    data: {
      botId,
    },
  });

  return response;
}

async function setActiveValue(botId, isActive) {
  const response = await http.patch(apiEndpoint + '/isActive', {
    botId,
    isActive,
  });

  return response;
}

async function editCredentials(botId, username, password) {
  const response = await http.patch(apiEndpoint + '/credentials', {
    botId,
    username,
    password,
  });

  return response;
}

async function editDefaultReply(botId, defaultReply) {
  const response = await http.patch(apiEndpoint + '/default-reply', {
    botId,
    defaultReply,
  });

  return response;
}

//=========================Replies=========================//

async function getReplies(botId, pageNum, pageSize) {
  const params = pageNum && pageSize ? { botId, pageNum, pageSize } : { botId };
  const response = await http.get(apiEndpoint + '/reply', { params });

  return response;
}

async function addReply(botId, keywords, answer) {
  console.log(botId, keywords, answer)
  const response = await http.post(apiEndpoint + '/reply', {
    botId,
    keywords,
    answer,
  });

  return response;
}

async function editReply(botId, replyId, keywords, reply) {
  //   botId = "61a2916743f8014cb8b42828";
  //   replyId = "61a29232a168db4a24186025";
  //   keywords = ["Darov", "Privet", "Hola"];
  //   reply = "Zdarova zaebal";
  const response = await http.patch(apiEndpoint + '/reply', {
    botId,
    replyId,
    keywords,
    reply,
  });
  return JSON.stringify(response.data.reply);
}

async function deleteReply(botId, replyId) {
  //   botId = "61a2916743f8014cb8b42828";
  //   replyId = "61a292a3a168db4a24186028";
  console.log(botId, replyId)
  const response = await http.delete(apiEndpoint + '/reply', {
    data: {
      botId,
      replyId,
    },
  });
  return JSON.stringify(response.data.reply);
}

//=========================Moderators=========================//

async function inviteModerator(userToInviteId, botId) {
  //   userToInviteId = "61a2947d4c8a5447bc7339fb";
  //   botId = "61a2916743f8014cb8b42828";
  const response = await http.patch(apiEndpoint + '/invite-moderator', {
    userToInviteId,
    botId,
  });
  return JSON.stringify(response.data.bot);
}

async function removeModerator(userToRemoveId, botId) {
  //   userToRemoveId = "61a2947d4c8a5447bc7339fb";
  //   botId = "61a2916743f8014cb8b42828";
  const response = await http.patch(apiEndpoint + '/remove-moderator', {
    userToRemoveId,
    botId,
  });
  return JSON.stringify(response.data.bot);
}

export const botService = {
  getBots,
  createBot,
  deleteBot,
  getReplies,
  addReply,
  deleteReply,
  editReply,
  inviteModerator,
  removeModerator,
  setActiveValue,
  editCredentials,
  editDefaultReply,
};
