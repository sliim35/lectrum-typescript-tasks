interface IEvent {
    type: string;
    timeStamp: Date;
}

interface EventConstructor {
    new (type: string): IEvent;
    prototype: IEvent;
}

interface IEmitter {
    on(type: string, handler: (...args: any[]) => void): this;
}

const emitter: IEmitter = {
    on: function(type, handler) {
        if (this.events.hasOwnProperty(type)) {
            this.events[type].push(handler);
        } else {
            this.events[type] = [handler];
        }
        return this;
    },

    off: function(type, handler) {
        if (arguments.length === 0) {
            return this._offAll();
        }
        if (handler === undefined) {
            return this._offByType(type);
        }
        return this._offByHandler(type, handler);
    },

    trigger: function(event, args) {
        if (!(event instanceof Event)) {
            event = new Event(event);
        }
        return this._dispatch(event, args);
    },

    _dispatch: function(event, args) {
        if (!this.events.hasOwnProperty(event.type)) return;
        args = args || [];
        args.unshift(event);

        var handlers = this.events[event.type] || [];
        handlers.forEach((handler) => handler.apply(null, args));
        return this;
    },

    _offByHandler: function(type, handler) {
        if (!this.events.hasOwnProperty(type)) return;
        var i = this.events[type].indexOf(handler);
        if (i > -1) {
            this.events[type].splice(i, 1);
        }
        return this;
    },

    _offByType: function(type) {
        if (this.events.hasOwnProperty(type)) {
            delete this.events[type];
        }
        return this;
    },

    _offAll: function() {
        this.events = {};
        return this;
    },
};

function Emitter() {
    var e = Object.create(emitter);
    e.events = {};
    return e;
}

const Event = (function Event(this: IEvent, type: string) {
    this.type = type;
    this.timeStamp = new Date();
} as Function) as EventConstructor;

Emitter.Event = Event;

Emitter.mixin = function(obj, arr) {
    var emitter = new Emitter();
    arr.map(function(name) {
        obj[name] = function() {
            return emitter[name].apply(emitter, arguments);
        };
    });
};
