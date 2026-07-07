export interface UserData {
  uid?: string;
  pseudo?: string;
  email?: string | null;
}

export interface QuizOption {
  id: number;
  question: string;
  options: string[];
  answer: string;
  heroId: number;
}

export interface QuizLevelData {
  [key: string]: QuizOption[];
}

export interface QuizMarvelData {
  fournisseur: string;
  sujet: string;
  quizz: QuizLevelData;
}

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}
