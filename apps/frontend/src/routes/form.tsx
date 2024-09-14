import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Dropzone } from "../components";
import "./form.css";

export default function Form({ type }: { type: "reduce" | "offset" }) {
  const [category, setCategory] = useState("All");

  // Define categories based on the type prop
  const categories =
    type === "reduce"
      ? ["Transport", "Self care"]
      : ["Tree planting", "Volunteering"];

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
      <Dropzone />

      {/* Submit area */}
      <Text fontSize="2xl" fontWeight="bold" paddingTop="5">
        Step 3
      </Text>
      <Text fontSize="md">
        Last and final step! Generate your crushed carbon points and hit
        "Submit"!
      </Text>

      <div style={{ position: "absolute", right: "20px" }}>
        <Button
          bg="#f79939"
          color="#2a3d29"
          _hover={{ bg: "#c5dcc2", color: "#2a3d29" }}
          width="100px"
          marginRight="15"
          borderRadius="full"
        >
          Generate
        </Button>

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
