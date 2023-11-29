const SELECT_MEMBER = "member/SELECT_MEMBER";

export const selectMember = (payload) => {
  return { type: SELECT_MEMBER, payload };
};

const initialState = "";

const member = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MEMBER:
      const activeMember = action.payload;
      return activeMember;
    default:
      return state;
  }
};

export default member;
