import React, { createContext, useReducer, useCallback, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";

import Button from "./buttons/QuizButton";
import CodeMirror from "./CodeMirror";
import Confetti from "./Confetti";
import { QuestionNav as NavBar } from "./NavBar";
import { Modal } from "./Modal";

import { QuestionProps, Option } from "./types";
import { getStyles } from "../utils/getStyles";
import { updateQuestion } from "../utils/useLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
// import Link from "next/link";

export const QuestionContext = createContext(null);

const ButtonRow: Function = ({ show }): JSX.Element => {
  const { question } = useContext(QuestionContext);

  return (
    <StyledButtonRow>
      {question?.options.map(
        (opt: Option, i: number): JSX.Element => (
          <Button show={show} opt={opt} />
        )
      )}
    </StyledButtonRow>
  );
};

const Question: React.FC<QuestionProps> = ({ question }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    hasAnswered: false,
    answer: null,
    correct: null
  });
  const router = useRouter();
  
  const [count, setCount]= useState(30);
  const [show, setShow]= useState(false);

  useEffect(() => {
    const counterSet = setInterval(() => {
      if(count === 0){
        //alert('navigate');
        const id = parseInt(question.id) + 1
        router.push(`/question/${id}`)
      } else if(count < 5){
        setShow(true);
      }
      else { 
        setCount(count => count - 1);
      }
    }, 1000 )
    return () => clearInterval(counterSet);
  },[count])
  const handleClick = useCallback((correct: boolean): void => {
    if (!state.hasAnswered) {
      updateQuestion(question.id, correct);
      setState({ hasAnswered: true, correct });
    }
  }, []);

  return (
    <QuestionContext.Provider value={{ state, handleClick, question }}>
      <NavBar />
      <StyledQuestion>
        <Modal />
        <Confetti />
        <StyledTitle>{"Q : " + question.id + " - " + question.title + ""}</StyledTitle>
        <CodeMirror />
        <ButtonRow show={show}/>
        <BtnContainer>
          <Link href={`/question/${parseInt(question.id) - 1}`}>
            <StyledBtn>previous Question</StyledBtn>
          </Link>
          <Link href={`/question/${parseInt(question.id) + 1}`}>
            <StyledBtn>Next Question</StyledBtn>
          </Link>
          <StyledBtn>Remaining Time: {count}</StyledBtn>
        </BtnContainer>
      </StyledQuestion>
    </QuestionContext.Provider>
  );
};

export default Question;

const BtnContainer = styled.div`
 display: flex;
 margin-top: 30px;
 justify-content: 'space-between'
`
const StyledBtn = styled.button`
width: 100%;
background: linear-gradient(to right,#56ab2f,#a8e063);
font-size: 14px;
width: 200px;
font-family: Menlo;
color: #fff;
border: 2px solid #4d5761;
border-radius: 50px;
cursor: pointer;
outline: none;
margin: .7rem;
padding: .7rem;

&:hover {
  background: linear-gradient(to right,#00b4db,#0083b0);
}
`;

const StyledQuestion = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => getStyles([theme.dim.question])};
`;

const StyledButtonRow = styled.div`
  display: flex;
  width: 500px;
  margin-top: 40px;
  flex-direction: column;
  ${({ theme }) => getStyles([theme.dim.buttonRow])};
`;

const StyledTitle = styled(Markdown)`
  ${({ theme }) =>
    getStyles([theme.dim.title, theme.fonts.title, theme.colors.title])};
`;
const StyledCounter = styled.div`
font-size: 50px;
display: flex;
${({ theme }) =>
getStyles([theme.dim.title, theme.colors.title])};
`;