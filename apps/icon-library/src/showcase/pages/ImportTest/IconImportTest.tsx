import { useState, useMemo } from 'react';
// 빌드된 결과물에서 동적으로 아이콘 목록 import (VITE_USE_DIST=true 환경에서 dist 폴더 사용)
import { exdDistIcons, soarDistIcons, xdrDistIcons } from '@showcase/data/dist-icons';
import { StyledIconImportTest, StyledSearchWrapper } from './IconImportTest.styled';

/**
 * 아이콘 Import 테스트 페이지
 * 빌드된 결과물(dist/)을 실제 라이브러리처럼 import하여 테스트합니다.
 * VITE_USE_DIST=true 환경 변수로 dist 폴더를 사용하도록 설정됩니다.
 */
export const IconImportTest = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링 (useMemo 내부에서 직접 처리)
  const filteredExdIcons = useMemo(() => {
    if (!searchQuery) return exdDistIcons;
    const query = searchQuery.toLowerCase().trim();
    return exdDistIcons.filter((icon) => icon.name.toLowerCase().includes(query));
  }, [searchQuery]);

  const filteredSoarIcons = useMemo(() => {
    if (!searchQuery) return soarDistIcons;
    const query = searchQuery.toLowerCase().trim();
    return soarDistIcons.filter((icon) => icon.name.toLowerCase().includes(query));
  }, [searchQuery]);

  const filteredXdrIcons = useMemo(() => {
    if (!searchQuery) return xdrDistIcons;
    const query = searchQuery.toLowerCase().trim();
    return xdrDistIcons.filter((icon) => icon.name.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <StyledIconImportTest>
      <h1>아이콘 Import 테스트 ( 빌드된 패키지 )</h1>
      <p className="description">빌드된 패키지(dist/)에서 {exdDistIcons.length + soarDistIcons.length + xdrDistIcons.length}개의 아이콘을 테스트합니다 - VITE_USE_DIST=true로 실행됨</p>

      {/* 검색바 */}
      <StyledSearchWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="아이콘 이름으로 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {searchQuery && (
          <button className="clear" onClick={() => setSearchQuery('')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </StyledSearchWrapper>

      {/* 섹션 1: EXD 아이콘 */}
      <section className="test-section">
        <h2>1. EXD Icons ({filteredExdIcons.length})</h2>
        <div className="code-block">
          <pre>{`import { ExdPlusIcon, ExdCheckIcon, ... } from '@igloo/igloo-icons';`}</pre>
        </div>
        <div className="icon-grid">
          {filteredExdIcons.map((icon) => {
            const IconComponent = icon.component;
            return (
              <div key={icon.name} className="icon-item">
                <IconComponent size={24} color="#111827" />
                <span className="icon-name">{icon.name}</span>
              </div>
            );
          })}
        </div>
        {filteredExdIcons.length === 0 && <p className="no-results">검색 결과가 없습니다.</p>}
      </section>

      {/* 섹션 2: SOAR 아이콘 */}
      <section className="test-section">
        <h2>2. SOAR Icons ({filteredSoarIcons.length})</h2>
        <div className="code-block">
          <pre>{`import { SoarAlarmIcon, SoarCheckIcon, ... } from '@igloo/igloo-icons';`}</pre>
        </div>
        <div className="icon-grid">
          {filteredSoarIcons.map((icon) => {
            const IconComponent = icon.component;
            return (
              <div key={icon.name} className="icon-item">
                <IconComponent size={24} color="#111827" />
                <span className="icon-name">{icon.name}</span>
              </div>
            );
          })}
        </div>
        {filteredSoarIcons.length === 0 && <p className="no-results">검색 결과가 없습니다.</p>}
      </section>

      {/* 섹션 3: XDR 아이콘 */}
      <section className="test-section">
        <h2>3. XDR Icons ({filteredXdrIcons.length})</h2>
        <div className="code-block">
          <pre>{`import { XdrCheckIcon, XdrPlusIcon, ... } from '@igloo/igloo-icons';`}</pre>
        </div>
        <div className="icon-grid">
          {filteredXdrIcons.map((icon) => {
            const IconComponent = icon.component;
            return (
              <div key={icon.name} className="icon-item">
                <IconComponent size={24} color="#111827" />
                <span className="icon-name">{icon.name}</span>
              </div>
            );
          })}
        </div>
        {filteredXdrIcons.length === 0 && <p className="no-results">검색 결과가 없습니다.</p>}
      </section>

      {/* 섹션 4: 실제 사용 예제 */}
      {filteredExdIcons.length > 0 &&
        filteredSoarIcons.length > 0 &&
        (() => {
          const ExdIcon1 = filteredExdIcons[0]?.component;
          const ExdIcon2 = filteredExdIcons[Math.min(1, filteredExdIcons.length - 1)]?.component;
          const ExdIcon3 = filteredExdIcons[Math.min(2, filteredExdIcons.length - 1)]?.component;
          const SoarIcon1 = filteredSoarIcons[0]?.component;
          const SoarIcon2 = filteredSoarIcons[Math.min(1, filteredSoarIcons.length - 1)]?.component;
          const SoarIcon3 = filteredSoarIcons[Math.min(2, filteredSoarIcons.length - 1)]?.component;

          if (!ExdIcon1 || !ExdIcon2 || !ExdIcon3 || !SoarIcon1 || !SoarIcon2 || !SoarIcon3) return null;

          return (
            <section className="test-section">
              <h2>4. 실제 사용 예제</h2>
              <div className="usage-examples">
                {/* 버튼 예제 */}
                <div className="example-group">
                  <h3>버튼에서 사용</h3>
                  <div className="example-buttons">
                    <button className="btn-primary">
                      <ExdIcon1 size={16} color="white" />
                      <span>추가</span>
                    </button>
                    <button className="btn-secondary">
                      <ExdIcon2 size={16} />
                      <span>닫기</span>
                    </button>
                    <button className="btn-success">
                      <ExdIcon3 size={16} color="white" />
                      <span>확인</span>
                    </button>
                  </div>
                  <div className="code-block">
                    <pre>{`<button className="btn-primary">
  <{filteredExdIcons[0].name}Icon size={16} color="white" />
  <span>추가</span>
</button>`}</pre>
                  </div>
                </div>

                {/* 리스트 예제 */}
                <div className="example-group">
                  <h3>리스트에서 사용</h3>
                  <ul className="example-list">
                    <li>
                      <SoarIcon1 size={20} color="#10b981" />
                      <span>완료된 작업</span>
                    </li>
                    <li>
                      <SoarIcon2 size={20} color="#f59e0b" />
                      <span>주의가 필요한 작업</span>
                    </li>
                    <li>
                      <SoarIcon3 size={20} color="#ef4444" />
                      <span>실패한 작업</span>
                    </li>
                  </ul>
                  <div className="code-block">
                    <pre>{`<li>
  <{filteredSoarIcons[0].name}Icon size={20} color="#10b981" />
  <span>완료된 작업</span>
</li>`}</pre>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

      {/* 섹션 5: Props 테스트 */}
      {filteredExdIcons.length > 0 &&
        filteredSoarIcons.length > 0 &&
        filteredXdrIcons.length > 0 &&
        (() => {
          const ExdIcon = filteredExdIcons[0]?.component;
          const SoarIcon = filteredSoarIcons[0]?.component;
          const XdrIcon = filteredXdrIcons[0]?.component;

          if (!ExdIcon || !SoarIcon || !XdrIcon) return null;

          return (
            <section className="test-section">
              <h2>5. Props 테스트</h2>
              <div className="props-test">
                <div className="props-example">
                  <h3>Size Variants</h3>
                  <div className="icon-row">
                    <ExdIcon size={16} color="#111827" />
                    <ExdIcon size={24} color="#111827" />
                    <ExdIcon size={32} color="#111827" />
                    <ExdIcon size={48} color="#111827" />
                    <ExdIcon size={64} color="#111827" />
                  </div>
                  <div className="size-labels">
                    <span>16px</span>
                    <span>24px</span>
                    <span>32px</span>
                    <span>48px</span>
                    <span>64px</span>
                  </div>
                </div>

                <div className="props-example">
                  <h3>Color Variants</h3>
                  <div className="icon-row">
                    <SoarIcon size={32} color="#3b82f6" />
                    <SoarIcon size={32} color="#10b981" />
                    <SoarIcon size={32} color="#f59e0b" />
                    <SoarIcon size={32} color="#ef4444" />
                    <SoarIcon size={32} color="#8b5cf6" />
                  </div>
                  <div className="color-labels">
                    <span>#3b82f6</span>
                    <span>#10b981</span>
                    <span>#f59e0b</span>
                    <span>#ef4444</span>
                    <span>#8b5cf6</span>
                  </div>
                </div>

                <div className="props-example">
                  <h3>ClassName & Style</h3>
                  <div className="icon-row">
                    <XdrIcon size={32} className="custom-icon" />
                    <XdrIcon size={32} style={{ transform: 'rotate(45deg)' }} />
                    <XdrIcon size={32} style={{ opacity: 0.5 }} />
                  </div>
                  <div className="code-block">
                    <pre>{`<{filteredXdrIcons[0].name}Icon size={32} className="custom-icon" />
<{filteredXdrIcons[0].name}Icon size={32} style={{ transform: 'rotate(45deg)' }} />
<{filteredXdrIcons[0].name}Icon size={32} style={{ opacity: 0.5 }} />`}</pre>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}
    </StyledIconImportTest>
  );
};

export default IconImportTest;
