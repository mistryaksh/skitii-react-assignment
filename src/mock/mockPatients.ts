export type MockPatient = {
  patientId: string;
  pin: string;
  name: string;
  age: number;
  condition: string;
};

export const mockPatients: MockPatient[] = [
  {
    patientId: "PT001",
    pin: "1234",
    name: "Rajesh Kumar",
    age: 45,
    condition: "Breast Cancer - Stage 2",
  },
  {
    patientId: "PT002",
    pin: "5678",
    name: "Priya Sharma",
    age: 52,
    condition: "Lung Cancer - Stage 3",
  },
  {
    patientId: "PT003",
    pin: "9012",
    name: "Amit Patel",
    age: 48,
    condition: "Colorectal Cancer - Stage 2",
  },
];
