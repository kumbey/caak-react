const user0001 = /* GraphQL */ `{
    id
    firstname
    lastname
    birthdate
    gender
    pic_id
    cover_pic_id
    about
    is_public
    status
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
      url
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
      url
      createdAt
      updatedAt
    }
    username {
      items {
        id
      }
    }
    aura {
      point
    }
  }`

  export default user0001