import post0001 from "./fields/post0001";

export const createPost = /* GraphQL */ `
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) ${post0001}
  }
`;