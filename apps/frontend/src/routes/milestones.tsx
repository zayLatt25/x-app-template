import {
  Grid,
  Box,
  Text,
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Milestones() {
  const categories = ["All", "Weekly", "Daily"];
  const [category, setCategory] = useState("All");

  return (
    <Box p={4} zIndex={1000} bg="#4e6b4c">
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }}
        templateRows="repeat(2, 1fr)"
        gap={4}
        height="100vh"
      >
        <Grid templateRows="1fr 1fr" gap={4}>
          <Card borderRadius="25" bg="white">
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Fun Fact
              </Text>
            </Box>
          </Card>

          <Card borderRadius="25" bg="white">
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Leaderboard
              </Text>
            </Box>
          </Card>
        </Grid>

        {/* Center - Missions */}
        <Card borderRadius="25" bg="white">
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" mt={2}>
              Missions
            </Text>
            <HStack spacing={3} overflowX="auto" paddingTop="3" marginLeft={5}>
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
            <Box mt={4}></Box>
          </Box>
        </Card>

        <Accordion allowMultiple>
          {[...Array(4)].map((_, index) => (
            <AccordionItem
              key={index}
              marginBottom="3"
              borderRadius="25"
              overflow="hidden"
              border="none"
            >
              <h2>
                <AccordionButton
                  bg="#efefef"
                  borderTopLeftRadius="25px"
                  borderTopRightRadius="25px"
                  _hover={{ bg: "#efefef", border: "none" }}
                >
                  <Box flex="1" textAlign="left">
                    Badge {index + 1}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel bg="#efefef" pb={4}>
                {/* Badge details/content goes here */}
                This is the description of Badge {index + 1}.
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Grid>
    </Box>
  );
}
