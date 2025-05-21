import {gql} from '@apollo/client'

export const GET_REPOSITORIES = gql`
query (
$orderBy: AllRepositoriesOrderBy
$orderDirection: OrderDirection
$searchKeyword: String
) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
query ($includeReviews: Boolean = false) {
    me {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                    id
                    text
                    rating
                    createdAt
                    repository {
                        id
                        fullName
                    }
                }
            }
        }
  }
}
`

export const GET_REPOSITORY = gql`
query repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    url
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

