---
outline: deep
---

# Synchrony Assumptions

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

분산 시스템과 합의 알고리즘을 설계할 때, 네트워크의 **동기성 가정(Synchrony Assumptions)**은 매우 중요합니다. 이는 메시지가 얼마나 빨리 전달되는지, 그리고 노드들의 처리 속도가 얼마나 일정한지에 대한 가정입니다.

## Three Models of Synchrony

### 1. Synchronous (동기 모델)

메시지 전달 시간과 처리 시간에 **알려진 상한**이 존재합니다.

**특징:**
- 메시지는 최대 Δ 시간 내에 전달됨
- 노드의 처리 시간도 예측 가능
- 타임아웃 값을 정확히 설정 가능

**예시:**
```
노드 A → 노드 B: 항상 100ms 이내에 메시지 도착
타임아웃 설정: 150ms (안전 여유 포함)
```

**장점:**
- ✅ 합의 알고리즘 설계가 간단
- ✅ Safety와 Liveness 모두 보장 가능
- ✅ 타임아웃 기반 실패 감지가 정확

**단점:**
- ❌ 현실 세계에서 거의 불가능
- ❌ 네트워크 지연, 노드 부하 등으로 가정 위반 가능
- ❌ 가정이 위반되면 시스템 실패 가능

**사용 사례:**
- 로컬 네트워크 (LAN)
- 실시간 시스템 (항공, 군사)
- 하드웨어 레벨 합의

### 2. Asynchronous (비동기 모델)

메시지 전달 시간에 **상한이 없습니다**. 메시지는 언젠가는 도착하지만, 얼마나 걸릴지 알 수 없습니다.

**특징:**
- 메시지 지연 시간 제한 없음
- 노드 처리 속도도 예측 불가
- 타임아웃 사용 불가 (느린 노드 vs 죽은 노드 구분 불가)

**예시:**
```
노드 A → 노드 B: 1ms ~ ∞ 까지 가능
타임아웃 설정 불가: 100ms 후에도 안 오면 죽은 건지, 느린 건지?
```

**FLP Impossibility Theorem (1985):**

> 완전히 비동기적인 환경에서는 단 하나의 노드 실패만 있어도 **결정적 합의를 보장할 수 없습니다**.

**장점:**
- ✅ 현실 세계를 가장 정확히 모델링
- ✅ 가장 보수적인 가정 (안전)
- ✅ Safety는 보장 가능

**단점:**
- ❌ Liveness 보장 불가능 (FLP)
- ❌ 합의 알고리즘 설계가 매우 어려움
- ❌ 실용적인 시스템 구현이 어려움

**사용 사례:**
- 이론적 연구
- Safety-critical 시스템
- 비동기 BFT 알고리즘 (HoneyBadgerBFT, Aleph)

### 3. Partially Synchronous (부분 동기 모델)

**현실과 이론의 중간 지점**. 시스템이 "결국에는" 동기적으로 작동합니다.

**두 가지 정의:**

#### 정의 1: Unknown Bound
- 메시지 전달 시간 상한 Δ가 **존재하지만 알려지지 않음**
- 타임아웃을 추측해야 함
- 잘못 추측하면 재시도

#### 정의 2: Eventually Synchronous
- 시스템이 **불특정 시간 T 이후**부터 동기적으로 작동
- T 이전: 비동기적 (메시지 지연 가능)
- T 이후: 동기적 (메시지가 Δ 안에 도착)

**예시:**
```
네트워크 혼잡 시 (T 이전):
노드 A → 노드 B: 10초 지연

정상 상태 (T 이후):
노드 A → 노드 B: 100ms 이내 도착
```

**장점:**
- ✅ 현실적인 가정
- ✅ Safety는 항상 보장
- ✅ Liveness는 "결국" 보장 (Eventually)
- ✅ 실용적인 BFT 알고리즘 구현 가능

**단점:**
- ❌ T를 알 수 없음 (언제 동기화될지 모름)
- ❌ 일시적으로 느린 성능 가능
- ❌ 타임아웃 튜닝 필요

**사용 사례:**
- **PBFT** (Practical Byzantine Fault Tolerance)
- **Tendermint**
- **HotStuff**
- 대부분의 현대 블록체인

## Comparison Table

| Model | Message Delay | Liveness | Safety | Realistic | Example Algorithms |
|-------|---------------|----------|--------|-----------|-------------------|
| **Synchronous** | ≤ Δ (known) | ✅ Always | ✅ Always | ❌ Rare | Consensus in LANs |
| **Asynchronous** | No bound | ❌ FLP | ✅ Always | ✅ Very | HoneyBadgerBFT |
| **Partially Sync** | ≤ Δ (unknown) or Eventually ≤ Δ | ✅ Eventually | ✅ Always | ✅ Yes | PBFT, Tendermint |

## BFT Algorithms and Synchrony

### PBFT (Partially Synchronous)

```
정상 상태: 빠른 합의
네트워크 문제 발생: View Change (리더 교체)
문제 해결 후: 다시 정상 작동
```

- Safety: 항상 보장 (3f + 1 노드)
- Liveness: 네트워크가 동기화되면 보장

### Tendermint (Partially Synchronous)

```
Round 기반 합의
각 Round마다 타임아웃 증가
결국 충분히 긴 타임아웃 → 합의 성공
```

- Safety: 즉시 Finality
- Liveness: 타임아웃 내 2/3+ 검증자 응답 시

### HoneyBadgerBFT (Asynchronous)

```
타임아웃 없음
암호학적 기법 (Threshold Encryption) 사용
FLP를 우회하는 확률적 종료
```

- Safety: 항상 보장
- Liveness: 확률적 보장 (실제로는 거의 항상)

### Bitcoin (Synchronous Assumption)

```
10분 블록 타임 ≈ 네트워크 전파 시간보다 충분히 김
메시지가 10분 안에 전 세계로 전파된다고 가정
```

- Nakamoto Consensus는 약한 동기성 가정
- Safety: 확률적 (51% 공격 가능성)
- Liveness: 정직한 해시파워 > 50%

## Practical Implications

### Timeout 설정 전략

**Synchronous Systems:**
```typescript
const TIMEOUT = KNOWN_MAX_DELAY + SAFETY_MARGIN
// 예: 100ms + 50ms = 150ms
```

**Partially Synchronous Systems:**
```typescript
let timeout = INITIAL_TIMEOUT
while (!consensus) {
  try {
    await consensusRound(timeout)
  } catch (TimeoutError) {
    timeout *= 2  // Exponential backoff
    // 100ms → 200ms → 400ms → 800ms ...
  }
}
```

### Network Partitions

**Synchronous:**
```
Partition → 타임아웃 → 노드 제거 → 합의 (위험!)
```

**Asynchronous:**
```
Partition → 무한 대기 → 합의 불가 (안전하지만 멈춤)
```

**Partially Synchronous:**
```
Partition → 타임아웃 증가 → Partition 복구 → 합의 (균형)
```

## Summary

현대 BFT 시스템은 대부분 **Partially Synchronous** 모델을 사용합니다:

- **Safety-first**: 네트워크가 어떤 상태여도 일관성 유지
- **Eventually-live**: 네트워크가 정상화되면 진전
- **Practical**: 현실 세계에서 작동 가능

이는 이론적 정확성과 실용성 사이의 최적의 균형점입니다.

## Next Steps

다음 섹션에서는 [FLP Impossibility](./flp)에 대해 자세히 알아보겠습니다.

## References

- Dwork, C., Lynch, N., & Stockmeyer, L. (1988). "Consensus in the presence of partial synchrony". Journal of the ACM.
- Fischer, M., Lynch, N., & Paterson, M. (1985). "Impossibility of distributed consensus with one faulty process". Journal of the ACM.
