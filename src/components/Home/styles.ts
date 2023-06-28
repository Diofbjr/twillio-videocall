import styled from "styled-components";

export const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto auto;
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.02em;
        margin-top: 1em;
        margin-bottom: 0.7em;
        color: #013E56;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .form-group {
        margin: auto auto;
        label {
            display: block;
            font-weight: bold;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;

            
            margin-left: 3px;
            margin-bottom: 3px;
            line-height: 18px;
        }
        input {
            flex-direction: row;
            align-items: center;
            padding: 12px 16px;
            gap: 10px;
            margin-bottom: 1em;
            
            background: #F2F2F2;
            border: 2px solid #013E56;
        }
    }
    .button-1 {
        display: flex;
        align-items: center;
        margin: auto auto;
        justify-content: center;
        border: none;
        background: #013E56;
        border-radius: 10px;
        margin-top: 0.7em;
        text-decoration: none;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        color: #ffffff;
    }
    .or {
        margin-top: 1em;
        margin-bottom: 1em;
        text-align: center;
        h2 {
            display: inline-block;
            color: #B8AEAE;
        }
        .hr-left,
        .hr-right {
            display: inline-block;
            border-color: #B8AEAE;
        }
    }
    .others {
        text-align: center;
        .button-2 {
            border: 1px solid #B8AEAE;
            background-color: transparent;

            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            line-height: 27px;
            color: #403d3d;
        }
        h5 {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            line-height: 19px;
        }
        a {
            text-decoration: none;
            color: #0C788F;
        }
        .text-1,
        .text-2 {
            display: inline-block;
        }
    }
    
    @media screen and (min-width: 769px) and (max-width: 1280px){
        width: 500px;
        img{
            width: 150px;
            height: auto;
        }
        h1{
            font-size: 31px;
        }
        .form-group{
            label{
                font-size: 16px;
            }
            input{
                border-radius: 8px;
                width: 400px;
                height: 40px;
            }
        }
        .button-1{
            width: 400px;
            height: 40px;
            font-size: 20px;
        }
        .or{
            h2{
                font-size: 20px;
            }
            .hr-left,
            .hr-right {
                width: 170px;
                margin: 4px 10px;
            }
        }
        .others{
            .button-2{
                border-radius: 10px;
                width: 400px;
                height: 40px;

                font-size: 20px;
            }
            h5{
                font-size: 16px;
                a{
                font-size: 13px;
                }
            }
            
        }
        .text-1,
        .text-2 {
            margin: 2em 10px;
        }
    }
    @media screen and (min-width: 1281px) and (max-width: 1366px){
        width: 600px;
        img{
            width: 170px;
            height: auto;
        }
        h1{
            font-size: 35px;
        }
        .form-group{
            label{
                font-size: 20px;
            }
            input{
                border-radius: 8px;
                width: 450px;
                height: 45px;
            }
        }
        .button-1{
            width: 450px;
            height: 45px;
            font-size: 22px;
        }
        .or{
            h2{
                font-size: 22px;
            }
            .hr-left,
            .hr-right {
                width: 195px;
                margin: 4px 10px;
            }
        }
        .others{
            .button-2{
                border-radius: 10px;
                width: 450px;
                height: 45px;

                font-size: 22px;
            }
            h5{
                font-size: 17px;
                a{
                font-size: 15px;
                }
            }
            
        }
        .text-1,
        .text-2 {
            margin: 2em 10px;
        }
    }
    @media screen and (min-width: 1367px) and (max-width: 1600px){
        width: 700px;
        img{
            width: 190px;
            height: auto;
        }
        h1{
            font-size: 39px;
        }
        .form-group{
            label{
                font-size: 24px;
            }
            input{
                border-radius: 8px;
                width: 500px;
                height: 50px;
            }
        }
        .button-1{
            width: 500px;
            height: 50px;
            font-size: 24px;
        }
        .or{
            h2{
                font-size: 24px;
            }
            .hr-left,
            .hr-right {
                width: 220px;
                margin: 4px 10px;
            }
        }
        .others{
            .button-2{
                border-radius: 10px;
                width: 500px;
                height: 50px;

                font-size: 24px;
            }
            h5{
                font-size: 19px;
                a{
                font-size: 17px;
                }
            }
            
        }
        .text-1,
        .text-2 {
            margin: 2em 10px;
        }
    }
    @media screen and (min-width: 1601px) and (max-width: 1920px){
        width: 800px;
        img{
            width: 210px;
            height: auto;
        }
        h1{
            font-size: 42px;
        }
        .form-group{
            label{
                font-size: 27px;
            }
            input{
                border-radius: 8px;
                width: 550px;
                height: 55px;
            }
        }
        .button-1{
            width: 550px;
            height: 55px;
            font-size: 26px;
        }
        .or{
            h2{
                font-size: 26px;
            }
            .hr-left,
            .hr-right {
                width: 240px;
                margin: 4px 10px;
            }
        }
        .others{
            .button-2{
                border-radius: 10px;
                width: 550px;
                height: 55px;

                font-size: 26px;
            }
            h5{
                font-size: 21px;
                a{
                font-size: 19px;
                }
            }
            
        }
        .text-1,
        .text-2 {
            margin: 2em 10px;
        }
    }
`;
