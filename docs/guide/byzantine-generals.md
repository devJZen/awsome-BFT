---
outline: deep
---

# Byzantine Generals Problem

**Guide Navigation:** [What is BFT?](/guide/introduction) • [Byzantine Generals](/guide/byzantine-generals) • [Safety vs Liveness](/guide/safety-liveness) • [Synchrony](/guide/synchrony) • [FLP Impossibility](/guide/flp) • [Classical BFT](/guide/classical-bft) • [Blockchain BFT](/guide/blockchain-bft) • [DAG-based BFT](/guide/dag-bft)

---

The **Byzantine Generals Problem**, introduced by Lamport, Shostak, and Pease (1982), is a fundamental problem in distributed computing that illustrates the challenges of achieving consensus in the presence of malicious actors.

**비잔틴 장군 문제**는 분산 컴퓨팅의 핵심 문제로, Lamport, Shostak, Pease가 1982년에 제시했습니다.

## The Scenario

비잔티움 제국의 여러 사단이 적의 도시를 포위하고 있습니다:

- 여러 장군들이 각자의 부대를 이끌고 도시를 둘러싸고 있음
- 장군들은 **공격(Attack)** 또는 **후퇴(Retreat)**에 대해 합의해야 함
- 일부 장군은 **배신자(Traitor)**일 수 있음
- 장군들은 오직 **메신저**를 통해서만 통신 가능
- 메신저는 메시지를 전달하지만, 메시지는 위변조될 수 있음

## The Problem

모든 충성스러운 장군은 동일한 행동 계획에 합의해야 합니다. 하지만:

1. **일부 장군이 배신자**일 수 있습니다
2. 배신자는 다른 장군들에게 **서로 다른 메시지**를 보낼 수 있습니다
3. 배신자는 메시지를 **위조**하거나 **전달하지 않을** 수 있습니다

## The Challenge

시스템이 만족해야 할 두 가지 조건:

### 1. Safety (안전성)
모든 충성스러운 장군은 **동일한 결정**을 내려야 합니다.

```
충성스러운 장군 A의 결정 = 충성스러운 장군 B의 결정
```

### 2. Liveness (활성)
시스템은 **결국 결정에 도달**해야 합니다. 영원히 대기 상태에 머물러서는 안 됩니다.

### 3. Fault Tolerance (결함 허용)
최대 f개의 배신자가 있어도 시스템이 **정상적으로 작동**해야 합니다.

## Classic Result: The 3f + 1 Rule

Lamport 등은 다음과 같은 중요한 결과를 증명했습니다:

> **n개의 노드 중 최대 f개의 비잔틴 노드를 허용하려면, 최소 3f + 1개의 노드가 필요합니다.**

즉, 전체 노드의 **1/3 미만**이 악의적이어야 합의가 가능합니다.

### 예시

- 노드가 4개 (n = 4)인 경우: 최대 1개 (f = 1)의 비잔틴 노드 허용
- 노드가 7개 (n = 7)인 경우: 최대 2개 (f = 2)의 비잔틴 노드 허용
- 노드가 10개 (n = 10)인 경우: 최대 3개 (f = 3)의 비잔틴 노드 허용

## Why 3f + 1?

이 숫자가 필요한 이유를 간단히 이해해보겠습니다:

1. **f개의 노드가 비잔틴**일 수 있습니다
2. **f개의 메시지가 지연**될 수 있습니다 (네트워크 문제)
3. 따라서 정직한 노드들의 메시지만으로 합의에 도달하려면, 최소 **f + 1개**의 정직한 응답이 필요합니다
4. 총 노드 수 = f (비잔틴) + f (지연 가능) + f + 1 (정직하고 응답) = **3f + 1**

## Real-World Implications

### Blockchain Applications

- **Bitcoin**: Nakamoto consensus는 51% 공격 (f < n/2)을 방어
- **PBFT**: 전통적인 3f + 1 규칙 적용
- **Tendermint**: 3f + 1 검증자 중 2f + 1의 서명 필요

### Practical Considerations

- 더 많은 노드 = 더 높은 보안 but 더 낮은 성능
- 노드 수와 성능 사이의 트레이드오프 고려 필요
- 네트워크 환경과 공격 모델에 따라 적절한 f 값 선택

## Visualization

```
시나리오: 4명의 장군 (n = 4), 1명의 배신자 (f = 1)

장군 A (충성) ─┐
장군 B (충성) ─┼─> "공격" 결정
장군 C (배신) ─┤   (2명의 충성 장군 합의)
장군 D (충성) ─┘

배신자 C가 다른 메시지를 보내도:
- A, B, D는 서로의 메시지를 확인
- 다수결로 "공격" 결정에 합의
```

## Next Steps

다음 섹션에서는 BFT의 핵심 개념인 [Safety vs Liveness](./safety-liveness)에 대해 알아보겠습니다.

## References

- Lamport, L., Shostak, R., & Pease, M. (1982). "The Byzantine Generals Problem". ACM Transactions on Programming Languages and Systems, 4(3), 382-401.
