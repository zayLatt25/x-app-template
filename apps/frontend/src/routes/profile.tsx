import { useWallet } from "@vechain/dapp-kit-react";
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
} from "@chakra-ui/react";

export default function ProfileDrawer() {
  const { account } = useWallet();
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
          <DrawerHeader>Profile</DrawerHeader>

          <DrawerBody>
            <VStack spacing={6}>
              {/* Profile avatar and name */}
              <Box display="flex" alignItems="center">
                <Box w="10" h="10" bg="#506c4c" rounded="full"></Box>
                <Text ml={4} fontSize="xl" fontWeight="bold">
                  Name
                </Text>
              </Box>

              {/* Some profile sections */}
              <Box w="full" h="10" bg="#506c4c" opacity="0.5" rounded="md" />
              <Box w="full" h="10" bg="#506c4c" opacity="0.7" rounded="md" />
              <Box w="full" h="10" bg="#506c4c" opacity="1" rounded="md" />

              {/* Settings and Awards */}
              <Box display="flex" alignItems="center">
                <Box w="10" h="10" bg="#506c4c" rounded="full"></Box>
                <Text ml={4} fontSize="xl" fontWeight="bold">
                  Settings
                </Text>
              </Box>

              <Box display="flex" alignItems="center">
                <Box w="10" h="10" bg="#506c4c" rounded="full"></Box>
                <Text ml={4} fontSize="xl" fontWeight="bold">
                  Awards
                </Text>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="yellow"
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
