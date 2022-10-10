export interface Partner {
  id: string | number;
  firstName: string;
  lastName: string;
  pseudo?: string;
  email?: string;
  description: string;
  langNative: string[];
  langPractice: string[];
  level: "professional" | "intermediate" | "beginner";
  interests?: string;
  exchange: Array<"conversation" | "chat" | "correspondence">;
}
