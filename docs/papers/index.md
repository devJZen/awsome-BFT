---
outline: deep
---

# Essential Papers

BFT와 합의 메커니즘을 깊이 이해하기 위한 필수 논문들을 정리했습니다.

## Foundational Papers

### 1. The Byzantine Generals Problem (1982)

**Authors**: Leslie Lamport, Robert Shostak, Marshall Pease

**Citation**: Lamport, L., Shostak, R., & Pease, M. (1982). "The Byzantine Generals Problem". ACM Transactions on Programming Languages and Systems, 4(3), 382-401.

**Why Important**:
- BFT 문제를 최초로 정의
- 3f + 1 규칙 증명
- 분산 합의의 이론적 기반

**Key Contributions**:
- Oral Messages Algorithm
- Signed Messages Algorithm
- Byzantine failure model

[PDF Link](https://lamport.azurewebsites.net/pubs/byz.pdf)

---

### 2. Impossibility of Distributed Consensus (FLP) (1985)

**Authors**: Michael J. Fischer, Nancy A. Lynch, Michael S. Paterson

**Citation**: Fischer, M. J., Lynch, N. A., & Paterson, M. S. (1985). "Impossibility of distributed consensus with one faulty process". Journal of the ACM, 32(2), 374-382.

**Why Important**:
- 분산 합의의 근본적 한계 증명
- 비동기 환경에서의 불가능성
- 모든 합의 알고리즘이 우회해야 할 장벽

**Key Contributions**:
- FLP Impossibility Theorem
- Asynchronous consensus 한계
- Bivalent/Univalent configurations

[PDF Link](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf)

---

### 3. Practical Byzantine Fault Tolerance (1999)

**Authors**: Miguel Castro, Barbara Liskov

**Citation**: Castro, M., & Liskov, B. (1999). "Practical Byzantine Fault Tolerance". OSDI.

**Why Important**:
- BFT를 실용적으로 만든 첫 알고리즘
- 3단계 프로토콜 (Pre-prepare, Prepare, Commit)
- 현대 BFT의 기초

**Key Contributions**:
- O(n²) communication
- View change mechanism
- State transfer optimization

[PDF Link](http://pmg.csail.mit.edu/papers/osdi99.pdf)

---

## Consensus Theory

### 4. Consensus in the Presence of Partial Synchrony (1988)

**Authors**: Cynthia Dwork, Nancy Lynch, Larry Stockmeyer

**Citation**: Dwork, C., Lynch, N., & Stockmeyer, L. (1988). "Consensus in the presence of partial synchrony". Journal of the ACM, 35(2), 288-323.

**Why Important**:
- Partial synchrony model 정의
- 실용적 BFT의 이론적 기반
- FLP를 우회하는 방법

**Key Contributions**:
- Eventually synchronous model
- Unknown bound model
- Realistic network assumptions

---

### 5. The Part-Time Parliament (Paxos) (1998)

**Authors**: Leslie Lamport

**Citation**: Lamport, L. (1998). "The Part-Time Parliament". ACM Transactions on Computer Systems, 16(2), 133-169.

**Why Important**:
- Crash fault tolerance (비-BFT)
- 실용적 합의 알고리즘
- 많은 시스템에서 사용 (Chubby, ZooKeeper)

**Note**: Crash fault만 처리 (Byzantine fault는 불가)

---

## Modern Blockchain BFT

### 6. HotStuff: BFT Consensus in the Lens of Blockchain (2018)

**Authors**: Maofan Yin, Dahlia Malkhi, et al.

**Citation**: Yin, M., et al. (2018). "HotStuff: BFT Consensus in the Lens of Blockchain". PODC.

**Why Important**:
- O(n²) → O(n) communication
- Linear communication complexity
- Libra/Diem의 기반

**Key Contributions**:
- Threshold signatures
- Pipelined consensus
- Simple leader rotation

[PDF Link](https://arxiv.org/pdf/1803.05069.pdf)

---

### 7. Tendermint (2014)

**Author**: Jae Kwon

**Citation**: Kwon, J. (2014). "Tendermint: Consensus without Mining".

**Why Important**:
- PoS + BFT 결합
- Instant finality
- Cosmos 생태계의 핵심

**Key Contributions**:
- Round-based consensus
- Locking mechanism
- Validator rotation

[PDF Link](https://tendermint.com/static/docs/tendermint.pdf)

---

### 8. Casper the Friendly Finality Gadget (2017)

**Authors**: Vitalik Buterin, Virgil Griffith

**Citation**: Buterin, V., & Griffith, V. (2017). "Casper the Friendly Finality Gadget". arXiv preprint arXiv:1710.09437.

**Why Important**:
- Ethereum 2.0의 finality 메커니즘
- Checkpoint-based finality
- Accountable safety (slashing)

**Key Contributions**:
- Justify/Finalize mechanism
- Economic security
- Inactivity leak

[PDF Link](https://arxiv.org/pdf/1710.09437.pdf)

---

## DAG-based Consensus

### 9. Narwhal and Tusk (2021)

**Authors**: George Danezis, et al.

**Citation**: Danezis, G., et al. (2021). "Narwhal and Tusk: A DAG-based Mempool and Efficient BFT Consensus".

**Why Important**:
- Mempool과 consensus 분리
- DAG 구조 활용
- 매우 높은 throughput

**Key Contributions**:
- Certificate-based DAG
- Worker-based architecture
- Sui, Aptos에서 사용

[PDF Link](https://arxiv.org/pdf/2105.11827.pdf)

---

### 10. Algorand (2017)

**Authors**: Yossi Gilad, et al.

**Citation**: Gilad, Y., et al. (2017). "Algorand: Scaling Byzantine Agreements for Cryptocurrencies". SOSP.

**Why Important**:
- VRF를 활용한 검증자 선택
- 대규모 네트워크 확장성
- Pure Proof-of-Stake

**Key Contributions**:
- Cryptographic sortition
- BA* consensus protocol
- Player replaceability

[PDF Link](https://people.csail.mit.edu/nickolai/papers/gilad-algorand-eprint.pdf)

---

## Asynchronous BFT

### 11. HoneyBadgerBFT (2016)

**Authors**: Andrew Miller, et al.

**Citation**: Miller, A., et al. (2016). "The Honey Badger of BFT Protocols". CCS.

**Why Important**:
- 최초의 실용적 asynchronous BFT
- 타임아웃 없이 작동
- FLP를 확률적으로 우회

**Key Contributions**:
- Threshold encryption
- Asynchronous common subset
- Censorship resistance

[PDF Link](https://eprint.iacr.org/2016/199.pdf)

---

### 12. Aleph: Efficient Atomic Broadcast (2019)

**Authors**: Adam Gągol, et al.

**Citation**: Gagol, A., et al. (2019). "Aleph: Efficient Atomic Broadcast in Asynchronous Networks with Byzantine Nodes". AFT.

**Why Important**:
- DAG + Asynchronous BFT
- 빠른 finality (< 1초)
- 네트워크 가정 최소화

**Key Contributions**:
- Reliable broadcast
- Random beacon
- DAG ordering

[PDF Link](https://arxiv.org/pdf/1908.05156.pdf)

---

## Nakamoto Consensus

### 13. Bitcoin: A Peer-to-Peer Electronic Cash System (2008)

**Author**: Satoshi Nakamoto

**Citation**: Nakamoto, S. (2008). "Bitcoin: A Peer-to-Peer Electronic Cash System".

**Why Important**:
- 블록체인 혁명의 시작
- Proof-of-Work 합의
- Permissionless 네트워크

**Key Contributions**:
- Longest chain rule
- Probabilistic finality
- Incentive mechanism

[PDF Link](https://bitcoin.org/bitcoin.pdf)

---

### 14. Analysis of the Blockchain Protocol in Asynchronous Networks (2017)

**Authors**: Rafael Pass, Lior Seeman, abhi shelat

**Citation**: Pass, R., Seeman, L., & shelat, a. (2017). "Analysis of the Blockchain Protocol in Asynchronous Networks". EUROCRYPT.

**Why Important**:
- Bitcoin의 이론적 분석
- 비동기 환경에서의 안전성
- Nakamoto consensus의 한계

**Key Contributions**:
- Security proof
- Network delay analysis
- 51% attack bounds

[PDF Link](https://eprint.iacr.org/2016/454.pdf)

---

## Additional Topics

### State Machine Replication

- **Viewstamped Replication** (Oki & Liskov, 1988)
- **Chain Replication** (van Renesse & Schneider, 2004)

### Randomized Consensus

- **Ben-Or's Algorithm** (1983)
- **Rabin's Byzantine Agreement** (1983)

### Scalability

- **Bitcoin-NG** (Eyal et al., 2016)
- **Omniledger** (Kokoris-Kogias et al., 2018)
- **RapidChain** (Zamani et al., 2018)

### Economic Security

- **SoK: Consensus in the Age of Blockchains** (Bano et al., 2019)
- **The Economics of Cryptocurrency Pump and Dump** (Kamps & Kleinberg, 2018)

---

## Reading Path

### For Beginners

1. Byzantine Generals Problem (기초)
2. PBFT (실용적 BFT)
3. Bitcoin (블록체인)
4. Tendermint (현대 BFT)

### For Researchers

1. FLP Impossibility (이론적 한계)
2. Partial Synchrony (네트워크 모델)
3. HotStuff (최신 BFT)
4. HoneyBadgerBFT (비동기)

### For Blockchain Developers

1. Bitcoin (PoW)
2. Tendermint (BFT + PoS)
3. Casper FFG (Ethereum)
4. Narwhal & Tusk (DAG)

---

## Online Resources

### Books

- **"Introduction to Reliable and Secure Distributed Programming"** by Cachin, Guerraoui, Rodrigues
- **"Distributed Algorithms"** by Nancy Lynch

### Courses

- MIT 6.824: Distributed Systems
- Stanford CS244b: Distributed Systems

### Websites

- [Consensus Zoo](https://github.com/s-tikhomirov/consensus-zoo)
- [Awesome Consensus](https://github.com/dgryski/awesome-consensus)
- [BFT Protocol Zoo](https://github.com/ethereum/wiki/wiki/BFT-Protocol-Zoo)

---

## How to Read Papers

1. **First Pass**: 제목, 초록, 그림만 보기 (5분)
2. **Second Pass**: 섹션 헤딩, 정리(theorem) 읽기 (1시간)
3. **Third Pass**: 전체 정독, 증명 이해 (수 시간~일)

**Tip**: 처음에는 3 passes 모두 하지 말고, 필요할 때 깊이 들어가기

---

## Contributing

새로운 중요한 논문을 발견하셨나요? PR을 통해 추가해주세요!

- 논문 제목, 저자, 출판 정보
- 왜 중요한지 설명
- 주요 기여 사항
- PDF 링크 (가능하면)
