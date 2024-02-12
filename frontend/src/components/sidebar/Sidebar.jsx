"use client";

import {
  IconButton,
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsImageAlt, BsCodeSlash, BsFillFileTextFill } from "react-icons/bs";
import { SlSpeech } from "react-icons/sl";
import { BiUserVoice } from "react-icons/bi";
import { MdCompare } from "react-icons/md";

import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const LinkItems = [
  { name: "Home", icon: BiUserVoice, route: "/" },
  { name: "User Profile", icon: BiUserVoice, route: "/userProfile" },
  { name: "Workflow", icon: BsCodeSlash, route: "/chatAssistant" },
  { name: "Chat", icon: BsCodeSlash, route: "/chat" },
];

const NavItem = ({ icon, children, route, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === route;

  return (
    <Box
      as="div"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => navigate(route)}
    >
      <Flex
        align="center"
        p="5"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.400",
          color: "white",
        }}
        bg={isActive ? "purple.400" : undefined}
        color={isActive ? "white" : undefined}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Sidebar = ({ FeaturesComponent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { isAuthenticated, signOut, currentUser } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        borderBottomWidth="1px"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        borderColor={useColorModeValue("gray.200", "gray.800")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Box onClick={() => navigate("/")}>
          <Text
            as={"span"}
            color={"green.400"}
            fontSize={"xl"}
            fontFamily={"heading"}
            fontWeight={"bold"}
            display={{ base: "flex", md: "none" }}
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
        </Box>
        <HStack spacing={{ base: "0", md: "6" }}>
        <Button
            size="lg"
            variant="ghost"
            aria-label="open menu"
            bg={"transparent"}
            onClick={toggleColorMode}
            display="flex"
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {isAuthenticated ? (
            <Flex alignItems={"center"}>
              
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{currentUser}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("white", "gray.800")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  <MenuItem onClick={() => navigate("/userProfile")}>
                    Profile
                  </MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </MenuList>
              </Menu>
              <Button colorScheme="red" variant="ghost" onClick={handleSignOut}>
                Logout
              </Button>
            </Flex>
          ) : (
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="blue" variant="solid" onClick={()=>navigate('/signin')} >
                Signin
              </Button>
              <Button colorScheme="blue" variant="ghost" onClick={()=>navigate('/signup')}>
                Create new account
              </Button>
            </Stack>
          )}
        </HStack>
      </Flex>
    );
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        FeaturesComponent={FeaturesComponent}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            FeaturesComponent={FeaturesComponent}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} bg={"white"}>
        <FeaturesComponent />
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, FeaturesComponent, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.800")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Text
            as={"span"}
            color={"green.400"}
            fontSize="2xl"
            fontFamily="heading"
            fontWeight="bold"
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
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
