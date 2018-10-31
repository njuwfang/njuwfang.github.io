---
layout:     post
title:      在LaTeX里用PGF/TikZ画图
date:       2018-10-23
author:     wfang
header-img: img/foreach_example.png
catalog:    ture
tags:
    -study
    -latex

---

## 前言

--- 

### 关于PGF/TikZ 

> 这一段话可以不看

PGF是"portable graphics format"的缩写（或者你也可以认为是"pretty, good, functional", 哈哈, 这是来自文档的冷幽默？），它提供了一些画（矢量）图的基本命令集。PGF包含三个层面：system layer $\to$ basic layer $\to$ frontend layer. 一般来说，我们不需要关注前两个层面。

就第三个层面Frontend Layer（前端）而言，TikZ就是一种很自然的封装。它让我们能够使用到PGF的所有特性，同时简化了我们的操作，更加容易地使用PGF.

"TikZ ist kein Zeichenprogramm" (German for "TikZ is not a drawing program").

---

### 使用前的准备工作

首先~~当然是安装Texlive完整版（大雾）~~，如果自己去下载配置包，比价烦，完整版一步到位很好了。

在LaTeX中使用TikZ，首先在导言区需要载入TikZ包：
```latex
\usepackage{tikz}
```
接着，我们就能够使用TikZ命令来画图了，一般的框架如下
```latex
\documentclass{standalone}

\usepackage{tikz}

\begin{document}

%第一种使用方式
\begin{tikzpicture}[\<options\>]
    \<tikz commands\>
\end{tikzpicture}

%第二种使用方式
\tikz[\<options\>]{\<tikz commands\>}

\end{document}
```




## 后话

写这篇是因为刚接触使用LaTeX画图的时候，想画寄存器图，然而苦于不知道可视化的工具，选择了用TiKz来画。

当时不太会写，自己手动把每个节点的坐标写好，然后一个一个的打上去，费时费力，然后效果也一般。

从此竟然喜欢用TiKz画图了。

但是很多命令不太记得，每次要作图的时候都会上网搜一下，或者查查文档，效率很低。于是想自己总结一下，把基本的东西弄好，以及平常自己觉得比较方便的写法整理上来，方便自己以后来用（很多当时写出来的东西都记不得了）


## 参考资料

- [The TikZ and PGF Packages Manual](http://pgf.sourceforge.net/pgf_CVS.pdf)
- [Manual for Package PgfplotsTable](http://pgfplots.sourceforge.net/pgfplotstable.pdf)
- [Wikibooks/LaTeX/PGF/TikZ](https://en.wikibooks.org/wiki/LaTeX/PGF/TikZ)
- [Wikipedia/PGF/TikZ](https://en.wikipedia.org/wiki/PGF/TikZ)
