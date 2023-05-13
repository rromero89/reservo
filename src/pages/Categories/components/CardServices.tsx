import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  Divider,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
function CardsServices() {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://media.istockphoto.com/id/1173615398/es/foto/m%C3%A9dico-traumat%C3%B3logo-examinando-su-rodilla-paciente.jpg?s=612x612&w=is&k=20&c=KmW0hbjqOeEXpHYr62wHzrCO3yulbVeFX1lNBxPz3NI="
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Traumatología</Heading>
          <Text>
            La Traumatología y Ortopedia es la especialidad de la medicina
            dirigida al estudio y tratamiento de las afecciones del sistema
            músculo esquelético...
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Reserve now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
export default CardsServices;
