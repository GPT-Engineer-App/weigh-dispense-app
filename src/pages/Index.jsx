import React, { useState } from "react";
import { Box, Heading, VStack, HStack, Text, Input, Button, Image, useToast } from "@chakra-ui/react";
import { FaWeight, FaBalanceScale, FaPlay, FaStop } from "react-icons/fa";

const Index = () => {
  const [targetWeight, setTargetWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);
  const toast = useToast();

  const handleDispense = () => {
    if (targetWeight === "") {
      toast({
        title: "Please enter a target weight",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsDispensing(true);
    const interval = setInterval(() => {
      setCurrentWeight((prevWeight) => {
        const newWeight = prevWeight + Math.random() * 10;
        if (newWeight >= targetWeight) {
          clearInterval(interval);
          setIsDispensing(false);
          toast({
            title: "Dispensing completed",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        return newWeight;
      });
    }, 500);
  };

  const handleStop = () => {
    setIsDispensing(false);
    setCurrentWeight(0);
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="center">
        <Heading size="2xl">
          <FaWeight /> Weighing and Dispensing
        </Heading>
        <Image src="https://images.unsplash.com/photo-1522844990619-4951c40f7eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3ZWlnaGluZyUyMHNjYWxlfGVufDB8fHx8MTcxMDgxNTI3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Weighing Scale" boxSize="200px" />
        <HStack spacing={4}>
          <Text fontSize="xl">Target Weight (g):</Text>
          <Input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} isDisabled={isDispensing} />
        </HStack>
        <Text fontSize="2xl">
          <FaBalanceScale /> Current Weight: {currentWeight.toFixed(2)} g
        </Text>
        <HStack spacing={4}>
          <Button leftIcon={<FaPlay />} colorScheme="green" onClick={handleDispense} isDisabled={isDispensing}>
            Start Dispensing
          </Button>
          <Button leftIcon={<FaStop />} colorScheme="red" onClick={handleStop} isDisabled={!isDispensing}>
            Stop Dispensing
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;
