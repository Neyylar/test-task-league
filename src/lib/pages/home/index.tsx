'use client';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { getUsers, QUERY_KEYS } from '~/app/api/users/get-users';
import type { User } from '~/lib/types/user';

const LIMIT = 50;
const Home = () => {
  const [currentUsers, setCurrentUsers] = useState<Array<number>>([]);
  const [width, setWidth] = useState(4);
  const { data, fetchNextPage } = useInfiniteQuery(
    [QUERY_KEYS.allUsers],
    getUsers,
    {
      getNextPageParam: ({ nextOffset }) => {
        return nextOffset;
      },
    }
  );
  useEffect(() => {
    const currentLength = String(
      (data ? data.pages.length - 1 : 1) * LIMIT
    ).length;
    if (currentLength > width / 12) {
      setWidth(currentLength * 12);
    }
  }, [width, data, fetchNextPage]);

  const onUserClick = useCallback(
    (userId: number) => {
      if (currentUsers.find((user) => userId === user)) {
        setCurrentUsers([...currentUsers.filter((user) => user !== userId)]);
      } else setCurrentUsers([...currentUsers, userId]);
    },
    [currentUsers]
  );

  // callback
  const renderItems = useCallback(
    (items: Array<User>, startIndex: number) => {
      return items.map((item, index) => {
        return (
          <Flex
            onClick={() => {
              onUserClick(startIndex + index + 1);
            }}
            /* eslint-disable-next-line react/no-array-index-key */
            key={item.name + startIndex + index}
            direction="row"
            alignItems="flex-start"
          >
            <Text
              mr={8}
              width={`${8 + width}px`}
              fontSize="20px"
              fontWeight={700}
              alignSelf="center"
              alignItems="center"
              transition="width 3s ease-in-out"
              color={
                currentUsers.includes(startIndex + index + 1)
                  ? 'violet'
                  : 'inherit'
              }
            >
              {startIndex + index + 1}
            </Text>
            <Box
              borderColor={
                currentUsers.includes(startIndex + index + 1)
                  ? 'violet'
                  : 'transparent'
              }
              borderWidth="3px"
              borderRadius="30px"
            >
              <Image
                width="50px"
                height="50px"
                borderRadius="30px"
                borderWidth="3px"
                borderColor="red"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </Box>
            <Flex direction="column">
              <Text
                ml={4}
                fontSize="18px"
                fontWeight="600"
                noOfLines={1}
                maxWidth="500px"
              >
                {item.name}
              </Text>
              <Flex direction="row">
                <Text ml={4} fontSize="18px">
                  {item.time}{' '}
                </Text>
                <Text ml={4} fontSize="18px">
                  {item.speed} км/ч
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      });
    },
    [width, currentUsers, onUserClick]
  );
  if (data === undefined) {
    return null;
  }
  const dataLength = data.pages.reduce((counter) => {
    return counter + LIMIT;
  }, 0);
  return (
    <Flex direction="column" alignItems="flex-start" alignSelf="flex-start">
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore
        loader={<div> Loading!!! </div>}
      >
        {data.pages.map((group) => (
          <Box key={group.nextOffset}>
            {renderItems(group.results || [], LIMIT * (group.nextOffset - 1))}
          </Box>
        ))}
      </InfiniteScroll>
    </Flex>
  );
};

export default Home;
