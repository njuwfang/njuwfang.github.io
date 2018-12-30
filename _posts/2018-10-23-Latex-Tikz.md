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

在LaTeX中使用Ti*k*Z，首先在导言区需要载入Ti*k*Z包：

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

## 由例子出发

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

我们看 `\draw` 后面的部分，它是对我们想画的东西的一个描述。每个都作为一个完整的描述，我们可以只使用一个 `\draw` 命令。

```latex
\tikz \draw
    (-2, 0) -- (2, 0)
    (0, -2) -- (0, 2)
    (0, 0) circle (1)
    (-2, 0) .. controls (-1.5, 2) and (1.5, -2) .. (2, 0);
```
![multi_line](/img/multi_line.png)

还有许多预设的path, 如：`grid`, `rectangle`, `ellipse`. 当然，相应的参数设置不一样。

其实，有了上面的线条命令，我们已经可以画出任意图形了（此处狗头）。不过那样画复杂的图形太麻烦了，而且复用性也差。接下来的例子里则包括了很多我们理科生会经常碰到的图形。

### 树和节点

一个简单的节点(node)

```latex
\tikz \draw (0, 0) node[circle, draw] {};
```

![circle1](/img/circle1.jpg)
上面描述的是，在$(0,0)$这个位置上画了一个圆。有一点要注意，node后面一定要有 `{}` ，里面可以填上文字，也就是在一个位置上放上一些符号，然后在周围画一些预定义的形状。另外，虽然前面已经有了`\draw`命令，但是在`[]`里还需要加上`draw`这个选项，这个选项是表明circle这个形状要画出来。

我们也可以直接用`\node`

```latex
\begin{tikzpicture}
    \node at (0, 0) [circle, draw=blue!50, fill=blue!20, text=blue!70] {1};
    \node at (1, 0) [rectangle, draw=red!50, fill=red!20, text=red!70] {2};
\end{tikzpicture}
```

![node1](/img/node1.jpg)

往往我们会需要画很多类似的节点，那么可以预定义一些属性（定义一些宏）

```latex
\begin{tikzpicture} [
    place/.style={circle, draw=blue!50, fill=blue!20, thick, minimum size=6mm},
    transition/.style={rectangle, draw=black!75, fill=black!20, thick, minimum size=6mm},
    red place/.style={place, draw=red!50, fill=red!20}
]
    \node[place] at (0,0) {};
    \node at (1,0) [transition] {};
    \node[red place] at (2,0) {};
\end{tikzpicture}
```

![node2](/img/node2.jpg)

就是把原来写在`[<option>]`里的东西，写成宏，然后写法也比较随意，不过最好自己统一成一个样子。那些选项的含义就是英文的意思。

一般来说，你想画成什么样子的，可以用相应的单词在文档里搜索一下。

#### 命名节点

就像一般的编程语言一样，我们可以先给这些节点命名，然后能在后面引用。

```latex
\begin{tikzpicture}
    \node (home) at (0, 0) [circle] {};%home就是这个节点的名字
\end{tikzpicture}
```

#### 节点上加标签

本身我们可以在`{}`中加入我们想要放置的标签，以此来标注节点。另外，也可以在属性里面用一些参数来标识更多的信息。

```latex
\begin{tikzpicture}
    \node (home) at (0,0) [draw=red!60, fill=red!20, circle,
        text=red!70,
        label={[blue!60]above:blue},
        label={[teal]135:teal},
        label={[name=label node, olive]-90:olive}] {red};
    \draw[teal] (label node) .. controls +(1,-1) .. +(1,1);
\end{tikzpicture}
```

![node4](/img/node4.jpg)

主要是`label`这个选项的用法，上面我们还给一个label命名了，并用它画了一条线。注意到这里的`+(1,-1)`表示最开始`(label node)`这个位置的偏移。

#### 节点之间的操作

```latex
%在导言区加上\usetikzlibrary{positioning}
\begin{tikzpicture}
    \node (home) [rectangle, draw=blue!50, fill=blue!20] {};
    \node (school) [circle, right=of home, draw=red!50, fill=red!20] {};
    \draw[->, bend right] (home) edge (school);
    \draw[<-] (home) -- (school);
\end{tikzpicture}
```

![node3](/img/node3.jpg)

这里用到了`positioning`库，用来描述节点间的位置关系。`edge`比之前的路径有更丰富的选项，同样我们也能把后面两个连接的箭头放在节点的描述里面。上面的图也能按如下画出：

```latex
\begin{tikzpicture}
    \node (home) [rectangle, draw=blue!50, fill=blue!20] {};
    \node (school) [circle, right=of home, draw=red!50, fill=red!20] {}
        edge[<-, bend left] (home)
        edge[->] (home);
\end{tikzpictrue}
```

#### 复杂的例子

有了上面说的用法，我们就能画一些复杂的节点图了。

> 这个图例改自参考资料\[1\]

```latex
%在导言区加上\usetikzlibrary{positioning,arrows}
\begin{tikzpicture} [
    node distance = 1.3cm, on grid, > = stealth, bend angle = 45, auto,
    place/.style = {circle, draw = blue!50, fill = blue!20, thick, minimum size = 6mm},
    transition/.style = {rectangle, draw = black!75, fill = black!20, thick, minimum size = 5mm},
    red place/.style = {place, draw = red!75, fill = red!20},
    dot/.style = {circle, inner sep = 1.5pt, fill = black},
    pre/.style = {<-, shorten < = 1pt, semithick},
    post/.style = {->, shorten < = 1pt, semithick}
]
    \node (w1) [place] {}
        node at (w1) [dot] {};
    \node (c1) [place, right = of w1] {};
    \node (s1) [red place, right = of c1, yshift = -5mm] {};
    \node (s2) [red place, right = of c1, yshift = 5mm] {}
        node at (s2) [dot, xshift = 1.3mm] {}
        node at (s2) [dot, yshift = -1.13mm, xshift = -.65mm] {}
        node at (s2) [dot, yshift = 1.13mm, xshift = -.65mm] {};
    \node (c2) [place, right = of s1, yshift = 5mm] {};
    \node (w2) [place, right = of c2] {}
        node at (w2) [dot] {};

    \node (e1) [transition, below = of c1] {}
        edge [pre, bend left] (w1)
        edge [post] (c1)
        edge [post] (s1)
        edge [pre] (s2);
    \node (e2) [transition, below = of c2] {}
        edge [post] (s1)
        edge [post] (c2)
        edge [pre, bend right] (w2)
        edge [pre] (s2);
    \node (l1) [transition, above = of c1] {}
        edge [post, bend right] node[swap] {2} (w1)
        edge [pre] (c1)
        edge [pre] (s1)
        edge [post] (s2);
    \node (l2) [transition, above = of c2] {}
        edge [post, bend left] node {2} (w2)
        edge [pre] (c2)
        edge [pre] (s1)
        edge [post] (s2);
\end{tikzpicture}
```

![nodecomplex](/img/nodecomplex.jpg)

#### 树

节点可以定义它的子节点，这样我们便能很方便的画树。

```latex
%在导言区导入\usetikzlibrary{positioning,shapes}
\begin{tikzpicture}[every node/.style={draw, thick, circle, minimum size=.5cm, inner sep=0pt},
    every child/.style={very thick},sibling distance=1cm]
    \node[label={[blue]above:{\LARGE$B_5$}}] (0) {0}
        child[missing] foreach \x in {1,2,3,4}
        child {node {8}}
        child {node {9}
            child {node {10}}
            }
        child {node {7}
            child[missing]
            child {node {11}}
            child {node {12}
                child {node {14}}
                }
            }
        child[sibling distance=1.4cm] {node {5}
            child[missing]
            child[missing]
            child {node {11}}
            child {node {12}
                child {node {14}}}
            child {node {13}
                child[missing]
                child {node {15}}
                child {node {16}
                    child {node {17}}
                    }
                }
            }
        child[sibling distance=2.2cm] {coordinate (6)
            node[regular polygon, regular polygon sides=3,
                minimum size=1.8cm, inner sep=0pt, below=-2mm of 6,
                fill=green!20, label={[blue]center:\LARGE$B_4$}] {}
            node[fill=white] {6}
            };
\end{tikzpicture}
```

![tree](/img/tree.jpg)

> 这个图是算法课上卜老师讲二项式堆所用的一个图。

里面最主要用到的就是`child`命令，和之前在一个节点后面加`node`,`edge`有着相同的用法。

```latex
\tikz \node {root}
    child {node {left}}
    child {node {right}
        child {node {child}}
        child {node {child}}
    };
```

![tree1](/img/tree1.jpg)

里面涉及到的各项参数，读者可以自己翻一下词典😂，我不太想写了。还有一点`\foreach`循环的用法，接下来马上说！

### 循环命令

这个命令真的超级好用了，想想自己以前很多时候一个东西敲了十多遍（真是太蠢了😵）

```latex
\begin{tikzpicture}
    \foreach \x in {0,1,...,10} {
        \node[draw, circle, inner sep=0pt, minimum size=\x mm] {};
    }
\end{tikzpicture}
```

![foreach1](/img/foreach1.jpg)

`{0,1,...,10}`大括号里的参数可以是任意的用逗号隔开的字符，一般而言不能打省略号。但对于数字而言，可以使用省略号，Ti*k*Z会计算前两个数字的差，然后依次迭代下去。

我们也可以在一个`\foreach`下使用多个迭代变量，这里用`/`隔开

```latex
\begin{tikzpicture}
    \foreach \a/\x/\y in {1/red/RED, 2/blue/BLUE, 3/orange/ORANGE, 4/teal/TEAL, 5/magenta/MAGENTA} {
        \node[circle, minimum size=2*\a mm, draw=\x!90, fill=\x!30, text=\x!70] at (2*\a, 0) {\y};
    }
\end{tikzpicture}
```

![foreach2](/img/foreach2.jpg)

#### 更新变量

命名是可以更新的。

```latex
\begin{tikzpicture}
    [opacity = 0.5]

    \path[draw,coordinate] (0,0) coordinate (A)
        ++(90:5cm) coordinate (B)
        ++(0:5cm) coordinate (C)
        ++(-90:5cm) coordinate (D);
    \foreach \x in {1,...,40} {
        \fill [red!50] (A) -- (B) -- (C) -- (D) -- cycle;
        \coordinate (X) at (A);
        \path[draw,coordinate]
            (A) -- (B) coordinate[pos=.10] (A)
                -- (C) coordinate[pos=.10] (B)
                -- (D) coordinate[pos=.10] (C)
                -- (X) coordinate[pos=.10] (D);
    }
\end{tikzpicture}
```

这个就是标题的图

![foreach](/img/foreach3.jpg)



## 后话

写这篇是因为刚接触使用$\LaTeX$画图的时候，想画寄存器图，然而苦于不知道可视化的工具，选择了用Ti*k*Z来画。

当时不太会写，自己手动把每个节点的坐标写好，然后一个一个的打上去，费时费力，然后效果也一般。

之后就入了这个坑，什么都用它画 😓

但是很多命令不太记得，每次要作图的时候都会上网搜一下，或者查查文档，效率很低。于是想自己总结一下，把基本的东西写好，以及平常自己觉得比较方便的写法整理上来，方便自己以后来用（很多当时写出来的东西都记不得了）


## 参考资料

- [\[1\] The TikZ and PGF Packages Manual](http://pgf.sourceforge.net/pgf_CVS.pdf)
- [\[2\] Manual for Package PgfplotsTable](http://pgfplots.sourceforge.net/pgfplotstable.pdf)
- [\[3\] Wikibooks/LaTeX/PGF/TikZ](https://en.wikibooks.org/wiki/LaTeX/PGF/TikZ)
- [\[4\] Wikipedia/PGF/TikZ](https://en.wikipedia.org/wiki/PGF/TikZ)
