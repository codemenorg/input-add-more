/*!
*  - v1.0.3
* Homepage: http://codemen.org
* Author: Codemen
* Author URL:  http://codemen.org
*/
(function($){
    "use strict";
    // options
    $.fn.multiitems = function(options) {
        options = $.extend({
            template : '',
            removeButton : '<a href="javascript:;" class="btn btn-danger remove-item"><i class="fa fa-minus"></i></a>',
            addButton : '<a href="javascript:;" class="btn btn-info add-item mb-2" style="display: none"><i class="fa fa-plus"></i></a>',
            moveButton : '<div class="move-place"><a class="move-up btn btn-danger" href="javascript:;"><i class="fa  fa-caret-up"></i></a><a class="move-down btn btn-danger" href="javascript:;"><i class="fa fa-caret-down"></i></a></div>',
            removeButtonClass : 'remove-item',
            addButtonClass : 'add-item'
        }, options);

        var multiItems = this;
        multiItems.each(function(){
            var $this = $(this);
            var singleItem = '<div class="single-element clearfix">' + options.template + options.removeButton + '</div>'
            $this.append(options.addButton);
            $this.children('.'+options.addButtonClass).show();
            $this.children('.'+options.addButtonClass).on('click',function(){
                if(!$(this).hasClass('disabled-button') && $this.find('.single-element').last().find('.min').val()<99) {
                    var count = multiItems.find('.single-element').length;
                    var thisItem = $(this).before(singleItem);
                    addRearrange(multiItems.find('.single-element').last())
                    rearrangeField();
                }
            })

            $this.find('.single-element').first().find('.min').val(0)
            rearrangeItem($this.find('.single-element').first());
            $this.find('.single-element').last().find('.max').val(100)
            rearrangeItem($this.find('.single-element').last());

            $this.find('.single-element').each(function () {
                var item = $(this);
                minItem(item.find('.min'))
                maxItem(item.find('.max'))
                rearrangeItem(item);
            })
            rearrangeField();
        });
        $(document).on('click','.'+options.removeButtonClass, function(){
            if(!$(this).hasClass('disabled-button')){
                $(this).closest('.multi-element').append($(this).parent().find('ul.select-dropdown'));
                removeRearrange($(this).closest('.single-element'));
                $(this).closest('.single-element').remove();
                rearrangeField();
            }
        })


        $(document).on('keyup change','.min', function(){
            var $this = $(this);
            minItem($this);

        })

        function minItem(minItem){
            if(disableFields(minItem)){
                var prev = minItem.closest('.single-element').prev('.single-element');
                var min = prev.find('.min').val();

                if(minItem.val()>= +minItem.closest('.single-element').find('.max').val()){
                    minItem.val(+minItem.closest('.single-element').find('.max').val()-1);
                }

                if(prev.length > 0){
                    if(+min >= +minItem.val()){
                        minItem.val(+min + 1);
                    }
                    prev.find('.max').val(minItem.val());
                }
                else{
                    minItem.val(0);
                }
            }
            rearrangeField()
        }


        $(document).on('keyup change','.max', function(){
            var $this = $(this);
            maxItem($this)
        })

        function maxItem(maxItem) {
            if(disableFields(maxItem)){
                var next = maxItem.closest('.single-element').next('.single-element');
                var max = next.find('.max').val();

                if(maxItem.val()<= +maxItem.closest('.single-element').find('.min').val()){
                    maxItem.val(+maxItem.closest('.single-element').find('.min').val()+1);
                }

                if(next.length > 0){
                    if(+max <= +maxItem.val()){
                        maxItem.val(+max - 1);
                    }
                    next.find('.min').val(maxItem.val());
                }
                else{
                    maxItem.val(100);
                }
            }
            rearrangeField()
        }


        function rearrangeField(){
            var items = multiItems.find('.single-element');
            var serial = 0;
            items.each(function(){
                var $this = $(this);
                rearrangeItem($this);
                // code here
                $this.find('.multi-input').each(function(){
                    var name = $(this).data('key') ? '[' + $(this).data('key') + ']' : '[]';
                    name = multiItems.data('input')+'['+serial+']' + name;
                    $(this).attr('name', name);
                })
                serial++;
            })
            if(multiItems.find('.single-element').last().find('.min').val()<99){
                multiItems.find('.add-item').show();
            }
            else{
                multiItems.find('.add-item').hide();
            }
        }


        function disableFields(fieldData){
            if(!checkInt(fieldData.val())){
                fieldData.closest('.multi-element').find('.min').not(fieldData).attr('disabled', 'disabled');
                fieldData.closest('.multi-element').find('.max').attr('disabled', 'disabled');
                fieldData.closest('.multi-element').find('.add-item').addClass('disabled-button')
                fieldData.closest('.multi-element').find('.remove-item').addClass('disabled-button')
                return false;
            }
            else{
                fieldData.closest('.multi-element').find('.min').not(fieldData).removeAttr('disabled');
                fieldData.closest('.multi-element').find('.max').removeAttr('disabled');
                fieldData.closest('.multi-element').find('.add-item').removeClass('disabled-button');
                fieldData.closest('.multi-element').find('.remove-item').removeClass('disabled-button');
                return true;
            }
        }


        function rearrangeItem(item){
            var prev = item.prev('.single-element');
            var next = item.next('.single-element');
            if(prev.length>0){
                item.find('.min').attr('min',(+prev.find('.min').val())+1);
            }
            else{
                item.find('.min').attr('min',0);
            }
            if(next.length > 0){
                item.find('.max').attr('max',(+next.find('.max').val())-1);
            }
            else{
                item.find('.max').attr('max',100);
            }

            item.find('.min').attr('max',(+item.find('.max').val()-1));
            item.find('.max').attr('min',(+item.find('.min').val()+1));
        }


        function removeRearrange(item){
            var prev = item.prev('.single-element');
            var next = item.next('.single-element');
            if(prev.length>0){
                if(next.length>0){
                    prev.find('.max').val((+prev.find('.min').val() + 1));
                }
                else{
                    prev.find('.max').val(100)
                }
            }
            if(next.length>0){
                if(prev.length>0){
                    next.find('.min').val(prev.find('.max').val());
                }
                else{
                    next.find('.min').val(0)
                }
            }
        }


        function addRearrange(item){
            var prev = item.prev('.single-element');
            if(prev.length>0){
                prev.find('.max').val(+prev.find('.min').val() + 1)
                item.find('.min').val(prev.find('.max').val())
            }
            else{
                item.find('.min').val(0)
            }
            item.find('.max').val(100)
        }


        function checkInt(value) {
            var decimalError = value.split('.').length;

            return !$.isNumeric(value) || decimalError > 1 || Math.ceil(value)===false || Math.ceil(value) != Math.floor(value) ? false : true
        }

        $(document).on('click','p.single-unit', function(e){
            if(options.delay==0) {
                e.stopPropagation();
                $('ul.select-dropdown').hide();
                if ($(this).data('id')) {
                    $(this).parent().append($('#' + $(this).data('id')))
                    $('#' + $(this).data('id')).show();
                }
            }
        })
        $(document).on('click','ul.select-dropdown li', function(e){
            if(options.delay==0) {
                e.stopPropagation();
                $(this).parent().siblings('input').val($(this).children('input').val());
                $(this).parent().siblings('p').html($(this).children('span').html());
                $(this).parent().hide();
            }
        })
        $(document).on('click','body', function(){
            if(options.delay==0) {
                $('ul.select-dropdown').hide();
            }
        })
    }
})(jQuery);
