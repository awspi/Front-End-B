//////////////////
$(function() {
    $('.checkall').change(function() {
        $('.j-checkbox, .checkedall').prop('checked',$(this).prop('checked'))
        if($(this).prop('checked')){
            $('.cart-item').addClass('check-cart-item');
        }else{
            $('.cart-item').removeClass('check-cart-item');
        }
    }  
    )
    //////////////////
    $('.j-checkbox').change(function() {
        //:checked选择器
        if ($('.j-checkbox:checked').length==$('.j-checkbox').length) {
            $('.checkall').prop('checked',true);
        }else{
            $('.checkall').prop('checked',false);
        }
        
        if($(this).prop('checked')){
            $(this).parents('.cart-item').addClass('check-cart-item');
        }else{
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })
    //////////////////
    $('.increment').click(function() {
        let n=$(this).siblings('input').val();
        n++;
        $(this).siblings('input').val(n);
        ///
        calSum(n,this);
        getSum();
    })
    $('.decrement').click(function() {
        let n=$(this).siblings('input').val();
        if(n>1){
            n--;
            $(this).siblings('input').val(n);
            ///
            calSum(n,this);
            getSum();
        }else{
            $(this).parents('.cart-item').remove();
            getSum();
        }
    })
    //////////////////
    function calSum(n,that){
        let per_price=$(that).parents('.p-num').siblings('.p-price').text().substring(1);
        $(that).parents('.p-num').siblings('.p-sum').text('￥'+(per_price*n).toFixed(2))
    }
    $('.itxt').change(function() {
        let n=$(this).val();
        if(n==0){
            $(this).parents('.cart-item').remove();
        }
        calSum(n,this);
        getSum();
    })
    //////////////////
    function getSum(){
        let count=0;
        let totalPrice=0;
        $('.itxt').each(function(i,ele) {
            if($(this).parents('.cart-item').find('.checkbox').prop('checked')){
                count+=parseInt($(ele).val());
            }
            
        })
        $('.amount-sum em').text(count);

        $('.p-sum').each(function(i,ele) {
            if($(this).parents('.cart-item').find('.checkbox').prop('checked')){
            totalPrice+=parseFloat($(ele).text().substring(1));
            }
        })
        $('.price-sum em').text('¥'+totalPrice.toFixed(2));        
    }
    //////////////////
    $('.p-action').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    })
    //////////////////
  $('.remove-batch').click(function() {
      $('.j-checkbox:checked').parents('.cart-item').remove();
      getSum();
  })
    //////////////////
  $('.clear-all').click(function() {
      $('.cart-item').remove();
      getSum();
  })
    //////////////////

})
