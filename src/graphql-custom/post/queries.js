import post0002 from "./fields/post0002";

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) ${post0002}
  }
`;