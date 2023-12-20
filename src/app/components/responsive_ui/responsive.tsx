import React from 'react';
import styled from 'styled-components';

const MobileUi = () => {
    return (
        <MobileUiWrapper>
            <ContentContainer>
                <HeaderText>Mobile App is Under Construction!</HeaderText>
                <SubText>
                    Please use the PC version for now. Stay tuned and check back later!
                </SubText>
            </ContentContainer>
        </MobileUiWrapper>
    );
};

export default MobileUi;

const MobileUiWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a; /* Darker background color */
  color: #fff; /* White text color */
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const HeaderText = styled.h1`
  font-size: 28px;
  color: #61dafb; /* React blue color */
  margin-bottom: 20px;
`;

const SubText = styled.p`
  padding: 0 15px 0 15px;
  font-size: 22px;
  color: #ccc; /* Light gray text color */
`;
