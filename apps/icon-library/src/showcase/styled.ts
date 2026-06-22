import styled from 'styled-components';

export const StyledAppContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

export const StyledHeader = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

export const StyledTopNav = styled.nav`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 16px 24px;
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #111827;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledNavLinks = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 5px;

  a {
    font-size: 14px;
    color: #6b7280;
    text-decoration: none;
    transition: all 0.15s ease;

    &:hover {
      color: #111827;
      text-shadow: 0 0 16px rgba(17, 24, 39, 0.2);
      transform: translateY(-1px);
    }

    &.active {
      color: #111827;
      font-weight: 600;
      text-shadow: 0 0 20px rgba(17, 24, 39, 0.25);
      transform: translateY(-1px);
    }
  }
`;

export const StyledPageLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  color: #6b7280;

  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e5e7eb;
    border-top-color: #111827;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    margin-top: 16px;
    font-size: 14px;
  }
`;

export const StyledMainContent = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px;
`;
