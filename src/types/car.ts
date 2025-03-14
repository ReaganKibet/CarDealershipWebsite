export interface CarModel {
  id: string;
  name: string;
  year: number;
}

export interface CarMake {
  id: string;
  name: string;
  models: CarModel[];
}

export interface CarImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface CarSpecs {
  engine: string;
  transmission: string;
  drivetrain: string;
  horsepower: string;
  torque: string;
  fuelEconomy: string;
  acceleration: string;
}

export interface Car {
  id: string;
  makeId: string;
  modelId: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  description: string;
  images: CarImage[];
  specs: CarSpecs;
  features: string[];
  createdAt: string;
  updatedAt: string;
}