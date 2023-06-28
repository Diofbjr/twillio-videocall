import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    height: 100vh;
`

export const SubContainer = styled.div`
    margin-left: 80px;
    .title{
        margin-top: 80px;
        h1{
            color: #082227;
            line-height: 39px;
        }
        h5{
            color: #787D7E;

            font-size: 14px;
        }
    }
    .consults{
        display: flex;
        margin-top: 10px;
        .consult, .new-consult{
            width: 370px;
            height: 370px;
            flex: 1;
        }
        .new-consult{
            margin-left: 30px;
        }

        h3{
            color: #082227;
            margin-bottom: 10px;

            font-size: 19px;
        }
        h2{
            color: #082227;
            margin-left: 50px;

            font-size: 16px;
        }
        .hour, .patient{
            display: flex;
            align-items: center;
            svg{
            color: #787D7E;
            width: 20px;
            height: 20px;
            margin-left: 60px;
        }
            h5{
                color: #787D7E;
                margin-left: 10px;

                font-size: 13px;
            }
        }
        .hour{
            margin-top: 10px;
            
        }
        .patient{
            margin-top: -15px;
        }
        .doctor{
            margin-left: 70px;
            display: flex;
            align-items: center;
            img{
                border-radius: 50%;
                margin-right: 10px;

                width: 50px;
                height: 50px;
            }
            .texts{
                display: flex;
                flex-direction: column;
                h4{
                    color: #082227;
                }
                p{
                    color: #787D7E;
                    margin-top: -10px;

                    font-size: 13px;
                }
            }
        }
        .buttons{
            margin-top: 10px;
            button, a{
                border: none;
                text-decoration: none;
            }
            a{
                padding: 10px 10px;
            }
                .button-1{
                    justify-content: center;
                    background-color:#013E56;
                    color: #ffff;

                    width: 150px;
                    height: 40px;
                    border-radius: 40px;
                    font-size: 15px;
                }
                .button-2{
                    background-color: #ECEAF4;
                    border: 1px solid #0C788F;
                    color: #0C788F;
                    margin-left: 15px;

                    width: 140px;
                    height: 40px;
                    border-radius: 40px;
                    font-size: 15px;
                }
            }
    }
`