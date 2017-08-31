/**
 * Created by Administrator on 2017/4/20.
 */
(function () {
    var l1 = 0, l2 = 0;
    var cname1, cname2, cname3;
    var cid1, cid2, cid3;
    var canClick = !0;
    var canClose = !1;
    $('.select-block').css({
        left: $('.select-res').offset().left,
        top: $('.select-res').offset().top + $('.select-res').outerHeight(true)
    });
    if (canClick) {
        $('.select-block').show();
        $('ul', $('.select-block')).html('');
        fillData();
        canClick = !1;
    }
    $('span', $('.select-block')).on("click", function () {
        canClose ? $('.select-block').hide() : alert('请选择下级品类1111！');
        canClick = !0;
    });

    $('.select-res').on('click', 'a', function () {
        $(this).parent().remove();
        $('.select-block').css({
            top: $('.select-res').offset().top + $('.select-res').outerHeight(true)
        });
    })

    $('ul.first', $('.select-block')).on('click', 'li', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        $('ul.third').html('');
        fillData($(this).index());
        l1 = $(this).index();
        cname1 = $(this).text();
        cid1 = $(this).attr('val');
        canClose = !1;
        $('input.cid', $('.select-res')).val('');
        $('input.cname', $('.select-res')).val('');
        $('.c-ff5.sel-detial').html('')
        $('input.cid', $('.select-res')).val(cid1);
        $('input.cname', $('.select-res')).val(cname1);
    });
    $('ul.second', $('.select-block')).on('click', 'li', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        fillData(l1, $(this).index());
        l2 = $(this).index();
        cname2 = $(this).text();
        cid2 = $(this).attr('val');
        canClose = !1;
        $('input.cid', $('.select-res')).val('');
        $('input.cname', $('.select-res')).val('');
        $('.c-ff5.sel-detial').html('')
        $('input.cid', $('.select-res')).val(cid1 + ',' + cid2);
        $('input.cname', $('.select-res')).val(cname1 + ',' + cname2);
    });
    $('ul.third', $('.select-block')).on('click', 'li', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        cname3 = $(this).text();
        cid3 = $(this).attr('val');
        canClose = !0;
        var hasExist = !1;
        $('.select-res').find("p").each(function () {
            if ($(this).text().split(' > ')[2] == cname3) hasExist = !0;
        })
        hasExist ? alert('所选品类已被添加！'):$('.sel-detial').empty();
        hasExist ? alert('所选品类已被添加！') : $('.sel-detial').append(cname1 + ' > ' + cname2 + ' > ' + cname3 + '<a></a><input type="hidden" value="' + cid1 + ',' + cid2 + ',' + cid3 + '" name="cid[]" /><input type="hidden" value="' + cname1 + ',' + cname2 + ',' + cname3 + '" name="cname[]" />');
        $('.select-block').css({
            top: $('.select-res').offset().top + $('.select-res').outerHeight(true)
        });
        $('input.cid', $('.select-res')).val(cid1 + ',' + cid2 + ',' + cid3);
        $('input.cname', $('.select-res')).val(cname1 + ',' + cname2 + ',' + cname3);
    });

//填充级联数据
    function fillData(l1, l2) {
        var temp_html = "";
        if (typeof(dataJson.option) != 'undefined' && arguments.length == 0) {
            $.each(dataJson.option, function (i, pro) {
                temp_html += '<li val="' + pro.id + '">' + pro.name + '</li>';
            });
        } else if (typeof(dataJson.option[l1].child) != 'undefined' && arguments.length == 1) {
            $.each(dataJson.option[l1].child, function (i, pro) {
                temp_html += '<li val="' + pro.id + '">' + pro.name + '</li>';
            });
        } else if (typeof(dataJson.option[l1].child[l2].child) != 'undefined' && arguments.length == 2) {
            $.each(dataJson.option[l1].child[l2].child, function (i, pro) {
                temp_html += '<li val="' + pro.id + '">' + pro.name + '</li>';
            });
        }
        $('.select-block ul:eq(' + arguments.length + ')').html(temp_html);
    }

})()


