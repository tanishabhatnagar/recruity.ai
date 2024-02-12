'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading, Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import GridList from '../GridList/GridList'
import HeroCards from '../heroCards/HeroCards'

const Card = ({ heading, description, icon }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button>
      </Stack>
    </Box>
  )
}

export default function Features() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        pt={{ base: 20, md: 20 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          lineHeight={"110%"}
        >
          <Box>
            <Text
              as={"span"}
              color={"green.400"}
              fontWeight={"bold"}
              fontSize={"7xl"}
              className='animate__heartBeat'
              >
              Recruit
              <Text
                as={"span"}
                color={"purple.400"}
                fontWeight={"bold"}
                fontSize={"7xl"}
                className='animate__heartBeat'
              >
                .ai
              </Text>
            </Text>
            <Text color={"gray.500"} fontSize={"1.3rem"} mt={"5"} lineHeight={"1.4"}>
              "Discover the Symphony of Smart AI Recruiter: All Here, All Now"
            </Text>
          </Box>
        </Heading>

      </Stack>
      <Container maxW={'5xl'} mt={12}>
        <HeroCards />
      </Container>
        <Container maxW={'6xl'} mt={12}>
        <GridList/>
        </Container>
    </Box>
  )
}