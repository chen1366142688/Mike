$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("��ҳ");
    });
    $(".footer").load("footer.html");


    carousel();//ͼƬ�ֲ�
})


//bannerͼƬ�ֲ�
function carousel(){
    var number=$(".banner ul li").size()-1;//ͼƬ������
    var cur=0;//��ǰ��ʾ��ͼƬ
    var timer=0;//��ʱ��

    //��һ��
    function slideNext(){
        if(cur<number){
            $(".banner ul li").eq(cur).stop().fadeOut();
            $(".banner ul li").eq(cur+1).stop().fadeIn();
            $(".indicator a").removeClass().eq(cur+1).addClass("cur");
            cur+=1;
        }else{
            $(".banner ul li").eq(cur).stop().fadeOut();
            $(".banner ul li").eq(0).stop().fadeIn();
            $(".indicator a").removeClass().eq(0).addClass("cur");
            cur=0;
        }
    }
    //��һ��
    function slidePrev(){
        if(cur>0){
            $(".banner ul li").eq(cur).stop().fadeOut();
            $(".banner ul li").eq(cur-1).stop().fadeIn();
            $(".indicator a").removeClass().eq(cur-1).addClass("cur");
            cur-=1;
        }else{
            $(".banner ul li").eq(cur).stop().fadeOut();
            $(".banner ul li").eq(number).stop().fadeIn();
            $(".indicator a").removeClass().eq(number).addClass("cur");
            cur=number;
        }
    }

    timer=setInterval(slideNext,3000);

    //���������bannerʱ�������ʱ��
    $(".banner").mouseover(function(){
        clearInterval(timer);
    });
    $(".banner").mouseout(function(){
        timer=setInterval(slideNext,3000)
    });

    //��һ������һ��
    $(".banner .prev").click(function(){
        slidePrev();
    });
    $(".banner .next").click(function(){
        slideNext();
    });

    //СԲ��ָʾ��
    $(".indicator>a").mouseover(function(){
        var now=$(this).index();//��ȡ���������ǵڼ���a���
        $(".indicator>a").removeClass();//ɾ��a����е�class=cur
        $(this).addClass("cur");//Ϊ��a������cur��ʽ
        $(".banner ul li").eq(cur).fadeOut();//���ص�ǰ��ͼƬ
        $(".banner ul li").eq(now).stop().fadeIn();//��ʾ��a���к�һ����ͼƬ
        cur=now;//Ϊ����cur���¸�ֵ���Ա����ٴ����ö�ʱ����ʱ�򣬴ӵ�ǰ��ʾ��ͼƬ��ʼ����
    });
}
//bannerͼƬ�ֲ�����

//��ҵ1����ͼƬ�ֲ�������������Ż���
// 1.jqueryѡ����Ԫ�ز��Ҵ浽�����У�
// 2.��һ����һ���������ϣ�
// 3.ָʾ���������Ƿ�ǰ��ʾ������жϣ�
// 4.��ͼƬ�ֲ���װ�������У�
// 5.����
//��ҵ2����ҳ��Ʒ���֣��ĳɺ����޷����