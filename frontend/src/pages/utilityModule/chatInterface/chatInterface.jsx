import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatInterfaceComponent from "./chatInterfaceComponent";

const ChatInterface = () => {
  return (
    <Sidebar FeaturesComponent={ChatInterfaceComponent}/>
  )
};

export default ChatInterface;