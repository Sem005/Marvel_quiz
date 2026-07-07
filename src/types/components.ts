import { ReactNode } from "react";

export interface RouteComponentProps {
  history: {
    push: (path: string) => void;
  };
}

export interface QuizProps {
  userData: {
    pseudo?: string;
    uid?: string;
    email?: string | null;
  };
}

export interface FirebaseRouteProps {
  history: {
    push: (path: string) => void;
  };
}

export interface ModalProps {
  openModal: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export interface LevelsProps {
  LevelNames: string[];
  quizLevel: number;
}

export interface ProgressBarProps {
  idQuestion: number;
  maxQuestions: number;
}

export interface QuizOverProps {
  LevelNames: string[];
  score: number;
  maxQuestions: number;
  quizLevel: number;
  percent: number;
  loadLevelQuestion: (param: number) => void;
}
