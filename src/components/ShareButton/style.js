import styled from 'styled-components';

const ContainerShareButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;  
  margin-top: 8px;

  button {
    background-color: var(--orange);
    border: none;
    width: 44px;
    height: 44px;
  }

  span {
    text-align: center;
    color: white;
    font-size: 12px;
    padding-bottom: 14px;
  }
`;

export default ContainerShareButton;
