import axios from 'axios';
import { Question, PersonalityResult, BackendAnswer } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await apiClient.get<Question[]>('/questions');
  return response.data;
};

export const submitDiagnosis = async (answers: BackendAnswer[]): Promise<PersonalityResult> => {
  const response = await apiClient.post<PersonalityResult>('/diagnose', { answers });
  return response.data;
};
