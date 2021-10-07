import group0002 from "./fields/group0002";

export const listGroupsForAddPost = /* GraphQL */ `
  query listGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items ${group0002}
    }
  }
`;