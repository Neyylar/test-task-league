import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';

import type { User } from '~/types/user';

type UserInfoProps = {
  user: User;
  index: number;
  width: number;
  onUserClick: (index: number) => void;
  isSelectedUser: boolean;
};

const UserInfoSimple = ({
  user,
  index,
  width,
  onUserClick,
  isSelectedUser,
}: UserInfoProps) => {
  const { name, avatar, time, speed } = user;
  return (
    <Flex
      key={name + index}
      direction="row"
      alignItems="flex-start"
      onClick={() => onUserClick(index + 1)}
    >
      <Text
        mr={8}
        width={`${8 + width}px`}
        fontSize="20px"
        fontWeight={700}
        alignSelf="center"
        alignItems="center"
        transition="width 3s ease-in-out"
        color={isSelectedUser ? 'violet' : 'inherit'}
      >
        {index + 1}
      </Text>
      <Box
        borderColor={isSelectedUser ? 'violet' : 'transparent'}
        borderWidth="3px"
        borderRadius="30px"
      >
        <Image
          width="50px"
          height="50px"
          borderRadius="30px"
          borderWidth="3px"
          borderColor="red"
          src={avatar}
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
          {name}
        </Text>
        <Flex direction="row">
          <Text ml={4} fontSize="18px">
            {time}{' '}
          </Text>
          <Text ml={4} fontSize="18px">
            {speed} км/ч
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const UserInfo = memo(
  UserInfoSimple,
  (prev, curr) =>
    prev.isSelectedUser === curr.isSelectedUser && prev.width === curr.width
);

export default UserInfo;
