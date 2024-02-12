"use client";

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  useColorModeValue,
  theme,
} from "@chakra-ui/react";
import { BsImageAlt, BsCodeSlash, BsFillFileTextFill } from "react-icons/bs";
import { SlSpeech } from "react-icons/sl";
import { BiUserVoice } from "react-icons/bi";
import { MdCompare } from "react-icons/md";

function StatsCard(props) {
  const { title, icon } = props;
  const boxShadowColor = useColorModeValue(
    theme.colors.purple[400],
    theme.colors.purple[400]
  );

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      p={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.600")}
      rounded={"lg"}
      transition="box-shadow 0.2s"
      _hover={{
        boxShadow: `0px 0px 15px 0px ${boxShadowColor}`,
      }}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} fontSize={"2xl"} isTruncated>
            {title}
          </StatLabel>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function HeroCards() {
  return (
    <Box maxW="7xl" mx={"auto"} p={7} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        pb={10}
        fontWeight={"bold"}
      >
        THE WORKFLOW
      </chakra.h1>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        display={"flex"}
        flexWrap={"wrap"}
      >
        <StatsCard
          title={"AR Start"}
          icon={<BsCodeSlash size={"2em"} />}
        />
        <StatsCard
          title={"Sourcing"}
          icon={<BsImageAlt size={"2em"} />}
        />
        <StatsCard title={"Basic Matching"} icon={<SlSpeech size={"2em"} />} />
        <StatsCard
          title={"Exact Matching Filtering"}
          icon={<BiUserVoice size={"2em"} />}
        />
        <StatsCard
          title={"Value Addition by AI"}
          icon={<MdCompare size={"2em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
