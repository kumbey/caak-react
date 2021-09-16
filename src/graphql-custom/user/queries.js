import user0001 from "./fields/user0001";

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) ${user0001}
  }
`;