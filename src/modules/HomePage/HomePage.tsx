import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { getUsers, QUERY_KEYS } from '~/api/users/get-users';
import UserInfo from '~/components/UserInfo';
import type { User } from '~/types/user';

const LIMIT = 50;

const HomePage = () => {
  const [currentUsersIds, setCurrentUsersIds] = useState<Array<number>>([]);
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

  const onUserClick = useCallback((userId: number) => {
    setCurrentUsersIds((prevArr) => {
      if (prevArr.find((user) => userId === user)) {
        return prevArr.filter((user) => user !== userId);
      }
      return [...prevArr, userId];
    });
  }, []);

  const renderItems = useCallback(
    (items: Array<User>, startIndex: number) => {
      return items.map((item, index) => {
        return (
          <UserInfo
            user={item}
            width={width}
            index={startIndex + index}
            onUserClick={onUserClick}
            isSelectedUser={currentUsersIds.includes(startIndex + index + 1)}
          />
        );
      });
    },
    [currentUsersIds, onUserClick, width]
  );

  useEffect(() => {
    const currentLength = String(
      (data ? data.pages.length - 1 : 1) * LIMIT
    ).length;
    if (currentLength > width / 12) {
      setWidth(currentLength * 12);
    }
  }, [width, data, fetchNextPage]);

  if (!data) {
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
        loader={<div> Loading... </div>}
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

export default HomePage;
