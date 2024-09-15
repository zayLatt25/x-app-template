import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ScanIcon } from "./Icon";
import { blobToBase64, getDeviceId, resizeImage } from "../util";
import { useWallet } from "@vechain/dapp-kit-react";
import { submitReceipt } from "../networking";
import { useDisclosure, useSubmission } from "../hooks";

export const Dropzone = ({
  promptType,
  setSuccessData,
  setSuccess,
}: {
  promptType: string;
  setSuccessData: any;
  setSuccess: any;
}) => {
  const { account } = useWallet();

  const { setIsLoading, setResponse } = useSubmission();
  const { onOpen } = useDisclosure();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles); // Pass the files to the callback
    },
    maxFiles: 1, // Allow only one file
    accept: {
      "image/*": [], // Accept only image files
    },
  });

  const onFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 1 || files.length === 0) {
        alert("Please upload only one file");
        return;
      }

      if (!account) {
        alert("Please connect your wallet");
        return;
      }

      setIsLoading(true);
      onOpen();

      const file = files[0];

      const resizedBlob = await resizeImage(file);
      const base64Image = await blobToBase64(resizedBlob as Blob);

      const deviceID = await getDeviceId();

      try {
        const response = await submitReceipt({
          address: account,
          deviceID,
          image: base64Image,
          promptType,
        });

        console.log(response);

        setResponse(response);

        if (response?.validation.validityFactor == undefined) return null;

        const isValid =
          response?.validation.validityFactor &&
          response?.validation.validityFactor > 0.5;

        if (isValid) {
          setSuccess(true);
          // Transport data from https://ourworldindata.org/travel-carbon-footprint
          if (response?.validation.distanceTravelled) {
            if (
              response?.validation.vehicleType === "bike" ||
              response?.validation.vehicleType === "walk"
            ) {
              // 0kg CO2 per km while walking or biking
              setSuccessData(response?.validation.distanceTravelled * 0);
            } else if (response?.validation.vehicleType === "bus") {
              // 0.97kg CO2 per km per passenger on a bus on average
              setSuccessData(response?.validation.distanceTravelled * 0.97);
            } else if (response?.validation.vehicleType === "train") {
              // 0.35kg CO2 per km per passenger on a train on average
              setSuccessData(response?.validation.distanceTravelled * 0.35);
            }
          }
          // Electricity data from https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/
          else if (response?.validation.kWh) {
            // 0.4kg CO2 per kWh on average
            setSuccessData(response?.validation.kWh * 0.4);
          } else if (response?.validation.carbonFootprint) {
            setSuccessData(response?.validation.carbonFootprint);
          }
          // Divide by 1000 to convert kilogram into metric ton, which is equivalent to 1 carbon credit for tree planting
          else if (response?.validation.carbonSequestrationEstimate) {
            setSuccessData(
              response?.validation.carbonSequestrationEstimate / 1000
            );
          }
        }
      } catch (error) {
        alert("Error submitting receipt");
      } finally {
        setIsLoading(false);
      }
    },
    [account, onOpen, setIsLoading, setResponse]
  );

  return (
    <VStack w={"full"} mt={3}>
      <Box
        {...getRootProps()}
        p={5}
        border="2px"
        borderColor={isDragActive ? "green.300" : "gray.300"}
        borderStyle="dashed"
        borderRadius="md"
        bg={isDragActive ? "green.100" : "gray.50"}
        textAlign="center"
        cursor="pointer"
        _hover={{
          borderColor: "green.500",
          bg: "green.50",
        }}
        w={"full"}
        h={"200px"}
        display="flex" // Make the Box a flex container
        alignItems="center" // Align items vertically in the center
        justifyContent="center" // Center content horizontally
      >
        <input {...getInputProps()} />
        <HStack>
          <ScanIcon size={120} color={"gray"} />
          <Text>Upload to scan</Text>
        </HStack>
      </Box>
    </VStack>
  );
};
