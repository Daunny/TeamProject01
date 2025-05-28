export interface QuestionOption {
  text: string;
  score_P?: number; // Score for Proactive
  score_R?: number; // Score for Reactive
  score_S?: number; // Score for Solution-focused
  score_F?: number; // Score for Product-focused
  score_E?: number; // Score for Emotional
  score_T?: number; // Score for Transactional
  score_I?: number; // Score for Independent
  score_C?: number; // Score for Collaborative
}

export interface Question {
  text: string;
  options: string[]; // In the backend, this is just an array of strings
  axis: number;
  // The 'scores' object from the backend is complex.
  // For frontend display, we might not need to expose its internal structure directly
  // if the backend handles all scoring logic based on chosen_option_index.
  // However, if options were objects with scores, QuestionOption would be part of options array.
  // For simplicity, assuming backend's `questions` endpoint returns options as string array.
  // The backend `sales_mbti_core.py` has `options` as `string[]` and `scores` as a separate dict.
  // The frontend only needs to send back the `question_index` and `chosen_option_index`.
  original_index?: number; // To map back to the main list if needed
}

export interface Answer {
  question_index: number; // Original index of the question in the full list
  chosen_option_index: number; // 0-indexed
  axis: number; // Axis the question belongs to
}

export interface PersonalityResult {
  code: string;
  animal: string;
  description: string;
}

export interface MbtiState {
  questions: Question[];
  answers: Answer[];
  currentAxis: number; // 1-4
  // Tracks the number of questions answered *for the current axis*
  // This helps in determining if all questions for the current axis are answered
  // and if we can proceed to the next axis or submit.
  // This will be managed by counting answers for the currentAxis.
  personalityResult: PersonalityResult | null;
  isLoading: boolean;
  error: string | null;
  fetchQuestions: () => Promise<void>;
  recordAnswer: (questionIndex: number, chosenOptionIndex: number, axis: number) => void;
  nextAxis: () => void;
  submitDiagnosis: () => Promise<void>;
  resetDiagnosis: () => void;
  isCurrentAxisCompleted: () => boolean;
  getTotalQuestionsForAxis: (axis: number) => number;
}

// Type for the flat list of answers sent to the backend
export interface BackendAnswer {
  question_index: number;
  chosen_option_index: number;
}
