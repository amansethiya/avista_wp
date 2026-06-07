/*!
    * Custom jQuery Appear + ProgressBar + knob Plugin
    * ------------------------------------------
    * Version: 1.0.0
    * Author: Akmol Hosen
    * Role: Frontend Developer, ThemeXriver
    * Email: akmolhosen997@gmail.com
    * GitHub: https://github.com/bas2k/jquery.appear/ (Base plugin)
    *
    * Description:
    * - Detects elements appearing in viewport
    * - Animates progress bars based on data-percent
    * - Includes number counter animation
    * - Triggers only once per element
    * - Knob circle progress
    *
    * Base Plugin by:
    * - Michael Hixson
    * - Alexander Brovikov
    *
    * License: MIT (http://www.opensource.org/licenses/mit-license.php)
    *
    *
    * Copyright © 2025 Akmol Hosen
*/

(function ($) {
    var selectors = [];
    var $priorAppeared = [];
    var checkBinded = false;
    var checkLock = false;
    var defaults = {
      interval: 250,
      force_process: false
    };

    var $window = $(window);

    function isAppeared() {
      return $(this).is(':appeared');
    }

    function isNotTriggered() {
      return !$(this).data('_appear_triggered');
    }

    function process() {
      checkLock = false;
      for (var i = 0; i < selectors.length; i++) {
        var $appeared = $(selectors[i]).filter(isAppeared);

        $appeared.filter(isNotTriggered)
          .data('_appear_triggered', true)
          .trigger('appear', [$appeared]);

        if ($priorAppeared[i]) {
          var $disappeared = $priorAppeared[i].not($appeared);
          $disappeared
            .data('_appear_triggered', false)
            .trigger('disappear', [$disappeared]);
        }

        $priorAppeared[i] = $appeared;
      }
    }

    function addSelector(selector) {
      selectors.push(selector);
      $priorAppeared.push();
    }

    // Custom filter ":appeared"
    $.expr.pseudos.appeared = $.expr.createPseudo(function () {
      return function (element) {
        var $el = $(element);
        if (!$el.is(':visible')) return false;

        var winLeft = $window.scrollLeft();
        var winTop = $window.scrollTop();
        var offset = $el.offset();
        var left = offset.left;
        var top = offset.top;

        return (
          top + $el.height() >= winTop &&
          top - ($el.data('appear-top-offset') || 0) <= winTop + $window.height() &&
          left + $el.width() >= winLeft &&
          left - ($el.data('appear-left-offset') || 0) <= winLeft + $window.width()
        );
      };
    });

    // Appear function
    $.fn.appear = function (fn, options) {
      var settings = $.extend({
        data: undefined,
        one: true,
        accX: 0,
        accY: 0
      }, options);

      return this.each(function () {
        var t = $(this);
        t.appeared = false;
        var w = $(window);

        var check = function () {
          if (!t.is(':visible')) {
            t.appeared = false;
            return;
          }

          var a = w.scrollLeft();
          var b = w.scrollTop();
          var o = t.offset();
          var x = o.left, y = o.top;
          var ax = settings.accX, ay = settings.accY;

          if (y + t.height() + ay >= b &&
            y <= b + w.height() + ay &&
            x + t.width() + ax >= a &&
            x <= a + w.width() + ax) {
            if (!t.appeared) t.trigger('appear', settings.data);
          } else {
            t.appeared = false;
          }
        };

        var modifiedFn = function () {
          t.appeared = true;
          if (settings.one) {
            w.off('scroll', check);
            var i = $.inArray(check, $.fn.appear.checks);
            if (i >= 0) $.fn.appear.checks.splice(i, 1);
          }
          fn.apply(this, arguments);
        };

        if (settings.one) t.one('appear', settings.data, modifiedFn);
        else t.on('appear', settings.data, modifiedFn);

        w.scroll(check);
        $.fn.appear.checks.push(check);
        check();
      });
    };

    $.extend($.fn.appear, {
      checks: [],
      timeout: null,
      checkAll: function () {
        var length = $.fn.appear.checks.length;
        while (length--) $.fn.appear.checks[length]();
      },
      run: function () {
        if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
        $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
      }
    });

    $.each(['append', 'prepend', 'after', 'before', 'attr',
      'removeAttr', 'addClass', 'removeClass', 'toggleClass',
      'remove', 'css', 'show', 'hide'], function (i, name) {
      var old = $.fn[name];
      if (old) {
        $.fn[name] = function () {
          var result = old.apply(this, arguments);
          $.fn.appear.run();
          return result;
        };
      }
    });

    $.extend({
      appear: function (selector, options) {
        var opts = $.extend({}, defaults, options || {});
        if (!checkBinded) {
          var onCheck = function () {
            if (checkLock) return;
            checkLock = true;
            setTimeout(process, opts.interval);
          };
          $(window).scroll(onCheck).resize(onCheck);
          checkBinded = true;
        }

        if (opts.force_process) setTimeout(process, opts.interval);
        addSelector(selector);
      },
      force_appear: function () {
        if (checkBinded) {
          process();
          return true;
        }
        return false;
      }
    });

})(jQuery);
  