"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("purple.400", "purple.400"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      sx={{
        position: "static",
        bottom: 0,
        width: "100%",
      }}
      mt={"10"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-evenly" }}
        align={{ base: "center", md: "center" }}
      >
        <Text
          as={"span"}
          color={"green.400"}
          fontSize={"xl"}
          fontFamily={"heading"}
          fontWeight={"bold"}
          display={{ base: 'flex', md: 'flex' }}
        >
          Recruit
          <Text
            as={"span"}
            color={"purple.400"}
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            .ai
          </Text>
        </Text>
        <Text>© {new Date().getFullYear()} | All rights reserved</Text>
      </Container>
    </Box>
  );
}
