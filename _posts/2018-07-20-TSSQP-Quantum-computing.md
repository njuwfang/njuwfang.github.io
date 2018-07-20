---
layout:     post
title:      TSSQP上我听到的量子计算
date:       2018-07-20
author:     wfang
header-img: img/Hofstadter-butterfly-01.jpeg
catalog:    ture
tags:
    -study
    -quantum computing

---

## Quantum Error Correction

Decoherence and other quantum noises lead to many errors in quantum computing and quantum imformation. We may encounter with faulty quantum states (even in preparing initial states) , quantum gates and quantum measurements.

The key idea of protecting a message against the effects of noise is to encode the message by adding some redundant imformation to the message. That way, even if some of the information in the encoded message is corrupted by noise, there will be enough redundancy in the encoded message that it is possible to recover or decode the message so that all the information in the original message is recovered.

不过，有时候会越纠越错，毕竟编码的时候也可能出错（手动微笑）

#### Quantum Error Correcting Criterion

* Quantum Code is a subspace of $ \,\mathbb{C}^{\otimes n}_2 $
* Code space basis: $ \,\\{\vert\psi_i\rangle\\} $
* Errors: $ \,\\{E_{\alpha}\\} $
* Quantum error correcting criterion: $$ \langle\psi_i\vert E^{\dagger}_{\alpha}E_{\beta}\vert\psi_j\rangle = c_{\alpha\beta}\delta_{ij} $$

#### Combination of Errors

**Theorem** *If a Quantum Code corrects $A$ and $B$, it also corrects $\alpha A+\beta B$.*

#### Quantum Codes

* Shor Code
* Hamming Code
* Surface Code
* .....

## Superconductor

## 一些无关的话

自己还是挺高兴参加了清华物理系的这个暑期学校。可是自己毕竟不是学物理的，很多东西听不懂，然后上课很多时间都在玩手机（emmm...我真不知道讲的是啥啊）

课间的水果点心和清华的食堂很棒。饭卡里的钱自己才用了100，感觉很亏。
想来如果保研的时候选择数学系也是挺好的😄

说实话这个星期是超级累，早上定6点40的闹钟，然后每天6点必定醒来... 脑袋痛
还碰上北京暴雨，只好走路，20分钟到清华大门，再20分钟才到上课的教室（清华为什么这么大😭）第一天鞋子湿透还只能穿了一整天，第二天穿了拖鞋...却没想到磨脚。

还有一件事很开心，我因为塑料普通话认识了一个港科大的小姐姐（塑普真好听😁），更巧的是她老家是郴州。

***
封面图片
A simulation of electrons via superconducting qubits yields Hofstadter's butterfly.
[By Dangirsh - Own work, CC BY-SA 4.0]( https://commons.wikimedia.org/w/index.php?curid=62668320)