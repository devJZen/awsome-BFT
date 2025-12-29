---
outline: deep
---

# What is BFT?

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

**Byzantine Fault Tolerance (BFT)** is the ability of a distributed system to reach consensus even when some nodes behave maliciously or fail arbitrarily.

**비잔틴 결함 허용(BFT)**은 분산 시스템에서 일부 노드가 악의적으로 행동하거나 임의로 실패하는 상황에서도 합의에 도달할 수 있는 능력입니다.

## Why BFT Matters

### Trustless Environments
신뢰할 수 없는 네트워크 환경에서도 시스템의 일관성을 보장합니다. 중앙 권한 없이도 네트워크 참여자들이 안전하게 합의에 도달할 수 있습니다.

### Blockchain Consensus
블록체인과 분산 원장 기술의 핵심 기반입니다. Bitcoin, Ethereum, Cosmos 등 주요 블록체인 프로젝트들은 모두 BFT 이론을 기반으로 합니다.

### Mission-Critical Systems
항공, 우주, 금융 등 고신뢰성이 요구되는 시스템에서 필수적입니다. 시스템 일부가 실패하더라도 전체 시스템은 정상 작동을 유지해야 합니다.

## Historical Context

BFT 연구는 1980년대 초 Leslie Lamport와 그의 동료들이 **비잔틴 장군 문제(Byzantine Generals Problem)**를 제시하면서 시작되었습니다. 이 문제는 분산 시스템에서 악의적인 행위자가 있을 때 합의에 도달하는 것이 얼마나 어려운지를 보여주는 사고 실험입니다.

## Modern Applications

오늘날 BFT는 다음과 같은 분야에서 활용됩니다:

- **Cryptocurrency**: Bitcoin, Ethereum 등의 합의 메커니즘
- **Distributed Databases**: CockroachDB, YugabyteDB 등
- **Cloud Infrastructure**: 분산 스토리지 및 컴퓨팅 시스템
- **IoT Networks**: 신뢰할 수 없는 디바이스 간 통신

## Next Steps

다음 섹션에서는 BFT의 핵심 문제인 [비잔틴 장군 문제](./byzantine-generals)에 대해 자세히 알아보겠습니다.

## References

- [Byzantine Fault - Wikipedia](https://en.wikipedia.org/wiki/Byzantine_fault)
- Lamport, L., Shostak, R., & Pease, M. (1982). The Byzantine Generals Problem. ACM Transactions on Programming Languages and Systems.
