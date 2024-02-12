import {
    Box,
    Text,
    Input,
    Stack,
    InputGroup,
    InputRightElement,
    useColorModeValue,
    Textarea
  } from "@chakra-ui/react";
  
  import { ArrowRightIcon } from '@chakra-ui/icons'
  import Sidebar from "@/components/sidebar/Sidebar";
  
  const ChatInterfaceComponent = () => {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 80px)',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflowY:"auto"
        }}
        p={5}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Box
          sx={{
            width: "90%"
          }}
          mb={4}
        >
          <Textarea
          placeholder='Here is a sample placeholder'
          size='sm'
          resize={"vertical"}
        />
        </Box>
        <Box
          sx={{
          width:"90%"
        }}
        >
        <InputGroup>
          <Input placeholder='Start typing...' />
          <InputRightElement>
              <Box
                sx={{
                  cursor:"pointer"
                }}
              bg={useColorModeValue("gray.300","gray.700")}
              p={2}
                pl={3}
                px={3}
              >
              <ArrowRightIcon color='green.500' />
            </Box>
          </InputRightElement>
        </InputGroup>
              </Box>
        </Box>
        
    )
  };
  
  export default ChatInterfaceComponent;