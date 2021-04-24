import { gql } from "apollo-boost";

export const GET_QUESTIONS = gql`
  query Questions {
    questions {
      id
      title
      options {
        text,
        correct
      }
      correct_response
      type
      code
      explanation
    }
  }
`;

export const GET_QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      title
      options {
        text,
        correct
      }
      correct_response
      type
      code
      explanation
    }
  }
`;
