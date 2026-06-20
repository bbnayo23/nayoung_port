/**
 * 코드 디멘션 조명 — 바닥/천장을 암시하는 탑다운 태양을 없애고, 사방에서 캐릭터를 감싸는
 * 다각도 필 라이트로 교체. 특히 **아래쪽 보라 언더글로우**가 캐릭터 밑면을 비춰
 * "발밑에도 빛이 닿는 공간이 있다 = 바닥이 없다"는 핵심 신호를 준다.
 * 분위기·발광은 emissive + Bloom 이 대부분 담당한다.
 */
export function Lighting() {
  return (
    <>
      <hemisphereLight args={['#34468a', '#0a0c20', 0.4]} />
      <ambientLight intensity={0.3} />

      {/* 위·뒤쪽 먼 컴파일러 글로우 (탑다운 태양 대체, 그림자 없음) */}
      <pointLight position={[3, 14, -8]} color="#7a86ff" intensity={5} distance={40} decay={1.6} />
      {/* 아래쪽 보라 언더글로우 — 캐릭터 밑면을 비춰 '바닥 없음'을 증명 (felt, not garish) */}
      <pointLight position={[-2, -14, 4]} color="#7a45ff" intensity={3} distance={40} decay={1.8} />
      {/* 쿨 시안 백필 — 연기 가장자리·스틸 도구에 틸 림을 입혀 진입/도구 액센트와 연결 */}
      <pointLight position={[0, 2, -12]} color="#2bd0e0" intensity={1.5} distance={30} decay={2} />
    </>
  )
}
