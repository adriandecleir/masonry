function apply_masonry() {

    var columns = 3;
    var items_per_page = 12;
    var multiple;
    var add_ons = 0;
    var difference = 0;
    var margin_top_for_row = 0;
    var lowest_box = 0;
    var top_of_pagination = 0;
    var box_this_position = 0;
    var box_outer_height = 0;

    $('.blog_item').each(function () {
        var id = $(this).attr('id');
        var blog_item_id = id.substring('blog-id-'.length);
        // ignore the top level
        if (blog_item_id > columns) {
            // get top point of current element
            box_this_position = $('#blog-id-' + blog_item_id)[0].getBoundingClientRect().top - $('#blog-id-' + blog_item_id).parent()[0].getBoundingClientRect().top;
            var box_above = blog_item_id - columns;
            // get bottom of box above it
            var box_above_position = $('#blog-id-' + box_above).outerHeight();
            // new rules apply after the second row which is number of columns * 2
            if (blog_item_id > columns * 2) {
                var count = items_per_page - columns;

                while (count >= columns * 2) {
                    if (blog_item_id > count && blog_item_id <= count + columns) {

                        multiple = (count / columns) - 1;

                        while (multiple >= 1) {
                            add_ons += 35 + $('#blog-id-' + (box_above - columns * multiple)).outerHeight();
                            multiple--;
                        }
                        box_above_position = $('#blog-id-' + box_above).outerHeight() + add_ons;
                        add_ons = 0;
                    }
                    count = count - columns;
                }
            }
            difference = box_above_position - box_this_position + 35;

            $(this).css('top', difference);

        }
    });
}

$(document).ready(function () {
    setTimeout(function () {

        apply_masonry();

    }, 400);

});