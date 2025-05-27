export interface Question {
  id: number;
  text: string;
  answers: string[];
  correct_answer: string;
}

const API_URL =
  "https://lxgdmchjmdkpgkwczogl.supabase.co/functions/v1/get_questions";

export async function getQuestions(): Promise<Question[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, "data2");

    // Validar que la respuesta tenga el formato esperado
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array");
    }

    // Validar cada pregunta
    const validQuestions = data.filter((question: any) => {
      return (
        question &&
        typeof question.id === "number" &&
        typeof question.text === "string" &&
        Array.isArray(question.answers) &&
        question.answers.length === 4 &&
        typeof question.correct_answer === "string" &&
        question.answers.includes(question.correct_answer)
      );
    });

    if (validQuestions.length === 0) {
      throw new Error("No valid questions found in response");
    }

    return validQuestions as Question[];
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}
