import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Box,
  CardHeader,
  StackDivider,
} from "@chakra-ui/react";

export default function Settings() {
  return (
    <div className="text-xl">
      <h1 className="text-4xl font-bold text-white text-center mt-6">
        Settings
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 *:border px-4 py-10 *:rounded-xl max-w-5xl mx-auto">
        <div className="md:col-span-2">
          <div className="flex bg-white rounded-xl p-4 h-full">
            <img
              src="https://dummyimage.com/200x200"
              alt=""
              className="rounded-full w-fit h-fit"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">John Doe</h2>
              <div className="text-lg space-y-2">
                <p>
                  <span className="opacity-60">Account:</span>
                  123123123
                </p>
                <p>
                  <span className="opacity-60">Balance:</span>: 0 VET
                </p>
                <p>
                  <span className="opacity-60">Carbon Credit:</span>: 123
                </p>
                <p>
                  <span className="opacity-60">Email:</span>: johndoe@gmail.com
                </p>
                <p>
                  <span className="opacity-60">Telephone:</span>: 1234567890
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 flex flex-col h-full">
            <h2 className="font-bold text-xl mb-4">Wallet Address</h2>
            <div className="text-lg space-y-2 mb-4">
              <p>Default Option:</p>
              <input
                className="rounded-full px-2 py-1 bg-slate-300 w-[min(500px,100%)]"
                placeholder="**** **** 3333"
                type="text"
              />
            </div>
            <div className="flex-col flex flex-grow h-full font-bold text-white">
              <div className="h-14 grid place-items-center border rounded-lg mb-2 bg-[#506c4c]">
                Provider 1
              </div>
              <div className="h-14 grid place-items-center border rounded-lg bg-[#506c4c]">
                Provider 2
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 bg-white px-4 py-6">
          <div className=" relative">
            <span className="absolute h-[95%] border-l translate-x-[6px] translate-y-2"></span>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
            <div className="relative mb-8">
              <span className="absolute top-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-black"></span>
              <h2 className="pl-6">Earned 1 VET on 1/1/2024</h2>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="col-span-3"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
