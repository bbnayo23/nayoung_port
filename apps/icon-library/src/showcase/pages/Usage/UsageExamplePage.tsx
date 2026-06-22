import { StyledMainContent } from '@showcase/styled';
import { StyledUsagePage } from './UsageExamplePage.styled';

/**
 * 사용 예제 페이지
 * lazy loading으로 필요할 때만 로드됨
 */
const UsageExamplePage = () => {
  return (
    <StyledMainContent>
      <StyledUsagePage>
        <section className="section">
          <h2>Installation</h2>
          <pre className="code-block">{`npm install @igloo/igloo-icons`}</pre>
        </section>

        <section className="section">
          <h2>Import Methods</h2>

          <h3>1. 개별 아이콘 import (권장)</h3>
          <pre className="code-block">{`import { ExdPlusIcon, SoarCheckIcon, XdrArrowIcon } from '@igloo/igloo-icons';

<ExdPlusIcon size={24} color="blue" />
<SoarCheckIcon size={16} />
<XdrArrowIcon size={32} />`}</pre>

          <h3>2. 솔루션별 namespace import</h3>
          <pre className="code-block">{`import { exd, soar, xdr } from '@igloo/igloo-icons';

<exd.ExdPlusIcon size={24} />
<soar.SoarCheckIcon size={16} />
<xdr.XdrArrowIcon size={32} />`}</pre>

          <h3>3. 전체 import</h3>
          <pre className="code-block">{`import * as Icons from '@igloo/igloo-icons';

<Icons.ExdPlusIcon size={24} />
<Icons.SoarCheckIcon size={16} />`}</pre>
        </section>

        <section className="section">
          <h2>Props</h2>
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>size</code>
                </td>
                <td>
                  <code>number | string</code>
                </td>
                <td>
                  <code>24</code>
                </td>
                <td>아이콘 크기 (px)</td>
              </tr>
              <tr>
                <td>
                  <code>color</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>`currentColor`</code>
                </td>
                <td>아이콘 색상</td>
              </tr>
              <tr>
                <td>
                  <code>className</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>-</code>
                </td>
                <td>CSS 클래스</td>
              </tr>
              <tr>
                <td>
                  <code>title</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>-</code>
                </td>
                <td>접근성 타이틀</td>
              </tr>
            </tbody>
          </table>
        </section>
      </StyledUsagePage>
    </StyledMainContent>
  );
};

export default UsageExamplePage;
