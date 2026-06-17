/**
 * 코드 디멘션 조명 — 어둡고 차가운 베이스 + 쿨 키 라이트.
 * 분위기·발광은 emissive + Bloom 이 대부분 담당한다.
 */
export function Lighting({ shadows }: { shadows: boolean }) {
  return (
    <>
      <hemisphereLight args={['#5b6fb0', '#070b14', 0.45]} />
      <ambientLight intensity={0.28} />

      <directionalLight
        castShadow={shadows}
        position={[5, 11, 6]}
        intensity={0.85}
        color="#b9c7ff"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      >
        <orthographicCamera attach="shadow-camera" args={[-12, 12, 12, -12, 0.1, 30]} />
      </directionalLight>
    </>
  )
}
