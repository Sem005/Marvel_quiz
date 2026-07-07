import React, { Fragment } from "react";

type ProgressBarProps = {
  idQuestion: number;
  maxQuestions: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  idQuestion,
  maxQuestions,
}) => {
  const getPercentage = (totalQuestions: number, questionId: number) => {
    return (100 / totalQuestions) * questionId;
  };

  const actualQuestion = idQuestion + 1;
  const progressPercent = getPercentage(maxQuestions, actualQuestion);

  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Question: ${idQuestion + 1}/${maxQuestions}`}</div>
        <div className="progressPercent">{`Progression: ${progressPercent}%`}</div>
      </div>

      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
