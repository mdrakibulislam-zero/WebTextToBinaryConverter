var UI = {
    human : {
        io      : document.querySelector('.human .io'),
        figure  : document.querySelector('.human .face')
    },
    machine : {
        io      : document.querySelector('.machine .io'),
        figure  : document.querySelector('.machine .face')
    }
};

var App = {

    init : function () {
        this.bindEvents();
        UI.human.io.textContent = "Start typing here!"
        UI.machine.io.innerHTML = this.toBinary( UI.human.io.textContent );
    },

    bindEvents : function () {
        var _this = this;

        helpers.addEvent(UI.human.io, "keyup", function (ev) {
            UI.machine.figure.classList.add("active");
            UI.human.figure.classList.remove("active");
            var t = setTimeout(function() {
                clearTimeout(t);
                UI.machine.figure.classList.remove("active");
            }, 1000);
            UI.machine.io.innerHTML = _this.toBinary( UI.human.io.textContent );
        });

        helpers.addEvent(UI.machine.io, "keyup", function (ev) {
            UI.human.figure.classList.add("active");
            UI.human.figure.classList.add("active");
            UI.human.io.innerHTML = _this.toHuman( UI.machine.io.textContent );
        });
    },

    toBinary : function (text) {
        var _this   = this,
            length  = text.length,
            binary  = "";
        for (var i = 0; i < length; i += 1) {
            binary += _this.pad( (text.charCodeAt(i)).toString(2) ) + " ";
        }
        return binary;
    },

    toHuman : function (text) {
        var arr = text.trim().split(/\s+/ig),
            result = "";
        arr.forEach(function(a) {
            result += String.fromCharCode( parseInt( a, 2 ));
        });
        return result;
    },

    pad : function (number) {
        var eight = number;
        while (eight.length < 8) {
            eight = '0' + eight;
        }
        return eight;
    }
};

var helpers = {
    addEvent : function (obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    },
    triggerEvent : function (el, type) {
        if ((el[type] || false) && typeof el[type] == 'function') {
            el[type](el);
        }
    }
};

App.init();
