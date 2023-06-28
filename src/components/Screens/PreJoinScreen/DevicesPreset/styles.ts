import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`

export const SubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    .logo{
        position: absolute;
        top: 30px;
        left: 50px;
        img{
            width: 200px;
            height: auto;
        }
    }
    .video{
        margin: 150px 0 0;
        border-radius: 20px;
        width: 550px;
        .camAndMic{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 73%;
            left: 23%;
            z-index: 1;
            margin: 0 auto 0;
            gap: 30px;
            button{
                border-radius: 50%;
                border: none;
                background-color: #0C788F;

                width: 50px;
                height: 50px;
            }
            svg{
                color: #fff;

                width: 25px;
                height: 25px;
                
            }
            .settings{
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 47%;
                right: 22.5%;
                z-index: 1;
            }
        }
    }
    .join{
        margin: 150px 0 0;
        background-color: #F1F1F1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 5px;
        
        width: 550px;
        height: 315px;
        h1{
            color: #053039;
            
            font-size: 32px;
        }
        h5{
            color: #8B8B8B;

            font-size: 16px;
        }
        .buttons-container{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 30px;
            
            button{
                border: none;
                border-radius: 40px;
                margin-top: 50px;
                
                width: 200px;
                height: 50px;
            }
            .log-on{
                background-color: #013E56;
                color: #fff;

                font-size: 16px;
            }
            .back{
                border: 1px solid #0C788F;
                color: #0C788F;
                
                width: 150px;
                font-size: 16px;
            }
        }
        
    }

`