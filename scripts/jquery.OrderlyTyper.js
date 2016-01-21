String.prototype.rightChars = function(n) {
    if (n <= 0) {
        return "";
    } else if (n > this.length) {
        return this;
    } else {
        return this.substring(this.length, this.length - n);
    }
};

(function($) {
    var
        options = {
            rotateRandomly: false,
            highlightSpeed: 20,
            typeSpeed: 100,
            clearDelay: 500,
            typeDelay: 200,
            clearOnHighlight: true,
            OrderlyTyperDataAttr: 'data-typer-targets',
            OrderlyTyperInterval: 2000
        },
        highlight,
        clearText,
        backspace,
        type,
        spanWithColor,
        clearDelay,
        typeDelay,
        clearData,
        isNumber,
        typeWithAttribute,
        getHighlightInterval,
        getTypeInterval,
        OrderlyTyperInterval,
        arrayPosition = 0;

    spanWithColor = function(color, backgroundColor) {
        if (color === 'rgba(0, 0, 0, 0)') {
            color = 'rgb(255, 255, 255)';
        }

        return $('<span></span>')
            .css('color', 'black')
            .css('background-color', backgroundColor);
    };

    isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    clearData = function($e) {
        $e.removeData([
            'typePosition',
            'highlightPosition',
            'leftStop',
            'rightStop',
            'primaryColor',
            'backgroundColor',
            'text',
            'typing'
        ]);
    };

    type = function($e) {
        var
        // position = $e.data('typePosition'),
            text = $e.data('text'),
            oldLeft = $e.data('oldLeft'),
            oldRight = $e.data('oldRight');

        // if (!isNumber(position)) {
        // position = $e.data('leftStop');
        // }

        if (!text || text.length === 0) {
            clearData($e);
            return;
        }


        $e.text(
            oldLeft +
            text.charAt(0) +
            oldRight
        ).data({
            oldLeft: oldLeft + text.charAt(0),
            text: text.substring(1)
        });

        // $e.text($e.text() + text.substring(position, position + 1));

        // $e.data('typePosition', position + 1);

        setTimeout(function() {
            type($e);
        }, getTypeInterval());
    };

    clearText = function($e) {
        $e.find('span').remove();

        setTimeout(function() {
            type($e);
        }, typeDelay());
    };

    highlight = function($e) {
        var
            position = $e.data('highlightPosition'),
            leftText,
            highlightedText,
            rightText;

        if (!isNumber(position)) {
            position = $e.data('rightStop') + 1;
        }

        if (position <= $e.data('leftStop')) {
            setTimeout(function() {
                clearText($e);
            }, clearDelay());
            return;
        }

        leftText = $e.text().substring(0, position - 1);
        highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
        rightText = $e.text().substring($e.data('rightStop') + 1);

        $e.html(leftText)
            .append(
                spanWithColor(
                    $e.data('backgroundColor'),
                    $e.data('primaryColor')
                )
                .append(highlightedText)
            )
            .append(rightText);

        $e.data('highlightPosition', position - 1);

        setTimeout(function() {
            return highlight($e);
        }, getHighlightInterval());
    };

    typeWithAttribute = function($e) {
        var targets;

        if ($e.data('typing')) {
            return;
        }

        try {
            targets = JSON.parse($e.attr($.OrderlyTyper.options.OrderlyTyperDataAttr)).targets;
        } catch (e) {}

        if (typeof targets === "undefined") {
            targets = $.map($e.attr($.OrderlyTyper.options.OrderlyTyperDataAttr).split(','), function(e) {
                return $.trim(e);
            });
        }
        arrayPosition = (arrayPosition >= targets.length ? 0 : arrayPosition);
        $e.typeTo(targets[($.OrderlyTyper.options.rotateRandomly ? Math.floor(Math.random() * targets.length) : arrayPosition++)]);
    };

    // Expose our options to the world.
    $.OrderlyTyper = (function() {
        return {
            options: options
        };
    })();

    $.extend($.OrderlyTyper, {
        options: options
    });

    //-- Methods to attach to jQuery sets

    $.fn.OrderlyTyper = function() {
        var $elements = $(this);

        return $elements.each(function() {
            var $e = $(this);

            if (typeof $e.attr($.OrderlyTyper.options.OrderlyTyperDataAttr) === "undefined") {
                return;
            }

            typeWithAttribute($e);
            setInterval(function() {
                typeWithAttribute($e);
            }, OrderlyTyperInterval());
        });
    };

    $.fn.typeTo = function(newString) {
        var
            $e = $(this),
            currentText = $e.text(),
            i = 0,
            j = 0;

        if (currentText === newString) {
            console.log("Our strings our equal, nothing to type");
            return $e;
        }

        if (currentText !== $e.html()) {
            console.error("OrderlyTyper does not work on elements with child elements.");
            return $e;
        }

        $e.data('typing', true);

        while (currentText.charAt(i) === newString.charAt(i)) {
            i++;
        }

        while (currentText.rightChars(j) === newString.rightChars(j)) {
            j++;
        }

        newString = newString.substring(i, newString.length - j + 1);

        $e.data({
            oldLeft: currentText.substring(0, i),
            oldRight: currentText.rightChars(j - 1),
            leftStop: i,
            rightStop: currentText.length - j,
            primaryColor: $e.css('color'),
            backgroundColor: $e.css('background-color'),
            text: newString
        });

        highlight($e);

        return $e;
    };

    //-- Helper methods. These can one day be customized further to include things like ranges of delays.

    getHighlightInterval = function() {
        return $.OrderlyTyper.options.highlightSpeed;
    };

    getTypeInterval = function() {
        return $.OrderlyTyper.options.typeSpeed;
    };

    clearDelay = function() {
        return $.OrderlyTyper.options.clearDelay;
    };

    typeDelay = function() {
        return $.OrderlyTyper.options.typeDelay;
    };

    OrderlyTyperInterval = function() {
        return $.OrderlyTyper.options.OrderlyTyperInterval;
    };
})(jQuery);
