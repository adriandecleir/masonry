(function ($) {

    $.fn.apply_masonry = function (options) {


        var difference;
        var box_this_position;
        var settings = {
            'columns': 3,
            'items_per_page': 12,
            'multiple': 0,
            'add_ons': 0,
            'box_this_position': 0,
            'bottom_margin': 35
        }

        if (typeof(options) == 'object') {
            $.extend(settings, options);
        }

        $('.blog_item').each(function () {
            var id = $(this).attr('id');
            var blog_item_id = id.substring('blog-id-'.length);
            // ignore the top level
            if (blog_item_id > settings.columns) {
                // get top point of current element
                box_this_position = $('#blog-id-' + blog_item_id)[0].getBoundingClientRect().top - $('#blog-id-' + blog_item_id).parent()[0].getBoundingClientRect().top;
                var box_above = blog_item_id - settings.columns;
                // get bottom of box above it
                var box_above_position = $('#blog-id-' + box_above).outerHeight();
                // new rules apply after the second row which is number of settings.columns * 2
                if (blog_item_id > settings.columns * 2) {
                    var count = settings.items_per_page - settings.columns;

                    while (count >= settings.columns * 2) {
                        if (blog_item_id > count && blog_item_id <= count + settings.columns) {

                            settings.multiple = (count / settings.columns) - 1;

                            while (settings.multiple >= 1) {
                                settings.add_ons += settings.bottom_margin + $('#blog-id-' + (box_above - settings.columns * settings.multiple)).outerHeight();
                                settings.multiple--;
                            }
                            box_above_position = $('#blog-id-' + box_above).outerHeight() + settings.add_ons;
                            settings.add_ons = 0;
                        }
                        count = count - settings.columns;
                    }
                }
                difference = box_above_position - box_this_position + settings.bottom_margin;

                $(this).css('top', difference);

            }
        });
    };
})(jQuery);
