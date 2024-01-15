// brand.json
export interface Brands {
  name : { kr : string, en: string}
  id : number
  imgUrl : string
}

// Brand.tsx
// export interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// carData.json
interface Car {
  brand: {
    kr: string;
    en: string;
  };
  name: {
    kr: string;
    en: string;
  };
  id: number;
  segment: string;
  imgUrl: string;
  photoNumber: { "exterior": number, "interior" :number};
  price: {
    min: number;
    max: number;
  };
  date: string;
  gasMileage: string;
  fuelTypes: string[];
  grades: Grade[];
}

interface Grade {
  name: string;
  trims: Trim[];
}

interface Trim {
  name: string;
  price: number;
  fuelType: string;
  engine: string;
  displacement: string;
  transMission: string;
  drivingSystem: string;
  power: string;
  torque: string;
  complexGasMileage: string;
  urbanGasMileage: string;
  highwayGasMileage: string;
  ratingGasMileage: string;
  lowEmission: string;
  vehicleWeight: string;
  autoLevel: string;
  frontTire: string;
  rearTire: string;
  frontBrake: string;
  rearBrake: string;
  frontSuspension: string;
  rearSuspension: string;
  capacity: string;
  length: string;
  weight: string;
  height: string;
  wheelBase: string;
  track: string;
  tread: string;
  zero: string | number;

  // 전기
  evMileage: string,
  charging: string,
  chargingQuick: string,
  chargingSlow: string,

  // + 하이브리드
  batteryType: string,
  batteryVolume: string,
  motorPower: string;
  motorTorque: string;
}