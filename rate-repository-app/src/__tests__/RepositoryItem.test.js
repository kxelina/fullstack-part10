import { render, screen, within } from '@testing-library/react-native'
import { RepositoryListContainer } from '../components/RepositoryList'

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        }
        render(<RepositoryListContainer repositories={repositories} />)

        const repositoryItems = screen.getAllByTestId('repositoryItem')
        const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

        const fullName_first = within(firstRepositoryItem).getByTestId('fullName')
        const description_first = within(firstRepositoryItem).getByTestId('description')
        const language_first = within(firstRepositoryItem).getByTestId('language')
        const stargazersCount_first = within(firstRepositoryItem).getByTestId('stargazersCount')
        const forksCount_first = within(firstRepositoryItem).getByTestId('forksCount')
        const reviewCount_first = within(firstRepositoryItem).getByTestId('reviewCount')
        const ratingAverage_first = within(firstRepositoryItem).getByTestId('ratingAverage')

        expect(fullName_first).toHaveTextContent('jaredpalmer/formik')
        expect(description_first).toHaveTextContent('Build forms in React, without the tears')
        expect(language_first).toHaveTextContent('TypeScript')
        expect(stargazersCount_first).toHaveTextContent('21.9k')
        expect(forksCount_first).toHaveTextContent('1.6k')
        expect(reviewCount_first).toHaveTextContent('3')
        expect(ratingAverage_first).toHaveTextContent('88')

        const fullName_second = within(secondRepositoryItem).getByTestId('fullName')
        const description_second = within(secondRepositoryItem).getByTestId('description')
        const language_second = within(secondRepositoryItem).getByTestId('language')
        const stargazersCount_second = within(secondRepositoryItem).getByTestId('stargazersCount')
        const forksCount_second = within(secondRepositoryItem).getByTestId('forksCount')
        const reviewCount_second = within(secondRepositoryItem).getByTestId('reviewCount')
        const ratingAverage_second = within(secondRepositoryItem).getByTestId('ratingAverage')

        expect(fullName_second).toHaveTextContent('async-library/react-async')
        expect(description_second).toHaveTextContent('Flexible promise-based React data loader')
        expect(language_second).toHaveTextContent('JavaScript')
        expect(stargazersCount_second).toHaveTextContent('1.8k')
        expect(forksCount_second).toHaveTextContent('69')
        expect(reviewCount_second).toHaveTextContent('3')
        expect(ratingAverage_second).toHaveTextContent('72')
      })
    })
  })