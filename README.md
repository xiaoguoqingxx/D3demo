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
    	d3.extent()  同时返回最大最小值
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
      注：.on()   用来监听过渡  
            start     - 过渡开始时.
            end       - 过渡结束后.
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
        d3.v4:  问题已初步解决
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
    #箱形图  graph07.html  问题已完全解决
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
    #树图    graph08.html 有问题--点击节点收起的问题 还是无法解决 d3.v3写法 tree.html
      第一步 构建一个具有根节点的新的层级结构数据
        d3.hierarchy(data)  data是已知的数据  格式要求json
      第二步 构建树结构生成器
        d3.tree()(data)
          .size() 设置或获取布局尺寸
        ※node.links()
          返回以当前节点为根节点的子树中所有的连接(边)，每个连接都有source和target属性组成，source表示连接的父节点，target表示连接的子节点。
      第三步 构建线生成器 https://github.com/xswei/d3js_doc/tree/master/API/d3-shape-master#custom-curves
        例：_link = d3.linkHorizontal()
          .x(function(d) { return d.y; })
          .y(function(d) { return d.x; });
    #封闭图  graph09.html
      第一步 构建一个具有根节点的新的层级结构数据
        var hierarchy=d3.hierarchy(data)  data是已知的数据  格式要求json 
      第二步 构建封闭结构生成器 
        var pack=d3.pack()
         .size([_r,_r]) //设置范围
         .padding(3)    //设置间距 
      第三步 渲染数据和图
         pack(hierarchy
          .sum(function(d) { return d.size; })
              .sort(function(a, b) { return b.value - a.value; }))descendants(); 
      *注：d3.v3 .value() 相当于 .sum(function(d) { return d.size; })* 

## D3 人机交互  
    #事件监听 trans01.html
      selection.on([事件(string)],[回调(function)])     
      d3.mouse([容器])  获取鼠标在给出的容器中的当前位置 返回[x,y]
      selection.nodes() 将选择集中的非null元素以数组的形式返回
      selection.node() 将选择集中的第一个非null元素返回 将选集转化为 元素本身
    #多点触摸设备 trans02.html touch.html 有问题---监听过渡和打断过渡 
      d3.event
        ****** 官方释义 *******
         当前的event, 如果有的话. 这个属性再事件发生时被设置, 并在事件回调结束后被重置. 可以使用这个来访问标准的事件对象属性，比如event.timeStamp 以及方法比如 event.preventDefault. 也可以使用 event.pageX 和 event.pageY, 这个是很方便的因为不需要使用d3.mouse, d3.touch 或 d3.touches对原生事件对象进行坐标转换 .
        ****** 官方释义 *******
      d3.event.type 事件类型
      d3.event.preventDefault() 阻止触发默认事件
      ※d3.touches(svg.node())  获取一系列的触控位置数组  二维数组
    #缩放和平移 trans03.html
      d3.zoom() 创建一个zoom操作。返回一个zoom对象方法，通常被传递给selection.call来调用。
        start room end
      selection.call(d3.zoom().on("zoom", zoomed)) on绑定zoom 并执行zoomed方法
      selection.on(".zoom", null);取消缩放和平移
      selection.call(zoom).on("wheel.zoom", null); 移除滚轮事件
      selection.call(zoom).on("wheel", function() { d3.event.preventDefault(); });
           阻止浏览器默认的滚轮事件
      zoom.scaleExtent([extent])  设置或获取缩放范围。默认为[0, ∞]
    #拖拽      trans04.html
      d3.drag() 创建一个新的拖拽操作，返回一个drag, 它是一个对象方法。
                  一般通过 selection.call将其应用在指定的选择集上。
          start drag end 
      d3.selectAll(".node").call(d3.drag().on("start", started));
      selection.on(".drag", null);取消拖拽

## D3 使用原力  难度较大 d3.v4 有坑
    一、关于力  d3.v4--force01-1.html 
      第一步 创建力模拟器  d3.v4为例
        d3.forceSimulation(nodeData)
      参数详解：
        simulation.restart() 重启仿真模拟器（仿真内部的计时器）
        simulation.stop()    停止仿真模拟器（仿真内部的计时器）
        simulation.nodes([nodes])  
          如果指定了nodes，则根据当前的nodes对象数组初始化仿真的节点初始位置和速度。如果没有指定nodes则根据指定的构造器返回节点对象数组。每个节点为一个对象类型，以下几个属性是通过仿真模拟器添加的：
              index - 节点的索引
              x - 节点当前的 x-位置
              y - 节点当前的 y-位置
              vx - 节点当前的 x-速度
              vy - 节点当前的 y-速度
          如果要为某个节点设置默认的位置，则需要为该节点设置如下两个属性:
              fx - x-位置
              fy - y-位置
        simulation.alpha([alpha]) 速度衰减初始值
        simulation.alphaMin([min])  设置或获取最小的 alpha值  当初始值小于它 停止仿真模拟器
        simulation.alphaDecay([decay]) 
          1.设置或获取衰减系数，用来设置alpha的衰减率。默认为0.0228… 
          2.衰减系数用来决定从当前alpha值到alphaTarget值的过渡快慢。衰减系数越大，仿真的过程越短，当然效果会越差。 衰减系数越小，则仿真过程越长，最终的效果也就越好。
          3.如果想要仿真永远运行，则设置decay为0，此时仿真的alpha保持不变。
        simulation.alphaTarget([target]) 
          alpha的目标值，区间为[0,1]. 默认为0
        simulation.velocityDecay([decay])
          速度衰减系数，相当于摩擦力。区间为[0,1], 默认为0.4。在每次tick之后，节点的速度都会等于当前速度乘以1-velocityDecay,和alpha衰减类似，速度衰减越慢最终的效果越好，但是如果速度衰减过慢，可能会导致震荡。
        simulation.force(name[, force])  添加力
        simulation.find(x, y[, radius]) 
          返回离⟨x,y⟩ 点最接近的节点，可以指定一个搜索半径radius,radius默认无穷大。
        simulation.on(typenames, [listener])
          设置或获取事件监听器。事件监听器通过type.names的形式指定，也就是同一种type可以根据name指定多个事件监听器。type有如下两种:
            tick - 每次tick时调用.
            end - 仿真结束时调用，也就是 alpha < alphaMin.
          tick事件不会由simulation.tick触发，仅仅可以通过内部计时器触发。 
      第二步 添加力 d3.v4为例
        ##Centering 平衡力
          定义：centering作用力可以使得节点布局开之后围绕某个中心。相当于某个中心点对所有的节点都有一个制约，不会让布局的中心偏离。
              
          center=d3.forceCenter(x, y)  
             根据指定的x- 和 y-坐标创建一个centering作用力。默认为⟨0,0⟩
          center.x([x]) 设置或获取center力的x坐标，默认为0
          center.y([y]) 设置或获取center力的y坐标，默认为0
        ##Collision 碰撞力
          定义：碰撞作用力可以为节点指定一个radius区域来防止节点重叠, 而不是一个位置坐标。也就是节点a and b之间的距离至少为radius(a) + radius(b). 为了减少抖动，可以设置strength(碰撞强度) 和 iteration count(迭代次数)两个参数.
            
          collide=d3.forceCollide([radius]) 
             使用默认的半径创建一个碰撞作用力。radius默认所有的节点都为1
          collide.radius([radius]) 为指定节点设置一个碰撞半径，可以为节点分别设置不同的半径。
          collide.strength([strength])  设置碰撞力的强度，范围[0,1], 默认为0.7。
          collide.iterations([iterations]) 
             设置或获取迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高，迭代次数越低，则计算复杂度越小，最终的效果也就越差。默认为1
        ##Links 连接力
          定义：link作用力可以根据期望的link distance(连接距离)将节点连接在一起。作用力的强度与节点之间的距离成正比，类似于弹簧作用力。
           
          link=d3.forceLink([links])  
             为指定的link数组创建一个link作用力。如果没有指定连接关系数组则默认为空
          link.links([links])
            设置或获取link作用力的连接数组并重新计算distance 和 strength. 如果没有指定links则返回当前的links数组，默认为空.
            每个link都是包含以下两个属性的对象:
              source - 源数节点，参考 simulation.nodes
              target - 目标节点，参考 simulation.nodes
              index - 在links数组中的索引
            为方便起见，每个连接的源和目的可以是数字索引或者字符串标示符。参考link.id.
            如果links数组发生了改变，比如添加或删除一个link时则必须重新调用这个方法
          link.id([id]) 
            设置或获取link中节点的查找方式，默认使用node.index:
                function id(d) {
                  return d.index;
                }
            默认的id访问器允许将source和target设置为基于nodes数组的索引形式，比如:
                var nodes = [
                  {"id": "Alice"},
                  {"id": "Bob"},
                  {"id": "Carol"}
                ];
                var links = [
                  {"source": 0, "target": 1}, // Alice → Bob
                  {"source": 1, "target": 2} // Bob → Carol
                ];
            也可以使用唯一的字符串来表示，比如:
                function id(d) {
                  return d.id;
                }
            然后可以使用每个节点的id属性的值设置为source和target值:
                var nodes = [
                  {"id": "Alice"},
                  {"id": "Bob"},
                  {"id": "Carol"}
                ];
                var links = [
                  {"source": "Alice", "target": "Bob"},
                  {"source": "Bob", "target": "Carol"}
                ];
          link.distance([distance]) 设置或获取两个节点之间的距离，默认为:30
          link.strength([strength]) 设置或获取link的强度，默认：
              function strength(link) {
                return 1 / Math.min(count(link.source), count(link.target));
              }
              count(node)是一个返回与节点链接的其他节点的数量(节点的度)。这样的默认设置是为了当一个节点度很大时减小强度，提高稳定性。
          link.iterations([iterations]) 
            设置或获取迭代次数，默认为1. 迭代次数越多，最终的仿真效果越好，计算复杂度也越高。
        ##Many-Body 相互作用力 引力与斥力
          定义：many-body(多体)作用力应用在所用的节点之间，当strength为正的时候可以模拟重力，当为负的时候可以模拟电荷力。这个实现使用四叉树和Barnes–Hut approximation的方法提高了性能。精确度可以通过theta来控制.与link不同，link作用力仅仅会影响有连接关系的两个节点，而电荷力是全局的，任何两个节点之间都有力的影响。
           
          manyBody=d3.forceManyBody() 使用默认的设置构建一个多体作用力。
          manyBody.strength([strength])  设置或获取强度参数 正--引力  负--斥力
          manyBody.theta([theta])  设置或获取theta参数。默认为0.9 一般不变 
          manyBody.distanceMin([distance])  设置或获取最小连接距离
          manyBody.distanceMax([distance])  设置或获取最大连接距离
        ##Positioning 位置力 维度力
          定义：x 和 y position作用力可以将作用力限制在一个维度，x方向或y方向。
           
          x=d3.forceX([x]) 
            根据给定的x位置创建一个x方向的作用力。如果没有指定x则默认为0
          x.strength([strength])
            设置或获取力的强度访问器，strength决定了节点x方向的速度增量:(x - node.x) × strength, 这个值越大则节点的位置会越快的朝向目标位置过渡，默认为0.1
          x.x([x]) 设置或获取x坐标访问器
          y=d3.forceY([y]) 
            根据给定的y位置创建一个y方向的作用力。如果没有指定y则默认为0
          y.strength([strength])
            设置或获取力的强度访问器，strength决定了节点x方向的速度增量:(y - node.y) × strength, 这个值越大则节点的位置会越快的朝向目标位置过渡，默认为0.1
          y.y([y]) 设置或获取y坐标访问器 
    二、力布局  d3.v3--force01.html
      创建力模拟器 d3.v3为例
        force=d3.layout.force()
      参数详解
        1、force.size([width, height])
            如果指定了size，设置可用的布局大小为指定的代表x和y的两元素数字数组来。如果未指定size，返回当前size，默认为[1, 1]。size影响力导向图的两个方面：重力中心和初始的随机位置。重心是 [ x / 2, y / 2 ]。当节点被添加到力导向图布局，如果不具有已设置的x和y属性，然后这些属性都分别使用范围为[0, x]和[0, y]的均匀随机分布进行初始化。
        2、force.linkDistance([distance])
            设定链接节点间的目标距离为指定的值 默认20，如果distance 是常量，那么所有的链接是相同的距离。
          force.linkStrength([strength])
            设置链接间强度（刚性）为[0,1]范围内的指定的值 默认1
        3、force.friction([friction]) 摩擦系数 [0,1]  速度衰减
        4、force.charge([charge]) 电荷强度 默认-30 负值排斥 正值吸引
          force.chargeDistance([distance]) 设置电荷强度已经应用的最大距离 默认无穷大
          force.theta([theta]) 精度问题 
        5、force.gravity([gravity])  设置(重力)引力强度为指定的值。 虚拟弹力
        6、force.nodes([nodes]) 
          如果节点nodes 被指定，设置布局的相关节点为指定的nodes 数组。如果未指定节点nodes ，则返回当前数组，默认为空数组。每个节点具有以下属性：
              index - nodes 数组节点的索引（从零开始）。
              x - 当前节点的x坐标位置。
              y - 当前节点的位置y坐标。
              px - 前一个节点位置的x坐标。
              py - 前一个节点位置的y坐标。
              fixed - 一个布尔值，表示节点位置是否被锁定。
              weight - 节点权重；相关联的链接的数目。
          这些属性不必在传递节点给布局之前进行设置；如果他们都没有设置，合适的默认值将在布局进行初始化start时调用，但是，要知道，如果你的节点上存储有其他数据，你的数据属性不应该与上面使用的布局属性冲突。
        7、force.links([links])
          如果指定了链接links ，设置布局的相关链接为指定的links 数组。如果没有指定链接links 时，返回当前数组，默认为空数组。每个链接都有以下属性：
              source - 源节点（节点中的元素）
              target - 目标节点（节点中的元素）
        8、force.start() 
          ####启动模拟；当首次创建布局时此方法必须被调用，然后分配节点和链接。此外，每当节点或链接发生变化它应当再次调用。在内部，布局使用冷却参数alpha控制布局的温度：当物理模拟收敛为稳定的布局，温度就下降，造成节点移动速度比较慢。最终，alpha下降到低于阈值，模拟完全停止，释放CPU资源，避免电池电量的消耗。布局可以使用恢复(resume)或重新启动重新加热；使用拖曳(drag)的行为时，会自动出现这种情况。
          
          ####在开始时，布局初始化相关节点上的各种属性。每个节点的索引(index)是通过遍历数组，从零开始计算。初始的x和y坐标，如果尚未在外部设置为以有效的数字，通过检测相邻节点计算：如果链接的节点已经在x或y的初始位置时，相应的坐标被施加到新节点。这当新节点被添加时增加图形布局的稳定性，而不是使用默认值（在布局的尺寸之内随机初始化位置）。前一px和py位置设置为初始位置，如果尚未设置，给新节点一个零初始速度。最后，固定布尔默认为false。
          
          ####布局还在相关链接上初始化源source 和目标target 属性：为方便起见，这些属性可以被指定为一个数字索引，而不是直接的链接，使得节点和链接可以从JSON文件或其他静态的描述中读取。如果这些属性是数字，导入链接的源和目标属性仅替换为nodes 中相应的实体；因此，现有链接中的这些属性当布局被重新启动时不受影响。链接距离distances和强度strengths也在开始时重新计算 
        9、force.alpha([value])  获取或设置力布局的冷却参数：alpha
          force.resume()  相当于：force.alpha(.1);
          force.stop()  相当于: force.alpha(0);
          force.tick()  执行力布局仿真一步,这种方法可以在配合使用start 和 stop 来计算静态布局
        10、 force.on(type, listener)
          绑定事件 仅支持"start"，"tick"和"end"事件
        11、force.drag() 拖动事件 初始化时调用node.call(force.drag)

## D3 地图的奥秘 难度较大 
     一、地理路径生成器（path） map01.html
        path=d3.geoPath([projection[, context]])
           使用默认的设置构建一个地理路径生成器。可以指定 投影方式和上下文
        path()可以指定渲染对象
           可以为一个GeoJSON特征或几何对象
              Point - 一个单一的点
              MultiPoint - 一组点
              LineString - 一组线条上的连续的点
              MultiLineString - 多条线条的上的一组点
              Polygon - 表示一个多边形的一组点
              MultiPolygon - 一个表示多个多边形的多维数组
              GeometryCollection - 一个几何对象数组
              Feature - 一个表示几何对象的特征
              FeatureCollection - 一组特征对象
        path.area(object)  返回指定GeoJSON对象投影的面的面积(平方像素)
        path.bounds(object)  返回指定GeoJSON对象投影面的包围框
        path.centroid(object)  返回指定GeoJSON对象投影面的几何中心
        path.projection([projection]) 
             设置或获取地理路径生成器的投影方式, 默认为null. 投影方式为null时候也就是直接将经纬度当屏幕坐标使用。
        path.context([context]) 
           如果指定了context则设将路径信息保存到指定的上下文中。context一定要包含CanvasRenderingContext2D API的以下方法:
              context.beginPath()
              context.moveTo(x, y)
              context.lineTo(x, y)
              context.arc(x, y, radius, startAngle, endAngle)
              context.closePath()
           如果没有指定context则返回当前的渲染上下文，默认为null
        path.pointRadius([radius])  设置或获取点或者点集中点的半径大小
    二、投影
       投影的作用在于将球面多边形转为平面多边形，D3提供了几种标准的投影:
          Azimuthal(方位角投影)
          Composite(复合投影)
          Conic(圆锥投影)
          Cylindrical(圆柱投影)
       projection(point) 根据指定的经纬度的[经度, 维度]返回一个投影后对应的屏幕点坐标[x, y]
       projection.invert(point) 逆投影，根据坐标点返回经纬度
       projection.stream(stream) 为指定的输出流返回一个projection stream(投影流) ？
       projection.clipAngle([angle]) 
          设置或获取投影的裁剪大圆的角度。如果angle为null则表示为antimeridian cutting(沿着180度经线)。
       projection.clipExtent([extent])
          设置或获取投影的视口裁剪范围。以[[x₀, y₀], [x₁, y₁]]的形式指定, x₀表示视口的左边界, y₀表示上边界, x₁ 表示右边界y₁ 表示下边界. 如果 extent为null,则表示不使用视口裁剪。
       projection.scale([scale])  设置或获取投影的缩放因子
       projection.translate([translate]) 设置或获取投影的平移偏移量。默认为[480, 250]。
       projection.center([center]) 设置或获取投影的中心，参数以经纬度的形式指定。
       projection.rotate([angles]) 
          设置或获取投影的three-axis rotation(三轴旋转)。必须通过二元或三元数组指定，分别表示[lambda, phi, gamma]
       projection.precision([precision])  设置或获取投影采样精度
       projection.fitExtent(extent, object) 
          自动设置投影的scale 和 translate来使得GeoJSON对象适应指定的extent 
       projection.fitSize(size, object)
          projection.fitExtent的一个简便方法(左上角坐标为[0,0]时)，如下两个是等价的：
              projection.fitExtent([[0, 0], [width, height]], object);
              projection.fitSize([width, height], object);
    ****投影方式详解****   map01.html
      1、方位角投影
        等面积投影  d3.geoAzimuthalEqualArea()
        等距投影    d3.geoAzimuthalEquidistant()
        球心投影    d3.geoGnomonic()
        正交投影    d3.geoOrthographic()
        球面投影    d3.geoStereographic()
      2、复合投影 （暂时不适用）
         不支持projection.center, projection.rotate, projection.clipAngle, projection.clipExtent.
        d3.geoAlbersUsa() 以美国为中心的d3.geoConicEqualArea 投影
      3、圆锥投影
        conic.parallels([parallels]) 双标准纬线定义了投影的地图布局。
        阿尔伯斯投影  d3.geoAlbers()
        兰伯特正形圆锥投影，双标准纬线默认为[30°, 30°]  d3.geoConicConformal()
        双标准纬线等积圆锥投影  d3.geoConicEqualArea()
        双标准纬线等距圆锥投影  d3.geoConicEquidistant() 
      4、圆柱投影 
        普通圆柱投影  d3.geoEquirectangular() 
        默认projection.clipExtent为±85°经度的墨卡托投影  d3.geoMercator()
        横向墨卡托投影  d3.geoTransverseMercator() 



        
 




 










