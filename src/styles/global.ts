import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font: 87.5%;
    }
  }

  h1{
    font-weight: 600;
  }
  h1, h2, h3, h4, h5, p{
    font-family: 'Montserrat';
  }
  
`
