import notification0001 from "./fields/notification0001";


export const onNoficationAdded = /* GraphQL */ `
  subscription OnNoficationAdded($section: String!, $to: ID!) {
    onNoficationAdded(section: $section, to: $to) ${notification0001}
  }
`;