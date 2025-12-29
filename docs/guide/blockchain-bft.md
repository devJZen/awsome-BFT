---
outline: deep
---

# Blockchain BFT Algorithms

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

블록체인 시대는 BFT 연구에 새로운 활력을 불어넣었습니다. 이 섹션에서는 현대 블록체인에서 사용되는 최신 BFT 알고리즘들을 살펴봅니다.

## Tendermint

**Tendermint**는 Jae Kwon이 2014년에 제안한 BFT 합의 알고리즘으로, Cosmos 생태계의 핵심입니다.

### Core Design

- **Round-based**: 라운드 기반 합의
- **Instant Finality**: 즉시 최종성
- **Validator Set**: 검증자 집합 기반
- **Proof-of-Stake**: PoS와 통합 가능

### Consensus Flow

#### Phase 1: Propose
```
Proposer: "라운드 R의 블록 B를 제안합니다"
→ [Proposal] → All Validators
```

#### Phase 2: Prevote
```
각 Validator: "블록 B에 prevote합니다"
→ [Prevote] → All Validators

+2/3 prevotes → Polka 형성
```

#### Phase 3: Precommit
```
Polka를 본 Validator: "블록 B에 precommit합니다"
→ [Precommit] → All Validators

+2/3 precommits → Commit!
```

### Visualization

```
Round R
│
├─ Propose: Proposer → Block B
│  timeout: 3s
│
├─ Prevote: All validators vote
│  +2/3 → Polka
│  timeout: 1s
│
├─ Precommit: Vote to commit
│  +2/3 → COMMIT
│  timeout: 1s
│
└─ If fail → Round R+1 (timeout *= 2)
```

### Key Features

#### 1. Adaptive Timeouts
```typescript
let timeout = INITIAL_TIMEOUT

for (let round = 0; ; round++) {
  timeout = INITIAL_TIMEOUT + (round * TIMEOUT_INCREMENT)

  if (await consensusRound(timeout)) {
    break  // Success!
  }
  // 타임아웃 증가하며 재시도
}
```

#### 2. Locking Mechanism
한 번 prevote하면 해당 블록에 "lock":
- 다른 블록으로 쉽게 바꾸지 못함
- Safety 보장

#### 3. Validator Rotation
- Round-robin으로 proposer 순환
- 공평한 블록 생성 기회

### Safety and Liveness

**Safety (항상 보장):**
- 2/3+ 검증자의 서명이 있어야 commit
- 두 개의 다른 블록이 같은 높이에서 commit 불가능

**Liveness (결국 보장):**
- 네트워크가 동기화되면 합의 진행
- 타임아웃이 증가하므로 "결국" 충분한 시간

### Performance

| Metric | Value |
|--------|-------|
| **Finality** | 1-3 seconds |
| **Throughput** | 수천 TPS |
| **Validators** | ~100-200 optimal |
| **Byzantine Tolerance** | < 1/3 |

## HotStuff

**HotStuff**는 2018년에 제안된 알고리즘으로, Libra/Diem의 기반이 되었습니다.

### Revolutionary Feature: Linear Communication

PBFT의 O(n²) → HotStuff의 **O(n)**

#### 어떻게?

**Threshold Signatures** 사용:
- 각 노드의 서명을 하나로 결합
- Leader가 결합된 서명 하나만 전송

```
PBFT: 모든 노드가 모든 노드에게 (n²)
HotStuff: 모든 노드 → Leader → 결합 서명 → 모든 노드 (2n)
```

### Three Phases (like PBFT)

1. **Prepare**: Leader가 제안
2. **Pre-Commit**: 검증자들이 투표
3. **Commit**: 최종 확정

차이점: **각 단계마다 threshold signature 사용**

### Chain-based Design

HotStuff는 "chain" 구조:

```
[Prepare] → [Pre-Commit] → [Commit] → [Decide]
   QC          QC            QC          Execute
```

**QC (Quorum Certificate)**: 2/3+ 서명의 증거

### Pipelining

여러 블록을 동시에 처리:

```
Block 100: [Prepare]
Block 101: [Pre-Commit] ← Block 100의 QC
Block 102: [Commit]     ← Block 101의 QC
Block 103: [Decide]     ← Block 102의 QC
```

### Advantages

✅ **O(n) Communication**: 대규모 네트워크 가능
✅ **Simple Leader Rotation**: View change가 간단
✅ **Responsive**: 네트워크 속도에 적응
✅ **Pipelining**: 높은 처리량

## Casper FFG (Ethereum)

**Casper the Friendly Finality Gadget**는 Ethereum 2.0의 finality 메커니즘입니다.

### Hybrid Approach

Casper FFG는 **Finality Gadget**:
- 블록 생성: LMD GHOST (Gasper)
- Finality: Casper FFG

### Checkpoint-based Finality

```
Epoch 0   Epoch 1   Epoch 2   Epoch 3
  CP0  →    CP1  →    CP2  →    CP3
   ↓         ↓         ↓         ↓
Finalized  Justified Justified  Head
```

- **Justified**: 2/3+ 검증자가 투표
- **Finalized**: 2개의 연속된 justified checkpoint

### Accountable Safety

**Slashing**: 악의적 행동에 대한 경제적 처벌

잘못된 행동:
1. **Double voting**: 같은 epoch에 두 번 투표
2. **Surround voting**: 모순되는 투표

```
Validator가 규칙 위반
→ 자동 감지
→ 예치금 삭감 (slash)
→ 네트워크에서 제거
```

### Inactivity Leak

네트워크 분할 시:
- 오프라인 검증자의 잔고 감소
- 온라인 검증자의 비율 증가
- 결국 2/3 도달 → Finality 복구

### Performance

| Metric | Value |
|--------|-------|
| **Finality Time** | ~15 minutes (2 epochs) |
| **Validators** | ~수십만 (2024년 기준 90만+) |
| **Throughput** | ~수만 TPS (샤딩 후) |
| **Byzantine Tolerance** | < 1/3 |

## Algorithm Comparison

| Algorithm | Communication | Finality | Scalability | Use Case |
|-----------|--------------|----------|-------------|----------|
| **PBFT** | O(n²) | Immediate | Small (~20) | Enterprise |
| **Tendermint** | O(n²) | 1-3 sec | Medium (~200) | Cosmos chains |
| **HotStuff** | O(n) | Fast | Large (~1000+) | Libra/Aptos |
| **Casper FFG** | O(n) | ~15 min | Very Large (90만+) | Ethereum 2.0 |

## Other Notable Algorithms

### Algorand

**Pure Proof-of-Stake + VRF (Verifiable Random Function)**

- 랜덤하게 검증자 선택
- 각 블록마다 다른 위원회
- 즉시 Finality

```
VRF로 비밀리에 선택
→ 선택된 자만 제안/투표
→ DDoS 공격 어려움
```

### Avalanche

**DAG + Repeated Subsampling**

- 노드들이 작은 샘플을 반복적으로 쿼리
- 점진적으로 합의에 수렴
- 매우 빠른 Finality (~1초)

```
반복적 샘플링:
"내 이웃 20개 중 15개가 X를 선호"
→ 나도 X 선호로 변경
→ 빠르게 네트워크 전체가 수렴
```

### Sui (Narwhal & Bullshark)

**Mempool과 Consensus 분리**

- **Narwhal**: 고처리량 mempool
- **Bullshark**: Zero-message overhead consensus
- DAG 기반

## Design Trade-offs

### Finality Time vs Scalability

```
Fast Finality (Tendermint, HotStuff):
→ 낮은 latency
→ 제한된 검증자 수

Slow Finality (Casper FFG):
→ 높은 latency
→ 매우 많은 검증자 가능
```

### Communication Complexity vs Simplicity

```
O(n²) (PBFT, Tendermint):
→ 간단한 구현
→ 작은 네트워크

O(n) (HotStuff, Casper):
→ 복잡한 암호학 (Threshold Sig)
→ 대규모 네트워크
```

### Synchrony Assumptions

```
Strong Synchrony:
→ 빠른 합의
→ 네트워크 문제에 취약

Weak Synchrony:
→ 느린 합의
→ 더 robust
```

## Practical Implementation Considerations

### 1. Validator Set Management

```typescript
// Dynamic validator set
class ValidatorSet {
  add(validator: Validator, stake: bigint)
  remove(validator: Validator)
  updateStake(validator: Validator, newStake: bigint)

  // Tendermint: validator set 업데이트는 블록 단위
  // Casper: epoch 단위로 업데이트
}
```

### 2. Network Layer

```typescript
// P2P networking
class P2PNetwork {
  broadcast(message: Message)  // All validators
  send(to: Validator, message: Message)  // Single

  // HotStuff: Leader가 aggregate 후 broadcast
  // Tendermint: 각자 broadcast
}
```

### 3. State Machine Replication

```typescript
class StateMachine {
  execute(block: Block) {
    // Deterministic execution
    for (const tx of block.transactions) {
      this.applyTransaction(tx)
    }
  }
}
```

## Summary

현대 블록체인 BFT는 다양한 혁신을 이루었습니다:

- **Linear Communication** (HotStuff): O(n²) → O(n)
- **Instant Finality** (Tendermint): 블록체인에서도 즉시 확정
- **Massive Scale** (Casper FFG): 수십만 검증자
- **Economic Security** (PoS + Slashing): 암호경제학 활용

각 알고리즘은 특정 사용 사례에 최적화되어 있습니다.

## Next Steps

다음 섹션에서는 [DAG-based BFT](./dag-bft)를 살펴보겠습니다.

## References

- Kwon, J. (2014). "Tendermint: Consensus without Mining".
- Yin, M., et al. (2018). "HotStuff: BFT Consensus in the Lens of Blockchain". PODC.
- Buterin, V., & Griffith, V. (2017). "Casper the Friendly Finality Gadget". arXiv.
- Gilad, Y., et al. (2017). "Algorand: Scaling Byzantine Agreements for Cryptocurrencies". SOSP.
