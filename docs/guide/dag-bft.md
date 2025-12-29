---
outline: deep
---

# DAG-based BFT Algorithms

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

**DAG (Directed Acyclic Graph)** 기반 BFT는 전통적인 블록체인의 선형 구조를 벗어나 더 높은 처리량과 효율성을 추구합니다.

## What is DAG?

### Linear Chain vs DAG

**Traditional Blockchain (Linear):**
```
Block 1 → Block 2 → Block 3 → Block 4
```

**DAG-based:**
```
    Block A
   ↗  ↓  ↘
Block B  C  D
   ↘  ↓  ↗
    Block E
```

### Advantages of DAG

✅ **Parallel Processing**: 여러 블록을 동시에 생성
✅ **Higher Throughput**: 병렬 처리로 높은 TPS
✅ **Lower Latency**: 순차 대기 불필요
✅ **Better Network Utilization**: 대역폭 효율적 사용

## Hashgraph

**Hashgraph**는 Leemon Baird가 개발한 DAG 기반 합의 알고리즘입니다.

### Core Concepts

#### 1. Gossip about Gossip

각 노드가:
1. 이벤트(트랜잭션) 생성
2. 랜덤한 이웃에게 gossip
3. 받은 정보도 함께 gossip

```
Node A → "내가 안 것 + 내가 들은 것" → Node B
Node B → "내가 안 것 + A에게 들은 것 + 내가 들은 것" → Node C
```

#### 2. Virtual Voting

**실제로 투표하지 않고** 각 노드가 다른 노드의 투표를 계산:

```
"A는 이 정보를 알았을 것이다"
"그러면 A는 이렇게 투표했을 것이다"
→ 메시지 교환 없이 투표 결과 계산
```

#### 3. Famous Witnesses

각 "round"의 첫 이벤트를 **witness**라고 함:

- Witness들이 **strongly see**하는 관계 파악
- 2/3+ 노드가 see → **famous** witness
- Famous witness들로 합의 순서 결정

### Algorithm Flow

```
1. Event 생성 (트랜잭션 포함)
2. Gossip about Gossip (DAG 확장)
3. Virtual Voting (투표 계산)
4. Famous Witnesses 결정
5. Consensus Order 도출
6. 트랜잭션 실행
```

### Performance

| Metric | Value |
|--------|-------|
| **Throughput** | 수십만 TPS (이론적) |
| **Finality** | 3-5 seconds |
| **Communication** | O(n log n) |
| **Byzantine Tolerance** | < 1/3 |

### Use Cases

- **Hedera**: Public permissioned network
- High-throughput applications
- Microtransactions

## IOTA Tangle

**Tangle**은 IOTA의 DAG 기반 합의로, **blockless** 구조입니다.

### Structure

```
각 트랜잭션이:
- 2개의 이전 트랜잭션을 승인 (approve)
- PoW 수행 (작은 양)
```

```
    Tx1
   ↗  ↘
Tx2    Tx3
 ↓  ↗  ↓
Tx4    Tx5
```

### Consensus Mechanism

**Approval Weight**:
- 많이 승인될수록 가중치 증가
- 높은 가중치 = 높은 확률로 최종 확정

### Challenges

- **Tip Selection**: 어떤 트랜잭션을 승인할지 선택
- **Coordinator**: 초기에는 중앙화된 coordinator 사용 (보안)
- **Low Activity**: 활동이 적으면 확정 느림

## Aleph (Aleph Zero)

**Aleph**는 완전 비동기 BFT DAG 알고리즘입니다.

### Key Innovation: Asynchronous BFT

FLP Impossibility를 우회:
- **Random Coin Toss** 사용
- 타임아웃 없이 작동
- 네트워크 가정 최소화

### DAG Structure

```
각 노드가 "unit"을 생성:
- 트랜잭션 포함
- 이전 units 참조
- DAG 형성
```

### Consensus Process

1. **DAG Construction**: 모든 노드가 unit 생성 및 gossip
2. **Ordering**: DAG에서 total order 추출
3. **Finality**: 암호학적으로 확정

### Performance

- **Finality**: 1초 미만
- **Throughput**: 수만 TPS
- **Asynchronous**: 네트워크 가정 없음

## Narwhal & Tusk (Bullshark)

**Narwhal & Tusk**는 Mempool과 Consensus를 분리한 혁신적 설계입니다.

### Architecture

```
┌─────────────┐
│  Narwhal    │  ← High-throughput mempool (DAG)
│  (Mempool)  │
└──────┬──────┘
       │
┌──────▼──────┐
│ Tusk/       │  ← Lightweight consensus
│ Bullshark   │
└─────────────┘
```

### Narwhal (Mempool Layer)

**Data dissemination**을 효율적으로:

1. Primary node가 트랜잭션 배치를 worker에 분산
2. Workers가 availability certificates 생성
3. Certificates를 DAG에 연결

```
[Batch 1] [Batch 2] [Batch 3]
    ↓         ↓         ↓
 Workers   Workers   Workers
    ↓         ↓         ↓
Certificate Certificate Certificate
            ↓
          DAG
```

### Tusk/Bullshark (Consensus Layer)

**Ordering**만 수행:

- Narwhal DAG의 certificates 순서만 결정
- 실제 데이터 전송 없음 (이미 Narwhal에서 처리)
- **Zero-message overhead** (Bullshark)

### Bullshark Innovation

**No Extra Messages**:
- Narwhal의 gossip만으로 consensus
- 추가 메시지 0개
- DAG 구조 자체가 합의 정보

### Performance

| Metric | Value |
|--------|-------|
| **Throughput** | 수십만 TPS |
| **Latency** | 수백 ms |
| **Scalability** | 수백 노드 |
| **Overhead** | Near-zero (Bullshark) |

### Use Cases

- **Sui**: L1 blockchain
- **Aptos**: Move-based blockchain
- High-performance applications

## Comparison: DAG-based Algorithms

| Algorithm | Structure | Byzantine | Async | Throughput | Use Case |
|-----------|-----------|-----------|-------|------------|----------|
| **Hashgraph** | DAG events | < 1/3 | No | Very High | Hedera |
| **Tangle** | Tx approvals | Limited | Yes | Variable | IOTA |
| **Aleph** | DAG units | < 1/3 | Yes | High | Aleph Zero |
| **Narwhal** | Certificate DAG | < 1/3 | No | Very High | Sui, Aptos |

## DAG vs Linear Chain

### Advantages of DAG

✅ **Throughput**: 병렬 처리로 훨씬 높은 TPS
✅ **Latency**: 블록 생성 대기 불필요
✅ **Fairness**: 모든 노드가 동시에 참여
✅ **Network Efficiency**: 대역폭 최적 활용

### Challenges of DAG

❌ **Complexity**: 구현이 더 복잡
❌ **Ordering**: Total order 추출이 어려움
❌ **Debugging**: 선형 구조보다 디버그 어려움
❌ **Proven Track Record**: 상대적으로 적은 실전 경험

## Practical Considerations

### 1. Total Ordering

DAG에서 모든 노드가 **같은 순서**로 트랜잭션을 보려면:

```typescript
function extractOrder(dag: DAG): Transaction[] {
  // 1. Topological sort
  // 2. Deterministic tie-breaking
  // 3. All nodes must agree
}
```

### 2. Garbage Collection

DAG는 계속 성장:

```typescript
// 오래된 nodes 정리
function pruneDAG(dag: DAG, checkpoint: number) {
  // Finalized된 오래된 부분 제거
  // 새로운 노드는 최근 checkpoint부터만 참조
}
```

### 3. Synchronization

새로운 노드가 참여:

```typescript
function syncNewNode(node: Node, dag: DAG) {
  // 1. 최근 checkpoint 다운로드
  // 2. 현재 DAG tip까지 sync
  // 3. 정상 참여 시작
}
```

## Real-World Performance

### Hedera (Hashgraph)

- **Measured**: 10,000 TPS (mainnet)
- **Theoretical**: 수십만 TPS
- **Finality**: 3-5 seconds

### Sui (Narwhal & Bullshark)

- **Measured**: 120,000+ TPS (testnet)
- **Latency**: 480ms
- **Validators**: 100+

### Aleph Zero

- **Measured**: 수만 TPS
- **Finality**: < 1 second
- **Asynchronous**: 네트워크 조건 무관

## Future Directions

### 1. Sharding + DAG

DAG를 샤딩과 결합:
```
각 샤드가 독립적인 DAG
Cross-shard transactions via bridges
```

### 2. Optimistic Execution

```
DAG에서 순서 결정 전에 실행 시작
나중에 순서 확정되면 재정렬
```

### 3. Adaptive Protocols

```
네트워크 상태에 따라 DAG 구조 조정
Low load: 선형적
High load: 병렬적
```

## Summary

DAG-based BFT는 블록체인의 확장성 한계를 극복하기 위한 혁신:

- **Parallel Processing**: 순차 처리의 한계 극복
- **High Throughput**: 수십만 TPS 달성
- **Flexible Design**: Mempool/Consensus 분리 등 창의적 구조
- **Active Research**: 계속 발전 중

전통적인 체인과 DAG의 장점을 결합하는 하이브리드 접근도 활발히 연구되고 있습니다.

## Next Steps

이제 BFT의 기초와 주요 알고리즘들을 모두 살펴보았습니다. [Essential Papers](/papers/)에서 더 깊이 있는 연구를 확인하세요.

## References

- Baird, L. (2016). "The Swirlds Hashgraph Consensus Algorithm".
- Popov, S. (2018). "The Tangle". IOTA Whitepaper.
- Gagol, A., et al. (2019). "Aleph: Efficient Atomic Broadcast in Asynchronous Networks with Byzantine Nodes".
- Danezis, G., et al. (2021). "Narwhal and Tusk: A DAG-based Mempool and Efficient BFT Consensus".
