import config from '@port/eslint-config'

/**
 * R3F(React Three Fiber) 3D 서브시스템 전용 오버라이드.
 *
 * `src/three` 는 프레임 루프(useFrame)에서의 Three.js 객체 mutation, 매 프레임 공유되는
 * mutable ref 스토어(store.tsx), 씬 배치를 위한 생성적 난수 등 명령형 패턴을 쓴다.
 * React 렌더 순수성/불변성을 전제하는 아래 규칙들은 이 디렉터리에서 오탐이므로 끈다.
 * (컨텍스트 모듈이 Provider 컴포넌트와 훅을 함께 export 하는 것도 정상 설계)
 */
export default [
  ...config,
  {
    files: ['src/three/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
]
