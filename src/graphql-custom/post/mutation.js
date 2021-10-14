import post0001 from "./fields/post0001";
import post0002 from "./fields/post0002";

export const createPost = /* GraphQL */ `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) ${post0002}
    }
`;

export const updatePost = /* GraphQL */ `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) ${post0002}
    }
`;

export const createReaction = /* GraphQL */ `
    mutation createReaction($input: CreateReactionsInput!) {
        createReactions(input: $input) ${post0001}
    }
`;

export const deleteReaction = /* GraphQL */ `
    mutation deleteReaction($input: DeleteReactionsInput!) {
        deleteReactions(input: $input) ${post0001}
    }
`;
