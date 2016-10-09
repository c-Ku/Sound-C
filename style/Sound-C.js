/* 09 10 2016 Created by c-Ku */

	//数组下标
		var index = -1;	
	//播放状态 单曲循环：0 列表循环：1 随机播放：2
		var playState = 1;
	//创建音乐列表
		function createBox(){
			var html="";
			for(var i=0;i<myMusics.length;i++){
				if(i<9)
					html+="  <a href='javascript:clickName("+i+");'>"+"<li>0"+(i+1)+" "+myMusics[i].title+"</li></a>"
				else
					html+="  <a href='javascript:clickName("+i+");'>"+"<li>"+(i+1)+" "+myMusics[i].title+"</li></a>"
			}
			return html
		}

	//页面加载		
		$(document).ready(function(){

			$("#cBar_LST").attr('class', 'cBar_h');
			$("#audio_LRC").css("display", "none");
			$("#cBar_LRC").click(function(){
				$("#audio_LRC").css("display", "block");
				$("#audio_PLAYLIST").css("display", "none");
				$("#cBar_LRC").attr('class', 'cBar_h');
				$("#cBar_LST").removeAttr('class', 'cBar_h');
			});
			$("#cBar_LST").click(function(){
				$("#audio_LRC").css("display", "none");
				$("#audio_PLAYLIST").css("display", "block");
				$("#cBar_LRC").removeAttr('class', 'cBar_h');
				$("#cBar_LST").attr('class', 'cBar_h');
			});
			

			$("#audio_PLAYLIST").append(createBox());
			playMusic(1);

			var media = document.getElementById("media");
			media.volume = 0;
			
		//音量初始化
			setTimeout(function(){
				media.volume = 0.5;
				$("#audio_Vol_Now").css("width", "92.5px");
			},300);

		//缓冲量显示
			//var dur = Math.floor(media.duration);
			//var buffed = (media.buffered.end(0) / dur) * 494;
			//$("#audio_TIME_Buffed").css("width", buffed);

		//按钮"下一首"单击事件
			$("#audio_SWITCH_GO").click(function(){
				playMusic(1,1);
			});
		//按钮"上一首"单击事件
			$("#audio_SWITCH_BACK").click(function(){
				playMusic(2);
			});
		//按钮"播放/暂停"单击事件
			$("#audio_SWITCH_PLAY").click(function(){
				if($("#audio_SWITCH_PLAY i").attr("class")=="fa fa-play-circle"){
					$("#audio_SWITCH_PLAY i").attr('class', 'fa fa-pause-circle');
					$("#audio_SWITCH_PLAY i").attr('title', '暂停');
					media.play();
				}else if($("#audio_SWITCH_PLAY i").attr("class")=="fa fa-pause-circle"){
					$("#audio_SWITCH_PLAY i").attr('class', 'fa fa-play-circle');
					$("#audio_SWITCH_PLAY i").attr('title', '播放');
					media.pause();
				}
			});
		//开关"音量"单击事件
			$("#audio_SWITCH_Volume").click(function(){
				if(media.volume>0 && media.volume<1){

					media.volume = 1;
					$("#audio_Vol_Now").css("width","180px");
					$("#audio_SWITCH_Volume i").removeAttr('class', 'fa fa-volume-down');
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-up');

				} else if(media.volume==1) {

					media.volume = 0;
					$("#audio_Vol_Now").css("width","0px");
					$("#audio_SWITCH_Volume i").removeAttr('class', 'fa fa-volume-up');
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-off');

				} else if(media.volume==0) {

					media.volume = 0.5;
					$("#audio_Vol_Now").css("width","92.5px");
					$("#audio_SWITCH_Volume i").removeAttr('class', 'fa fa-volume-off');
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-down');

				}
			});
		//循环模式按钮事件
			$("#audio_SWITCH_Repeat").click(function(){
				if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-sort-numeric-asc"){

					$("#audio_SWITCH_Repeat i").attr('class', 'fa fa-repeat');
					$("#audio_SWITCH_Repeat").attr('title', '单首循环');

				} else if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-repeat") {

					$("#audio_SWITCH_Repeat i").attr('class', 'fa fa-random');
					$("#audio_SWITCH_Repeat").attr('title', '随机播放');

				} else if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-random") {

					$("#audio_SWITCH_Repeat i").attr('class', 'fa fa-sort-numeric-asc');
					$("#audio_SWITCH_Repeat").attr('title', '顺序播放');

				}
			});
		//开关"菜单栏"单击事件
			$("#audio_SWITCH_Detail").click(function(){
				$("#audio_DETAIL").toggle(300);
			});
			
		//快进
			$("#audio_SWITCH_GO_FORWARD").click(function(){
				media.currentTime+=5;
			});
		//快退
			$("#audio_SWITCH_GO_BACKWARD").click(function(){
				media.currentTime-=5;
			});
		//音量
			$("#audio_Vol").click(function(e){

			//设定当前音量条单击位置
				var left = $("#audio_Vol").offset().left;
				var length = e.pageX - left -2;
				$("#audio_Vol_Now").css("width",length + "px");

			//设定当前音量
				var percent = length / 180;
				if(percent>1)  percent = 1;
				if(percent<0)  percent = 0;

				media.volume = percent;
				if(media.volume>0 && media.volume<1){
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-down');
				} else if(media.volume==0 ) {
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-off');
				} else if (media.volume==1) {
					$("#audio_SWITCH_Volume i").attr('class', 'fa fa-volume-up');
				}
			});

		//音乐进度条点击事件
			$("#audio_TIME").click(function(e){

			//获取audio元素
				var media = document.getElementById("media");

			//音乐长度
				var dur = Math.floor(media.duration);

			//设定当前进度条单击位置
				var left = $("#audio_TIME").offset().left;
				var length = e.pageX - left -2;
				$("#audio_TIME_Now").css("width",length + "px");

			//设定当前音乐时间
				var position = length / 494;
				if(position>1)  position = 1;
				if(position<0)  position = 0;

				var time = position * dur;
				media.currentTime = time;
			});

		//播放状态
			$("#playState").change(function(){
				playState = $(this).val();				
			});
			
			$("a").mouseover(function(){
				//$(this).css("background-color","#000");
				//$($("a")[index]).css("color","#FFF !important");
			});
			
			$("a").mouseout(function(){
				//$(this).css("background-color","#000");
				//$($("a")[index]).css("background-color","#000");
			});
			
			
		});

	//点击名字播放音乐
		function clickName(i){
			index=i;
			playMusic(0);
		}

	//音乐播放
		function playMusic(s,n){
			if(s==0){//点击名字播放音乐
			
			}else if(s==1){//下一首

				if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-sort-numeric-asc"){//列表循环

					index++;
					if(index>=myMusics.length){
						index=0;
					}

				} else if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-repeat") {//单曲循环

					if(n==0){
					
					}else if(n==1){
						index++;
						if(index>=myMusics.length){
							index=0;
						}
					}

				} else if($("#audio_SWITCH_Repeat i").attr("class")=="fa fa-random") {//随机播放

					index = Math.floor(Math.random()*myMusics.length);

				}

			}else if(s==2){//上一首
				index--;
				if(index<0){
					index=myMusics.length-1;
				}
			}
			
			
		//修改audio资源路径
			$("#media").attr("src",myMusics[index].src);
		//音乐播放
			$("#media").play;
			$("#audio_SWITCH_PLAY i").attr('class', 'fa fa-pause-circle');
			$("#audio_SWITCH_PLAY i").attr('title', '暂停');
		//显示音乐名称
			$("#audio_TITLE").text(myMusics[index].title);
			$("title").text("Sound-C | " + myMusics[index].title);
		//歌词获取
			var lyricURL = myMusics[index].lyric;
			if(lyricURL!="") {
				getLyric(lyricURL);
				$("#audio_LRC").animate({scrollTop : 0}, 150);
			} else {
				var LRC = document.getElementById("audio_LRC");
				LRC.innerHTML = "您好，本歌曲暂时歌词缺失"; 
			}

			$("#audio_PLAYLIST").children("a").children("li").css("background-color","#FFF");
			$($("#audio_PLAYLIST").children("a")[index]).children("li").css("background-color","#F7F7F7");

			$("#audio_PLAYLIST").children("a").css("font-weight","normal");
			$($("#audio_PLAYLIST").children("a")[index]).css("font-weight","bold");

			$("#audio_PLAYLIST").children("a").children("li").css("color"," #000");
			$($("#audio_PLAYLIST").children("a")[index]).children("li").css("color","#27408B");
			
		}

	//时间获取
		function timeupdate(){
			//获取audio元素
			var media = document.getElementById("media");
			//音乐当前位置
			var curr = Math.floor(media.currentTime);
			//音乐长度
			var dur = Math.floor(media.duration);
			//滚动条宽度
			var tWidth = (curr / dur) * 494;

			$("#totalTime").text(formatTime(dur));
			$("#currTime").text(formatTime(curr));
			$("#audio_TIME_Now").css("width",tWidth + "px");

			moveLRC(curr);
		}

	//音乐计时格式
		function formatTime(time){
			
			var h=0,i=0,s=parseInt(time);
			if(s>60){
				i=parseInt(s/60);
				s=parseInt(s%60);
				if(i > 60) {
					h=parseInt(i/60);
					i = parseInt(i%60);
				}
			}
			var zero=function(v){
				return (v>>0)<10?"0"+v:v;
			};
			return (zero(h)+":"+zero(i)+":"+zero(s));
		};

	//音量设置
		function volumeSET(i){
			index=i;
			playMusic(0);
		}
		
	//歌词获取
		function getLyric(lyric) {
			var request = new XMLHttpRequest();
			request.open('GET', lyric, true);
			request.responseType = 'text';
			request.onload = function() {
				var lyricGET = request.response;
				arrayLyric(lyricGET);
			};
			request.send();
		}
	
	//歌词排列
		function arrayLyric(lyric) {
			var html = "";
			var lrcTimeArray = [];

		//正则表达匹配时间并将其替换
			var LRC_Val = lyric.replace(/\[\d*:\d*((\.|\:)\d*)*\]/g, '');
			LRC_Array = LRC_Val.split("\n");

		//获取歌曲名称
			LRC_Array[0].replace(/\[\w\w\:(.*?)\]/g,function(){
				musicName = arguments[1] || "暂无";
			});

		//获取歌手名称
			LRC_Array[1].replace(/\[\w\w\:(.*?)\]/g,function(){
				singer = arguments[1] || "暂无";
			});

		//首行写入歌曲基本信息
			html += "<li class=\"LRC_Line\" LRC_Time=\"0\">歌曲：" + musicName + "　歌手：" + singer + "</li>";
			LRC_Array.splice(0,4);

			lyric.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){

				var min = arguments[1] | 0, //分
				sec = arguments[2] | 0, //秒
				realMin = min * 60 + sec; //计算总秒数

				lrcTimeArray.push(realMin);
			});


			for(var i=0;i<lrcTimeArray.length;i++){
				html += "<li id=\"LRC_Time_" + i + "\" class=\"LRC_Line\" LRC_Time=\"" + lrcTimeArray[i] + "\">　" + LRC_Array[i] + "　</li>";
			}

			var LRC = document.getElementById("audio_LRC");
			LRC.innerHTML = html; 
		}
	
	//歌词移动
		function moveLRC(currTime) {

			var lrcBox = document.getElementById("audio_LRC"),
			lrcList = lrcBox.getElementsByTagName("li"),
			lrcHeight, lrcTime, lrcTime_N, nCheck = 0;

			for(var i = 0; i < lrcList.length; i++) {
				
				var n = i + 1,
				p = i - 1;
				if(i >= lrcList.length) 
					n = lrcList.length - 1;
				if(i <= 1) 
					p = 0;

				//var LRC_Time = parseInt(lrcList[i].attributes["LRC_Time"].nodeValue);
				//var LRC_Time_NEXT = parseInt(lrcList[n].attributes["LRC_Time"].nodeValue);

				lrcTime_P = $("#LRC_Time_" + p).attr('lrc_time');
				lrcTime = $("#LRC_Time_" + i).attr('lrc_time');
				lrcTime_N = $("#LRC_Time_" + n).attr('lrc_time');

				if((((currTime - lrcTime >= 0) && (currTime - lrcTime_N < 0)) || ((currTime - lrcTime >= 0) && (lrcTime_N == undefined)) || ((currTime - lrcTime_P == currTime - lrcTime) && (currTime - lrcTime >= 0) && (currTime - lrcTime_N < 0))) && nCheck == 0) {

					lrcHeight = document.getElementById("LRC_Time_" + i).offsetTop - document.getElementById("Sound-C").offsetTop - 370;
					$("#LRC_Time_" + i).attr('class', 'LRC_Line_Hover');
					$("#audio_LRC").animate({scrollTop : lrcHeight}, 250);

					nCheck = 1;

					//document.getElementById("idCH").innerHTML = currTime - lrcTime;
				} else {
					$("#LRC_Time_" + i).attr('class', 'LRC_Line');
				}
			}

		}