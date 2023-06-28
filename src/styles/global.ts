import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root{
        --blue-600: #4A90A7;
        --blue-400: #5BB2CD;
        --white: #FFFFFF;
        --pink: #E07E72;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat';
    }

    html {
        scroll-behavior: smooth;
        @media (max-width: 1080px) {
        font-size: 93.75%;
        }
        @media (max-width: 720px) {
        font-size: 87.5%;
        }

    }

    body {
        
    }

    body, input, textarea, button {
        font-family: 'Montserrat';
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong, label{
        font-weight: 600;
    }

    button{
        cursor: pointer;
    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }
    `
