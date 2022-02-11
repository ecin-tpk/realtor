import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxW={1000} m="auto" p={4}>
    {photos && <ImageScrollbar data={photos} />}
    <Box w="full" p={6}>
      <Flex pt={2} align="center">
        <Box pr={3} color="green.400">
          {isVerified && <GoVerified />}
        </Box>
        <Text fontWeight="bold" fontSize="lg">
          AED {price} {rentFrequency && `/${rentFrequency}`}
        </Text>
        <Spacer />
        <Avatar size="sm" src={agency?.logo?.url} />
      </Flex>
      <Flex
        align="center"
        p={1}
        justify="space-between"
        w={250}
        color="blue.400"
      >
        {rooms}
        <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
      </Flex>
    </Box>
    <Box mt={2}>
      <Text fontSize="lg" mb={2} fontWeight="bold">
        {title}
      </Text>
      <Text lineHeight={2} color="gray.600">
        {description}
      </Text>
    </Box>
    <Flex wrap="wrap" textTransform="uppercase" justify="space-between">
      <Flex
        justify="space-between"
        w={400}
        borderBottom={1}
        borderColor="gray.100"
        p={3}
      >
        <Text>Type</Text>
        <Text fontWeight="bold">{type}</Text>
      </Flex>
      <Flex
        justify="space-between"
        w={400}
        borderBottom={1}
        borderColor="gray.100"
        p={3}
      >
        <Text>Purpose</Text>
        <Text fontWeight="bold">{purpose}</Text>
      </Flex>
      {furnishingStatus && (
        <Flex
          justify="space-between"
          w={400}
          borderBottom={1}
          borderColor="gray.100"
          p={3}
        >
          <Text>Furnishing Status</Text>
          <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
      )}
    </Flex>
    <Box>
      {amenities.length && (
        <Text fontSize="2xl" fontWeight="black" mt={5}>
          Facilites:
        </Text>
      )}
      <Flex wrap="wrap">
        {amenities?.map((item) =>
          item?.amenities?.map((amenity) => (
            <Text
              key={amenity.text}
              fontWeight="bold"
              color="blue.400"
              fontSize="l"
              p="2"
              bg="gray.200"
              m="1"
              borderRadius="5"
            >
              {amenity.text}
            </Text>
          ))
        )}
      </Flex>
    </Box>
  </Box>
);

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}

export default PropertyDetails;
