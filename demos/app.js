/*jslint nomen: true*/
/*global define, console, document, window*/

define(['jcx/Stage', 'jcx/sprite', 'jcx/Shape', 'jcx/StaticText'], function (Stage, Sprite, Shape, StaticText) {

    "use strict";

    var setupCanvasStyles,
        logSpriteClick,
        inBoundsOfRect,
        dragObject,
        inBoundsOfCircle,
        renderSquare,
        renderText,
        loop,
        init;

    setupCanvasStyles = function (canvas, document) {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        canvas.style.width = canvas.width;
        canvas.style.height = canvas.height;
        canvas.style.backgroundColor = "#333333";
        canvas.style.position = "relative";
    };

    logSpriteClick = function (e) {
        var logString = e.target.name + " clicked: x " + e.target.stageX + " y " + e.target.stageY + "\n";
        logString += "mouse location: x " + e.stageX + " y " + e.stageY;
        console.log(logString);
    };

    inBoundsOfRect = function (x, y) {
        return (x >= this.stageX && x <= this.stageX + this.width) && (y >= this.stageY && y <= this.stageY + this.height);
    };

    dragObject = function (e) {
        // TODO: Implement Method
    };

    inBoundsOfCircle = function (x, y) {
        var a_squared, b_squared, c_squared;

        a_squared = Math.pow(this.stageX - x, 2);
        b_squared = Math.pow(this.stageY - y, 2);
        c_squared = a_squared + b_squared;

        return c_squared < 100;
    };

    renderSquare = function (context) {
        context.drawSquare(this.stageX, this.stageY, this.width, "#333", this.color);
    };

    renderText = function (context) {
        context.drawText(this.stageX, this.stageY, this.text, "#333", this.color);
    };

    loop = function (stage) {
        stage.draw();
        window.setTimeout(function () {
            loop(stage);
        }, 1000 / 60);
    };

    init = function () {
        var canvas, context, stage, sprite, shape1, staticText, sprite2, shape2, shape3, shape4, shape5, sprite3;

        canvas = document.getElementById("theCanvas");

        setupCanvasStyles(canvas, document);
        stage = new Stage(canvas);

        sprite = new Sprite();
        sprite.x = 10;
        sprite.y = 10;
        sprite.width = 100;
        sprite.height = 100;
        sprite.name = "lonely sprite";
        sprite.onclick = logSpriteClick;

        sprite.onmousedown = function (e) {
            e.target.startDrag();
        };
        sprite.onmouseup = function (e) {
            e.target.stopDrag();
        };
        sprite.onmousemove = function (e) {
            e.target.stageX = e.stageX - 10;
            e.target.stageY = e.stageY - 10;
        };

        shape1 = new Shape();
        shape1.name = "red square";
        shape1.x = 0;
        shape1.y = 0;
        shape1.width = 100;
        shape1.height = 100;
        shape1.color = "#FF0000";
        shape1.renderer = renderSquare;
        shape1.isInBoundsTester = inBoundsOfRect;
        shape1.onclick = logSpriteClick;

        sprite.addChild(shape1);
        stage.addChild(sprite);

        staticText = new StaticText();
        staticText.x = 5;
        staticText.y = 20;
        staticText.color = "#FFFFFF";
        staticText.text = "Hello World!";
        staticText.renderer = renderText;
        sprite.addChild(staticText);

        sprite2 = new Sprite();
        sprite2.x = 120;
        sprite2.y = 10;
        sprite2.width = 100;
        sprite2.height = 100;
        sprite2.name = "nesting sprite";
        sprite2.onclick = logSpriteClick;

        sprite2.onmousedown = function (e) {
            e.target.startDrag();
        };
        sprite2.onmouseup = function (e) {
            e.target.stopDrag();
        };
        sprite2.onmousemove = function (e) {
            e.target.stageX = e.stageX - 10;
            e.target.stageY = e.stageY - 10;
        };

        shape2 = new Shape();
        shape2.name = "yellow square";
        shape2.x = 0;
        shape2.y = 0;
        shape2.width = 100;
        shape2.height = 100;
        shape2.color = "#FFFF00";
        shape2.renderer = renderSquare;
        shape2.isInBoundsTester = inBoundsOfRect;
        shape2.onclick = logSpriteClick;

        shape3 = new Shape();
        shape3.name = "green square";
        shape3.x = 20;
        shape3.y = 20;
        shape3.width = 20;
        shape3.height = 20;
        shape3.color = "#00FF00";
        shape3.renderer = renderSquare;
        shape3.isInBoundsTester = inBoundsOfRect;
        shape3.onclick = logSpriteClick;

        shape4 = new Shape();
        shape4.name = "blue square";
        shape4.x = 30;
        shape4.y = 30;
        shape4.width = 20;
        shape4.height = 20;
        shape4.color = "#0000FF";
        shape4.renderer = renderSquare;
        shape4.isInBoundsTester = inBoundsOfRect;
        shape4.onclick = logSpriteClick;

        sprite3 = new Sprite();
        sprite3.x = 20;
        sprite3.y = 20;
        sprite3.width = 20;
        sprite3.height = 20;
        sprite3.name = "nested sprite";
        sprite3.onclick = logSpriteClick;
        sprite3._isInBounds = inBoundsOfCircle;

        shape5 = new Shape();
        shape5.name = "cyan circle";
        shape5.x = 0;
        shape5.y = 0;
        shape5.width = 20;
        shape5.height = 20;
        shape5.color = "#00FFFF";
        shape5.renderer = function (context) {
            context.drawCircle(this.stageX, this.stageY, 10, "#333", this.color);
        };
        shape5.isInBoundsTester = inBoundsOfCircle;
        shape5.onclick = logSpriteClick;

        sprite3.addChild(shape5);

        sprite2.addChild(shape2);
        sprite2.addChild(sprite3);
        sprite2.addChild(shape3);
        sprite2.addChild(shape4);

        stage.addChild(sprite2);

        loop(stage);
    };

    return init;
});
