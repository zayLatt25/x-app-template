import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Dropzone } from "../components";

export default function Form({ type }: { type: "reduce" | "offset" }) {
  const [category, setCategory] = useState("Transport");
  const [successData, setSuccessData] = useState<any>();
  const [success, setSuccess] = useState(false);

  // Define categories based on the type prop
  const categories =
    type === "reduce"
      ? ["Transport", "Electricity", "Recyclable_Packaging"]
      : ["Tree_Planting", "Waste_Removal", "Volunteering"];

  return (
    <Box
      bg="#efefef"
      minHeight="100vh"
      position="relative"
      padding="5"
      color="#2a3d29"
    >
      {type === "reduce" ? (
        <Text textAlign="center" fontSize="5xl" fontWeight="bold">
          How do you crush your carbon?
        </Text>
      ) : (
        <Text textAlign="center" fontSize="5xl" fontWeight="bold">
          How do you earn carbon credits?
        </Text>
      )}

      {/* Category area */}
      <Text fontSize="2xl" fontWeight="bold">
        Step 1
      </Text>
      <Text fontSize="md">
        Choose the category of activity your action falls in!{" "}
      </Text>
      <HStack spacing={3} overflowX="auto" paddingTop="3">
        {categories.map((categoryName) => (
          <Button
            key={categoryName}
            px={4}
            borderRadius="full"
            variant={category === categoryName ? "solid" : "outline"}
            bg={category === categoryName ? "#4e6b4c" : "#c5dcc2"}
            color={category === categoryName ? "#c5dcc2" : "#2a3d29"}
            onClick={() => setCategory(categoryName)}
          >
            {categoryName}
          </Button>
        ))}
      </HStack>

      {/* Dropzone area */}
      <Text fontSize="2xl" fontWeight="bold" paddingTop="5">
        Step 2
      </Text>
      {type === "reduce" ? (
        <Text fontSize="md">
          Snap and upload a picture of your action! (e.g. Certificates,
          reciepts, etc.)
        </Text>
      ) : (
        <Text fontSize="md">
          Snap and upload a picture of your action! (e.g. Items, Certificates
          etc.)
        </Text>
      )}

      <Dropzone
        key={category}
        promptType={category}
        setSuccessData={setSuccessData}
        setSuccess={setSuccess}
      />

      {/* Submit area */}
      <Text fontSize="2xl" fontWeight="bold" paddingTop="5">
        Step 3
      </Text>
      <Text fontSize="md">
        Last and final step! Check the numbers and confirm!
      </Text>
      {success && (
        <div className="flex place-items-center mt-4 text-3xl">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-leaf"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </span>
          {successData} kg of CO2{" "}
          {window.location.href.includes("offset") ? "offset" : "emitted"}.
        </div>
      )}

      <div style={{ position: "absolute", right: "20px" }}>
        <Button
          bg="#f79939"
          color="#2a3d29"
          _hover={{ bg: "#c5dcc2", color: "#2a3d29" }}
          width="100px"
          borderRadius="full"
        >
          Confirm
        </Button>
      </div>
    </Box>
  );
}
