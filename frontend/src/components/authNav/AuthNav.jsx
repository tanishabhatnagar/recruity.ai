import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import {
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AuthNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate()
  const {isAuthenticated} = useContext(AuthContext)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor:"pointer"
      }}
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={"5"}
    >
    <Text
      as={"span"}
      color={"green.400"}
      fontSize={"3xl"}
      fontFamily={"heading"}
      fontWeight={"bold"}
      display={'flex'}
      textAlign={"center"}
      onClick={() => navigate('/')}
      >
      Recruit
      <Text
        as={"span"}
        color={"purple.400"}
        fontWeight={"bold"}
        fontSize={"3xl"}
        >
        .ai
      </Text>
      </Text>
      <Button
          mx={4}
          bg={"transparent"}
          onClick={toggleColorMode}
          display="flex"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        </Box>
  )
}

export default AuthNav