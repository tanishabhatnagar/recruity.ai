import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // Import Supabase client
import { AuthContext } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Center,
  Link,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCustomToast } from "@/hooks/useCustomToast";
import AuthNav from "@/components/authNav/AuthNav";
import { Link as ReactRouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signin = () => {
  const navigate = useNavigate();
  const showToast = useCustomToast();
  const { setIsAuthenticated, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email) {
      setEmail({ value: "", isValid: false });
      return;
    }
    if (!password) {
      setPassword({ value: "", isValid: false });
      return;
    }
    setIsLoading(true);

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log("User:", user, "Error:", error);
      if (error) throw error;
      setIsAuthenticated(true);
      navigate("/");
      showToast({
        title: `Welcome`,
        description: "Signin successful.",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthNav />
      <Flex
        minH={"100vh"}
        align={"flex-start"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        pt={"12"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Let's get you signed in</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Text color={"purple.400"} as="span">
                features ✌️
              </Text>
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link
                    as={ReactRouterLink}
                    to="/forgotPassword"
                    color={"purple.400"}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <Stack>
                  <Button
                    isLoading={isLoading}
                    onClick={handleSignIn}
                    bg={"purple.400"}
                    color={"white"}
                    _hover={{
                      bg: "purple.500",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    w={"full"}
                    maxW={"md"}
                    variant={"outline"}
                    leftIcon={<FcGoogle />}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
                <Link color={"purple.400"} onClick={() => navigate("/signup")}>
                  Create an account
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signin;
