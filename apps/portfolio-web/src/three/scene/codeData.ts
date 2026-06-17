/** 코드 디멘션 비주얼용 스니펫/색 — 모두 ASCII(폰트 안전), 장식 목적 */

/** Material/Dracula 계열 신택스 컬러 */
export const CODE_COLOR = {
  keyword: '#c792ea',
  string: '#c3e88d',
  func: '#82aaff',
  number: '#f78c6c',
  comment: '#546e7a',
  text: '#a6accd',
  error: '#ff5370',
  fixed: '#c3e88d',
  bg: '#070b14',
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
