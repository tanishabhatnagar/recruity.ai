// useCustomToast.ts
import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (props) => {
    toast({
      title: props.title,
      description: props.description,
      status: props.status,
      duration: 5000,
      isClosable: true,
    });
  };

  return showToast;
};
