---
layout:     post
title:      在LaTeX里用TikZ和PGF画图
date:       2018-10-23
author:     wfang
header-img: img/foreach_example.png
catalog:    ture
tags:
    -study
    -latex

---

## 前言

写这篇是因为刚接触使用LaTeX画图的时候，想画寄存器图，然而苦于不知道可视化的工具，选择了用TiKz来画。

当时不太会写，自己手动把每个节点的坐标写好，然后一个一个的打上去，费时费力，然后效果也一般。

从此就比较喜欢用TiKz画图了。

但是很多命令不太记得，每次要作图的时候都会上网搜一下，或者查查文档，效率很低。于是想自己总结一下，把基本的东西弄好，以及平常自己觉得比较方便的写法整理上来，方便自己以后来用（很多当时写出来的东西都记不得了）

主要参考的是[The TikZ and PGF Packages Manual](http://pgf.sourceforge.net/pgf_CVS.pdf)和[Manual for Package PgfplotsTable](http://pgfplots.sourceforge.net/pgfplotstable.pdf)