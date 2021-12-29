import styled from 'styled-components/native';

export const Container = styled.View`
   flex:1;
   background-color: ${({theme}) => theme.colors.background_secundary};

   margin-top: 20px;
`;

export const Header = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;

   
`;