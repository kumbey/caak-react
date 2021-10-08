const post0004 = /* GraphQL */ `
  {
    id
    title
    status
    updatedAt
    user {
      id
      followed
      aura
      about
      totals {
        followers
      }
      nickname
      pic {
        bucket
        createdAt
        ext
        id
        key
        level
        name
        owner
        region
        type
      }
    }
    group {
      name
      profile {
        bucket
        createdAt
        ext
        id
        key
        level
        name
        owner
        region
        type
        updatedAt
      }
    }

    totals {
      reactions
    }
    reacted
    items {
      items {
        id
        title
        reacted
        comments {
          items {
            comment
          }
        }
        file {
          bucket
          createdAt
          ext
          id
          key
          level
          name
          owner
          region
          type
          updatedAt
        }
        totals {
          reactions
          comments
        }
      }
    }
  }
`;

export default post0004;
