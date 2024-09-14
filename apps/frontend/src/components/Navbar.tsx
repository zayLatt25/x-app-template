import { Box, Container, HStack, Image } from "@chakra-ui/react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import Profile from "../routes/profile";

export const Navbar = () => {
  return (
    <Box
      px={0}
      position={"sticky"}
      top={0}
      zIndex={10}
      py={4}
      h={"auto"}
      w={"full"}
      bg={"#efefef"}
    >
      <Container
        w="full"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        maxW={"container.xl"}
      >
        <HStack flex={1} justifyContent={"start"}>
          <Image src="/logo.png" w="10" />
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"center"}>
          <a
            className="hidden sm:block hover:cursor-pointer hover:underline"
            href="/"
          >
            Home
          </a>
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"center"}>
          <a
            className="hidden sm:block hover:cursor-pointer hover:underline"
            href="/settings"
          >
            Settings
          </a>
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"center"}>
          {/* Remove the old Profile link and replace with the drawer */}
          <Profile />
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"end"}>
          <ConnectWalletButton />
        </HStack>
      </Container>
    </Box>
  );
};
