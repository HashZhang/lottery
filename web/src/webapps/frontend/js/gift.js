jQuery(function ($) {
    $(document).ready(function () {

        pageStateAward = 0;

        initWindowSize();

        $(window).resize(function() {
            initWindowSize();
        });


        giftTime();

    });

    
    var pageStateAward = 0;

    function pageController(){
        $.ajax({
            type: "post",
            url : getContextPath() + "/config/getCurStateAward",
            dataType:'json',
            data: {
            },
            success: function(data){
                //获取config表里的CurStateAward的值
                var curStateAward = data.data
                if(curStateAward == 0){
                    $("#loading").css("display","block");
                    //把页面图片和人头抹掉
                    $("#cpGiftImg").remove();
                    $(".luckman").remove();
                    $("#luckmanList").css("margin-top","10%");
                    // $("#loading").css("display","none");
                    pageStateAward = curStateAward;
                }else if(pageStateAward != 1 && curStateAward == 1){
                    //头像闪烁
                    //获取当前奖品获奖人数
                    $("#loading").css("display","block");
                    $.ajax({
                        type: "post",
                        url : getContextPath() + "/gift/getLuckManCount",
                        dataType:'json',
                        data: {
                        },
                    success: function(data1){
                            var luckmanCount = data1.data;
                            $("#cpGiftImg").remove();
                            $("#luckmanList").css("margin-top","10%");

                            start(luckmanCount);
                            pageStateAward = curStateAward;
                        }
                    });
                }else if(pageStateAward == 1 && curStateAward == 1){
                    pageStateAward = curStateAward;
                    $("#loading").css("display","none");
                } else if(pageStateAward != 2 && curStateAward == 2){
                    $("#loading").css("display","block");
                    //读Controller里的获奖人缓存
                    $.ajax({
                        type: "post",
                        url : getContextPath() + "/gift/getCacheLuckMans",
                        dataType:'json',
                        data: {
                        },
                        success: function(data2){
                            $("#loading").css("display","none");
                            var luckmans = data2.data;
                            $("#cpGiftImg").remove();
                            end();
                            showLuckman(luckmans);
                            pageStateAward = curStateAward;
                        }
                    });
                }else if (pageStateAward == 2 && curStateAward == 2){
                    //什么都不做
                    pageStateAward = curStateAward;
                    $("#loading").css("display","none");
                }else{
                    $("#loading").css("display","none");
                }

                setTimeout(giftTime,1000);
            },
            error:function () {
                setTimeout(giftTime,1000);
            }
        });
    }



    //页面轮询
    function giftTime()
    {
        pageController();

    }


    //得到当前时刻临时的获奖人，一闪而过
    function getLuckman(manCount){
        var luckmans = $(".luckman");
        var iLen = luckmans.length;
        for(var i = 0 ; i < iLen ; i++ ){
            luckmans[i].style.display = "none";
        }
        if(manCount > iLen || manCount < 0){
            manCount = 0; //输入控制
        }
        var show = getNRandom(manCount,0,iLen);
        var jLen = show.length;
        for(var j = 0 ; j < jLen ; j++ ){
            if(show[j] != undefined){
                if(manCount == 1){
                    luckmans[show[j]].style.width = "100%";
                    $(".luckImg").css({"width":"500px","height":"500px"})
                }else if (manCount == 2){
                    luckmans[show[j]].style.width = "50%";
                    $(".luckImg").css({"width":"450px","height":"450px"})
                }
                else if (manCount == 3){
                    luckmans[show[j]].style.width = "33%";
                    $(".luckImg").css({"width":"400px","height":"400px"})
                }
                else if (manCount == 4){
                    luckmans[show[j]].style.width = "25%";
                    $(".luckImg").css({"width":"350px","height":"350px"})
                }
                else if (manCount == 5){
                    luckmans[show[j]].style.width = "20%";
                    $(".luckImg").css({"width":"300px","height":"300px"})
                }
                else if (manCount == 6){
                    luckmans[show[j]].style.width = "16%";
                    $(".luckImg").css({"width":"250px","height":"250px"})
                }
                else if (manCount == 7){
                    luckmans[show[j]].style.width = "14%";
                    $(".luckImg").css({"width":"200px","height":"200px"})
                }
                else if (manCount == 8){
                    luckmans[show[j]].style.width = "12%";
                    $(".luckImg").css({"width":"150px","height":"150px"})
                }
                else if (manCount == 9){
                    luckmans[show[j]].style.width = "11%";
                    $(".luckImg").css({"width":"130px","height":"130px"})
                }
                luckmans[show[j]].style.display = "block";
            }
        }
    }

    //初始化,得到未获奖人
    function initLuckman() {
        $.ajax({
            type: "post",
            url : getContextPath() + "/user/getUnAwardUser",
            dataType:'json',
            data: {
            },
            success: function(data){
                var users = data.data;
                var usersHtml = "";
                var iLen = users.length;
                var liWidth = "10%";
                var imgWidth = "100px";
                for(var i = iLen - 1 ; i >=0  ; i--){
                    usersHtml += "<li style='width: " + liWidth + ";height:22%;display:none' class='luckman'><div style='text-align: center;'><img class='luckImg' style='border-radius: 50%;max-width: 90%;height: " + imgWidth + ";width: " + imgWidth + ";' src='"+ users[i].wxHeadimgurl +"'alt='User Image'><a href='#' style='text-align: center;font-size: 28px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + users[i].sfName + "</a><a href='#' style='font-size: 28px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + users[i].sfNum + "</a></div></li>";
                }
                $("#luckmanList").html(usersHtml);
                $("#loading").css("display","none");
            }
        });
    }

    //展示获奖人的头像
    function showLuckman(luckmans) {
        var users = luckmans;
        var usersHtml = "";
        var iLen = users.length;
        var liWidth = "10%";
        var imgWidth = "100px";
        if(iLen == 1){
            liWidth = "100%";
            imgWidth = "500px";
        }else if(iLen == 2){
            liWidth = "50%";
            imgWidth = "450px";
        }
        else if(iLen == 3){
            liWidth = "33%";
            imgWidth = "400px";
        }
        else if(iLen == 4){
            liWidth = "25%";
            imgWidth = "350px";
        }
        else if(iLen == 5){
            liWidth = "20%";
            imgWidth = "300px";
        }
        else if(iLen == 6){
            liWidth = "16%";
            imgWidth = "250px";
        }
        else if(iLen == 7){
            liWidth = "14%";
            imgWidth = "200px";
        }
        else if(iLen == 8){
            liWidth = "12%";
            imgWidth = "150px";
        }
        else if(iLen == 9){
            liWidth = "11%";
            imgWidth = "130px";
        }
        for(var i = iLen - 1 ; i >=0  ; i--){
            usersHtml += "<li style='width:" + liWidth + ";height:22%;' class='luckman animated bounceInUp'><div style='text-align: center;'><img class='luckImg' style='border-radius: 50%;max-width: 90%;height: " + imgWidth + ";width: " + imgWidth + ";' src='"+ users[i].wxHeadimgurl +"'alt='User Image'><a href='#' style='text-align: center;font-size: 28px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + users[i].sfName + "</a><a href='#' style='font-size: 28px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + users[i].sfNum + "</a></div></li>";
        }
        $("#giftBox").prepend("<img id='cpGiftImg' src='http://hashzhang.com/data/frontend/image/winningList.png' class='animated bounceInUp'>");
        $("#luckmanList").css("margin-top","0").html(usersHtml);
    }

    var timeout = false; //闪烁效果的启动及关闭按钮

    //头像闪烁
    function twinkle(manCount)
    {
        if(!timeout){
            return;
        }
        getLuckman(manCount);
        setTimeout(function(){twinkle(manCount);},50);
    }

    //开始抽奖
    function start(manCount) {
        initLuckman();
        timeout = true;
        twinkle(manCount);
    }

    //结束抽奖
    function end() {
        timeout = false;
    }

    //生成n个从min,max之间的随机数
    //思路：生成第i个[min,max]区间的随机数，并与之前i-1个数比较，如有重复，令i=i-1;重复生成第i个随机数。
    function getNRandom(n,min,max){
        var arr=[];
        for(var i=0;i<n;i++){
            arr[i]=parseInt(Math.random()*(max-min)+min);
            for(var j=0;j<i;j++){
                if(arr[i]==arr[j]){
                    i=i-1;
                    break;
                }
            }
        }
        return arr;
    }


    function initWindowSize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        $("#large-header").css({"width":width + "px","height": height + "px"});
        $("#giftBox").css({"width":width + "px","height": height + "px"});
        $("#loading").css({"margin-left":width/2-200+"px"});
    }

});