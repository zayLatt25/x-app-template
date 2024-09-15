import {
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useDisclosure, useSubmission } from "../hooks";
import loaderAnimation from "../assets/lottie/loader-json.json";
import Lottie from "react-lottie";
import { AirdropIcon, AlertIcon } from "./Icon";
import { useMemo, useState } from "react";

export const SubmissionModal = () => {
  const { isLoading, response } = useSubmission();
  const { isOpen, onClose } = useDisclosure();
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0);

  const renderContent = useMemo(() => {
    if (response?.validation.validityFactor == undefined) return null;

    const isValid =
      response?.validation.validityFactor &&
      response?.validation.validityFactor > 0.5;
    if (isValid) {
      // Transport data from https://ourworldindata.org/travel-carbon-footprint
      if (response?.validation.distanceTravelled) {
        if (
          response?.validation.vehicleType === "bike" ||
          response?.validation.vehicleType === "walk"
        ) {
          // 0kg CO2 per km while walking or biking
          setCarbonFootprint(response?.validation.distanceTravelled * 0);
        } else if (response?.validation.vehicleType === "bus") {
          // 0.97kg CO2 per km per passenger on a bus on average
          setCarbonFootprint(response?.validation.distanceTravelled * 0.97);
        } else if (response?.validation.vehicleType === "train") {
          // 0.35kg CO2 per km per passenger on a train on average
          setCarbonFootprint(response?.validation.distanceTravelled * 0.35);
        }
      }
      // Electricity data from https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/
      else if (response?.validation.kWh) {
        // 0.4kg CO2 per kWh on average
        setCarbonFootprint(response?.validation.kWh * 0.4);
      } else if (response?.validation.carbonFootprint) {
        setCarbonFootprint(response?.validation.carbonFootprint);
      }
      // Divide by 1000 to convert kilogram into metric ton, which is equivalent to 1 carbon credit for tree planting
      else if (response?.validation.carbonSequestrationEstimate) {
        setCarbonCredits(
          response?.validation.carbonSequestrationEstimate / 1000
        );
      }
    }

    return isValid ? (
      <VStack
        bgGradient={
          "radial-gradient(76.36% 85.35% at 50.12% 27.48%, rgba(230, 252, 207, 0.82) 38.14%, rgba(194, 212, 254, 0.82) 100%), #7DF000"
        }
        minH={"40vh"}
        minW={"40vh"}
        borderRadius={16}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AirdropIcon size={200} color="#373EDF" />
        <Text fontSize={32} fontWeight={600}>
          Congratulations!
        </Text>
        <HStack>
          <Text fontSize={24} fontWeight={400}>
            You've earned 5
          </Text>
          <Image src="b3tr-token.svg" />
        </HStack>
      </VStack>
    ) : (
      <VStack
        bgGradient={
          "radial-gradient(76.36% 85.35% at 50.12% 27.48%, rgba(230, 252, 207, 0.82) 38.14%, rgba(194, 212, 254, 0.82) 100%), #7DF000"
        }
        minH={"40vh"}
        minW={"40vh"}
        borderRadius={16}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AlertIcon size={200} color="#D23F63" />
        <Text fontSize={32} fontWeight={600}>
          Oops! AI says
        </Text>
        <HStack px={4}>
          <Text fontSize={14} fontWeight={400} textAlign={"center"}>
            {response?.validation.descriptionOfAnalysis}
          </Text>
        </HStack>
      </VStack>
    );
  }, [response]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      trapFocus={true}
      isCentered={true}
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />
      <ModalContent minH={"40vh"} minW={"40vh"} borderRadius={16}>
        {isLoading ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loaderAnimation,
            }}
          />
        ) : (
          renderContent
        )}
      </ModalContent>
    </Modal>
  );
};
