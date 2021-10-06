import post0002 from "./fields/post0002";
import post0004 from "./fields/post0004";

export const getPost = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) ${post0002}
    }
`;

export const getPostByStatus = /* GraphQL */ `
    query getPostByStatus {
        getPostByStatus(status: "PENDING") {
            items ${post0004}
        }
    }
`;
