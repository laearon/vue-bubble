let _Vue;

class _EvObj {
    constructor(component) {
        this.canSpread = true;
        this.originComponent = component;
    }
    stopSpread() {
        this.canSpread = false;
    }
}

class EvObj extends _EvObj {
    constructor(component, data) {
        super(component);
        this.data = data;
    }
}

function install(Vue) {
    if (install.installed && _Vue === Vue) return;
    install.installed = true;
    _Vue = Vue;
    Vue.prototype.$broadcast = function(event, data) {
        var vm = this,
            evObj = new EvObj(this, data);
        return broadcast(vm, event, evObj);
    };

    Vue.prototype.$bubble = function(event, data) {
        var vm = this,
            evObj = new EvObj(this, data);
        return bubble(vm, event, evObj);
    };

    function broadcast(vm, event, evObj) {
        if (
            evObj.canSpread &&
            Object.getPrototypeOf(vm.$children) === Array.prototype &&
            vm.$children.length
        ) {
            vm.$children.forEach(vm => {
                vm.$emit(event, evObj);
                broadcast(vm, event, evObj);
            });
        }
        return vm;
    }

    function bubble(vm, event, evObj) {
        vm.$emit(event, evObj);
        if (evObj.canSpread && vm.$parent) {
            bubble(vm.$parent, event, evObj);
        }
        return vm;
    }
}

exports.install = install;
