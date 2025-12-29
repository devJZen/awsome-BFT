---
outline: deep
---

# FLP Impossibility

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

**FLP Impossibility Theorem**은 분산 시스템 이론에서 가장 중요한 결과 중 하나입니다. Fischer, Lynch, Paterson이 1985년에 증명한 이 정리는 분산 합의의 근본적인 한계를 보여줍니다.

## The Theorem

> **완전히 비동기적인 환경에서는 단 하나의 노드 실패(crash failure)만 있어도 결정적 합의(deterministic consensus)를 보장할 수 없습니다.**

Even one faulty process makes consensus impossible in asynchronous systems.

## What Does It Mean?

FLP 정리가 말하는 것:

### ❌ 불가능한 것

비동기 시스템에서 **모든 조건**을 동시에 만족하는 합의 알고리즘은 존재하지 않습니다:

1. **Safety**: 모든 정직한 노드가 같은 값에 합의
2. **Liveness**: 합의가 결국 종료됨
3. **Fault Tolerance**: 단 하나의 노드 실패를 허용
4. **Asynchrony**: 메시지 지연 시간 무제한

### ✅ 가능한 것

다음 중 **하나를 포기**하면 합의가 가능합니다:

- **Safety 포기**: 노드들이 다른 값에 합의할 수 있음 (쓸모없음)
- **Liveness 포기**: 합의가 영원히 종료되지 않을 수 있음 (실용적 X)
- **Fault Tolerance 포기**: 모든 노드가 정상이어야 함 (현실적 X)
- **Asynchrony 포기**: 동기성 가정 추가 (실용적! ✨)

## Key Insights

### 1. Crash Failure도 충분히 어렵다

FLP는 **비잔틴 노드**가 아니라 단순히 **멈추는(crash) 노드** 하나만으로도 합의가 불가능함을 보입니다.

```
비잔틴 노드 (악의적): "공격", "후퇴" 번갈아 말하기
Crash 노드 (단순 실패): 그냥 멈춤

→ Crash만으로도 합의 불가능!
```

### 2. 결정론적 알고리즘의 한계

FLP는 **결정론적(deterministic)** 알고리즘에 대한 불가능성입니다.

**우회 방법:**
- 확률적(randomized) 알고리즘 사용
- 암호학적 기법 활용
- 타임아웃 기반 휴리스틱

### 3. 실용적 해결책

현실에서는 다음 방법들로 FLP를 우회합니다:

#### a) 부분 동기성 가정 (가장 일반적)
```
"결국에는 메시지가 제시간에 도착한다"
→ PBFT, Tendermint, HotStuff
```

#### b) 확률적 종료
```
"거의 확실하게 종료한다" (확률 1로 수렴)
→ Bitcoin, Ethereum PoW
```

#### c) 실패 감지기 (Failure Detector)
```
"불완전하지만 결국 정확한 실패 감지"
→ Paxos, Raft (비-BFT)
```

## Proof Sketch

FLP의 증명 핵심 아이디어를 간단히 살펴보겠습니다.

### 핵심 개념: Bivalent vs Univalent

**Univalent Configuration (단가 구성):**
- 어떤 실행 경로를 따르든 하나의 값(0 또는 1)으로만 결정

**Bivalent Configuration (양가 구성):**
- 실행 경로에 따라 0 또는 1 둘 다 가능

### 증명 개요

1. **초기 Bivalent 상태 존재**
   - 시작 시 어떤 bivalent configuration이 존재

2. **Bivalent 상태 유지 가능**
   - Bivalent → Bivalent로 계속 전환 가능
   - 메시지를 무한히 지연시키면 결정 불가

3. **결론**
   - 시스템이 영원히 bivalent 상태에 머물 수 있음
   - 즉, 합의에 도달하지 못할 수 있음 (Liveness 위반)

### 예시

```
노드: A, B, C
초기값: A=0, B=0, C=1

Case 1: C의 메시지가 먼저 도착
→ A, B가 C의 의견 듣고 → 다수결 → 0 결정

Case 2: C의 메시지가 무한히 지연
→ A, B는 C를 crash로 간주 → 0 결정

문제: C가 crashed인지 느린 건지 구분 불가!
→ 영원히 기다려야 함 (Liveness 위반)
```

## Implications for BFT

### Classical BFT (PBFT, Tendermint)

FLP를 우회하기 위해 **부분 동기성** 가정:

```typescript
// Tendermint의 접근
let timeout = INITIAL_TIMEOUT

while (true) {
  if (receive_2/3_prevotes(timeout)) {
    // 합의 성공
    return
  }
  timeout *= 2  // 타임아웃 증가
  // "결국에는" 충분히 긴 타임아웃 → 합의
}
```

- **Safety**: 항상 보장 (비동기여도)
- **Liveness**: "결국" 보장 (네트워크 동기화 시)

### Asynchronous BFT (HoneyBadgerBFT)

FLP를 우회하기 위해 **확률적 종료**:

```typescript
// Threshold Encryption + Common Subset
// 각 노드가 랜덤 트랜잭션 제안
// 암호학적 방법으로 공통 부분집합 찾기

// 확률 1로 종료하지만, 결정론적 보장은 없음
```

- **Safety**: 항상 보장
- **Liveness**: 확률 1로 종료 (거의 확실)

### Nakamoto Consensus (Bitcoin)

FLP를 우회하기 위해 **확률적 안전성 + 약한 동기성**:

```typescript
// PoW + Longest Chain Rule
// 6 confirmations ≈ 99.9% 안전

// Safety: 확률적 (51% attack 가능)
// Liveness: 정직한 해시파워 > 50%
```

## Why FLP Matters

### 이론적 중요성

1. **근본적 한계 이해**
   - 분산 합의의 한계를 명확히 함
   - 완벽한 알고리즘은 존재하지 않음

2. **트레이드오프 인식**
   - Safety vs Liveness
   - 동기성 vs 비동기성
   - 결정론 vs 확률

### 실용적 영향

1. **알고리즘 선택**
   ```
   금융 시스템: Safety 우선 → PBFT
   블록체인: Liveness도 중요 → Tendermint
   데이터 수집: Liveness 우선 → AP 시스템
   ```

2. **시스템 설계**
   ```
   타임아웃 설정 필요
   네트워크 모니터링 중요
   실패 복구 메커니즘 필수
   ```

3. **기대치 관리**
   ```
   100% 보장은 불가능
   "결국" 또는 "거의 확실하게"
   트레이드오프 수용 필요
   ```

## Comparison: Solutions to FLP

| Approach | Safety | Liveness | Example | Trade-off |
|----------|--------|----------|---------|-----------|
| **Partial Synchrony** | ✅ Always | ✅ Eventually | PBFT, Tendermint | 일시적 지연 가능 |
| **Randomization** | ✅ Always | ✅ Probabilistic | HoneyBadgerBFT | 결정론적 보장 없음 |
| **Weak Synchrony** | ⚠️ Probabilistic | ✅ Usually | Bitcoin | 51% attack 가능 |
| **Failure Detector** | ✅ Always | ✅ Eventually | Paxos, Raft | Crash-only (비-BFT) |

## Practical Takeaways

### For System Designers

1. **완벽한 보장은 없다**
   - FLP는 수학적 사실
   - 트레이드오프를 받아들여야 함

2. **동기성 가정 선택**
   - 대부분의 시스템: 부분 동기성
   - 극단적 환경: 완전 비동기성

3. **타임아웃 튜닝**
   - 너무 짧으면: 불필요한 재시도
   - 너무 길면: 느린 응답
   - Adaptive timeout 고려

### For Blockchain Developers

1. **Finality 이해**
   ```
   Immediate Finality (Tendermint):
   → 부분 동기성 가정 + 2/3 합의

   Probabilistic Finality (Bitcoin):
   → 약한 동기성 + 51% 가정
   ```

2. **네트워크 가정 명시**
   - 어떤 동기성 모델?
   - 얼마나 많은 노드 실패 허용?
   - 네트워크 파티션 처리 방법?

## Summary

**FLP Impossibility는 장애물이 아니라 지침입니다:**

- 분산 합의의 근본적 한계를 이해
- 실용적 해결책들이 어떻게 작동하는지 파악
- 시스템 설계 시 올바른 트레이드오프 선택

현대 BFT 시스템들은 FLP를 우회하여 실용적이면서도 안전한 합의를 달성합니다.

## Next Steps

다음 섹션에서는 [Classical BFT](./classical-bft) 알고리즘들을 살펴보겠습니다.

## References

- Fischer, M. J., Lynch, N. A., & Paterson, M. S. (1985). "Impossibility of distributed consensus with one faulty process". Journal of the ACM, 32(2), 374-382.
- Dwork, C., Lynch, N., & Stockmeyer, L. (1988). "Consensus in the presence of partial synchrony". Journal of the ACM, 35(2), 288-323.
