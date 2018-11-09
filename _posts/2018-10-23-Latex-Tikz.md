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

实际上，我们通过上面线条的命令已经能够画出很多图了（如果你不嫌辛苦的话）。现在介绍Ti*k*Z提供的一个机制：node，在一个点上画出某些形状，使得我们能够更加方便地对一个整体地对象进行修改，并且能够在后面继续使用。

```latex
\begin{tikzpicture}
\node at ( 0,2) [shape=circle,draw] {1};
\node at ( 0,1) [shape=circle,draw] {2};
\node at ( 0,0) [shape=circle,draw] {3};
\node at ( 1,1) [shape=rectangle,draw] {4};
\node at (-1,1) [shape=rectangle,draw] {5};
\end{tikzpicture}
```
![node1](/img/node1.jpg)

`node`命令声明了一个节点，这里要注意的是最后的`{1}` `{2}`才是node的本体（即每个node后面必须要有`{<some words>}`），`[...]`中的内容则是描述了这个节点的属性，例如一个圈（circle），并画（draw）出来。

上面的代码也可以改写成以下的形式：

```latex
\begin{tikzpicture}
\path ( 0,2) node [shape=circle,draw] {1}
      ( 0,1) node [shape=circle,draw] {2}
      ( 0,0) node [shape=circle,draw] {3}
      ( 1,1) node [shape=rectangle,draw] {4}
      (-1,1) node [shape=rectangle,draw] {5};

\draw node at ( 0,2) [shape=circle,draw] {1}
      node at ( 0,1) [shape=circle,draw] {2}
      node at ( 0,0) [shape=circle,draw] {3}
      node at ( 1,1) [shape=rectangle,draw] {4}
      node at (-1,1) [shape=rectangle,draw] {5};
\end{tikzpicture}
```

现在我们可以尝试加上一些修饰。

- 颜色

    ```latex
    \tikz \path 
        (0, 0) node [shape=circle, draw=blue!50, fill=blue!20] {}
        (1, 0) node [shape=rectangle, draw=red!50, fill=red!20] {};
    ```
    ![node2](/img/node2.jpg)
        `blue!50`表示颜色，后面的`!50`表示该颜色的饱和度，`draw`表示画出来的边缘，`fill`表示里面的填充。许多内置的颜色，比如：red、blue、yellow、green等，也可以自己根据rgb写
    ```
    \definecolor{orange}{rgb}{1,0.5,0}
    ```

有些时候，可能很多节点都是要画成一个样子，那么我们可以事先**定义样式**

```latex
\begin{tikzpicture}
    [place/.style={circle,draw=blue!50,fill=blue!20,thick},
    transition/.style={rectangle,draw=black!50,fill=black!20,thick}]
    \node at ( 0,2) [place] {};
    \node at ( 0,1) [place] {};
    \node at ( 0,0) [place] {};
    \node at ( 1,1) [transition] {};
    \node at (-1,1) [transition] {};
\end{tikzpicture}
```
![node3](/img/node3.jpg)

- 大小， 可以使用 `inner sep=2mm`、`minimum size=4mm`这样的属性来调整节点的大小，后面的`mm`是单位，可以是`mm`、`cm`、`pt`. 这里要注意`minimum size`声明了一个最小的值，如果节点内文字过多，它会自行调整到更大的大小。

- 命名节点

    有两种方法，一种是在`[..]`加入`name=`这一个选项来声明，另一种是直接在`node`后面用括号：

    ```latex
    % ... 使用了上面的样式
    \begin{tikzpicture}
        \node (waiting 1) at ( 0,2) [place] {};
        \node (critical 1) at ( 0,1) [place] {};
        \node (semaphore) at ( 0,0) [place] {};
        \node (leave critical) at ( 1,1) [transition] {};
        \node (enter critical) at (-1,1) [transition] {};
    \end{tikzpicture}
    ```
    另外，我们也能写成如下形式：

    ```latex
    \begin{tikzpicture}
        \node[place] (waiting 1) at ( 0,2) {};
        \node[place] (critical 1) at ( 0,1) {};
        \node[place] (semaphore) at ( 0,0) {};
        \node[transition] (leave critical) at ( 1,1) {};
        \node[transition] (enter critical) at (-1,1) {};
    \end{tikzpicture}
    ```
    有了节点的名字，我们就能在后续的命令中使用到该节点，之前的一副图我们现在可以这么画了：

    ```latex
    % 在导言区加入 \usetikzlibrary{positioning}
    \begin{tikzpicture}
        [place/.style={circle,draw=blue!50,fill=blue!20,thick,inner sep=0pt,minimum size=6mm},
        transition/.style={rectangle,draw=black!50,fill=black!20,thick,inner sep=0pt,minimum size=4mm}]
        \node[place] (waiting) {};
        \node[place] (critical) [below=of waiting] {};
        \node[place] (semaphore) [below=of critical] {};
        \node[transition] (leave critical) [right=of critical] {};
        \node[transition] (enter critical) [left=of critical] {};
    \end{tikzpicture}
    ```
    ![node4](/img/node4.jpg)
    
- 标记

    1. 第一种方法是，直接画一个只有文字的节点
    2. 第二种方法是，在`[...]`里用`label=`选项

    ```
    \begin{tikzpicture}
        \node[place] (waiting) {};
        \node[place] (critical) [below=of waiting] {};
        \node[place] (semaphore) [below=of critical] {};
        \node[transition] (leave critical) [right=of critical] {};
        
        %第一种
        \node [red,above] at (semaphore.north) {$s\le 3$};

        %第二种
        \node[transition] (enter critical) [left=of critical, label=above:$s\le 3$] {};
    \end{tikzpicture}
    ```
    ![node5](/img/node5.jpg)




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
