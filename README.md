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
    #自定义插值器 test11.html 问题已解决
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
    #量化尺度   d3.scaleQuantize() 
      例：var color = d3.scaleQuantize()
              .domain([0, 1])
              .range(["brown", "steelblue"]);
          color(0.49); // "brown"
          color(0.51); // "steelblue"
      将定义域切割为与值域长度相等的几部分映射到值域 
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

    ☞单元素动画  animate01.html
      d3.selection.transition() 定义过渡 
      d3.selection.duration([time(毫秒)]) 定义过渡时间
      注：transition之前的所有值为起始值  duration等过渡设置后的值为结束值

    ☞多元素动画（数据驱动） animate02.html

    ☞使用缓动函数   animate03.html
      使用方法:
        var e=d3.easeLinear;
        d3.selections.transition().ease(e).duration(1500)
        in--默认  out--反向 in-out 镜像 out-in 反向镜像
      1.线性缓动 
        d3.easeLinear
      2.多项式过渡
        d3.easePolyIn  exponent 1--easeLinear 3--easeQuadIn 3--easeCubicIn
        d3.easePolyOut exponent 1--easeLinear 3--easeQuadOut 3--easeCubicOut
        d3.easePoly       1--easeLinear 2--easeQuad 3--easeCubic
        d3.easePolyInOut  1--easeLinear 2--easeQuad 3--easeCubic
         注：可以指定 指数 .exponent()  
      3.二次过渡  
        d3.easeQuadIn    d3.easeQuad
        d3.easeQuadOut   d3.easeQuadInOut
      4.三次过渡
        d3.easeCubicIn   d3.easeCubic
        d3.easeCubicOut  d3.easeCubicInOut
      5.正弦过渡
        d3.easeSinIn     d3.easeSin
        d3.easeSinOut    d3.easeSinInOut 
      6.指数过渡
        d3.easeExpIn     d3.easeExp
        d3.easeExpOut    d3.easeExpInOut
      7.圆形过渡
        d3.easeCircleIn  d3.easeCircle
        d3.easeCircleOut d3.easeCircleInOut
      8.弹性过渡
        d3.easeElasticIn
        d3.easeElasticOut
        d3.easeElastic
        d3.easeElasticInOut
         注：可以指定amplitude 和 period参数默认为1 和 0.3
      9.回滚过渡
        d3.easeBackIn    d3.easeBack
        d3.easeBackOut   d3.easeBackInOut
         注：指定overshoot参数
      10.弹跳过渡
        d3.easeBounceIn  d3.easeBounce
        d3.easeBounceOut d3.easeBounceInOut 

    ☞中间帧计算  animate04.html  补间函数
      transition.attrTween()
      transition.styleTween() 
      transition.tween()
      例：.tween("attr.value",function() {
            var node=this,i = d3.interpolateAbc(node.getAttribute("value"), "z");
            return function(t) {
              node.setAttribute("value", i(t));
            };
          })

    ☞级联过渡    animate05.html
      d3.selections.transition().duration(1500).---.transition().duration(1500)

    ☞选择性过渡    animate06.html
        .transition() // <- A
        .duration(duration)
            .style("left", "10px")
            .filter(function(d){return d == "Cat";}) // <- B
                .transition() // <- C
                .duration(duration)
                    .style("left", "500px");   
          解释：通过.filter() 将d是'cat'的div拿出来再次过渡 

    ☞监听过渡    animate07.html 
      例：.on("start", function(){ 
            d3.select(this).text(function (d, i) {
                return "动画中";
            });
        })
        .on("end", function(){ // <-E
            d3.select(this).text(function (d, i) {
                return "已停止";
            });
        })
      注：.on() 用来监听过渡  
            start - 过渡开始时.
            end - 过渡结束后.
            interrupt - 过渡被中断. 
          .each() 为过渡中的每个元素调用指定的函数
          .call() 调用一次指定的函数 
    ☞自定义插值器过渡 
       例：
        --自定义插值器
          d3.interpolateAbc=function(a, b) { // <-A
              console.log(a,b);
            var re = /^([a-z])$/, ma, mb;
            if ((ma = re.exec(a)) && (mb = re.exec(b))) {
              a = a.charCodeAt(0);
              var delta = a - b.charCodeAt(0);
              return function(t) {
                return String.fromCharCode(Math.ceil(a - delta * t));
              };
            }
          };
        --使用自定义插值器
          .tween("attr.value",function() {
            var node=this,i = d3.interpolateAbc(node.getAttribute("value"), "z");
            return function(t) {
              node.setAttribute("value", i(t));
            };
          })
        注：要使用自定义插值器  则使用 transition.attrTween, transition.styleTween 或者 transition.tween. (补间函数)
    ☞使用定时器 animate09.html 
       time=d3.timer(callback, delay（可选）, time（起始时间,可选）) 
       注：从time之后开始计时 delay之后执行 callback
         --time.restart(callback, delay, time) 重启定时器-相当于重建
         --time.stop() 终止当前定时器
         --d3.timerFlush()  立即调用合法的定时器，可以使用这个方法来立即执行定时器避免闪烁问题。
         --d3.timeout(callback, delay, time)  只调用一次回调, 之后自动stops
         --d3.interval(callback, delay, time) 可以设置时间间隔，功能与setInterval类似
       例：var t = d3.timer(function(elapsed) {
            console.log(elapsed);
            if (elapsed > 200) t.stop();
          }, 150);

## D3 优美图形
    #简单图形 svg基础 shape01.html
      line-直线元素：属性参数 (x1,y1)起点坐标 (x2,y2) 终点坐标
      circle-圆：属性参数 (cx,cy) 圆心坐标 r 半径
      rect-矩形元素：属性参数  (x,y) 左上角坐标 width height 宽高 rx ry 圆角
      polygon-多边形：属性参数  points 坐标列表（顶点）
    #svg路径语法
      ◆ 移动到某一点 M(绝对坐标) m(相对坐标) 
         例：M(10,10) 移动到10,10位置 m(10,10) 移动到x+10,y+10位置
      ◆ 闭合路径 Z(绝对坐标) z(相对坐标) 
      ◆ 连线到某一点 L(绝对坐标) l(相对坐标) 连线
                    H(绝对坐标) h(相对坐标) 水平连线
                    V(绝对坐标) v(相对坐标) 垂直连线
      ◆ 三次贝塞尔曲线 C(绝对坐标) c(相对坐标) 参数(x1 y1 x2 y2 x y) 绘制三次贝塞尔曲线
                            --x1 y1 起始点控制点  x2 y2 终结点控制点 x y  终结点      
                      S(绝对坐标) s(相对坐标) 参数(x2 y2 x y) 绘制曲线
                            --起始点控制点根据上一个终结点控制点与当前操作点决定
      ◆ 二次贝塞尔曲线 Q(绝对坐标) q(相对坐标) 参数(x1 y1 x y) 绘制二次贝塞尔曲线
                      T(绝对坐标) t(相对坐标) 参数(x y) 绘制曲线
      ◆ 椭圆曲线 A(绝对坐标) a(相对坐标) 
               参数(rx ry x-axis-rotation large-arc-flag sweep-flag x y)
                  --rx ry x轴半径 y轴半径 x-axis-rotation 以x轴参照旋转角度
                    large-arc-flag sweep-flag 决定使用椭圆曲线的那一部分
    #D3线条生成器  d3.line().x().y()  shape02.html
      例： 定义--var line=d3.line()
        .x(function(d) {return x(d.x);})
        .y(function(d) {return x(d.y);})
          使用--line(绑定的数据)
    #线条插值 shape03.html
      ◆如何进行插值
        d3.line().x().y().curve([curve方法])
      ◆curve方法
        1.d3.curveBasis B样条曲线 起点和终点同时也是控制点
        2.d3.curveBasisOpen B样条开口曲线 起点和终点不控制点
        3.d3.curveBasisClosed B样条封闭曲线 起点和终点 起点和终点同时也是控制点
        4.d3.curveBundle 与B样条曲线相同有额外的张力参数 .beta([0,1]) 参数0-1    
          0为直线，1为标准basic
        5.d3.curveCardinal 基数样条曲线 起终点为控制点 可用 默认张力为0
        6.d3.curveCardinalClosed  封闭基数样条曲线 不与两端控制点相交 与其他控制点相交 
          默认张力为0
        7.d3.curveCardinalOpen 开放基数样条曲线 起终点不可用 默认张力为0
            注：5,6,7可以通过 .tension(0.5) 设置张力 
                张力为1时相当于curveLinear，张力为0时为一个Catmull–Rom曲线
        8.d3.curveCatmullRom  Catmull Rom样条曲线
          d3.curveCatmullRomClosed 闭合Catmull Rom样条曲线
          d3.curveCatmullRomOpen  开放Catmull Rom样条曲线 
            注：可以通过 .alpha() 设置张力 
        9.d3.curveLinear 折线
          d3.curveLinearClosed 闭合折线
        10.d3.curveMonotoneX y轴方向保持单调性
          d3.curveMonotoneY x轴方向保持单调性
        11.d3.curveNatural 自然的三次曲线
        12.d3.curveStep  台阶折线 y值在两个相邻的点x值中间点发生变化
           d3.curveStepAfter 水平和垂直交替
           d3.curveStepBefore  垂直和水平交替
      ◆设置线条张力  如上所说 每个插值方法有自己的张力方法 1,2,3,9,10,11,12没必要设置张力
    #区域生成器 shape04.html
      d3.area().x().y0().y1()
         x--x坐标序列 y0--下边界序列 y1-上边界序列 y0=y1 使用y即可
    #区域插值  shape04.html
      ◆如何进行插值
         d3.area().x().y0().y1().curve([curve方法])
      ◆curve方法 同线条插值   d3.curveBundle失效不可用
    #圆弧生成器 shape05.html
      d3.arc().outerRadius([外圈半径]).innerRadius([内圈半径]);
       .centroid() 计算参数所表示的弧的中间点[x,y]. 
              计算方法为(startAngle + endAngle)/2 and(innerRadius + outerRadius)/2
       .padAngle() 相邻pie之间的间隙
       .cornerRadius(2) 有间隙时加圆角
    #圆弧过渡 shape05.html
      不能直接过渡，需借助 属性补间函数
       例：.attrTween("d", function(d){
            var start={startAngle:0,endAngle:0};
            var interpolate=d3.interpolate(start, d);
            return function(t) {
              return arc(interpolate(t));
            }
        });
        
## D3 图表
    #折线图  graph01.html  
    #散点图  graph02.html
      d3.symbol().type([符号方法])  返回得是path 的d属性对应的路径
      ◆type 符号方法
        circle    圆      d3.symbolCircle
        cross     十字    d3.symbolCross
        diamond   菱形    d3.symbolDiamond
        square    矩形    d3.symbolSquare
        triangle  三角形  d3.symbolTriangle
        star      五角星  d3.symbolStar
        wye       Y字形   d3.symbolWye
    #气泡图  graph03.html  创建圆形
    #柱状图  graph04.html  创建矩形

## D3 井然有序（布局）
    #饼图    graph05.html
      第一步--创建饼生成器 pie=d3.pie()  
        .sort() 规定按什么排序
        .value() 规定访问那个字段的数据
        .padAngle() 相邻pie之间的间隙
        pie(data)  访问、加载数据 
      注：生成一个数据集合 如下
        [
          {"data":  1, "value":  1, "startAngle": 6, "endAngle": 6, "padAngle": 0},
          {"data":  1, "value":  1, "startAngle": 7, "endAngle": 6, "padAngle": 0}...
        ] 
      第二步--创建圆弧生成器并添加过渡 arc=d3.src() 详细请看 shape05.html
      第三步--创建标签--text 元素
          主要属性有：x,y,dx,dy,rotate,textLength,lengthAdjust
          x,y表示文本的横纵坐标。
          dx,dy表示移动的横纵坐标。
          rotate表示旋转的度数。
    #堆叠面积图  stacked.html graph06.html
        d3.v4:  有问题
           d3.stack().order(d3.stackOrderNone).offset(d3.stackOffsetNone);
          ※keys()  设置或获取keys访问器，由于可能存在多个属性，因此keys是以数组的形式指定
          ※values() 设置或获取value访问器，stack生成器会根据指定的key依次读取对应的value
          ※order:排序
            d3.stackOrderAscending   最小的值(values之和)位于底部 
            d3.stackOrderDescending  最大的值(values之和)位于底部
            d3.stackOrderInsideOut   最大的值在内侧，最小的值在外侧，
                                     这个是针对河流图的，也就是是朝两边同时堆叠的。
            d3.stackOrderNone        次序是根据keys得到的，相当于没有排序。
            d3.stackOrderReverse     将原有的key序列翻转
          ※offset:偏移
            d3.stackOffsetExpand     将整个堆叠图放在0-1之间，
                                     也就是上边界和下边界都是常量   
            d3.stackOffsetNone       以0为基线      
            d3.stackOffsetSilhouette 上下移动基线，使得整个堆叠图的中心位于基线
            d3.stackOffsetWiggle     做河流图用的
        d3.v3:
           d3.layout.stack().offset('expend')(data); 
          ※offset:偏移 silhouette wiggle expand zero  
    #箱形图  graph07.html 有问题--图已显示标题显示不出
      第一步 构建一个具有根节点的新的层级结构数据
        d3.hierarchy(data)  data是已知的数据  格式要求json
          d3.hierarchy返回的数据包含以下属性:
              node.data - 原来传给constructor的数据
              node.depth - 节点的深度，根节点为0
              node.height - 节点的高度，叶节点为0
              node.parent - 节点的父节点，根节点为null
              node.children - 子节点数组，叶节点没有定义这个属性
              node.value - 当前节点以及后代节点的总值，通过node.sum设置. 
          ※.leaves() 返回以当前节点为根节点的子树的所有叶节点
          ※.ancestors() 以数组的形式放返回当前节点的所有祖先元素
          ※.descendants() 返回当前节点所有的后代节点
        如果data格式是CSV格式需要转化
        d3.stratify()(data) data是CSV格式的json
           例： 数据格式可以方便的存储在CSV文件中:
                  name,parent
                  Eve,
                  Cain,Eve
                  Seth,Eve
                  Enos,Seth
                  Noam,Seth
                  Abel,Eve
                  Awan,Eve
                  Enoch,Awan
                  Azura,Eve
                然后使用d3.csvParse转成json格式的csv数据:
              var table = d3.csvParse(text);
                返回:
                [
                  {"name": "Eve",   "parent": ""},
                  {"name": "Cain",  "parent": "Eve"},
                  {"name": "Seth",  "parent": "Eve"},
                  {"name": "Enos",  "parent": "Seth"},
                  {"name": "Noam",  "parent": "Seth"},
                  {"name": "Abel",  "parent": "Eve"},
                  {"name": "Awan",  "parent": "Eve"},
                  {"name": "Enoch", "parent": "Awan"},
                  {"name": "Azura", "parent": "Eve"}
                ]
                然后转为一个hierarchy数据:
                var root = d3.stratify()
                    .id(function(d) { return d.name; })
                    .parentId(function(d) { return d.parent; })
                    (table);
         注：布局的时候需要计算节点的值，则必须要先调用node.sum方法
           例： 
            circle-packing使用
              .sum(function(d) { return d.value; })
              .sort(function(a, b) { return b.value - a.value; });
            treemaps and icicles中使用
              .sum(function(d) { return d.value; })
              .sort(function(a,b){return b.height-a.height||b.value-a.value;});
            trees and dendrograms中推荐使用
              .sum(function(d){return d.value;})
              .sort(function(a,b){return b.height-a.height||a.id.localeCompare(b.id);})
      第二步 创建treemap生成器
        d3.treemap()(计算过节点值的层级结构数据)
          .round(true)  是否启用取整，默认为false
          .size([_width,_height]) 设置或获取布局尺寸，默认为[1,1]
          .padding(1)  设置或获取间隔参数，等于同时设置inner 和 outer
          .paddingInner(1) 设置或获取内部间隔，默认为0
          .paddingOuter(1) 同时设置外部间隔，默认为0
          .paddingTop(1) 设置或获取顶部间隔, 默认为0
          .paddingLeft(1) 设置或获取左部间隔, 默认为0
          .paddingRight(1) 设置或获取右部间隔, 默认为0
          .paddingBottom(1) 设置或获取底部间隔, 默认为0
          .tile(d3.treemapResquarify)  设置或获取tiling method,
                                       默认为d3.treemapSquarify。
          ※tiling method
            d3.treemapBinary 将指定的节点以递归的方式划分为一个大致平衡的二叉树，
                             如果宽度大于高度则水平划分，如果高度大于宽度则垂直划分。
            d3.treemapDice   根据每个子节点水平划分矩形，并且顺序是有序的。
            d3.treemapSlice  根据每个子节点垂直划分矩形，并且顺序是有序的。
            d3.treemapSliceDice 指定的节点深度为奇数则使用treemapSlice否则使用treemapDice
            d3.treemapSquarify 这种方法可以用以产生宽高比相等的矩形分区。
            d3.treemapResquarify 与"treemapSquarify"类似，不会改变矩形的位置，只调整大小。
      第三步 在选择的元素里加载数据
        .data(xxx.leaves())
          .leaves() 返回以当前节点为根节点的子树的所有叶节点










