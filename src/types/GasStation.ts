export default interface GasStation {
  id: string,
  name: string,
  brand: string,
  street: string,
  place: string,
  lat: number,
  lng: number,
  dist: number,
  price: number,
  isOpen: boolean,
  houseNumber: string,
  postCode: number
}