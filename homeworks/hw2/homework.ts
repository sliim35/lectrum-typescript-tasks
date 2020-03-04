interface IEvent {
    type: string;
    timeStamp: Date;
}

type Handler = (...args: string[]) => void;

interface EventConstructor {
    new (type: string): IEvent;
    prototype: IEvent;
}

interface IEmitter {
    events: {
        [key: string]: Handler[];
    };
    [name: string]: any;
    on(type: string, handler: Handler): IEmitter;
    off(type: string, handler: Handler): IEmitter | unknown;
    trigger(event: IEvent, args: any[]): IEmitter | unknown;
    mixin(obj: any, arr: string[]): void;
    _dispatch(event: IEvent, args: any[]): IEmitter | unknown;
    _offAll(): IEmitter;
    _offByType(type: string): IEmitter;
    _offByHandler(type: string, handler: Handler): IEmitter | unknown;
}

interface EmitterConstructor {
    new (): IEmitter;
    prototype: IEmitter;
    Event: EventConstructor;
}

const Event = (function(this: IEvent, type: string) {
    this.type = type;
    this.timeStamp = new Date();
} as Function) as EventConstructor;

const Emitter = (function(this: IEmitter) {
    this.events = {};
} as Function) as EmitterConstructor;

Emitter.prototype.on = function(type, handler) {
    if (this.events.hasOwnProperty(type)) {
        this.events[type].push(handler);
    } else {
        this.events[type] = [handler];
    }
    return this;
};

Emitter.prototype.off = function(type, handler) {
    if (arguments.length === 0) {
        return this._offAll();
    }
    if (handler === undefined) {
        return this._offByType(type);
    }
    return this._offByHandler(type, handler);
};

Emitter.prototype.trigger = function(event, args) {
    if (!(event instanceof Event)) {
        event = new Event(event);
    }
    return this._dispatch(event, args);
};

Emitter.prototype._dispatch = function(event, args) {
    if (!this.events.hasOwnProperty(event.type)) return;
    args = args || [];
    args.unshift(event);

    var handlers = this.events[event.type] || [];
    handlers.forEach((handler) => handler.apply(null, args));
    return this;
};

Emitter.prototype._offByHandler = function(type, handler) {
    if (!this.events.hasOwnProperty(type)) return;
    var i = this.events[type].indexOf(handler);
    if (i > -1) {
        this.events[type].splice(i, 1);
    }
    return this;
};

Emitter.prototype._offByType = function(type) {
    if (this.events.hasOwnProperty(type)) {
        delete this.events[type];
    }
    return this;
};

Emitter.prototype._offAll = function() {
    this.events = {};
    return this;
};

Emitter.prototype.mixin = function(obj, arr) {
    const emitter = new Emitter();

    arr.map(function(name) {
        obj[name] = function() {
            return (emitter[name] as Function).apply(emitter, arguments);
        };
    });
};

Emitter.Event = Event;
