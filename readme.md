# Vue-bubble

broadcast and bubble events to spread between Vue component

Vue.prototype.$emit can only receive event in the instance component. It doesn't have mechanism for bubbling and broadcasting. So I write this Vue plugin to extend it.

# USAGE

Usage is pretty easy.

```javascript
import VueBubbles from 'vue-bubbles';
import Vue from 'Vue';

Vue.use(VueBubbles);

// In Your Component

// somemethod

this.$broadcast(SOME_EVENT, { ...payload });
// That will emit a message that the component and its children and chilren's children ... will receive the event.

// when you want to stop spreading you can write this.

this.$on(SOME_EVENT, e => {
    e.stopSpread();
    const data = e.data;
    const originComponent = e.originComponent;
});

this.$bubble(SOME_EVENT, { ...payload });
// That will emit a message that the component and recursively emit the parent. Also you can stop spreading.

```
