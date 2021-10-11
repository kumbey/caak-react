import comment0002 from "./fields/comment0002";

export const getCommentsByPostItem = /* GraphQL */ `
    query GetCommentsByPostItem(
        $post_item_id: ID
        $sortDirection: ModelSortDirection
        $filter: ModelCommentFilterInput
        $limit: Int
        $nextToken: String
    ) {
        getCommentsByPostItem(
            post_item_id: $post_item_id
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items ${comment0002}
            nextToken
        }
    }
`;
