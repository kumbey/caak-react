/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const changedTotals = /* GraphQL */ `
  mutation ChangedTotals($type: String!, $id: ID!, $totals: String!) {
    changedTotals(type: $type, id: $id, totals: $totals) {
      type
      id
      totals
    }
  }
`;
export const notificationAdded = /* GraphQL */ `
  mutation NotificationAdded($section: String!, $to: ID!, $id: ID!) {
    notificationAdded(section: $section, to: $to, id: $id) {
      section
      to
      id
    }
  }
`;
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFollowedUsers = /* GraphQL */ `
  mutation CreateFollowedUsers(
    $input: CreateFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    createFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowedUsers = /* GraphQL */ `
  mutation UpdateFollowedUsers(
    $input: UpdateFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    updateFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowedUsers = /* GraphQL */ `
  mutation DeleteFollowedUsers(
    $input: DeleteFollowedUsersInput!
    $condition: ModelFollowedUsersConditionInput
  ) {
    deleteFollowedUsers(input: $input, condition: $condition) {
      user_id
      followed_user_id
      createdAt
      updatedAt
    }
  }
`;
export const createUserCategory = /* GraphQL */ `
  mutation CreateUserCategory(
    $input: CreateUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    createUserCategory(input: $input, condition: $condition) {
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
export const updateUserCategory = /* GraphQL */ `
  mutation UpdateUserCategory(
    $input: UpdateUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    updateUserCategory(input: $input, condition: $condition) {
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
export const deleteUserCategory = /* GraphQL */ `
  mutation DeleteUserCategory(
    $input: DeleteUserCategoryInput!
    $condition: ModelUserCategoryConditionInput
  ) {
    deleteUserCategory(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createPostItems = /* GraphQL */ `
  mutation CreatePostItems(
    $input: CreatePostItemsInput!
    $condition: ModelPostItemsConditionInput
  ) {
    createPostItems(input: $input, condition: $condition) {
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
export const updatePostItems = /* GraphQL */ `
  mutation UpdatePostItems(
    $input: UpdatePostItemsInput!
    $condition: ModelPostItemsConditionInput
  ) {
    updatePostItems(input: $input, condition: $condition) {
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
export const deletePostItems = /* GraphQL */ `
  mutation DeletePostItems(
    $input: DeletePostItemsInput!
    $condition: ModelPostItemsConditionInput
  ) {
    deletePostItems(input: $input, condition: $condition) {
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
export const createPostHistory = /* GraphQL */ `
  mutation CreatePostHistory(
    $input: CreatePostHistoryInput!
    $condition: ModelPostHistoryConditionInput
  ) {
    createPostHistory(input: $input, condition: $condition) {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const updatePostHistory = /* GraphQL */ `
  mutation UpdatePostHistory(
    $input: UpdatePostHistoryInput!
    $condition: ModelPostHistoryConditionInput
  ) {
    updatePostHistory(input: $input, condition: $condition) {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const deletePostHistory = /* GraphQL */ `
  mutation DeletePostHistory(
    $input: DeletePostHistoryInput!
    $condition: ModelPostHistoryConditionInput
  ) {
    deletePostHistory(input: $input, condition: $condition) {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const createPostViews = /* GraphQL */ `
  mutation CreatePostViews(
    $input: CreatePostViewsInput!
    $condition: ModelPostViewsConditionInput
  ) {
    createPostViews(input: $input, condition: $condition) {
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const updatePostViews = /* GraphQL */ `
  mutation UpdatePostViews(
    $input: UpdatePostViewsInput!
    $condition: ModelPostViewsConditionInput
  ) {
    updatePostViews(input: $input, condition: $condition) {
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const deletePostViews = /* GraphQL */ `
  mutation DeletePostViews(
    $input: DeletePostViewsInput!
    $condition: ModelPostViewsConditionInput
  ) {
    deletePostViews(input: $input, condition: $condition) {
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const createPostShares = /* GraphQL */ `
  mutation CreatePostShares(
    $input: CreatePostSharesInput!
    $condition: ModelPostSharesConditionInput
  ) {
    createPostShares(input: $input, condition: $condition) {
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
export const updatePostShares = /* GraphQL */ `
  mutation UpdatePostShares(
    $input: UpdatePostSharesInput!
    $condition: ModelPostSharesConditionInput
  ) {
    updatePostShares(input: $input, condition: $condition) {
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
export const deletePostShares = /* GraphQL */ `
  mutation DeletePostShares(
    $input: DeletePostSharesInput!
    $condition: ModelPostSharesConditionInput
  ) {
    deletePostShares(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createCommentTotal = /* GraphQL */ `
  mutation CreateCommentTotal(
    $input: CreateCommentTotalInput!
    $condition: ModelCommentTotalConditionInput
  ) {
    createCommentTotal(input: $input, condition: $condition) {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const updateCommentTotal = /* GraphQL */ `
  mutation UpdateCommentTotal(
    $input: UpdateCommentTotalInput!
    $condition: ModelCommentTotalConditionInput
  ) {
    updateCommentTotal(input: $input, condition: $condition) {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommentTotal = /* GraphQL */ `
  mutation DeleteCommentTotal(
    $input: DeleteCommentTotalInput!
    $condition: ModelCommentTotalConditionInput
  ) {
    deleteCommentTotal(input: $input, condition: $condition) {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const createReactions = /* GraphQL */ `
  mutation CreateReactions(
    $input: CreateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    createReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const updateReactions = /* GraphQL */ `
  mutation UpdateReactions(
    $input: UpdateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    updateReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const deleteReactions = /* GraphQL */ `
  mutation DeleteReactions(
    $input: DeleteReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    deleteReactions(input: $input, condition: $condition) {
      id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const createReportedPost = /* GraphQL */ `
  mutation CreateReportedPost(
    $input: CreateReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    createReportedPost(input: $input, condition: $condition) {
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
export const updateReportedPost = /* GraphQL */ `
  mutation UpdateReportedPost(
    $input: UpdateReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    updateReportedPost(input: $input, condition: $condition) {
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
export const deleteReportedPost = /* GraphQL */ `
  mutation DeleteReportedPost(
    $input: DeleteReportedPostInput!
    $condition: ModelReportedPostConditionInput
  ) {
    deleteReportedPost(input: $input, condition: $condition) {
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
export const createReportType = /* GraphQL */ `
  mutation CreateReportType(
    $input: CreateReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    createReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateReportType = /* GraphQL */ `
  mutation UpdateReportType(
    $input: UpdateReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    updateReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteReportType = /* GraphQL */ `
  mutation DeleteReportType(
    $input: DeleteReportTypeInput!
    $condition: ModelReportTypeConditionInput
  ) {
    deleteReportType(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const createGroupUsers = /* GraphQL */ `
  mutation CreateGroupUsers(
    $input: CreateGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    createGroupUsers(input: $input, condition: $condition) {
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
export const updateGroupUsers = /* GraphQL */ `
  mutation UpdateGroupUsers(
    $input: UpdateGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    updateGroupUsers(input: $input, condition: $condition) {
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
export const deleteGroupUsers = /* GraphQL */ `
  mutation DeleteGroupUsers(
    $input: DeleteGroupUsersInput!
    $condition: ModelGroupUsersConditionInput
  ) {
    deleteGroupUsers(input: $input, condition: $condition) {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
