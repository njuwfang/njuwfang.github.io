---
layout:     post
title:      Bloch球上的旋转和四元数
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

### Bloch球

一个单位量子比特用一个复二维的向量
$$ \vert\psi\rangle = a\vert 0\rangle+b\vert 1\rangle, \vert a\vert^2+\vert b\vert^2 = 1$$
来表示，参数化变为
$$ e^{\imath\alpha}(\cos(\frac{\theta}{2})\vert 0\rangle+e^{\imath\varphi}\sin(\frac{\theta}{2})\vert 1\rangle)$$
将相位$\alpha$略去，那么我们可以用$\theta,\varphi,0\leq\theta\leq\pi,0\leq\varphi\leq 2\pi$来表示$\vert\psi\rangle$
然后对应到三维单位球面上的点$(\sin(\theta)\cos(\varphi),\sin(\theta)\sin(\varphi),\cos(\theta))$.
这个球面我们称为 Bloch Sphere.
![Bloch sphere](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bloch_sphere.svg/237px-Bloch_sphere.svg.png)

### Pauli矩阵 

作用在一个量子比特的酉矩阵中，Pauli矩阵尤为关键
$$X \equiv \begin{bmatrix} 0 & 1 \\ 1 & 0\end{bmatrix},
Y \equiv \begin{bmatrix} 0 & -\imath \\ \imath & 0\end{bmatrix},
Z \equiv \begin{bmatrix} 1 & 0 \\ 0 & -1\end{bmatrix}$$
他们都是 hermitian 和 unitary.
我们不妨记 $\sigma_i = X, \sigma_j = Y, \sigma_k = Z$ 经过简单的计算有
$$ \sigma_i^2 = \sigma_j^2 = \sigma_k^2 = I$$
$$ \sigma_i\sigma_j = \imath\sigma_k, \sigma_j\sigma_k = \imath\sigma_i, \sigma_k\sigma_i = \imath\sigma_j $$
然后对于一个三维的实单位向量$\vec{n} = (n_i,n_j,n_k)$，定义
$$ R_{\vec{n}}(\theta) = e^{-\imath\theta\vec{n}\cdot\vec{\sigma}/2} = \cos(\frac{\theta}{2})I - \imath\sin(\frac{\theta}{2})\vec{n}\cdot\vec{\sigma}$$
这里 $\vec{\sigma} = (\sigma_i,\sigma_j,\sigma_k)$，
特别的，记$R_x(\theta) = e^{-\imath\theta X/2},R_y(\theta) = e^{-\imath\theta Y/2}, R_z(\theta) = e^{-\imath\theta Z/2}$

我们有如下事实：$R_{\vec{n}}(\theta)$ 这个变换表示了在 Bloch 球面上绕着向量$\vec{n}$旋转$\theta$角度。

我们很容易验证$R_z(\theta)$表示了绕着$z$轴旋转$\theta$角度的表换。紧接着考虑一个酉变换$U$使得$U\vert n\rangle = \vert 1\rangle$（$\vert 0\rangle$是$z = (0,0,1)$表示的状态），$U$ 显然表示了Bloch球上的正交变换。那么$U^{-1}R_z(\theta)U$表示了一个旋转，且旋转的角度为$\theta$. 同时有 $U^{-1}R_z(\theta)U\vec{n} = \vec{n}$，这说明$U^{-1}R_z(\theta)U$ 是一个绕着$\vec{n}$旋转$\theta$角度的旋转。最后一步我们只需要验证$R_{\vec{n}}(\theta) = U^{-1}R_z(\theta)U$，这个是平凡的（此处留给读者自行解决[坏笑])

### 四元数

四元数定义为 $q = (xi+yj+zk)+w$
其中 $i^2 = j^2 = k^2 = -1, ij = k, jk = i, ki = j$
我们还可以把前面的三个分量放在一起，当作一个向量，而最后的$w$当作一个单独的标量，写成
$$ q = ((x,y,z),w) $$

注意到，这里$i,j,k$的性质和Pauli矩阵的性质特别像。其实我们可以作如下映射
$$ 1\mapsto I, i\mapsto -\imath\sigma_i, j\mapsto -\imath\sigma_j, k\mapsto -\imath\sigma_k $$
这样他们的运算就保持一致了

四元数的乘法可以很好的用向量的叉乘表示
假设$q_1 = (\vec{v_1},w_1), q_2 = (\vec{v_2},w_2)$，那么
$$ q_1q_2 = (\vec{v_1}\times\vec{v_2}+w_1\vec{v_2}+w_2\vec{v_1},w_1w_2-\vec{v_1}\cdot\vec{v_2}) $$

现在取$q = (\sin(\frac{\theta}{2})\vec{n},\cos{\frac{\theta}{2}})$(这个形式和$R_{\vec{n}}(\theta)$是一致的)
那么有以下事实：

对于三维实空间中的一个向量$\vec{x}$，写成四元数的形式$x = (\vec{x}, 0)$
$\vec{x}$绕$\vec{n}$旋转$\theta$角度之后的坐标是如下$y$ 的向量部分
$$ y = qxq^{-1} $$

这个证明的要点其实也和证明$R_{\vec{n}(\theta)}$的类似。

第一点先证明 $ y = (\vec{y},0) = qxq^{-1}$是保距的，且显然$ 0 = q0q^{-1} $
因此，它是表示了三维球面上的旋转。
然后在与$\vec{n}$垂直的平面上取单位向量$\vec{v},\vec{k}$，且$\arg(\vec{v},\vec{k})$是$\theta/2$
$$v = (\vec{v}, 0), k = (\vec{k}, 0)$$
可以得到 $q =  (\sin(\frac{\theta}{2})\vec{n},\cos{\frac{\theta}{2}}) = (\vec{v}\times\vec{k},\vec{v}\cdot\vec{k}) = kv^{-1} $

考虑$w = qvq^{-1} = kv^{-1}vvk^{-1}$，我们有 $wk = kv$
这说明 $\arg(\vec{w},-\vec{k}) = \arg(\vec{k},-\vec{v})$， 结论易见。

### 回到题目

终于要说到这个题目了，开始我知道这样的对应后，自以为用四元数的形式去算会非常便捷，奈何自己计算能力差（算不动，找不出好的算法）

后来就勉勉强强用几何直观的办法来说明的，接下来我尽量严格地叙述。

我们想说明任意地$U$可以写成$e^{i\alpha}R_{\hat{n}}(\beta)R_{\hat{m}}(\gamma)R_{\hat{n}}(\delta)$的形式，首先相位可以略去。

也同样向四元数的部分，我们考虑与$\vec{n}$垂直的过原点平面，在上面任取一个单位向量$\vec{v}$. 然后再设经过$U$作用后对应的向量是$\vec{u}$，不妨设$\vec{u}$与$\vec{n}$的夹角是$\alpha$，易见$0\leq\alpha\leq\pi$.

有这样的映射关系 
$$\vec{v} \stackrel{R_{\vec{n}}(\beta)}{\longmapsto} \vec{k_1} \stackrel{R_{\vec{m}}(\gamma)}{\longmapsto} \vec{k_2} \stackrel{R_{\vec{n}}(\delta)}{\longmapsto} \vec{u} $$

由旋转的性质可以知道，$\arg(\vec{n},\vec{k_1}) = \pi/2, \arg(\vec{n}, \vec{k_2}) = \alpha$，由此可以推出
$$ \vert\theta-\pi/2\vert\leq \arg(\vec{m},\vec{k_1})\leq \theta+\pi/2 $$
$$ \vert\theta - \alpha\vert\leq \arg(\vec{m},\vec{k_2})\leq\theta+\alpha$$
这里$\theta = \arg(\vec{n},\vec{m})$

$\vec{k_1},\vec{k_2}$是通过$R_{\vec{m}}$变换而来的，那么就需要$\arg(\vec{m},\vec{k_1}) = \arg(\vec{m},\vec{k_2})$
但是当$\theta \not= \pi/2$时，这个等式不一定成立。

因此我们有$\vec{n},\vec{m}$必须相互垂直。