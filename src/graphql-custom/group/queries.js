import group0002 from "./fields/group0002";
import group0001 from "./fields/group0001";

export const listGroupsForAddPost = /* GraphQL */ `
  query listGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items ${group0002}
    }
  }
`;

export const getGroupView = /* GraphQL */ `
  query getGroup($id: ID!) {
    getGroup(id: $id) ${group0001}
  }
`;