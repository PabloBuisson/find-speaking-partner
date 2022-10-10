export interface PartnerRegistration {
  firstName: string;
  lastName: string;
  description: string;
  langNative: string[];
  langPractice: string[];
  level: "professional" | "intermediate" | "beginner";
  interests?: string;
  exchange: Array<"conversation" | "chat" | "correspondence">;
}
