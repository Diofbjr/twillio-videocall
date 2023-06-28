import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 80px;
`


export const SubContainer = styled.div`
    margin-top: 20px;
    .searching{
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            border: 1px solid #98A1A3;
            padding-left: 20px;
            
            border-radius:40px;
            width: 250px;
            height: 40px;
        }
        input:focus {
            outline: none;
        }
        svg{
            margin-left: 20px;
            width: 40px;
            height: 40px;
        }
        .notification, .profile{
            border: none;
            background: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            gap: 20;
        }
        
        .profile{
            img{
                border-radius: 50%;

                margin-left: 60px;
                width: 40px;
                height: 40px;
            }
        }
    }
`

