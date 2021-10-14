import groupUsers0001 from "./fields/groupUsers0001";


export const createGroupUsers = /* GraphQL */ `
    mutation CreateGroupUsers($input: CreateGroupUsersInput!) {
        createGroupUsers(input: $input) ${groupUsers0001}
    }
`;

