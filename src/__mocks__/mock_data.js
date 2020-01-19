export const user1 = {
  id: 'user_id_1',
  name: "ahyoung",
  avatar: "http://gravatar.com/avatar/495ae033594ea91586b4c9e1c4b752cf",
};

export const user2 = {
  id: 'user_id_2',
  name: "mina",
  avatar: "http://gravatar.com/avatar/495ae033594esdsdcj023kjdkfj752cf",
}

export const user3 = {
  id: 'user_id_3',
  name: "anthony",
  avatar: "http://gravatar.com/avatar/4sdsd2323a4esdsdcj023kjdkfj752cf",
}

export const chatRoom1 = {
  id: 'chatroom_id_1',
  name: 'React Users',
  members: [user1.id, user2.id],
  createdBy: user1,
};

export const chatRoom2 = {
  id: 'chatroom_id_2',
  name: 'Vue Users',
  members: [user1.id, user2.id, user3.id],
  createdBy: user3,
};

export const mockState = {
  user: {
    currentUser: user1,
  },
  chatRoom: {
    currentChatRoom: chatRoom1,
  },
}

