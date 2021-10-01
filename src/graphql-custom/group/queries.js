import group0002 from "./fields/group0002";

export const listGroupsForAddPost = /* GraphQL */ `
  query listGroups {
    listGroups {
      items ${group0002}
    }
  }
`;