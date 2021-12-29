import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/bot';

async function getBots() {
  const response = await http.get(apiEndpoint + '/', {});
  return response;
}

async function createBot(instagramUrl) {
  instagramUrl = 'link';
  const response = await http.post(apiEndpoint + '/', { instagramUrl });
  return JSON.stringify(response.data.bot);
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
  console.log(botId, isActive);
  const response = await http.patch(apiEndpoint + '/isActive', {
    botId,
    isActive,
  });
  console.log(response);
  return JSON.stringify(response.data.bot);
}

//=========================Replies=========================//

async function getReplies(botId, pageNum, pageSize) {
  //   botId = "61a2916743f8014cb8b42828";
  //   pageNum = "1";
  //   pageSize = "10";
  const response = await http.get(apiEndpoint + '/reply', {
    botId,
    pageNum,
    pageSize,
  });
  return JSON.stringify(response.data.bot);
}

async function addReply(botId, keywords, reply) {
  //   botId = "61a2916743f8014cb8b42828";
  //   keywords = ["Hello", "Hola"];
  //   reply = "Baka";
  const response = await http.post(apiEndpoint + '/reply', {
    botId,
    keywords,
    reply,
  });
  return JSON.stringify(response.data.reply);
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
};
