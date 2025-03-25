import {gql} from '@apollo/client'

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
  }
}
`

export const GET_USERS = gql`
query {
  users {
    edeges {
        node {
        username
            }
        }
    }
}
`

export const GET_SIGNEDIN_USER = gql`
query {
    me {
        id
        username
  }
}
`