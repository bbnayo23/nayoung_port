import styled from 'styled-components';

export const StyledTabNavigation = styled.nav`
  min-width: 1440px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 24px;

  .display-margin {
    width: 100%;
    margin: 0 auto;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    gap: 24px;
    align-items: center;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-right: 20px;
  }

  .tab-button {
    /* Button reset */
    appearance: none;
    background: none;
    border: none;
    outline: none;
    font-family: inherit;

    padding: 17px 4px;
    font-size: 14px;
    color: #6b7280;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #111827;
      transition: width 0.2s ease;
    }

    &:hover {
      color: #111827;

      &::after {
        width: 100%;
      }
    }

    &.active {
      color: #111827;

      &::after {
        width: 100%;
      }
    }

    .count {
      color: #9ca3af;
      font-size: 13px;
    }
  }
`;

export const StyledPageTitle = styled.div`
  margin-bottom: 16px;

  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
`;

export const StyledStyleToggle = styled.div`
  display: flex;
  gap: 8px;
  margin: 32px 0 24px;

  button {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #ffffff;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #f9fafb;
      color: #111827;
    }

    &.active {
      background: #111827;
      color: #ffffff;
      border-color: #111827;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const StyledSearchWrapper = styled.div`
  margin-bottom: 24px;
  position: relative;

  > svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #9ca3af;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 12px 44px;
    font-size: 15px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease;
    background: #ffffff;
    color: #111827;
    box-sizing: border-box;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      border-color: #d1d5db;
      box-shadow: 0 0 0 3px rgba(229, 231, 235, 0.5);
    }
  }

  button.clear {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #9ca3af;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: #111827;
    }
  }
`;

export const StyledIconCount = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

export const StyledIconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

export const StyledIconCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 140px;
  user-select: none;

  &:hover {
    background: #f9fafb;

    .icon-preview {
      transform: scale(1.1);
    }

    .icon-name {
      color: #111827;
    }
  }

  &:active {
    background: #f3f4f6;
  }

  &.copied {
    background: #f3f4f6;

    &:hover {
      background: #f3f4f6;
    }

    .icon-name {
      color: #111827;
      font-weight: 500;
    }
  }

  .icon-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    transition: transform 0.2s ease;
    position: relative;
  }

  .copied-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #111827;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .icon-name {
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    word-break: break-word;
    transition: color 0.2s ease;
  }
`;

export const StyledControls = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 24px;

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    input[type='range'] {
      width: 200px;
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      outline: none;
      -webkit-appearance: none;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #ffffff;
        border: 2px solid #9ca3af;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: #111827;
          transform: scale(1.1);
        }
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #ffffff;
        border: 2px solid #9ca3af;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    input[type='color'] {
      width: 60px;
      height: 40px;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #d1d5db;
        transform: scale(1.05);
      }
    }
  }
`;
