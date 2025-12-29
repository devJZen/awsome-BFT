# awsome-BFT
The awsome-BFT repository offers a comprehensive guide for researchers and practitioners studying consensus mechanisms. 
블록체인의 '합의'를 공부하는 사람들을 위해 만들어진 지식의 허브입니다. 
BFT란 비잔틴 장군 문제에서 비롯된 이론입니다. 
기여는 PR로 부탁드리겠습니다. 
제가 학습하는 [공간](https://devjzen.github.io/web3/2025/07/19/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%BD%94%EC%96%B4-%EA%B0%9C%EB%B0%9C.html)입니다. 합의를 공부하는 모두에게 도움이 되었으면 합니다.

- [BFT](https://en.wikipedia.org/wiki/Byzantine_fault)

## Table of Contents
- [What is BFT?](#what-is-bft)
- [Byzantine Generals Problem](#byzantine-generals-problem)
- [Key Concepts](#key-concepts)
- [BFT Algorithm Categories](#bft-algorithm-categories)
- [Essential Papers](#essential-papers)

## What is BFT?

**Byzantine Fault Tolerance (BFT)** is the ability of a distributed system to reach consensus even when some nodes behave maliciously or fail arbitrarily.

**비잔틴 결함 허용(BFT)**은 분산 시스템에서 일부 노드가 악의적으로 행동하거나 임의로 실패하는 상황에서도 합의에 도달할 수 있는 능력입니다.

### Why BFT Matters / 왜 BFT가 중요한가?
- **Trustless environments**: 신뢰할 수 없는 네트워크 환경에서도 시스템의 일관성 보장
- **Blockchain consensus**: 블록체인과 분산 원장 기술의 핵심 기반
- **Mission-critical systems**: 항공, 우주, 금융 등 고신뢰성이 요구되는 시스템

## Byzantine Generals Problem

The **Byzantine Generals Problem**, introduced by Lamport, Shostak, and Pease (1982), is a fundamental problem in distributed computing.

**비잔틴 장군 문제**는 분산 컴퓨팅의 핵심 문제로, Lamport, Shostak, Pease가 1982년에 제시했습니다.

### The Scenario / 시나리오
- 여러 장군들이 도시를 포위하고 있으며, 공격 또는 후퇴에 대해 합의해야 함
- 일부 장군은 배신자일 수 있음 (악의적 행동)
- 메신저를 통해서만 통신 가능 (메시지 위변조 가능)

### The Challenge / 문제
- **Safety**: 모든 충성스러운 장군은 동일한 결정을 내려야 함
- **Liveness**: 시스템은 결국 결정에 도달해야 함
- **Fault tolerance**: 최대 f개의 배신자가 있어도 시스템이 작동해야 함

### Classic Result / 고전적 결과
- **3f + 1 rule**: n개의 노드 중 최대 f개의 비잔틴 노드를 허용하려면, 최소 3f + 1개의 노드가 필요
- 즉, 전체 노드의 1/3 미만이 악의적이어야 합의 가능

## Key Concepts

### Safety vs Liveness
- **Safety (안전성)**: "나쁜 일이 일어나지 않음" - 모든 정직한 노드가 같은 값에 동의
- **Liveness (활성)**: "좋은 일이 결국 일어남" - 시스템이 진전을 이루고 결정에 도달

### Synchrony Assumptions / 동기성 가정
- **Synchronous**: 메시지 전달 시간에 상한이 있음
- **Asynchronous**: 메시지 전달 시간에 제한 없음
- **Partial synchronous**: 대부분의 시간에는 동기적, 가끔 비동기적

### FLP Impossibility
- **FLP Theorem (1985)**: 완전히 비동기적인 환경에서는 단 하나의 노드 실패만 있어도 합의를 보장할 수 없음
- 이로 인해 실용적인 BFT 알고리즘은 부분 동기성이나 타임아웃을 가정

## BFT Algorithm Categories

### 1. Classical BFT
- **PBFT (Practical Byzantine Fault Tolerance)**: 최초의 실용적인 BFT 알고리즘
- 3단계 프로토콜: Pre-prepare, Prepare, Commit
- O(n²) 통신 복잡도

### 2. Blockchain BFT
- **Tendermint**: Cosmos 생태계에서 사용
- **HotStuff**: Libra/Diem의 기반, Linear communication
- **Casper FFG**: Ethereum 2.0의 finality gadget

### 3. DAG-based BFT
- **Hashgraph**: DAG 구조를 활용한 합의
- **Aleph**: Asynchronous Byzantine Fault Tolerance
- **Narwhal & Tusk**: Mempool과 consensus 분리

### 4. Hybrid Approaches
- **PoW + BFT**: Nakamoto consensus와 BFT의 결합
- **PoS + BFT**: Proof-of-Stake와 BFT 메커니즘 통합

## Essential Papers
