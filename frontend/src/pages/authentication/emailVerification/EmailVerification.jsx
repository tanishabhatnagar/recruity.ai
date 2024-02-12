import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // Import the Supabase client
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Center,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useCustomToast } from "@/hooks/useCustomToast";
import AuthNav from "@/components/authNav/AuthNav";

export default function EmailVerification() {
  const showToast = useCustomToast();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("pending_verification_email"));
  const navigate = useNavigate();

  const handleConfirmUser = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.verifyOTP({ 
        token: confirmationCode, 
        type: 'signup' 
      });
      if (error) throw error;

      localStorage.removeItem("pending_verification_email");
      setIsAuthenticated(true);
      navigate("/"); // Adjust this to your desired route after verification
    } catch (error) {
      console.error(error);
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
          maxW={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Verify your Email
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            We have sent code to your email
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {email}
          </Center>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmUser();
            }}
          >
            <FormControl>
              <Center>
                <HStack>
                  <PinInput
                    value={pinValue}
                    onChange={(value) => {
                      setPinValue(value);
                      setConfirmationCode({ value: value, isValid: true });
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                mt={4}
                type="submit"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                isLoading={isLoading}
                // onClick={handleConfirmUser}
              >
                Verify
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  );
}
