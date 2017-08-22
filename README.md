## D3 我的选择我做主 test01.html
     #选择单个元素 : d3.select(d3选择器) 
        d3选择器 #foo,button,.foo,[type=text],li a,li#foo,
                li.goo,li:first-child,li:nth-child(1)
     #选择多个元素 : d3.selectAll(d3选择器)
     #选集迭代： .each()
    	  例：d3.selectAll("div").attr("class","red box").each(function(d,i) {
    	        d3.select(this).append("h1").text(i)
    	    });
     #子元素选择：
        例：d3.select("#section1>div").attr("class","blue box");
            d3.select("#section2").style(...).select("div").attr("class","red box"); 方便分层处理   
     #修饰函数
          d3.select().style() 绑定样式（可以动态绑定）
            这种通过匿名函数动态设置属性、样式值的方法常用来绑定数据。
        	例：d3.selectAll("p").style("color", function(d, i) {
        		    //d 在p元素上绑定的数据 i 下标
    				return i % 2 ? "#fff" : "#eee";
    			});
          d3.select().data()  绑定数据 
            例：d3.selectAll("p")
    			.data([4, 8, 15, 16, 23, 42])
    		    .style("font-size", function(d) { return d + "px"; });
        	d3.select().enter() 如果数据比元素多要enter
        	d3.select().exit() 如果数据比元素少要exit
        	    数据绑定的时候可能出现      
        			.selectAll("p")
        			.data([4, 8, 15, 16, 23, 42])
        			.text(function(d) { return d; });	    
        	    例2（数据>元素）：
        	        p.enter().append("p")
        			.text(function(d) { return "I’m number " + d + "!"; })//在标签内添加内容;
        		
        		例2（数据<元素）：
        		    p.exit().remove()
            d3.select().attr()    读取或改变属性
            d3.select().classed() 添加删除class 可接受函数式 
            d3.select().text()    获取和设置文本内容
            d3.select().html()    改变HTML
            d3.select().append()  添加元素
            d3.select().each(function(d,i){}) 选集迭代 d 数据绑定 i 下标索引  this指向当前的dom元素
## D3 与数据同行   
    	d3.select().data(data) 处理可视化了的数据 (更新)
    	d3.select().data(data).enter() 处理未被可视化的数据 (进入)
    	d3.select().exit() 处理没有任何数据的图形 (退出)
    #数组处理 test02.html
    	d3.min()     最小值
    	d3.max()     最大值
    	d3.extend()  同时返回最大最小值
    	d3.sum()     求和
    	d3.median()  中间值
    	d3.mean()    平均值
    	d3.ascending()/d3.descending()       排序
    	    例：array.sort(d3.ascending)      从小到大
    	       array.sort(d3.descending())   从大到小
    	d3.quantile()  排序数组的分位数 ？
    	d3.bisect()    排序数组的插入点，这个插入点的左边小于等于指定元素，右边大于指定元素
    	   例：d3.bisect(array.sort(d3.ascending), 6)
    	d3.nest() 将一堆一维数据转化为树状结构  .key() .entries()
    	    例：test02.html
    			var nest = d3.nest()
                .key(function (d) { // <- A
                    return d.type;
                })
                .key(function (d) { // <- B
                    return d.tip;
                })
                .entries(records);
     #数据过滤  test02.html
        d3.select().data(data).filter(function(d,i){
    		return d.name<d.value
        }) 
         返回一个bool类型的值
     #数据排序  test03.html
        d3.select().data(data).sort(function(a,b){
    		return a.name<b.name?-1:1;
        })
         sort函数的参数是比较函数
     #从服务端获取数据  test04.html
        例: d3.json("data.json", function(error, data) {
                if(error===null){
                    data=data.concat(data);
                    render(data);
                }
            }) 
          json函数可以访问服务端数据   
## D3 张弛有‘度’ 
    #数值尺度（线性尺度、幂级尺度、对数尺度）test05.html
      [线性尺度] 
       * d3.v3 写法  d3.scale.linear() d3.v4 写法 d3.scaleLinear()
       * domain 定义域  range 值域 
      [幂级尺度]
       * d3.v3 写法  d3.scale.pow() d3.v4 写法 d3.scalePow()
       *  exponent(2) 指数 rangeRound([]) 设置值域并舍入取整  
      [对数尺度]
       * d3.v3 写法  d3.scale.log() d3.v4 写法 d3.scaleLog()
       * 默认以10为底   
    #时间尺度  text06.html 
      * d3.v3 写法  d3.scale.time() d3.v4 写法 d3.scaleTime()

     ******************
      [时间过滤]
      <条件>
      %a:星期的缩写  %A 星期的全称  %b 月的缩写  %B 月的全称
      %d:本月中的天数 不足两位以0补全 [01,31]
      %e:本月中的天数 不足两位以空格补全 [ 1,31]
      %H:小时 24小时制 [00,23]
      %I:小时 12小时制 [01,12]
      %j:在本年中的天数 [001,366]
      %m:月份[01,12]
      %M:分钟[00,59]
      %L:毫秒[000,999]
      %p:AM或PM     %S:秒[00,60]
      %x:日期部分 等同于“%m/%d/%Y”
      %x:时间部分 等同于“%H/%M/%S”
      %y:不包含纪元的年份
      %Y:包含纪元的4位数年份
         1.时间字符串
         例：var formatTime = d3.timeFormat("%B %d, %Y");
             formatTime(new Date); // "June 30, 2015"
         2.Date类型
         例：var parseTime = d3.timeParse("%B %d, %Y");
             parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
         3.多种转化
         例：var formatMillisecond = d3.timeFormat(".%L"),
          formatSecond = d3.timeFormat(":%S"),
          formatMinute = d3.timeFormat("%I:%M"),
          formatHour = d3.timeFormat("%I %p"),
          formatDay = d3.timeFormat("%a %d"),
          formatWeek = d3.timeFormat("%b %d"),
          formatMonth = d3.timeFormat("%B"),
          formatYear = d3.timeFormat("%Y");
          function multiFormat(date) {
            return (d3.timeSecond(date) < date ? formatMillisecond
                : d3.timeMinute(date) < date ? formatSecond
                : d3.timeHour(date) < date ? formatMinute
                : d3.timeDay(date) < date ? formatHour
                : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                : d3.timeYear(date) < date ? formatMonth
                : formatYear)(date);
          }
    ***********
    #有序尺度  test07.html
      *d3.v3 写法  d3.scale.ordinal() d3.v4 写法 d3.scaleOrdinal()
      [d3内置的有序颜色尺度---颜色序数比例尺]
          d3.scaleOrdinal(d3.schemeCategory10)
          d3.scaleOrdinal(d3.schemeCategory20)
          d3.scaleOrdinal(d3.schemeCategory20b)
          d3.scaleOrdinal(d3.schemeCategory20c)
      [d3创建自定义有序颜色尺度]
          d3.scaleOrdinal().range(["#002233","#545454","#9038af"])
       #字符串插值 test08.html
       #颜色插值 test09.html
       #复合对象插值 test10.html
       #自定义插值器 test11.html 有问题
          例：var interpolate= d3.interpolateNumber(0,100);
              interpolate(0.1);//10
              interpolate(0.99);//99 
          例：创建插值器
              d3.interpolateAlphabet=function(a,b) {
                 var re=/^([a-z])$/,ma,mb;
                 if((ma=re.exec(a)) && (mb=re.exec(b))){
                    a=parseFloat(a.toString().charCodeAt(0));
                    var delta=a-parseFloat(b.toString().charCodeAt(0));
                    return function(t) {
                       return String.fromCharCode(Math.ceil(a-delta*t));
                    };
                 }
              };
              使用插值器 
              var alphabetScale=d3.scaleLinear()
                .domain([0,27]).range(["a","z"])
                .interpolate(d3.interpolateAlphabet); 
## D3 玩转坐标轴
    #坐标轴创建  test12.html test13.html 
      1.创建svg元素，并添加宽高以及样式
        例： svg=d3.select("body").append('svg')
      2.渲染坐标轴
        d3.v3-----d3.svg.axis().orient();
        d3.v4-----d3.axisTop(scale), d3.axisRight(scale), d3.axisBottom(scale), d3.axisLeft(scale)
      3.相关设置
        .scale() 尺度设置 若没有设置则使用默认
        .call(axis) 在所选元素内调用axis代表的方法并创建坐标轴
        .ticks([number]) 刻度数的设置  
           例:生成一个20个刻度并且刻度使用SI-前缀的刻度
              axis.ticks(20, "s");
              当使用时间比例尺时每隔15分钟一个刻度
              axis.ticks(d3.timeMinute.every(15));
        .ticks(10)==.tickArguments([10])
        .tickValues([]) 设置这个默认的刻度标签无效
        .tickFormat()  设置可度应如何显示
        .tickPadding() 刻度和刻度值之间的间距
        .tickSize()  设置内侧和外侧刻度大小
        .tickSizeInner([size])  设置内侧刻度大小
        .tickSizeOuter([size])  设置外侧刻度大小
    #坐标轴--网格绘制以及动态改变坐标轴scale  test14.html test15.html 
## D3 优雅变换
    例：d3.selectAll("circle").transition()
    .duration(750)//历时
    .delay(function(d, i) { return i * 10; })//延迟
    .attr("r", function(d) { return Math.sqrt(d * scale); })//给元素添加属性;



