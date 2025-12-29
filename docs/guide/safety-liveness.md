---
outline: deep
---

# Safety vs Liveness

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

분산 시스템과 합의 알고리즘을 이해하는 데 가장 중요한 두 가지 속성이 **Safety**와 **Liveness**입니다.

## Safety (안전성)

> "나쁜 일이 일어나지 않음" - Nothing bad ever happens

**Safety**는 시스템이 **잘못된 상태**에 도달하지 않음을 보장합니다.

### 정의

- 모든 정직한 노드가 **같은 값**에 동의해야 함
- 한 번 결정된 값은 **변경되지 않아야** 함 (Immutability)
- 서로 모순되는 결정이 **동시에 존재할 수 없음**

### 예시

**Blockchain에서의 Safety:**
```
✅ 모든 정직한 노드가 블록 #100에 대해 같은 내용을 보유
❌ 노드 A는 블록 #100 = X, 노드 B는 블록 #100 = Y (Safety 위반!)
```

**Database에서의 Safety:**
```
✅ 모든 복제본이 같은 데이터 상태 유지
❌ 복제본 A와 B가 같은 키에 대해 다른 값 저장 (Inconsistency)
```

### Safety 위반의 결과

- **Double Spending**: 같은 자산을 두 번 사용
- **Fork**: 블록체인이 두 개 이상으로 분기
- **Data Inconsistency**: 데이터베이스의 일관성 상실

## Liveness (활성)

> "좋은 일이 결국 일어남" - Something good eventually happens

**Liveness**는 시스템이 **진전**을 이루고 결국 **결정에 도달**함을 보장합니다.

### 정의

- 제출된 트랜잭션이 **결국 처리**되어야 함
- 시스템이 **무한 대기 상태**에 빠지지 않아야 함
- 합의 프로토콜이 **결국 종료**되어야 함

### 예시

**Blockchain에서의 Liveness:**
```
✅ 사용자가 제출한 트랜잭션이 결국 블록에 포함됨
❌ 네트워크가 멈춰서 트랜잭션이 영원히 대기 (Liveness 위반!)
```

**Consensus에서의 Liveness:**
```
✅ 합의 프로토콜이 결국 새로운 블록을 생성
❌ 노드들이 영원히 투표만 반복하고 결정하지 못함
```

### Liveness 위반의 결과

- **System Halt**: 시스템이 완전히 멈춤
- **Stuck Transactions**: 트랜잭션이 영원히 처리되지 않음
- **No Progress**: 블록이 생성되지 않음

## Safety vs Liveness Trade-off

많은 분산 시스템에서 Safety와 Liveness 사이에는 **트레이드오프**가 존재합니다.

### CAP Theorem

분산 시스템은 다음 세 가지 중 두 가지만 동시에 보장할 수 있습니다:

- **C**onsistency (일관성) - Safety와 관련
- **A**vailability (가용성) - Liveness와 관련
- **P**artition Tolerance (분할 내성)

네트워크 분할(Partition)이 발생하면:

```
CP 시스템 (Safety 우선):
→ 일관성을 유지하지만, 일부 노드가 응답하지 않을 수 있음
예: HBase, MongoDB (strong consistency mode)

AP 시스템 (Liveness 우선):
→ 항상 응답하지만, 일시적으로 다른 값을 반환할 수 있음
예: Cassandra, DynamoDB
```

## BFT 알고리즘에서의 Safety & Liveness

### PBFT (Practical Byzantine Fault Tolerance)

- **Safety**: 3f + 1 노드 중 최대 f개가 비잔틴이어도 보장
- **Liveness**: 네트워크가 부분 동기적(Partially Synchronous)일 때 보장

### Tendermint

- **Safety**: 즉시 보장 (Instant Finality)
- **Liveness**: 2/3 이상의 검증자가 온라인일 때 보장

### Bitcoin (Nakamoto Consensus)

- **Safety**: 확률적 보장 (6 confirmations ≈ 99.9%)
- **Liveness**: 정직한 해시파워 > 50%일 때 보장

## Synchrony Assumptions와의 관계

분산 시스템의 Safety와 Liveness는 **네트워크 동기성 가정**에 따라 달라집니다:

### Synchronous (동기 네트워크)
- 메시지 전달 시간에 **상한**이 있음
- **Both Safety and Liveness** 보장 가능

### Asynchronous (비동기 네트워크)
- 메시지 전달 시간에 **제한 없음**
- **FLP Impossibility**: 단 하나의 노드 실패만 있어도 Liveness 보장 불가능
- Safety는 보장 가능 (대신 시스템이 멈출 수 있음)

### Partially Synchronous (부분 동기)
- 대부분의 시간에는 동기적, 가끔 비동기적
- 실용적인 BFT 알고리즘들이 이 가정 사용
- Safety는 항상 보장, Liveness는 "결국" 보장

## Practical Considerations

### 어떤 것을 우선해야 할까?

**금융 시스템 (Safety 우선):**
```
이중 지불을 절대 허용할 수 없음
→ 네트워크 문제 시 일시적으로 거래를 중단하더라도 일관성 유지
```

**소셜 미디어 (Liveness 우선):**
```
사용자가 항상 포스팅할 수 있어야 함
→ 일시적으로 다른 사용자가 다른 피드를 보더라도 가용성 유지
```

**블록체인 (Both 중요):**
```
Safety: 이중 지불 방지
Liveness: 트랜잭션 처리 지속
→ 부분 동기성 가정 + 확률적 보장
```

## Summary

| Property | Safety | Liveness |
|----------|--------|----------|
| **의미** | 나쁜 일이 일어나지 않음 | 좋은 일이 결국 일어남 |
| **위반 예시** | Fork, 이중 지불 | 시스템 정지, 무한 대기 |
| **우선 시스템** | 금융, 의료, 안전 critical | 소셜 미디어, 로그 수집 |
| **CAP** | Consistency | Availability |

## Next Steps

다음 섹션에서는 [Synchrony Assumptions](./synchrony)에 대해 자세히 알아보겠습니다.

## References

- Lamport, L. (1977). "Proving the Correctness of Multiprocess Programs". IEEE Transactions on Software Engineering.
- Gilbert, S., & Lynch, N. (2002). "Brewer's conjecture and the feasibility of consistent, available, partition-tolerant web services". ACM SIGACT News.
