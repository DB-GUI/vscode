# PPz.lib
很长时间里，我都沮丧于 PPz.vscode 必须依托于 vscode  
虽然也是借助 vscode，这么一款简陋的小项目，才能尽快完成，并且收获了不少用户  
但是“脱离 vscode 就用不了”这一点，实在是，，，

所以，很早之前就想做一款脱离 vscode 的同款产品  
一开始，我考虑了知名度较高的 [Tauri](https://tauri.app/)  
为此我花了一两个月时间学 Rust，但，或许我个人能力不足，驾驭不了 Rust，选择了放弃  
后来又考虑 [Wails](https://wails.io/)，这是一款定位跟 Tauri 极像的产品  
最大的区别是 Wails 是 Go 语言写的，而 Go 要比 Rust 简单很多  
但最后还是放弃了，业余时间实在是太少，更何况，我还经常沉迷于 lol 之类的游戏  

又菜又懒又爱玩，导致想做的产品终于未孕先流产了  

但这次升级 PPz.vscode 还是点燃了我的一点斗志，起码把一些“能通用的东西”解耦  
这样起码更方便做个 [Electron](https://www.electronjs.org/) 版本的，那个当初我看不上，现在看不上，将来也一定看不上的老东西  
可以肯定的说，Electron 是老迈昏花、一步三颤的实力派，而我眼高手低  

UI 部分，不论是 vscode，还是 Tauri、Wails、Electron 甚至是浏览器，都可以通用，这是首先要解耦的  
其次，Tauri 和 Wails 最大的难题——数据库的存取，vscode 和 Electron 却可以一拍即合  
所以：
+ [UI: User Interface](./ui/)
+ [DBIO: Database Input/Output](./dbio/)
