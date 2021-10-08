import post0002 from "./fields/post0002";

export const onPostCreate = /* GraphQL */ `
  subscription OnPostCreate {
    onPostCreate ${post0002}
  }
`;

export const onPostUpdate = /* GraphQL */ `
  subscription OnPostUpdate {
    onPostUpdate ${post0002}
  }
`;

export const onPostStatusUpdate = /* GraphQL */ `
  subscription OnPostStatusUpdate {
    onPostStatusUpdate ${post0002}
  }
`;