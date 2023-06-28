import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    float: left;
    width: 300px;
    height: 100vh;
`
export const SubContainer = styled.div`
    margin-top: 2em;
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        img{
        width: 170px;
        height: auto;
        }
        button{
            border: none;
            margin-left: 40px;
            border-radius: 50px;
            background-color: #013E56;
            color: #fff;

            padding-top: 4px;
            width: 40px;
            height: 40px;
            font-size: 20px;
        }
    }
    .navegation{
        margin-top: 4em;
        button{
            display: flex;
            align-items: center;
            border: none;
            background: none;
            margin-bottom: 5px;
            
            width: 250px;
            height: 50px;
        }
        svg{
            margin-left: 10px;

            font-size: 30px;
        }
        p{
            margin-left: 25px;
            line-height: 17px;

            font-size: 20px;
        }
        .settings{
            position: relative;
            min-height: 200px;
        }
        .set{
            position: absolute;
            bottom: -35px;
            right: 0;
        }
        .exit{
            position: absolute;
            bottom: -85px;
            right: 0;
        }
    }
`