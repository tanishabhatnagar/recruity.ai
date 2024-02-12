import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // Import the Supabase client
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import AuthNav from "@/components/authNav/AuthNav";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.api.updateUser(email, {
        password: password,
        data: { resetPasswordCode: code }
      });
      if (error) throw error;

      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate('/login'); // Adjust this to your login route
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
            Enter new password
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="code" isRequired>
            <FormLabel>Verification Code</FormLabel>
            <Input
              placeholder="Verification Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Stack spacing={6}>
            <Button
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              onClick={handleResetPassword}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

