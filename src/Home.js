import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import logo from './logo.svg'


const Home = () => {
  const [counter, setcounter] = useState(60)
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setcounter(counter - 1), 1000);
  }, [counter]);

  let total = 0
  let correct = 0
  let wrong = 0

  var [totals, settotals] = useState(0)
  var [corrects, setcorrects] = useState(0)
  var [wrongs, setwrongs] = useState(0)
  useEffect(() => {
    console.log(totals);
    if (total !== 0) {
      settotals(totals = total)
      setcorrects(corrects = correct)
      setwrongs(wrongs = wrong)
    }
  })

  // const [counter, setcounter] = useState(0)
  const [answerStatus, setAnswerStatus] = useState(() => {
    return Questions.map((item) => {
      return {
        numb: item.numb,
        answered: false,
        givenAnswer: ""
      };
    });
  });

  const action = (questionNumber, answer) => {
    setAnswerStatus((prevState) => {
      return prevState.map((item) =>
        item.numb === questionNumber
          ? { ...item, answered: true, givenAnswer: answer }
          : item
      );
    });
  };

  const isAnswerCorrect = (questionNumber) => {
    const status = answerStatus.find((item) => item.numb === questionNumber);
    const question = Questions.find((item) => item.numb === questionNumber);
    return status.answered && question.answer === status.givenAnswer;
  };

  const questionAnswered = (questionNumber) => {
    const status = answerStatus.find((item) => item.numb === questionNumber);
    return status.answered;
  };

  const getGivenAnswer = (questionNumber) => {
    return answerStatus.find((item) => item.numb === questionNumber)
      ?.givenAnswer;
  };


  return (
    <>
      <div className="main">
        <div className="head">
          <h3>Quiz App</h3>
          <div className="timer">
            <div className="time_left_txt">Time Left</div>
            <div className="timer_sec">{counter}</div>
          </div>
        </div>
        {
          counter === 0 ?
            <div>
              <div className="timeout">
                <img className='App-logo' src={logo} alt="Logo" />
                <h2 className="animated">Time out</h2>
              </div>
              <div className="total">
                <h3>Attempted: <span className="span1">{totals}</span> | Correct: <span className="span2">{corrects}</span> | Wrong: <span className="span3">{wrongs}</span> </h3>
                <h5><a href="https://workforwin.com" target='_blank'>&copy; 2021 | Workforwin.com</a></h5>
              </div>
            </div>
            :
            <div>
              {Questions.map((item, i) => (
                <div className="box" key={i}>
                  <div className="title">
                    <h2 className="qno">{item.numb}</h2>
                    <h2> {item.question}</h2>
                  </div>
                  <div className="options">
                    {Object.entries(item.options).map(([optionId, optionDesc]) => {
                      return (
                        <span
                          onClick={() =>
                            !questionAnswered(item.numb) &&
                            action(item.numb, optionDesc)
                          }
                          style={{
                            backgroundColor: questionAnswered(item.numb)
                              ? isAnswerCorrect(item.numb) &&
                                getGivenAnswer(item.numb) === optionDesc
                                ? "lightgreen"
                                : isAnswerCorrect(item.numb)
                                  ? ""
                                  : item.answer !== optionDesc
                                    ? questionAnswered(item.numb) &&
                                      getGivenAnswer(item.numb) === optionDesc
                                      ? "tomato"
                                      : ""
                                    : "lightgreen"
                              : "",
                            padding: "5px",
                            borderRadius: "3px",
                            margin: "3px",
                            cursor: !questionAnswered(item.numb)
                              ? "pointer"
                              : "not-allowed",
                            color: questionAnswered(item.numb)
                              ? isAnswerCorrect(item.numb) &&
                                getGivenAnswer(item.numb) === optionDesc
                                ? "black"
                                : isAnswerCorrect(item.numb)
                                  ? ""
                                  : item.answer !== optionDesc
                                    ? questionAnswered(item.numb) &&
                                      getGivenAnswer(item.numb) === optionDesc
                                      ? "white"
                                      : ""
                                    : "black"
                              : ""
                          }}

                          {...isAnswerCorrect(item.numb) &&
                            getGivenAnswer(item.numb) === optionDesc ? correct += 1 : null}

                          {...questionAnswered(item.numb) &&
                            getGivenAnswer(item.numb) === optionDesc ? total += 1 : null}

                          {...item.answer !== optionDesc &&
                            getGivenAnswer(item.numb) === optionDesc ? wrong += 1 : null}
                        >

                          {optionDesc}
                          {isAnswerCorrect(item.numb) &&
                            getGivenAnswer(item.numb) === optionDesc ? <CheckCircleIcon className="iconstyle" /> : item.answer !== optionDesc &&
                              getGivenAnswer(item.numb) === optionDesc ? <CancelIcon className="iconstyle1" /> : null}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </>
  );
};

export default Home;
