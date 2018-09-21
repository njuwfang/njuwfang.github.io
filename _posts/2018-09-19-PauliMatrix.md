---
layout:     post
title:      Bloch球上的旋转、Pauli矩阵和四元数
date:       2018-09-19
author:     wfang
header-img: img/Wolfgang_Pauli_young.jpg
catalog:    ture
tags:
    -study
    -quantum_computing

---

这篇文章主要来源于*Qauntum Computatio and Quantum Information*这本书的习题*EX4.11*

一道我原来没做出来，后来听师兄说题目错了。现在来做，用了比较初等的办法解释为什么错。

> EX4.11: Suppose $\hat{m}$ and $\hat{n}$ are non-parallel real unit vectors in three dimensions. Show that an artbitrary single qubit unitary $U$ may be written $$U = e^{i\alpha}R_{\hat{n}}(\beta)R_{\hat{m}}(\gamma)R_{\hat{n}}(\delta)$$ for appropriate choices of $\alpha,\beta,\gamma$ and $\delta$.

### Pauli矩阵 

在$2\times2$的酉矩阵中，Pauli矩阵尤为关键
$ X \equiv \begin{array}{cc} 0 & 1 \\ 1 & 0\end{array}$