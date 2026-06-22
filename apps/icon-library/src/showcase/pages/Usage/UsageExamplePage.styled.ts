import styled from 'styled-components';

export const StyledUsagePage = styled.div`
  .section {
    margin-bottom: 32px;
    padding: 24px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #374151;
      margin: 24px 0 12px 0;
    }
  }

  .code-block {
    background: #1f2937;
    color: #e5e7eb;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.6;
    font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  }

  .props-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
      color: #111827;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    td {
      font-size: 14px;
      color: #374151;
    }

    tr:last-child td {
      border-bottom: none;
    }

    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
      color: #111827;
    }
  }
`;
