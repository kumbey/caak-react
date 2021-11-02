/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      type
      createdAt
      updatedAt
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      nickname
      birthdate
      gender
      pic_id
      cover_pic_id
      about
      aura
      is_public
      status
      followed
      verified
      createdAt
      updatedAt
      pic {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      cover_pic {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      totals {
        user_id
        pending
        confirmed
        archived
        reported
        drafted
        following
        followers
        post_reactions
        post_items_reactions
        comment_reactions
        unseen
        createdAt
        updatedAt
      }
      username {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      category {
        items {
          id
          user_id
          category_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUserTotal = /* GraphQL */ `
  query GetUserTotal($user_id: ID!) {
    getUserTotal(user_id: $user_id) {
      user_id
      pending
      confirmed
      archived
      reported
      drafted
      following
      followers
      post_reactions
      post_items_reactions
      comment_reactions
      unseen
      createdAt
      updatedAt
    }
  }
`;
export const listUserTotals = /* GraphQL */ `
  query ListUserTotals(
    $user_id: ID
    $filter: ModelUserTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserTotals(
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        pending
        confirmed
        archived
        reported
        drafted
        following
        followers
        post_reactions
        post_items_reactions
        comment_reactions
        unseen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupTotal = /* GraphQL */ `
  query GetGroupTotal($group_id: ID!) {
    getGroupTotal(group_id: $group_id) {
      group_id
      pending
      confirmed
      member
      admin
      moderator
      unseen
      createdAt
      updatedAt
    }
  }
`;
export const listGroupTotals = /* GraphQL */ `
  query ListGroupTotals(
    $group_id: ID
    $filter: ModelGroupTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroupTotals(
      group_id: $group_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        group_id
        pending
        confirmed
        member
        admin
        moderator
        unseen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsername = /* GraphQL */ `
  query GetUsername($id: ID!) {
    getUsername(id: $id) {
      id
      id_name
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
    }
  }
`;
export const listUsernames = /* GraphQL */ `
  query ListUsernames(
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const userByIdName = /* GraphQL */ `
  query UserByIdName(
    $id_name: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByIdName(
      id_name: $id_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getAura = /* GraphQL */ `
  query GetAura($user_id: ID!) {
    getAura(user_id: $user_id) {
      user_id
      point
      createdAt
      updatedAt
    }
  }
`;
export const listAuras = /* GraphQL */ `
  query ListAuras(
    $user_id: ID
    $filter: ModelAuraFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAuras(
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        point
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollowedUsers = /* GraphQL */ `
  query GetFollowedUsers($user_id: ID!, $followed_user_id: ID!) {
    getFollowedUsers(user_id: $user_id, followed_user_id: $followed_user_id) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const listFollowedUsers = /* GraphQL */ `
  query ListFollowedUsers(
    $user_id: ID
    $followed_user_id: ModelIDKeyConditionInput
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowedUsers(
      user_id: $user_id
      followed_user_id: $followed_user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byFollowed = /* GraphQL */ `
  query ByFollowed(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFollowed(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byFollowing = /* GraphQL */ `
  query ByFollowing(
    $followed_user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFollowing(
      followed_user_id: $followed_user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        followed_user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserCategory = /* GraphQL */ `
  query GetUserCategory($user_id: ID!, $category_id: ID!) {
    getUserCategory(user_id: $user_id, category_id: $category_id) {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const listUserCategories = /* GraphQL */ `
  query ListUserCategories(
    $user_id: ID
    $category_id: ModelIDKeyConditionInput
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserCategories(
      user_id: $user_id
      category_id: $category_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        category_id
        createdAt
        updatedAt
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        icon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      commentType
      status
      user_id
      updated_user_id
      group_id
      category_id
      reacted
      updatedAt
      createdAt
      version
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      updated_user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      items {
        items {
          id
          post_id
          user_id
          file_id
          title
          order
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        reactions
        views
        shares
        createdAt
        updatedAt
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        totals {
          group_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByStatus = /* GraphQL */ `
  query GetPostByStatus(
    $status: String
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByStatus(
      status: $status
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByGroup = /* GraphQL */ `
  query GetPostByGroup(
    $group_id: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByGroup(
      group_id: $group_id
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByUser = /* GraphQL */ `
  query GetPostByUser(
    $user_id: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByUser(
      user_id: $user_id
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostItems = /* GraphQL */ `
  query GetPostItems($id: ID!) {
    getPostItems(id: $id) {
      id
      post_id
      user_id
      file_id
      title
      order
      reacted
      createdAt
      updatedAt
      file {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      post {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      totals {
        post_item_id
        reactions
        comments
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          user_id
          post_item_id
          comment
          status
          type
          parent_id
          replyUserID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPostItems = /* GraphQL */ `
  query ListPostItems(
    $filter: ModelPostItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        user_id
        file_id
        title
        order
        reacted
        createdAt
        updatedAt
        file {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        post {
          id
          title
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          updatedAt
          createdAt
          version
        }
        totals {
          post_item_id
          reactions
          comments
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPostTotal = /* GraphQL */ `
  query GetPostTotal($post_id: ID!) {
    getPostTotal(post_id: $post_id) {
      post_id
      reactions
      views
      shares
      createdAt
      updatedAt
    }
  }
`;
export const listPostTotals = /* GraphQL */ `
  query ListPostTotals(
    $post_id: ID
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostTotals(
      post_id: $post_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        post_id
        reactions
        views
        shares
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostItemsTotal = /* GraphQL */ `
  query GetPostItemsTotal($post_item_id: ID!) {
    getPostItemsTotal(post_item_id: $post_item_id) {
      post_item_id
      reactions
      comments
      createdAt
      updatedAt
    }
  }
`;
export const listPostItemsTotals = /* GraphQL */ `
  query ListPostItemsTotals(
    $post_item_id: ID
    $filter: ModelPostItemsTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostItemsTotals(
      post_item_id: $post_item_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        post_item_id
        reactions
        comments
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostHistory = /* GraphQL */ `
  query GetPostHistory($id: ID!) {
    getPostHistory(id: $id) {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const listPostHistories = /* GraphQL */ `
  query ListPostHistories(
    $filter: ModelPostHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        post
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostViews = /* GraphQL */ `
  query GetPostViews($post_id: ID!, $user_id: ID!) {
    getPostViews(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const listPostViews = /* GraphQL */ `
  query ListPostViews(
    $post_id: ID
    $user_id: ModelIDKeyConditionInput
    $filter: ModelPostViewsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostViews(
      post_id: $post_id
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        post_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostShares = /* GraphQL */ `
  query GetPostShares($id: ID!) {
    getPostShares(id: $id) {
      id
      post_id
      user_id
      description
      source
      link
      createdAt
      updatedAt
    }
  }
`;
export const listPostShares = /* GraphQL */ `
  query ListPostShares(
    $filter: ModelPostSharesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        user_id
        description
        source
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      user_id
      post_item_id
      comment
      status
      type
      parent_id
      replyUserID
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      replyTo {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      post_item {
        id
        post_id
        user_id
        file_id
        title
        order
        reacted
        createdAt
        updatedAt
        file {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        post {
          id
          title
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          updatedAt
          createdAt
          version
        }
        totals {
          post_item_id
          reactions
          comments
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
      sub {
        items {
          id
          user_id
          post_item_id
          comment
          status
          type
          parent_id
          replyUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        comment_id
        reactions
        createdAt
        updatedAt
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        post_item_id
        comment
        status
        type
        parent_id
        replyUserID
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          order
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
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
      items {
        id
        user_id
        post_item_id
        comment
        status
        type
        parent_id
        replyUserID
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          order
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCommentTotal = /* GraphQL */ `
  query GetCommentTotal($comment_id: ID!) {
    getCommentTotal(comment_id: $comment_id) {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const listCommentTotals = /* GraphQL */ `
  query ListCommentTotals(
    $comment_id: ID
    $filter: ModelCommentTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommentTotals(
      comment_id: $comment_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        comment_id
        reactions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReactions = /* GraphQL */ `
  query GetReactions($id: ID!, $user_id: ID!) {
    getReactions(id: $id, user_id: $user_id) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const listReactions = /* GraphQL */ `
  query ListReactions(
    $id: ID
    $user_id: ModelIDKeyConditionInput
    $filter: ModelReactionsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listReactions(
      id: $id
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        type
        on_to
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReportedPost = /* GraphQL */ `
  query GetReportedPost($id: ID!) {
    getReportedPost(id: $id) {
      id
      reason
      status
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      post {
        id
        title
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        updatedAt
        createdAt
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          reactions
          views
          shares
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const listReportedPosts = /* GraphQL */ `
  query ListReportedPosts(
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reason
        status
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        post {
          id
          title
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          updatedAt
          createdAt
          version
        }
        type {
          id
          name
          status
          description
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getReportType = /* GraphQL */ `
  query GetReportType($id: ID!) {
    getReportType(id: $id) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const listReportTypes = /* GraphQL */ `
  query ListReportTypes(
    $filter: ModelReportTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupUsers = /* GraphQL */ `
  query GetGroupUsers($user_id: ID!, $group_id: ID!) {
    getGroupUsers(user_id: $user_id, group_id: $group_id) {
      id
      user_id
      group_id
      role
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        totals {
          group_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroupUsers = /* GraphQL */ `
  query ListGroupUsers(
    $user_id: ID
    $group_id: ModelIDKeyConditionInput
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroupUsers(
      user_id: $user_id
      group_id: $group_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroupUsersByGroup = /* GraphQL */ `
  query GetGroupUsersByGroup(
    $group_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getGroupUsersByGroup(
      group_id: $group_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      category_id
      about
      founder_id
      rating
      followed
      role_on_group
      createdAt
      updatedAt
      profile {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      cover {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        createdAt
        updatedAt
      }
      founder {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      totals {
        group_id
        pending
        confirmed
        member
        admin
        moderator
        unseen
        createdAt
        updatedAt
      }
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
      members {
        items {
          id
          user_id
          group_id
          role
          createdAt
          updatedAt
        }
        nextToken
      }
      username {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        totals {
          group_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroupUsername = /* GraphQL */ `
  query GetGroupUsername($id: ID!) {
    getGroupUsername(id: $id) {
      id
      id_name
      createdAt
      updatedAt
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
        totals {
          group_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroupUsernames = /* GraphQL */ `
  query ListGroupUsernames(
    $filter: ModelGroupUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const groupByIdName = /* GraphQL */ `
  query GroupByIdName(
    $id_name: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupByIdName(
      id_name: $id_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      section
      type
      item_id
      action
      from
      to
      seen
      updatedAt
      createdAt
      version
      from_user {
        id
        firstname
        lastname
        nickname
        birthdate
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          createdAt
          updatedAt
        }
        totals {
          user_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          post_reactions
          post_items_reactions
          comment_reactions
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listNotificationByUser = /* GraphQL */ `
  query ListNotificationByUser(
    $to: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationByUser(
      to: $to
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listNotificationByUserAndSeen = /* GraphQL */ `
  query ListNotificationByUserAndSeen(
    $to: ID
    $seen: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationByUserAndSeen(
      to: $to
      seen: $seen
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
