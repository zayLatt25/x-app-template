import { Card, CardBody, Flex, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./home.css";
import {useConnex, useWallet} from "@vechain/dapp-kit-react";
import {useEffect} from "react";
import {unitsUtils} from "@vechain/sdk-core";

export default function Home() {
  const {account} = useWallet()
  const connex = useConnex();

  useEffect(() => {
    // Run this code when the component loads
    connex.thor.account(account).get()
        .then(({ balance }) => {
          console.log('VET Balance:', unitsUtils.formatVET(balance));
        })
        .catch(error => {
          console.error('Error fetching account balance:', error);
        });
  }, [account]); // Empty array means the effect will only run once when the component mounts

  return (
    <div style={{ backgroundColor: "#c5dcc2" }}>
      <div className="parallax"></div>
      <Image src="/hill.png" />

      <div className="scroll-container" style={{ backgroundColor: "#4e6b4c" }}>
        <Flex justifyContent="center" alignItems="center" height="100%" gap={8}>
          <div>
            <Text color="#efefef" fontSize="5xl" fontWeight="bold">
              REDUCE
            </Text>
            <Card
              bg="#efefef"
              minHeight="350"
              paddingTop="210"
              borderRadius="25"
            >
              <Image
                src="/reduce.png"
                position="absolute"
                top="-80px"
                left="50%"
                transform="translateX(-50%)"
                width="300px"
              />

              <CardBody>
                <Text fontSize="md" textAlign="center">
                  Track and reduce your carbon emissions by taking snaps of you
                  using public transport, cycling, or adopting energy-efficient
                  habits!
                </Text>

                <Flex justify="center" mt="4">
                  <Link to="/reduceForm" style={{ textDecoration: "none" }}>
                    <Button
                      bg="#2a3d29"
                      color="#efefef"
                      _hover={{ bg: "#c5dcc2", color: "#2a3d29" }}
                      width="200px"
                    >
                      Crush your carbon!
                    </Button>
                  </Link>
                </Flex>
              </CardBody>
            </Card>
          </div>

          <div>
            <Text
              color="#efefef"
              fontSize="5xl"
              textAlign="right"
              fontWeight="bold"
            >
              OFFSET
            </Text>
            <Card
              bg="#efefef"
              minHeight="350"
              paddingTop="210"
              borderRadius="25"
            >
              <Image
                src="/offset.png"
                position="absolute"
                top="-90px"
                left="50%"
                transform="translateX(-65%)"
                width="310px"
              />

              <CardBody>
                <Text fontSize="md" textAlign="center">
                  Offset unavoidable emissions by participating and snapping in
                  activities such as planting trees or engaging in sustainable
                  community service projects.
                </Text>

                <Flex justify="center" mt="4">
                  <Link to="/offsetForm" style={{ textDecoration: "none" }}>
                    <Button
                      bg="#2a3d29"
                      color="#efefef"
                      _hover={{ bg: "#c5dcc2", color: "#2a3d29" }}
                      width="200px"
                    >
                      Get your credit!
                    </Button>
                  </Link>
                </Flex>
              </CardBody>
            </Card>
          </div>
        </Flex>
      </div>
    </div>
  );
}
