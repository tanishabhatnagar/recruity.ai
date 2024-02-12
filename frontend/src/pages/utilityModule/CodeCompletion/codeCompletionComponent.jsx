import React, { useContext, useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import {
  Box,
  Text,
  Input,
  Stepper,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  Divider,
  Button,
} from "@chakra-ui/react";
import { AuthContext } from "../../../context/AuthContext";
import { useCustomToast } from "@/hooks/useCustomToast";

const steps = [
  { title: "AR Start" },
  { title: "Sourcing" },
  { title: "Basic Matching" },
  { title: "Exact Matching Filtering" },
  { title: "Value Addition by AI" },
];

const CodeCompletionComponent = () => {
  const showToast = useCustomToast();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [searchCriteria, setSearchCriteria] = useState('');
  const [sourcingChannels, setSourcingChannels] = useState('');


  const [error, setError] = useState("");

  const { session } = useContext(AuthContext);

  const handleSubmit = async () => {

    let updateData = {};

    if (activeStep === 0) { // AR Start Step
      updateData = { ar_start_data: { jobTitle, jobDescription } };
    } else if (activeStep === 1) { // Sourcing Step
      updateData = { sourcing_data: { searchCriteria, sourcingChannels } };
    }

    try {
      const user_id = session.user.id;
      const { data, error: fetchError } = await supabase
        .from("workflow_steps")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

        const { error: updateError } = await supabase
          .from("workflow_steps")
          .upsert({
            user_id: user_id,
            ...updateData
          })

        if (updateError) throw updateError;

      if (error) {
        console.error('Error updating data', error);
      } else {
        console.log('Data updated');
        
        setSearchCriteria(data?.sourcing_data)
        setSourcingChannels(date?.sourcing_data)
      }
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setActiveStep(activeStep+1)
    }
  };

  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
  });

  const renderStepContent = (stepIndex) => {
    if (steps[stepIndex].title === "AR Start")
      return (
        <Box sx={{ height: "80vh" }} p={4}>
          <Divider />
          <Text fontSize="lg" mb={4}>
            Start the Applicant Review Process
          </Text>
          <Text mb={2}>Job Title:</Text>
          <Input
            placeholder="Enter the job title"
            mb={3}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <Text mb={2}>Job Description:</Text>
          <Input
            placeholder="Enter a brief job description"
            mb={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSubmit}>
            Begin Review
          </Button>
        </Box>
      );
    else if (steps[stepIndex].title === "Sourcing")
      return (
        <Box sx={{
          height:'80vh'
        }} p={4}>
            <Divider />
            <Text fontSize="lg" mb={4}>Sourcing Candidates</Text>
            <Input placeholder="Enter programming search criteria" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} mb={3} />
            <Input placeholder="Enter sourcing channels" value={sourcingChannels} onChange={(e) => setSourcingChannels(e.target.value)} mb={3} />
            <Button colorScheme="blue" onClick={handleSubmit}>
            Begin Search
          </Button>
          </Box>
      );
    else if (steps[stepIndex].title === "Basic Matching")
      return (
        <Box
          sx={{
            height: "80vh",
          }}
          p={4}
        >
          <Text fontSize="lg" mb={4}>Basic Matching of Candidates</Text>
          <Text mb={2}>Criteria Used for Matching:</Text>
          <Box mb={3} p={4} borderWidth="1px" borderRadius="lg">
          {(searchCriteria && sourcingChannels) ? (
            <>
              <Text mb={2}>Criteria Used for Matching: {searchCriteria}</Text>
              <Text mb={2}>Sourcing Channels: {sourcingChannels}</Text>
            </>
          ):(
            <>
            <Text>Skills: Python, Project Management</Text>
            <Text>Experience: 2+ years</Text>
            </>
          )}
           
          </Box>
          
          <Button colorScheme="blue" onClick={() => setActiveStep(activeStep + 1)}>Perform Basic Matching</Button>
        </Box>
      );
    else if (steps[stepIndex].title === "Exact Matching Filtering")
      return (
        <Box
          sx={{
            height: "80vh",
          }}
          p={4}
        >
          <Divider />
          <Text fontSize="lg" mb={4}>Exact Matching Filtering of Candidates</Text>
          <Text mb={2}>Criteria Used for Exact Matching:</Text>
          <Box mb={3} p={4} borderWidth="1px" borderRadius="lg">
          {(searchCriteria && sourcingChannels) ? (
            <>
              <Text mb={2}>Criteria Used for Matching: {searchCriteria}</Text>
              <Text mb={2}>Sourcing Channels: {sourcingChannels}</Text>
            </>
          ):(
            <>
            <Text>Skills: Python, Project Management</Text>
            <Text>Experience: 2+ years</Text>
            </>
          )}
           
          </Box>
          
          <Button colorScheme="blue" onClick={() => setActiveStep(activeStep + 1)}>Perform Basic Matching</Button>
        </Box>
      );
    else
      return (
        <Box sx={{
          height:"80vh"
        }} p={4}>
          <Divider />
          <Text fontSize="lg" mb={4}>AI-Powered Candidate Insights</Text>
          <Text mb={2}>AI Analysis Summary:</Text>
          <Box mb={3} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold">Candidate Compatibility Score: 85%</Text>
            <Text>Cultural Fit Analysis: High</Text>
            <Text>Projected Longevity: Likely to stay for 2+ years</Text>
          </Box>
          <Button colorScheme="blue" onClick={()=>{
            showToast({
              title: "Candidate Finalized",
              description: "",
              status: "success",
            });
          }}>Finalize Candidates</Button>
        </Box>
      );
  };

  return (
    <>
      <Stepper px={10} py={5}>
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => setActiveStep(index)}
            cursor="pointer"
          >
            <StepIndicator>
              <StepStatus
                complete={<StepNumber>{index + 1}</StepNumber>}
                incomplete={<StepNumber>{index + 1}</StepNumber>}
                active={<StepNumber>{index + 1}</StepNumber>}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}
    </>
  );
};

export default CodeCompletionComponent;
