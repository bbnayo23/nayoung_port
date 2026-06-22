import styled from 'styled-components';

export const StyledIconImportTest = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
  }

  .description {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 32px;
  }

  .test-section {
    margin-bottom: 48px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      margin: 32px 0 16px 0;
    }
  }

  .code-block {
    background: #1f2937;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;

    pre {
      margin: 0;
      color: #e5e7eb;
      font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    margin: 16px 0;
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 16px;
    background: #ffffff;
    transition: all 0.2s ease;

    &:hover {
      background: #f9fafb;
      transform: translateY(-2px);

      .icon-name {
        color: #111827;
      }
    }

    .icon-name {
      font-size: 12px;
      color: #6b7280;
      text-align: center;
      word-break: break-word;
      transition: color 0.2s ease;
    }
  }

  .usage-examples {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .example-group {
    padding: 24px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .example-buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      background: #ffffff;
      color: #111827;

      &:hover {
        background: #f9fafb;
        border-color: #d1d5db;
        transform: translateY(-1px);
      }
    }

    .btn-primary {
      background: #111827;
      color: #ffffff;
      border-color: #111827;

      &:hover {
        background: #374151;
        border-color: #374151;
      }
    }

    .btn-secondary {
      background: #ffffff;
      color: #111827;

      &:hover {
        background: #f9fafb;
      }
    }

    .btn-success {
      background: #10b981;
      color: #ffffff;
      border-color: #10b981;

      &:hover {
        background: #059669;
        border-color: #059669;
      }
    }
  }

  .example-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 8px;
      background: #f9fafb;
      transition: all 0.2s ease;

      &:hover {
        background: #f3f4f6;
      }

      span {
        color: #374151;
        font-size: 14px;
      }
    }
  }

  .example-nav {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    color: #374151;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f9fafb;
      border-color: #d1d5db;
      transform: translateY(-1px);
    }
  }

  .props-test {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .props-example {
    padding: 24px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .icon-row {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 6px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .size-labels,
  .color-labels {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;

    span {
      font-size: 12px;
      color: #6b7280;
      text-align: center;
      min-width: 60px;
    }
  }

  .custom-icon {
    color: #8b5cf6;
    filter: drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3));
  }

  @media (max-width: 768px) {
    padding: 24px 16px;

    .controls {
      flex-direction: column;
      gap: 16px;
    }

    .icon-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .example-buttons {
      flex-direction: column;
    }

    .example-nav {
      flex-direction: column;
    }

    .icon-row {
      gap: 16px;
    }
  }
`;

export const StyledSearchWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

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
