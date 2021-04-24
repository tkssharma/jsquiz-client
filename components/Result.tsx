import styled from "styled-components";
import Link from "next/link";

import Button from "./buttons/Button";
import { DashboardNav as NavBar } from "./NavBar";

import { GridItemProps, DashboardProps, Question } from "./types";
import { getStyles } from "../utils/getStyles";
import { useQuestionStatus } from "../utils/useLocalStorage";

const GridItem: React.FC<GridItemProps> = ({ question }) => {
    const status: string = useQuestionStatus(question.id);
    return <StyledButton status={status}>{question.title}</StyledButton>;
};


const StyledTitle = styled.div`
  ${({ theme }) =>
    getStyles([theme.dim.title, theme.fonts.title, theme.colors.title])};
`;

const correctQuestions = (data) => {
    let correct = 0;
    let incorrect = 0;

    if (data) {
        data.questions.map(i => {
            const status = useQuestionStatus(i.id);
            console.log(status);
            if (status === 'correct') {
                correct++;
            }
            if (status === 'incorrect') {
                incorrect++;
            }
        })
    }
    return {
        correct,
        incorrect,
        total: data.questions.length
    }
}

const RenderResult: React.FC<any> = ({ data }) => {
    console.log(correctQuestions(data));
    const { correct, total, incorrect } = correctQuestions(data) || {};
    return (<div>
        <StyledTitle>Correct - {correct} </StyledTitle>
        <StyledTitle>incorrect - {incorrect}</StyledTitle>
        <StyledTitle>Total - {total}</StyledTitle>
    </div>)
    

}

const Dashboard: React.FC<DashboardProps> = ({ data }) => (
    <>
        <NavBar />
        { data && data?.questions?.length > 0 && <RenderResult data={data} />}
        <StyledDashboardGrid>
            {data?.questions?.map((question: Question) => (
                <Link href={`/question/${question.id}`} key={question.id}>
                    <a>
                        <GridItem question={question} />
                    </a>
                </Link>
            ))}
        </StyledDashboardGrid>
    </>
);

export default Dashboard;

const StyledDashboardGrid = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => getStyles([theme.dim.dashboard.column])};
`;

const StyledButton = styled<any>(Button)`
  ${({ theme, status }) => `
    ${getStyles([theme.dim.dashboard.button])};
    background: ${getBackground(status)};
    width: 800px;
   
    &:hover {
      background: linear-gradient(to right, #00b4db, #0083b0);
    }
  `}
`;

const getBackground = status =>
    [
        "linear-gradient(to right, #56ab2f, #a8e063)",
        "linear-gradient(to right, #ff512f, #dd2476)"
    ][["correct", "incorrect"].indexOf(status)];
