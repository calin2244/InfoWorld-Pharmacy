import styled from "styled-components"

export const  StyledForm = styled.form`
    max-width: 550px;
    width: 100%;
    margin: 2rem auto;

    h2{
        margin-bottom: 1rem;
        text-align: center;
    }

    button, input{
        height: 40px;
        width: 100%;
        padding: 1rem;
        outline: none;
        border-radius: 5px;
        border: 2px solid gray;
        margin-bottom: 0.4rem;

        &:focus{
            border: 2px solid purple;
        }

        transition: 0.2s all;
    }

    button{
        cursor: pointer;
        border: none;
        background-color: rgb(120, 101, 123);
        color: white;
    }

    button:hover{
        background-color: lightgray;
        color: black;
    }

    p{
        font-size: 16px;
        color: red;
    }
`