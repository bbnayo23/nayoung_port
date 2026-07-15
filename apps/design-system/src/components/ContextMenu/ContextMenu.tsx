import { createPortal } from "react-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import type { RefObject } from "react";
import { XdrChevronRightIcon } from "@port/icon-library";
import type { ContextMenuProps, ContextMenuItem } from "./types";
import { useClampedPosition, useMenuKeyboard, useOutsideClose, shouldFlipSubMenu } from "./hooks";
import { usePortal } from "@dc/components/Portal/hooks";
import * as styles from "./ContextMenu.css";

const SUBMENU_CLOSE_DELAY = 200;

interface SubMenuProps {
  items: ContextMenuItem[];
  parentRef: RefObject<HTMLLIElement | null>;
  onClose: () => void;
}

const SubMenu = ({ items, parentRef, onClose }: SubMenuProps) => {
  // 부모 li 의 화면상 위치로 서브메뉴 펼침 방향을 결정. SubMenu 는 부모가 이미 렌더된
  // 뒤에만 마운트되므로 render 시점에 parentRef.current 를 읽어도 안전하다.
  // eslint-disable-next-line react-hooks/refs
  const flip = shouldFlipSubMenu(parentRef.current);

  return (
    <ul role="menu" className={`${styles.subMenu}${flip ? ` ${styles.subMenuLeft}` : ""}`}>
      {items.map((it) => {
        if (it.divider) {
          return <li key={it.key} role="separator" className={styles.divider} />;
        }
        const disabled = Boolean(it.disabled);
        return (
          <li
            key={it.key}
            role="menuitem"
            aria-disabled={disabled}
            tabIndex={-1}
            className={`${styles.item}${disabled ? ` ${styles.itemDisabled}` : ""}`}
            onClick={() => {
              if (disabled) return;
              if (it.onSelect) {
                it.onSelect();
                onClose();
              }
            }}
          >
            {it.icon && <span className={styles.icon}>{it.icon}</span>}
            <span>{it.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

interface MenuItemRowProps {
  it: ContextMenuItem;
  idx: number;
  active: number;
  setActive: (idx: number) => void;
  openSubIdx: number;
  onOpenSub: (idx: number) => void;
  onCloseSub: () => void;
  onClose: () => void;
}

const MenuItemRow = ({ it, idx, active, setActive, openSubIdx, onOpenSub, onCloseSub, onClose }: MenuItemRowProps) => {
  const liRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const disabled = Boolean(it.disabled);
  const isActive = idx === active;
  const hasChildren = Boolean(it.children && it.children.length > 0);
  const isSubOpen = openSubIdx === idx;

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      onCloseSub();
    }, SUBMENU_CLOSE_DELAY);
  }, [cancelClose, onCloseSub]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  const handleMouseEnter = () => {
    setActive(idx);
    cancelClose();
    if (hasChildren) onOpenSub(idx);
    else onCloseSub();
  };

  const handleMouseLeave = () => {
    if (hasChildren && isSubOpen) scheduleClose();
  };

  const handleClick = () => {
    if (disabled) return;
    if (hasChildren) onOpenSub(idx);
    else if (it.onSelect) {
      it.onSelect();
      onClose();
    }
  };

  return (
    <li
      ref={liRef}
      role="menuitem"
      aria-haspopup={hasChildren ? "menu" : undefined}
      aria-expanded={hasChildren ? isSubOpen : undefined}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={`${styles.item}${disabled ? ` ${styles.itemDisabled}` : ""}${isActive ? ` ${styles.itemActive}` : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {it.icon && <span className={styles.icon}>{it.icon}</span>}
      <span>{it.label}</span>
      {hasChildren && (
        <span className={styles.chevron}>
          <XdrChevronRightIcon size={12} />
        </span>
      )}
      {hasChildren && isSubOpen && it.children && <SubMenu items={it.children} parentRef={liRef} onClose={onClose} />}
    </li>
  );
};

export const ContextMenu = ({ open, x, y, items, onClose }: ContextMenuProps) => {
  const container = usePortal();
  const menuRef = useRef<HTMLUListElement>(null);
  const [openSubIdx, setOpenSubIdx] = useState(-1);

  const openSubMenu = useCallback((idx: number) => setOpenSubIdx(idx), []);
  const closeSubMenu = useCallback(() => setOpenSubIdx(-1), []);

  const pos = useClampedPosition(menuRef, open, x, y);
  const { active, setActive } = useMenuKeyboard(open, items, onClose, openSubMenu, closeSubMenu, openSubIdx);
  useOutsideClose(menuRef, open, onClose);

  useEffect(() => {
    // 메뉴가 닫히면 열려 있던 서브메뉴 인덱스 초기화
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setOpenSubIdx(-1);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <ul
      ref={menuRef}
      role="menu"
      className={styles.menu}
      style={{
        left: pos.left,
        top: pos.top,
        visibility: pos.measured ? "visible" : "hidden",
      }}
    >
      {items.map((it, idx) => {
        if (it.divider) {
          return <li key={it.key} role="separator" className={styles.divider} />;
        }
        return (
          <MenuItemRow
            key={it.key}
            it={it}
            idx={idx}
            active={active}
            setActive={setActive}
            openSubIdx={openSubIdx}
            onOpenSub={openSubMenu}
            onCloseSub={closeSubMenu}
            onClose={onClose}
          />
        );
      })}
    </ul>,
    container,
  );
};

export default ContextMenu;
