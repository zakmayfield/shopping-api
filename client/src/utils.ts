import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

export const GET_MEMBER = gql`
  query GetMember {
    member {
      id
      name
    }
  }
`;

export function useMember() {
  const [member, setMember] = useState();

  const { loading, error } = useQuery(GET_MEMBER, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ member }) => {
      setMember({ ...member });
    },
  });

  return {
    member,
    setMember,
    loading,
    error,
  };
}