# 📝 awsome-BFT

> A comprehensive guide for studying Byzantine Fault Tolerance and consensus mechanisms
> 블록체인의 '합의'를 공부하는 사람들을 위한 지식 허브

## 소개

BFT(Byzantine Fault Tolerance)란 비잔틴 장군 문제에서 비롯된 이론으로, 분산 시스템에서 일부 노드가 악의적으로 행동하거나 실패하는 상황에서도 합의에 도달할 수 있는 능력입니다.

이 저장소는 BFT와 합의 메커니즘을 체계적으로 학습할 수 있도록 구성된 문서 사이트입니다.

## 빠른 시작

### 로컬에서 실행하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run docs:dev

# 브라우저에서 http://localhost:5173 접속
```

### 빌드

```bash
# 프로덕션 빌드
npm run docs:build

# 빌드 결과 미리보기
npm run docs:preview
```

## 내용

- **Introduction**: BFT 소개, 비잔틴 장군 문제
- **Core Concepts**: Safety vs Liveness, Synchrony Assumptions, FLP Impossibility
- **Algorithms**: Classical BFT (PBFT), Blockchain BFT (Tendermint, HotStuff, Casper), DAG-based BFT
- **Essential Papers**: BFT 관련 필수 논문 모음

## 기여

기여는 PR로 부탁드립니다. 합의를 공부하는 모두에게 도움이 되었으면 합니다.

제가 학습하는 [공간](https://devjzen.github.io/web3/2025/07/19/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%BD%94%EC%96%B4-%EA%B0%9C%EB%B0%9C.html)입니다.

## 참고 자료

- [Byzantine Fault - Wikipedia](https://en.wikipedia.org/wiki/Byzantine_fault)
- [VitePress 공식 문서](https://vitepress.dev)

## 라이선스

MIT License
