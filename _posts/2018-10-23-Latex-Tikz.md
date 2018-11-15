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

### 关于PGF/Ti*k*Z 

> 这一段话可以不看

PGF是"portable graphics format"的缩写（或者你也可以认为是"pretty, good, functional", 哈哈, 这是来自文档的冷幽默？），它提供了一些画（矢量）图的基本命令集。PGF包含三个层面：system layer $\to$ basic layer $\to$ frontend layer. 一般来说，我们不需要关注前两个层面。

就第三个层面Frontend Layer（前端）而言，Ti*k*Z就是一种很自然的封装。它让我们能够使用到PGF的所有特性，同时简化了我们的操作，更加容易地使用PGF.

"Ti*k*Z ist kein Zeichenprogramm" (German for "TikZ is not a drawing program").

---

### 使用前的准备工作

首先~~当然是安装Texlive完整版（大雾）~~，如果自己去下载配置包，比价烦，完整版一步到位很好了。

在LaTeX中使用Ti*k*Z，首先在导言区需要载入TikZ包：

```latex
\usepackage{tikz}
```
接着，我们就能够使用Ti*k*Z命令来画图了，一般的框架如下

```latex
\documentclass{standalone}

\usepackage{tikz}

\begin{document}

%第一种使用方式
\begin{tikzpicture}[<options>]
    <tikz commands>
\end{tikzpicture}

%第二种使用方式
\tikz[<options>]{<tikz commands>}

\end{document}
```
例如

```latex
\begin{tikzpicture}
\draw[thick, rounded corners = 8pt] 
    (0, 0) -- (0, 2) -- (1, 3.25) -- (2, 2) -- (2, 0) 
    -- (0, 2) -- (2, 2) -- (0, 0) -- (2, 0);
\end{tikzpicture}
```
![rounded path](/img/roundedpath.png)

```latex
\tikz \fill[blue] (1ex, 1ex) circle (1ex);
```
![blue circle](/img/bluecircle.png)

Ti*k*Z中的每条命令用 **分号** 作为结束符。在 `\begin{tikzpicture} ... \end{tilzpicture}` 里可以输入多个命令， 而 `\tikz ...` 只接受在第一个分号之前的命令。

通常我们还需要一些库(libraries)，来使用额外的命令。在导言区加入

```latex
\usetikzlibrary{⟨list of libraries separated by commas⟩}
```
例如 `\usetikzlibrary{arrows, patterns}` ，在后面需要用的时候都会依次提到。

接下来我们便可以开始用Ti*k*Z画图了。

## 从若干个例子出发

### 线条

```latex
\begin{tikzpicture}
%画一条线段连结(-2,0), (2,0)
\draw (-1, 0) -- (1, 0); 
%画一条线段连结(0,-2), (0,2)
\draw (0, -1) -- (0, 1); 
%画线段依次连结下面的点
\draw (2, 0) -- (4, 0) -- (3, -1) -- (3, 1); 
%以(5,0)为圆心，0.5为半径画一个圆
\draw (5, 0) circle (0.5);

\draw [fill = gray] 
    (6, 0) circle (2pt)
    (7, 1) circle (2pt)
    (8, 1) circle (2pt)
    (8, 0) circle (2pt);
%通过(7, 1)和(8, 1)两个点控制，画一条曲线
\draw (6, 0) .. controls (7, 1) and (8, 1) .. (8, 0);
\end{tikzpicture}
```
![draw lines](/img/drawlines.png)
上面的这些线条在Ti*k*Z中都称为path，例如：

- `\tikz \draw (0, 0) -- (1, 1) -- (1, 0);` 用 `--` 来连接各个点，组成折线段。
![broken line](/img/broken_line.png)

- `\tikz \draw (-1, 0) .. controls (-0.8, 0.8) and (0.8, 0.8) .. (1, 0);` 用 `.. controls <first control point> and <second control point> ..` 来连接，其中第二个控制点的坐标可以省略，这样只用第一个点作控制。
![curved line](/img/curved_line.png)

- `\tikz \draw (0, 0) circle (2);` 以(0,0)为圆心，2为半径画圆。
![circle](/img/circle.png)

我们看 `\draw` 后面的部分，它是对我们想画的东西的一个描述。实际上他们每个都是一个完整的描述， **正是 `\draw` 把他们画出来了**，于是我们可以只使用一个 `\draw` 命令。

```latex
\tikz \draw
    (-2, 0) -- (2, 0)
    (0, -2) -- (0, 2)
    (0, 0) circle (1)
    (-2, 0) .. controls (-1.5, 2) and (1.5, -2) .. (2, 0);
```
![multi_line](/img/multi_line.png)

还有许多预设的path, 如：`grid`, `rectangle`, `ellipse`. 当然，相应的参数设置不一样。

### 节点




## 后话

写这篇是因为刚接触使用LaTeX画图的时候，想画寄存器图，然而苦于不知道可视化的工具，选择了用Ti*k*Z来画。

当时不太会写，自己手动把每个节点的坐标写好，然后一个一个的打上去，费时费力，然后效果也一般。

从此竟然喜欢用Ti*k*Z画图了。

但是很多命令不太记得，每次要作图的时候都会上网搜一下，或者查查文档，效率很低。于是想自己总结一下，把基本的东西弄好，以及平常自己觉得比较方便的写法整理上来，方便自己以后来用（很多当时写出来的东西都记不得了）


## 参考资料

- [The TikZ and PGF Packages Manual](http://pgf.sourceforge.net/pgf_CVS.pdf)
- [Manual for Package PgfplotsTable](http://pgfplots.sourceforge.net/pgfplotstable.pdf)
- [Wikibooks/LaTeX/PGF/TikZ](https://en.wikibooks.org/wiki/LaTeX/PGF/TikZ)
- [Wikipedia/PGF/TikZ](https://en.wikipedia.org/wiki/PGF/TikZ)
