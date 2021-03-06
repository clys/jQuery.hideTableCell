(function ($) {
    var versions = "1.0",
        pluginName = "jQuery.hideTableCell",
        pluginMethodsName = "hideTableCell",
        keyName = 'data-key',
        ignoreName = 'data-ignore',
        methods = {};

    $.fn[pluginMethodsName] = function (method) {
        // Method calling logic


        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.hide.apply(this, arguments);
        } else {
            $.error("方法 " + method + "不存在于" + pluginName);
        }

    };
    /* private methods ------------------------------------------------------ */

    /* public methods ------------------------------------------------------- */
    methods = {
        hide: function (param) {
            if (!param) return this;
            var $ele = $(this),
                hideKey = typeof param === 'string' ? param.split(',') : param,
                hk = '';
            for (var i = 0, len = hideKey.length; i < len; i++) {
                hk += (i == 0 ? '' : ',') + '[' + keyName + '="' + hideKey[i] + '"]'
            }
            $ele.each(function () {
                var $t = $(this), w, $trs, cellspacing;
                $trs = $t.find('tr');
                cellspacing = $t.prop('cellspacing');
                w = $t.prop('cellspacing', 0).width();
                $t.find(hk).hide();
                for (var i = 0, len = $trs.size(), $tr, $ignore, $tt, ttSize, ww, tw, ratio; tw = 0, ww = w, i < len; i++) {
                    $tr = $trs.eq(i);
                    $ignore = $tr.find(ignoreName);
                    $ignore.each(function () {
                        ww -= $(this).outerWidth();
                    });
                    $tt = $tr.find('>td:visible,>th:visible');
                    ttSize = $tt.size();
                    if (ttSize == 0) continue;
                    $tt.each(function () {
                        tw += $(this).outerWidth();
                    });
                    ratio = ww / tw;
                    if (ratio == 1) continue;
                    $tt.each(function (i) {
                        $(this).outerWidth($(this).outerWidth() * ratio);
                        if (i == ttSize - 1) {
                            $(this).prop('colspan', $tr.find('>td:hidden,>th:hidden').size() + 1);
                        }
                    })
                }
                $t.prop('cellspacing', cellspacing);
            });
            return this;
        },
        ver: function () {
            return versions;
        }
    };
})(jQuery);