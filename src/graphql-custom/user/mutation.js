import user0001 from "./fields/user0001";
import user0002 from "./fields/user0002";

export const createUserCustom = /* GraphQL */ `
  mutation createUserCustom($input: CreateUserInputCustom!) {
    createUserCustom(input: $input) ${user0001}
  }
`;

export const createFollowedUsers = /* GraphQL */ `
  mutation createFollowedUsers($input: CreateFollowedUsersInput!) {
    createFollowedUsers(input: $input) ${user0002}
  }
`;
export const deleteFollowedUsers = /* GraphQL */ `
  mutation deleteFollowedUsers($input: DeleteFollowedUsersInput!) {
    deleteFollowedUsers(input: $input) ${user0002}
  }
`;
