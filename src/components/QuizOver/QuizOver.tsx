import React, { Fragment, useEffect, useState } from 'react';
import { GiDiamondTrophy } from 'react-icons/gi';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import Modal from '../Modal/Modal';
import type { QuizOption } from '../../types';
import type { QuizOverProps } from '../../types/components';

const QuizOver = React.forwardRef<QuizOption[], QuizOverProps>((props, ref) => {
  const { LevelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestion } = props;
  const currentRef = ref as React.RefObject<QuizOption[]>;

  const [asked, setAsked] = useState<QuizOption[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setAsked(currentRef?.current ?? []);
  }, [currentRef]);

  useEffect(() => {
    const averageGrade = maxQuestions / 2 + 1;

    if (score < averageGrade) {
      const timer = window.setTimeout(() => {
        loadLevelQuestion(quizLevel);
      }, 4000);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [score, maxQuestions, loadLevelQuestion, quizLevel]);

  const showModal = (_id: number): void => {
    setOpenModal(true);
  };

  const closeModal = (): void => {
    setOpenModal(false);
  };

  const averageGrade = maxQuestions / 2 + 1;

  const decision = score >= averageGrade ? (
    <Fragment>
      <div className='stepsBtnContainer'>
        {quizLevel < LevelNames.length ? (
          <Fragment>
            <p className='successMsg'>Passer au niveau suivant! </p>
            <button className='btnResult success' onClick={() => loadLevelQuestion(quizLevel)}>
              Niveau Suivant
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <p className='successMsg'>
              <GiDiamondTrophy size='50px' color='blue' /> Félicitation vous êtes un Marvel !
            </p>
            <button className='btnResult gameOver' onClick={() => loadLevelQuestion(0)}>
              Acceuil
            </button>
          </Fragment>
        )}
      </div>

      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='stepsBtnContainer'>
        <p className='failureMsg'>
          <BsFillEmojiLaughingFill color='yellow' size='30px' />
          <BsFillEmojiLaughingFill color='yellow' size='30px' />
          <BsFillEmojiLaughingFill color='yellow' size='30px' />
          vous avez échoué ha ha ha ha ! réessayer
        </p>
      </div>

      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  );

  const quizAnswers = score >= averageGrade ? (
    asked.map((quiz) => (
      <tr key={quiz.id}>
        <td>{quiz.question}</td>
        <td>{quiz.answer}</td>
        <td>
          <button className='btnInfo' onClick={() => showModal(quiz.heroId)}>
            infos
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3}>
        <div className='loader'></div>
        <p
          style={{
            textAlign: 'center',
            color: 'red',
          }}
        >
          pas de réponse
        </p>
      </td>
    </tr>
  );

  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées:</p>
      <div className='answerContainer'>
        <table className='answers'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{quizAnswers}</tbody>
        </table>
      </div>
      <Modal openModal={openModal} closeModal={closeModal}>
        <div className='modalHeader'>
          <h2>Titre</h2>
        </div>
        <div className='modalBody'>Coming soon ...</div>
        <div className='modalFooter'>
          <button className='modalBtn'>Fermer</button>
        </div>
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
