# ComputedCss.js
读取 ```:root``` 里的某些颜色值：
+ ```export putComputed```: 新建一个 ```<style></style>``` 并把颜色值写在里面  
+ ```export getComputed```: 返回 ```{ red: xxx; green: xxx; blue: xxx; alpha: xxx; prop: xxx }```

如果需要在原色基础上调整颜色，可以把颜色写在次级根元素上，如 ```<body></body>```
