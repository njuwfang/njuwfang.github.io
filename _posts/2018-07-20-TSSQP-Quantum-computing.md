---
layout:     post
title:      TSSQP上听到的量子计算
date:       2018-07-20
author:     wfang
header-img: img/Hofstadter-butterfly-01.jpeg
catalog:    ture
tags:
    -study
    -quantum_computing

---

> 先列一个目录，内容之后再补
> 记录一下这次暑学校的内容（奈何自己太不专业了，没能力写好）
> 慢慢来吧

## Quantum Error Correction

Decoherence and other quantum noises lead to many errors in quantum computing and quantum imformation. We may encounter with faulty quantum states (even in preparing initial states) , quantum gates and quantum measurements.

The key idea of protecting a message against the effects of noise is to encode the message by adding some redundant imformation to the message. That way, even if some of the information in the encoded message is corrupted by noise, there will be enough redundancy in the encoded message that it is possible to recover or decode the message so that all the information in the original message is recovered.

不过，有时候会越纠越错，毕竟编码的时候也可能出错（手动微笑）

* Quantum Codes
  * Shor Code
  * Hamming Code
  * Surface Code
  * .....

* Combination of Errors

  * **Theorem** *If a Quantum Code corrects $A$ and $B$, it also corrects $\alpha A+\beta B$.*

    Fortunately, an arbitray single-qubit error is a linear combination of $I, X, Y, Z$.

* Quantum Error Correcting Criterion
  * Quantum Code is a subspace of $ \,\mathbb{C}^{\otimes n}_2 $
  * Code space basis: $ \,\\{\vert\psi_i\rangle\\} $
  * Errors: $ \,\\{E_{\alpha}\\} $
  * Quantum error correcting criterion: $$ \langle\psi_i\vert E^{\dagger}_{\alpha}E_{\beta}\vert\psi_j\rangle = c_{\alpha\beta}\delta_{ij} $$

## Superconducting qubits & Trapped ion qubits

* Harmonic oscillator is a universality class of systems
  
  那我们能观测到一个弹簧振子的能级分布么？
  
  假设振动的频率$f=1\mathrm{Hz}$，那么$E/K_b = hf/K_b<10^{-10}\mathrm{K}$

  而室温是$300\mathrm{K}$, Quantum effects is overwhelmed by thermal environment.
* Superconductiong circuits -- Josephson Junctions
  
  通过很高的频率, 在"较高"温度上就能实现 Qubit
  
  Long conherence times, easily controlled by $\mu$wave technology...

**物理的东西实在不会写**

听到了一大堆不明所以的名词。

## Topological quantum computing & Majorana fermions

## Quantum simulation

* Three types of quantum simulation
  * Digital quantum simulation
  * Analog quantum simulation
  * Quantum-imformation-inspired algorithms for classical simulation of quantum systems -- (Hybrid)

***

Quantum Advantages in Hypercube Game

这堂课是我听的最开心的，因为完全没涉及到物理的东西。报告的是这篇文章[Quantum Advantages in Hypercube Game](https://arxiv.org/pdf/1806.02642.pdf),下面的内容都是来自这篇文章。

They introduce a novel generalization of the Clauser-Horne-Shimony-Holt (CHSH) game to a multiplayer
setting.

* Nonlocal Game
  * Participates: $1$ referee, $m$ players
  * A finite set of questions: $Q$
  * A predicate $V$ over $Q\times A$ i.e. a Boolean function
  * A strategy $S(a\vert q)$ is a probability transition matrix from $Q$ to $A$
  Rules:
  * The referee randomly selects q question $q=q_1 \cdots q_m$ from $Q$ and sends it to players.
  * Playes return an answer $a = a_1 \cdots a_m$ generated from certain strategy $S(a\vert q)$.
  * No communication between players, but pre-specified strategers are allowed.
  Winning condition: $V(a,q) = 1$.
  Goal: Maximize the success probability for a given class of strategies.
* Strategies
  * classical strategy (stochastic strategy -> deterministic strategy): $P (a\vert q)$
    while the stochastic strategy via shared randomness does not provide advantage to achieve higher winning probability, there is no loss of generality to restrict our attention only to the deterministic ones.
  * quantum strategy: $P(a \vert q) = \langle M_{q_1,1}^{a_1} \otimes \cdots \otimes M_{q_m,m}^{a_m} \rangle_{\psi}$
     the players may prepare and share a joint quantum state $\vert\psi\rangle$ prior to the game. Then they can perform a local (projective) measurement $M_{q_i},i:=\\{M^{a_i}_{q_i,i}\\}$ respectively on their subsystems dependent on their received questions $q_i$ and respond the answers ai according to their measurement outcomes.
  * No-signalling strategy
* $m$-player Hypercube game
  1. The referee randomly chooses one of the question $q=(q_1,\cdots,q_m)\in \\{0,1\\}^m$ according to a uniform distribution, and sends $q_i$ to the player $p_i$
  2. Each player $p_i$ needs to assign $1$ or $-1$ to $2^{m-1}$ vertices in the set $X_i:=\\{x\in\\{0,1\\}^m \vert x_i=q_i\\}$, and sends their assignments to the referee.
  3. The players win if and only if
    (a) (Parity): the product of their own assignments equals to $1$ except that the product of the first player’s assignments  equals $-1$ if $q_1=1$.
    (b) (Consistency): the assignments are consistent on all the common vertices $X_i\cap X_j,\forall i\neq j$.

***

## 一些无关的话

自己还是挺高兴参加了清华物理系的这个暑期学校。可是自己毕竟不是学物理的，很多东西听不懂，然后上课很多时间都在玩手机（emmm...我真不知道讲的是啥啊）

课间的水果点心和清华的食堂很棒。饭卡里的钱自己才用了100，感觉很亏。
想来如果保研的时候选择数学系也是挺好的😄

说实话这个星期是超级累，早上定6点40的闹钟，然后每天6点必定醒来... 脑袋痛
还碰上北京暴雨，只好走路，20分钟到清华大门，再20分钟才到上课的教室（清华为什么这么大😭）第一天鞋子湿透穿了一整天，第二天穿了拖鞋...却没想到磨脚。

还有一件事很开心，我因为湖南口音认识了一个港科大的小姐姐，更巧的是她老家也是郴州。

（哈哈，塑料普通话好听）

***
封面图片
A simulation of electrons via superconducting qubits yields Hofstadter's butterfly.
[By Dangirsh - Own work, CC BY-SA 4.0]( https://commons.wikimedia.org/w/index.php?curid=62668320)
