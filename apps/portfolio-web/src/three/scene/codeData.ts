/** 코드 디멘션 비주얼용 스니펫/색 — 모두 ASCII(폰트 안전), 장식 목적 */

/** Material/Dracula 계열 신택스 컬러 */
export const CODE_COLOR = {
  keyword: '#b66dff', // 트라이어드 바이올렛
  string: '#5ef0c0', // 네온 민트
  func: '#4cc8ff', // 일렉트릭 시안블루
  number: '#ff9d52', // 단일 웜 오렌지 스파크
  comment: '#5a6a9c', // 의도적으로 가라앉힌 슬레이트-바이올렛
  text: '#c2c8f5', // 쿨 오프화이트 라벤더 (본문)
  error: '#ff4f7d', // 핫 핑크레드 (알람/브로큰)
  fixed: '#5ef0c0', // 민트 (resolved)
  bg: '#05060f', // 쿨 니어블랙 (BASE_BG)
}

/** 허브에 떠다니는 일반 코드 라인 (color 는 라인 대표색) */
export const FLOAT_SNIPPETS: { text: string; color: string }[] = [
  { text: 'const portfolio = createWorld()', color: CODE_COLOR.keyword },
  { text: 'export function App() {', color: CODE_COLOR.func },
  { text: "import { vars } from './tokens'", color: CODE_COLOR.text },
  { text: 'type Project = { id: string }', color: CODE_COLOR.keyword },
  { text: 'await build({ minify: true })', color: CODE_COLOR.func },
  { text: 'return <Canvas shadows />', color: CODE_COLOR.func },
  { text: '// next yourself, stay young', color: CODE_COLOR.comment },
  { text: 'const [state, set] = useState(0)', color: CODE_COLOR.text },
  { text: 'pnpm turbo run build', color: CODE_COLOR.string },
  { text: 'useFrame((_, dt) => move(dt))', color: CODE_COLOR.func },
  { text: 'theme.color.brand[500]', color: CODE_COLOR.number },
  { text: 'styled.div`display:flex`', color: CODE_COLOR.string },
  { text: 'git commit -m "feat: 3d"', color: CODE_COLOR.string },
  { text: 'interface Vec3 { x:number }', color: CODE_COLOR.keyword },
  { text: 'render(scene, camera)', color: CODE_COLOR.func },
  { text: 'const ok = tests.every(pass)', color: CODE_COLOR.text },
  { text: 'export default config', color: CODE_COLOR.keyword },
  { text: 'npm run dev --open', color: CODE_COLOR.string },
]

/** 클릭해서 해결하는 에러 라인 */
export const ERROR_SNIPPETS: string[] = [
  "TypeError: cannot read 'map' of undefined",
  'ReferenceError: theme is not defined',
  'Uncaught: Maximum call stack exceeded',
  "Error: Module not found './ghost'",
  'Warning: missing key prop in list',
  'SyntaxError: unexpected token <',
  'NullPointer: state was null',
]

/** 프로젝트 차원별 떠다니는 코드 (차원 컨셉에 맞춤) */
export const PROJECT_SNIPPETS: Record<string, string[]> = {
  atelier: [
    'export const Button = styled()',
    'createGlobalTheme(":root", vars)',
    '<Card padding="lg" elevated />',
    'tokens.space[4] // 1rem',
  ],
  'control-room': [
    'socket.on("event", render)',
    'd3.scaleLinear().domain([0,1])',
    'alerts.filter(a => a.severity)',
    'stream.pipe(throttle(16))',
  ],
  gallery: [
    '<Icon name="search" size={24} />',
    'export { ArrowIcon, BellIcon }',
    'svg.viewBox = "0 0 24 24"',
    'icons.length // 120+',
  ],
}
