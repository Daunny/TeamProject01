import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Question, Answer, PersonalityResult, MbtiState, BackendAnswer } from '@/types';
import { fetchQuestions as apiFetchQuestions, submitDiagnosis as apiSubmitDiagnosis } from '@/services/api';

// Helper function to get the number of questions for a given axis
const getQuestionsForAxis = (questions: Question[], axis: number): Question[] => {
  return questions.filter(q => q.axis === axis);
};

export const useMbtiStore = create<MbtiState>()(
  devtools(
    (set, get) => ({
      questions: [],
      answers: [], // Stores answers as { question_index (original), chosen_option_index, axis }
      currentAxis: 1,
      personalityResult: null,
      isLoading: false,
      error: null,

      fetchQuestions: async () => {
        set({ isLoading: true, error: null });
        try {
          const fetchedQuestions = await apiFetchQuestions();
          // Add original_index to each question for easier mapping later
          const questionsWithOriginalIndex = fetchedQuestions.map((q, index) => ({
            ...q,
            original_index: index,
          }));
          set({ questions: questionsWithOriginalIndex, isLoading: false, answers: [], currentAxis: 1, personalityResult: null });
        } catch (err) {
          set({ error: 'Failed to fetch questions.', isLoading: false });
          console.error(err);
        }
      },

      recordAnswer: (questionOriginalIndex: number, chosenOptionIndex: number, axis: number) => {
        set(state => {
          const newAnswers = state.answers.filter(a => a.question_index !== questionOriginalIndex);
          newAnswers.push({ question_index: questionOriginalIndex, chosen_option_index: chosenOptionIndex, axis });
          return { answers: newAnswers };
        });
      },
      
      getTotalQuestionsForAxis: (axis: number) => {
        const { questions } = get();
        return getQuestionsForAxis(questions, axis).length;
      },

      isCurrentAxisCompleted: () => {
        const { questions, answers, currentAxis } = get();
        const questionsForCurrentAxis = getQuestionsForAxis(questions, currentAxis);
        const answeredQuestionsForCurrentAxis = answers.filter(a => a.axis === currentAxis).length;
        return answeredQuestionsForCurrentAxis === questionsForCurrentAxis.length;
      },

      nextAxis: () => {
        set(state => {
          if (state.currentAxis < 4) {
            return { currentAxis: state.currentAxis + 1 };
          }
          return {}; // No change if already on the last axis
        });
      },

      submitDiagnosis: async () => {
        set({ isLoading: true, error: null });
        const { answers, questions } = get();

        // Transform answers to the flat list format required by the backend
        const backendAnswers: BackendAnswer[] = answers.map(ans => ({
          question_index: ans.question_index, // Use the original index stored in the answer
          chosen_option_index: ans.chosen_option_index,
        }));
        
        try {
          const result = await apiSubmitDiagnosis(backendAnswers);
          set({ personalityResult: result, isLoading: false });
        } catch (err) {
          set({ error: 'Failed to submit diagnosis.', isLoading: false });
          console.error(err);
        }
      },

      resetDiagnosis: () => {
        set({
          answers: [],
          currentAxis: 1,
          personalityResult: null,
          isLoading: false,
          error: null,
          // Optionally, refetch questions if they could change, or keep them.
          // For this app, keeping them is fine.
        });
      },
    }),
    { name: 'mbti-store' }
  )
);
