import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // Import the Supabase client
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AuthNav from "@/components/authNav/AuthNav";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error;

      navigate('/resetPassword'); // Adjust this to your reset password route
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <AuthNav/>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Enter your email to get reset link
          </Text>
          {error && <Text color="red.500">{error}</Text>}
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              onClick={handleForgotPassword}
            >
              Send reset link
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
