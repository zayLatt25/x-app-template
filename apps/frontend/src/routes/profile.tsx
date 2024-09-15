import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  Box,
  Text,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useConnex, useWallet } from "@vechain/dapp-kit-react";

const emitted = 2197;
const distance = 53671;
const crunched = distance * 0.19 - emitted;
const offset = 539;

export default function ProfileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control drawer state

  return (
    <>
      {/* Trigger the drawer */}
      <a className="hover:cursor-pointer hover:underline" onClick={onOpen}>
        Profile
      </a>

      {/* Drawer itself */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="bold">Profile</DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="start">
              {/* Profile avatar and name */}
              <Box display="flex" alignItems="center">
                <Box w="10" h="10" bg="#506c4c" rounded="full"></Box>
                <Text ml={4} fontSize="md" fontWeight="bold">
                  Name
                </Text>
              </Box>

              {/* Some profile sections */}
              <Box
                w="full"
                h="10"
                bg="#c5dcc2"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="start"
                px="4"
              >
                <Text color="#2a3d29" fontWeight="bold">
                  Carbons Emitted : {emitted} kg
                </Text>
              </Box>

              <Box
                w="full"
                h="10"
                bg="#8abf86"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="start"
                px="4"
              >
                <Text color="#4e6b4c" fontWeight="bold">
                  Distance Travelled : {distance} km
                </Text>
              </Box>
              <Box
                w="full"
                h="10"
                // bg="#688f65"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="start"
                px="4"
                className="bg-black animate-pulse "
              >
                <Text color="white" fontWeight="bold">
                  Carbon Crunched : {parseInt(crunched.toString())} kg
                </Text>
              </Box>

              <Box
                w="full"
                h="10"
                bg="#4e6b4c"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="start"
                px="4"
              >
                <Text color="#c5dcc2" fontWeight="bold">
                  Carbon Offset : {offset} kg
                </Text>
              </Box>

              {/* Settings and Milestones */}
              <Box display="flex" alignItems="center" w="full">
                <Icon as={MdSettings} w={6} h={6} color="#506c4c" />
                <Text ml={4} fontSize="md">
                  Settings
                </Text>
              </Box>

              <Box display="flex" alignItems="center" w="full">
                <Link
                  to="/milestones"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Icon as={FaTrophy} w={6} h={6} color="#506c4c" />
                  <Text ml={4} fontSize="md">
                    Milestones
                  </Text>
                </Link>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              bg="#f79939"
              color="#2a3d29"
              w="full"
              onClick={() => alert("Logout")}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
