const post0004 = /* GraphQL */ `
  {
    id
    title
    status
    updatedAt
    user {
      firstname
      id
      followed
      aura {
        point
      }
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

    items {
      items {
        title
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
