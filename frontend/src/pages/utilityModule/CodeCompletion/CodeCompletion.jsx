import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import CodeCompletionComponent from "./codeCompletionComponent";

const CodeCompletion = () => {
  return (
    <Sidebar FeaturesComponent={CodeCompletionComponent}/>
  )
};

export default CodeCompletion;
