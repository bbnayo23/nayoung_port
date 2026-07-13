import { useState, useMemo, useCallback } from 'react';
import { allIcons, menus } from '@showcase/data/icons/index';
import type { Menus, IconItem } from '@showcase/data/icons/types';
import { StyledMainContent } from '@showcase/styled';
import { StyledPageTitle, StyledTabNavigation, StyledSearchWrapper, StyledStyleToggle, StyledIconCount, StyledIconGrid, StyledIconCard, StyledControls } from './IconGallery.styled';

/**
 * 아이콘 갤러리 페이지
 * lazy loading으로 필요할 때만 로드됨
 */
const IconGallery = () => {
  const [iconStyle, setIconStyle] = useState<'outline' | 'solid'>('solid');
  const [activeSolution, setActiveSolution] = useState<Menus>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [size, setSize] = useState(32);
  const [color, setColor] = useState('#111827');

  // 아이콘 이름 복사 핸들러
  const handleCopyIconName = useCallback(async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    } catch (err) {
      console.error('Failed to copy icon name:', err);
    }
  }, []);

  // 아이콘 필터링 헬퍼 함수
  const filterIcons = (icons: IconItem[]) => {
    let filtered = activeSolution === '전체' ? icons : icons.filter((icon) => icon.solution === activeSolution);

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((icon) => icon.name.toLowerCase().trim().includes(query));
    }

    return filtered;
  };

  // 선택된 솔루션과 검색어에 따라 아이콘 필터링
  const filteredIcons = useMemo(() => filterIcons(allIcons), [activeSolution, searchQuery]);

  // 탭별 타이틀과 설명
  const getPageContent = () => {
    switch (activeSolution) {
      case '전체':
        return {
          title: 'ALL Icons',
          description: "Igloo's unified icon library for consistent design across all products."
        };
      case 'EXD':
        return {
          title: 'EXD Icons',
          description: 'Icon set designed for Extended Detection and Response solutions.'
        };
      case 'SOAR':
        return {
          title: 'SOAR Icons',
          description: 'Security Orchestration, Automation and Response icon collection.'
        };
      case 'XDR':
        return {
          title: 'XDR Icons',
          description: 'Extended Detection and Response specialized icon library.'
        };
      default:
        return {
          title: 'ALL Icons',
          description: "Igloo's unified icon library for consistent design across all products."
        };
    }
  };

  const pageContent = getPageContent();

  return (
    <>
      <StyledTabNavigation>
        <div className="display-margin">
          <h3 className="title">Igloo Icons</h3>
          {menus.map((menu) => (
            <button key={menu} className={`tab-button ${activeSolution === menu ? 'active' : ''}`} onClick={() => setActiveSolution(menu)}>
              {menu}
            </button>
          ))}
        </div>
      </StyledTabNavigation>

      <StyledMainContent>
        <StyledPageTitle>
          <h1>{pageContent.title}</h1>
          <p>{pageContent.description}</p>
        </StyledPageTitle>

        <StyledStyleToggle>
          <button className={iconStyle === 'solid' ? 'active' : ''} onClick={() => setIconStyle('solid')}>
            Solid
          </button>
          <button className={iconStyle === 'outline' ? 'active' : ''} onClick={() => setIconStyle('outline')} disabled>
            Outline
          </button>
        </StyledStyleToggle>

        <StyledControls>
          <div className="control-group">
            <label htmlFor="size">Size: {size}px</label>
            <input id="size" type="range" min="16" max="64" value={size} onChange={(e) => setSize(Number(e.target.value))} />
          </div>
          <div className="control-group">
            <label htmlFor="color">Color:</label>
            <input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        </StyledControls>

        <StyledSearchWrapper>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {searchQuery && (
            <button className="clear" onClick={() => setSearchQuery('')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </StyledSearchWrapper>

        <StyledIconCount>{filteredIcons.length.toLocaleString()} icons</StyledIconCount>

        <StyledIconGrid>
          {filteredIcons.map(({ name, component: IconComponent }) => (
            <StyledIconCard key={name} onClick={() => handleCopyIconName(name)} className={copiedName === name ? 'copied' : ''}>
              <div className="icon-preview">
                <IconComponent size={size} color={color} />
                {copiedName === name && <span className="copied-badge">Copied!</span>}
              </div>
              <span className="icon-name">{name}</span>
            </StyledIconCard>
          ))}
        </StyledIconGrid>
      </StyledMainContent>
    </>
  );
};

export default IconGallery;
