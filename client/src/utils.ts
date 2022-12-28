import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

export const GET_USER = gql`
  query GetMyProfile {
    me {
      id
      name
      profilePicture
      ... on Host {
        profileDescription
      }
      ... on Guest {
        funds
      }
    }
  }
`;

export function useUser() {
  const [user, setUser] = useState();

  const { loading, error } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ me }) => {
      setUser({ ...me });
    },
  });

  return {
    user,
    setUser,
    loading,
    error,
  };
}
