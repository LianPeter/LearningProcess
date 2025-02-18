# Fly Bird

## 简介

在《Fly Bird》中，愤怒的小鸟的家被臭猪头偷走了！小鸟正在奋力飞越一堆绿色的水管，追逐臭猪头，努力夺回它的家园。快来体验这场刺激的飞行冒险吧！



## 使用说明

```
1. 项目环境为jdk11
2. 使用maven
3. pom.xml中导入jlayer依赖（详见源代码中的pom.xml文件）
```





## 玩法

通过点击空格键操控小鸟的上下移动，灵活躲避水管，争取获得更高的分数。每一次成功的飞越都会让你离胜利更近一步！

## 功能

- **记分系统**：游戏内置记分功能，记录每次游戏的最高分数，让你与朋友们展开竞争。
- **简单易上手**：简单的操作方式，适合所有年龄段的玩家，带来无尽的乐趣。
- **家庭娱乐**：是一款适合全家人一起玩的超级好游戏，享受欢乐时光！

快来挑战自己，看看你能飞多远，拿到多少分吧！

## 运行示例

![demo](..\FlyBird\demo.gif)

> [!WARNING]
>
> 对Java程序打包成`.exe`文件，安装应用程序之后报错，无法进行游戏，时间在即，还不能正确找到解决方法。
>
> > 请用idea打开FlyBird文件夹，运行里面的App启动程序
>
> 报错如下：![err](..\FlyBird\err.png)
> java.lang.ExceptionInInitializerError
> 	at xcsddd_FlyBird.app.Game.initGame(Game.java:107)
> 	at xcsddd_FlyBird.app.Game.<init>(Game.java:37)
> 	at xcsddd_FlyBird.app.App.main(App.java:14)
> 	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
> 	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
> 	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
> 	at java.base/java.lang.reflect.Method.invoke(Method.java:566)
> 	at com.exe4j.runtime.LauncherEngine.launch(LauncherEngine.java:85)
> 	at com.exe4j.runtime.WinLauncher.main(WinLauncher.java:94)
> Caused by: java.lang.NullPointerException
> 	at xcsddd_FlyBird.component.GameBackground.<clinit>(GameBackground.java:26)
> 	... 9 more



> [!IMPORTANT]
>
> > 如有jdk的环境，可在 “安装了jdk环境”文件夹中运行.exe文件   (《打包成.exe文件》文件夹中也有一个)



## 项目结构

|— .idea

|—META-INF

|—out

|—resources		(资源文件夹，图片、音频等)

​	—img

​	—mp3

​	—wav

|—src

​	—main

​		—java

​			—xcsddd_FlyBird

​				—app			  （启动层，内含启动类）

​				—component		(实现代码基本逻辑)

​				—util				(工具层，播放音频)

|—target
