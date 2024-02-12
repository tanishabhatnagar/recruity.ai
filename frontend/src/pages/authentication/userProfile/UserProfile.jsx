import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient"; // Ensure this path is correct
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  HStack,
  Stack,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import AuthNav from "@/components/authNav/AuthNav";
import { AuthContext } from "../../../context/AuthContext";

export default function UserProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(AuthContext);

  useEffect(() => {
    setEmail(session.user.email);
    setFirstName(session.user.user_metadata.firstName);
    setLastName(session.user.user_metadata.lastName);
    setCompanyName(session.user.user_metadata.company);
    fetchUserProfile();
  }, [session.user]);

  const fetchUserProfile = async () => {
    setError("");
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    console.log(profileData, "jlikufvcm");
    if (profileData && profileData.length > 0) {
      // Assuming there's only one profile per user, take the first one.
      const userProfile = profileData[0];
      setCompanyName(userProfile.company_name);
      setContact(userProfile.contact_number);
      setEmail(userProfile.email);
      setFirstName(userProfile.first_name);
      setLastName(userProfile.last_name);
      setCompanyName(userProfile.company_name);
    } else {
      // Handle the case where no profile data is found
      setError("No profile data found.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
  
    try {
      // First, check if a profile already exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();
  
      if (fetchError) throw fetchError;
  
      // Determine if it's an insert or an update operation
      if (existingProfile) {
        // Update the existing profile
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
            email: email,
            company_name: companyName,
            contact_number: contact,
          })
          .eq('user_id', session.user.id);
  
        if (updateError) throw updateError;
      } else {
        // Insert a new profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            user_id: session.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            company_name: companyName,
            contact_number: contact,
          }]);
  
        if (insertError) throw insertError;
      }
  
      // Optionally, display a success message
    } catch (error) {
      setError(error.message);
      // Optionally, display an error message
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <AuthNav />
      <Flex
        minH={"95vh"}
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
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit User Profile
          </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="Enter your first name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Enter your last name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Enter your email"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="companyName">
            <FormLabel>Company Name</FormLabel>
            <Input
              placeholder="Enter your company name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FormControl>
          <FormControl id="contact">
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="Enter your contact number"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </FormControl>
          <Flex align={"center"} justify={"space-between"}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Save Changes
            </Button>
            <Button
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.500",
              }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}
