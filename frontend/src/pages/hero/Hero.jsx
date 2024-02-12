"use client";

import Footer from "@/components/footer/Footer";
import Features from "@/components/features/Features";

import {
  Box
} from "@chakra-ui/react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function CallToActionWithAnnotation() {
  return (
    <Box
      sx={{
        height: "100vh"
      }}
    >
      <Sidebar FeaturesComponent={Features} />
      <Footer />
    </Box>
  );
}
