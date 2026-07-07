import React, { Component, Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizMarvel } from "../Quiz-Marvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuizOver from "../QuizOver/QuizOver";
import { FaChevronRight } from "react-icons/fa";
import type { QuizOption, QuizQuestion } from "../../types";
import type { QuizProps } from "../../types/components";

interface QuizState {
  LevelNames: string[];
  quizLevel: number;
  maxQuestions: number;
  storedQuestions: QuizQuestion[];
  question: string | null;
  options: string[];
  idQuestion: number;
  btnDisabled: boolean;
  userAnswer: string | null;
  score: number;
  showWelcomeMsg: boolean;
  quizEnd: boolean;
  percent: number;
}

class Quiz extends Component<QuizProps, QuizState> {
  initialState: QuizState;
  storedDataRef: { current: QuizOption[] };

  constructor(props: QuizProps) {
    super(props);

    this.initialState = {
      LevelNames: ["debutant", "confirme", "expert", "ultime"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
      percent: 0,
    };

    this.state = this.initialState;
    this.storedDataRef = { current: [] };
  }

  loadQuestions = (level: string): void => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest,
      );
      this.setState({ storedQuestions: newArray });
    } else {
      console.log("Pas assez de questions");
    }
  };

  showToastMsg = (pseudo?: string): void => {
    if (!this.state.showWelcomeMsg && pseudo) {
      this.setState({ showWelcomeMsg: true });

      toast.info(`Bienvenue sur Ultimate Marvel Quiz ${pseudo}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.LevelNames[this.state.quizLevel]);
  }

  nextQuestion = (): void => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({ quizEnd: true });
    } else {
      this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }));
    }

    const storedQuestions = this.storedDataRef.current;
    if (!storedQuestions) {
      return;
    }

    const goodAnswer = storedQuestions[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
      toast.success("Bravoo + 1 !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error("Faux 0", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  componentDidUpdate(prevProps: QuizProps, prevState: QuizState) {
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        btnDisabled: true,
        userAnswer: null,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(
        this.state.maxQuestions,
        this.state.score,
      );
      this.gameOver(gradePercent);
    }

    const currentPseudo = this.props.userData?.pseudo;
    const previousPseudo = prevProps.userData?.pseudo;

    if (currentPseudo && currentPseudo !== previousPseudo) {
      this.showToastMsg(currentPseudo);
    }
  }

  submitAnswer = (selectedAnswer: string): void => {
    this.setState({ userAnswer: selectedAnswer, btnDisabled: false });
  };

  getPercentage = (maxQuest: number, ourScore: number): number =>
    (ourScore / maxQuest) * 100;

  gameOver = (percentage: number): void => {
    if (percentage >= 60) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percentage,
      });
    } else {
      this.setState({ percent: percentage });
    }
  };

  loadLevelQuestion = (param: number): void => {
    this.setState({ ...this.initialState, quizLevel: param }, () => {
      this.loadQuestions(this.state.LevelNames[param]);
    });
  };

  render() {
    if (this.props.userData === undefined || this.props.userData === null) {
      return <div>User data not fetched</div>;
    }

    const nextLevel =
      this.state.idQuestion < this.state.maxQuestions - 1
        ? "Suivant"
        : "Terminer";

    const displayOptions = this.state.options.map((option, index) => (
      <p
        key={index}
        className={`answerOptions ${this.state.userAnswer === option ? "selected" : ""}`}
        onClick={() => this.submitAnswer(option)}
      >
        <FaChevronRight />
        {option}
      </p>
    ));

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        LevelNames={this.state.LevelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestion={this.loadLevelQuestion}
      />
    ) : (
      <Fragment>
        <Levels
          LevelNames={this.state.LevelNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {nextLevel}
        </button>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default React.memo(Quiz);
