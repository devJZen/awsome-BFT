---
outline: deep
---

# Classical BFT Algorithms

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

클래식 BFT 알고리즘은 비잔틴 장군 문제를 해결하기 위한 초기 연구에서 시작되었습니다. 이 섹션에서는 이론적 기반부터 실용적인 PBFT까지 살펴봅니다.

## PBFT (Practical Byzantine Fault Tolerance)

**PBFT**는 Miguel Castro와 Barbara Liskov가 1999년에 제안한 알고리즘으로, BFT를 실용적으로 만든 첫 번째 알고리즘입니다.

### Core Properties

- **Fault Tolerance**: 3f + 1 노드 중 최대 f개의 비잔틴 노드 허용
- **Synchrony**: 부분 동기성 가정 (Partially Synchronous)
- **Communication**: O(n²) 메시지 복잡도
- **Performance**: 수천 TPS 가능

### Three-Phase Protocol

PBFT는 **3단계 프로토콜**로 합의를 달성합니다:

#### 1. Pre-Prepare
Primary(리더)가 제안을 모든 노드에 브로드캐스트

```
Primary: "블록 #100 = X를 제안합니다"
→ [Pre-Prepare 메시지] → 모든 Replica
```

#### 2. Prepare
각 노드가 제안을 받으면 다른 모든 노드에 전달

```
각 Replica: "나도 블록 #100 = X를 받았습니다"
→ [Prepare 메시지] → 모든 다른 Replica
```

노드는 2f + 1개의 Prepare 메시지를 받으면 **prepared** 상태 진입

#### 3. Commit
Prepared 상태가 되면 Commit 메시지 브로드캐스트

```
각 Replica: "블록 #100 = X를 commit합니다"
→ [Commit 메시지] → 모든 다른 Replica
```

노드는 2f + 1개의 Commit 메시지를 받으면 **committed** 상태 진입

### Visualization

```
n = 4 노드 (f = 1 비잔틴 허용)

[Request] → Primary
             |
             ↓
     [Pre-Prepare] → All Replicas
                     |
                     ↓
              [Prepare Phase]
          (All-to-All Communication)
              2f+1 = 3 needed
                     |
                     ↓
              [Commit Phase]
          (All-to-All Communication)
              2f+1 = 3 needed
                     |
                     ↓
                 [Execute]
```

### Why 3 Phases?

각 단계의 목적:

1. **Pre-Prepare**: Primary의 제안을 전파
   - 모든 노드가 같은 제안을 받았는지 확인

2. **Prepare**: 노드 간 합의 형성
   - 2f + 1 노드가 같은 제안을 받았다는 증거 수집
   - 어떤 제안도 2f + 1 지지를 받지 못하면 실패

3. **Commit**: 최종 확정
   - 2f + 1 노드가 prepared 상태라는 증거 수집
   - 충분한 노드가 commit하면 안전하게 실행

### View Change (리더 교체)

Primary가 실패하거나 악의적이면 **View Change** 발생:

```
timeout → View Change Request
       → 새로운 Primary 선출 (round-robin)
       → 새로운 View에서 재시작
```

## Early BFT Algorithms

### Lamport's Byzantine Generals (1982)

최초의 BFT 알고리즘:

- **Oral Messages Algorithm**: 3f + 1 노드 필요
- **Signed Messages Algorithm**: 2f + 1 노드로 가능 (디지털 서명 사용)
- 동기 네트워크 가정

### Dolev-Strong (1983)

디지털 서명을 활용한 효율적 알고리즘:

- f + 1 라운드로 합의
- 모든 메시지에 서명
- 2f + 1 노드 필요

## PBFT Variants and Improvements

### Zyzzyva (2007)

**최적화된 PBFT**:

- **Best case**: 3단계 → 2단계로 축소
- 모든 노드가 정직하고 네트워크가 좋을 때 빠름
- **Speculative execution**: 클라이언트가 빠르게 응답 받음

### Q/U (Query/Update) (2005)

**Read/Write 분리**:

- Read: 빠른 경로 (쿼럼만 확인)
- Write: 느린 경로 (BFT 프로토콜)
- Storage 시스템에 최적화

### BFT-SMaRt

**모듈화된 PBFT 구현**:

- State transfer 최적화
- 다양한 ordering 전략
- Java로 구현된 실용적 라이브러리

## Performance Characteristics

### PBFT 복잡도

| Metric | Complexity |
|--------|-----------|
| **Message Complexity** | O(n²) per consensus |
| **Communication Rounds** | 3 phases (constant) |
| **Latency** | ~3 network delays |
| **Throughput** | 수천 ~ 수만 TPS (LAN) |

### Bottlenecks

1. **O(n²) 통신**
   - 노드 수가 많으면 메시지 폭증
   - 일반적으로 < 20 노드에서 사용

2. **Primary Bottleneck**
   - 모든 요청이 Primary를 거침
   - Primary의 처리 능력이 한계

3. **View Change Overhead**
   - View Change는 비용이 큼
   - 잦은 View Change는 성능 저하

## PBFT in Practice

### Hyperledger Fabric

- Ordering service에 PBFT 옵션 제공
- 엔터프라이즈 블록체인에 적합
- Permissioned 환경

### VMware VBFT

- VMware의 분산 시스템에 PBFT 활용
- 데이터센터 환경에 최적화

### Zilliqa (초기)

- 샤딩과 PBFT 결합
- 현재는 다른 메커니즘 사용

## Comparison with Other Approaches

| Feature | PBFT | Paxos/Raft | Nakamoto |
|---------|------|------------|----------|
| **Fault Model** | Byzantine | Crash | Byzantine |
| **Nodes Required** | 3f + 1 | 2f + 1 | Unbounded |
| **Finality** | Immediate | Immediate | Probabilistic |
| **Performance** | High (small n) | Very High | Low |
| **Scalability** | Limited (~20) | Good (~100) | Excellent |
| **Network** | Permissioned | Permissioned | Permissionless |

## Key Insights

### 장점

✅ **즉시 Finality**: 한 번 commit되면 되돌릴 수 없음
✅ **높은 처리량**: LAN 환경에서 매우 빠름
✅ **예측 가능한 성능**: 일정한 latency
✅ **검증된 이론**: 수학적으로 증명됨

### 단점

❌ **O(n²) 확장성**: 노드가 많으면 비효율적
❌ **Permissioned**: 노드 집합이 고정되어야 함
❌ **복잡한 구현**: View Change 로직이 복잡
❌ **Network 가정**: 부분 동기성 필요

## Modern Relevance

PBFT는 오늘날에도 중요합니다:

1. **이론적 기반**: 현대 BFT의 foundation
2. **엔터프라이즈**: Permissioned 블록체인에 적합
3. **연구 기반**: 많은 개선 알고리즘의 출발점

다음 섹션의 [Blockchain BFT](./blockchain-bft)에서는 PBFT를 개선한 현대 알고리즘들을 살펴봅니다.

## Implementation Example (Pseudo-code)

```typescript
class PBFT {
  nodes: Node[]
  f: number  // max Byzantine nodes

  async consensus(proposal: Block): Promise<void> {
    // 1. Pre-Prepare (Primary only)
    if (this.isPrimary()) {
      this.broadcast({
        type: 'PRE_PREPARE',
        block: proposal
      })
    }

    // 2. Prepare
    const prepareMsg = await this.waitForPrePrepare()
    this.broadcast({
      type: 'PREPARE',
      block: prepareMsg.block
    })

    // Wait for 2f + 1 PREPARE messages
    await this.waitForQuorum('PREPARE', 2 * this.f + 1)

    // 3. Commit
    this.broadcast({
      type: 'COMMIT',
      block: prepareMsg.block
    })

    // Wait for 2f + 1 COMMIT messages
    await this.waitForQuorum('COMMIT', 2 * this.f + 1)

    // Execute
    this.execute(prepareMsg.block)
  }
}
```

## Summary

PBFT는 BFT를 실용적으로 만든 혁신적 알고리즘입니다:

- 3단계 프로토콜로 즉시 Finality
- 3f + 1 노드로 f개 비잔틴 허용
- O(n²) 복잡도로 인해 소규모 네트워크에 적합
- 현대 BFT 알고리즘의 기반

## Next Steps

다음 섹션에서는 [Blockchain BFT](./blockchain-bft)를 살펴보겠습니다.

## References

- Castro, M., & Liskov, B. (1999). "Practical Byzantine Fault Tolerance". OSDI.
- Lamport, L., Shostak, R., & Pease, M. (1982). "The Byzantine Generals Problem". ACM TOPLAS.
- Kotla, R., et al. (2007). "Zyzzyva: Speculative Byzantine Fault Tolerance". SOSP.
