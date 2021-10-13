$(document).ready(function () {
    var windowWidth = $(window).width();

    // 螢幕滾動 判斷
    $(window).scroll(function () { 
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();

        // 回到頂端
        if ($(window).scrollTop()) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }

        // 經過 主廚 區塊調整顏色
        if(window.document.title.substr(0, 2) == '首頁'){
            var backPos = $(".back-to-top").offset().top;
            var backHeight = $(".back-to-top").outerHeight();
            var chefPos = $('#today-chef').offset().top;
            var chefHeight = $('#today-chef').outerHeight();
            if(backPos > chefPos && (backPos + backHeight) <= (chefPos + chefHeight)){
                $(".back-to-top").css('color', 'white');
            }else{
                $(".back-to-top").css('color', 'black');
            }
            
            // 滑入 特效
            $('.animated').each(function(){
                if(!$(this).hasClass('animated_fadeIn')){
                    var thisPos = $(this).offset().top;
                    if((scrollPos + windowHeight) > thisPos){
                        $(this).css('transform', 'translateY(0px)');
                        $(this).addClass('animated_fadeIn');
                    }
                }
            });
        }
    });

    // 螢幕大小改變 判斷
    $(window).resize(function () {
        windowWidth = $(window).width();
        if(window.document.title.substr(0, 2) == '商店'){
            // 切換圖片來源
            if(windowWidth > 568 && imgContent != 2){
                changeImg($('.product-container img'), 2);
            }
            if(windowWidth <= 568 && imgContent != 1){
                changeImg($('.product-container img'), 1);
            }
        }
        
        // 視窗大小改變就把 選單 關閉、將 top 位置還原
        if($(".header-bar").hasClass('nav-menu-open')){
            $(".nav-menu").parent().removeClass('nav-menu-open');
            $(".back-to-top").parent().removeClass('nac-menu-open-t');
        }
    });
    function changeImg(element, way){
        $(element).each(function (e) {
            var src = $(this).attr('src');
            var dataSrc = $(this).data('src');
            if(way == 1){ // 畫面 <= 568px
                $(this).css('content', 'url(' + dataSrc + ')');
                imgContent = 1;
            }else{  // 畫面 > 568px
                $(this).css('content', 'url(' + src + ')');
                imgContent = 2;
            }
        });
        imgSizeOk = true;
    }
    
    // 回到頂端 特效
    $(".back-to-top").click(function (e) { 
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    // 手機模式下 選單
    $(".header-bar-m").on('click', function () {
        $(".nav-menu").parent().addClass('nav-menu-open');
        $(".back-to-top").parent().addClass('nac-menu-open-t');
    });
    $(".header-bar-m-close").on('click', function () {
        $(".nav-menu").parent().removeClass('nav-menu-open');
        $(".back-to-top").parent().removeClass('nac-menu-open-t');
    });
    
    // footer 社群圖片
    var socialImages = [
        'google-plus-logo.png', 'twitter-logo.png', 'fb-logo.png'
    ];
    $.each(socialImages, function(index, value){
        var name = value.split('.');
        $(".social-link").append(
            '<li><a href="#" class="' + name[0] + '")></a></li>'
            );
            var aLink = $("." + name[0]);
            aLink.css('background-image', "url(img/" + value + ")");
    });
        
    // 首頁 頁面
    if(window.document.title.substr(0, 2) == '首頁'){
        // 選單 點擊事件
        $(".nav-item-home > a").on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('nav-item-active');
            $(".nav-item-h-list").stop().slideToggle();
            $(".nav-item-home").toggleClass('nav-menu-i-active');
        });
        // home 顯示 i 標記
        $(".nav-item-home").children('i').css('display', 'block');
        // home 點擊事件
        $(".nav-item-h-list > li > a").on('click', function (e) {
            $(".nav-item-home").children('a').removeClass('nav-item-active');
            $(".nav-item-h-list").stop().slideUp();
            $(".nav-item-home").removeClass('nav-menu-i-active');
            // 手機模式下 選單
            if(windowWidth <= 568){
                $(".nav-menu").css('transform', 'translateX(130%)');
                $(".back-to-top").css('right', 'calc(10px)');
            }
        });
        
        // 首頁 到目標錨點 特效
        $('.scrollTarget').click(function(e){
            e.preventDefault();
            var target = $(this).attr('href');
            var targetPos = $(target).offset().top;
            $('html, body').animate({scrollTop: targetPos}, 800);
        });
        
        // 亂數新增 translateY 參數 及 動畫效果
        $('.animated').each(function(){
            var randomNum = (Math.floor(Math.random() * 50) + 50);
            $(this).css('transform', 'translateY(' + randomNum + 'px)');
        });
    }
    
    // 商店 頁面
    if(window.document.title.substr(0, 2) == '商店'){
        var imgContent = 2;
        // 圖片設定
        if(windowWidth <= 568){
            $(".product-container img").each(function (index, element) {
                changeImg(this, 1);
            });
        }
        // 購物車選單
        $(".cart-item li a").on('click', function(e) {
            e.preventDefault();
            $(".cart-item li").removeClass("cart-item-active");
            $(this).parent().addClass("cart-item-active");
        });
        // 購物車選單 加入最愛 特效
        $('.heart-img').on('click', function() {
            $(this).toggleClass("heart-img-active");
        });
    }
});