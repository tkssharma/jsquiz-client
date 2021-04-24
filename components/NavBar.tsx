import Link from "next/link";
import styled from "styled-components";

import Grid from "./icons/Grid";
import GitHub from "./icons/GitHub";
import { getStyles } from "../utils/getStyles";

export const QuestionNav = () => (
  <StyledNavBar>
    <Link href="/">
      <a>
        <Grid />
      </a>
    </Link>
    <Link href="/question/result">
      <StyledBtn>
         Finish Test
      </StyledBtn>
    </Link>
  </StyledNavBar>
);

export const DashboardNav = () => (
  <StyledNavBar>
    <Link href="https://github.com/lydiahallie/jsquiz">
      <a target="_blank">
        <GitHub />
      </a>
    </Link>
  </StyledNavBar>
);

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => `
    ${getStyles([theme.dim.topBar, theme.colors.topBar])}
`}
`;

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

&:hover {
  background: linear-gradient(to right,#00b4db,#0083b0);
}
`;