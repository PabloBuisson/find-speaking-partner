export interface Partner {
  id: any;
  firstName: string;
  lastName: string;
  pseudo?: string;
  email?: string;
  description: string;
  languagesLearnt: string[];
  languagesWanted: string[];
  level: "professional" | "intermediate" | "beginner";
}