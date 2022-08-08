<script setup>
import { ref, computed } from 'vue';
import { createPopper } from '@popperjs/core';

const props = defineProps({
    tooltipText: {
      type: String,
      default: "Tooltip text",
    },
    offset: {
      default: 0,
      type: Number,
    },
    placement: {
      default: "bottom-start",
      type: String,
    }
  })

const button = ref(null)
const tooltip = ref(null)

const popperInstance = computed(() => {
  return createPopper(button.value, tooltip.value, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0,props.offset],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom'],
        },
      },
    ],
    strategy: 'fixed',
  })
})
const insertElement = (btn, tlp) => {
  button.value = btn
  tooltip.value = tlp
}
const removeElement = () => {
  button.value = null
  tooltip.value = null
}
const showTooltips = (e) => {
  if (button.value === null && tooltip.value === null) {
    insertElement(e.target, e.target.parentElement.nextElementSibling)
  }
  tooltip.value.setAttribute('data-show', '')
  console.log(button.value);
  popperInstance.value.update()
}
const hideTooltips = (e) => {
  tooltip.value.removeAttribute('data-show')
  tooltip.value.classList.add('hidden')
  removeElement()
}
</script>
<template>
<div>
  <p>
    <a href="#" class="text-primary underline" 
          @mouseenter="showTooltips($event)"
          @focus="showTooltips($event)" 
          @mouseleave="hideTooltips($event)" 
          @blur="hideTooltips($event)">{{ props.tooltipText }}</a> <slot></slot>
  </p>
  <div id="tooltip" role="tooltip" class="bg-neutral text-white text-sm rounded-lg hidden">
    <slot name="content"></slot>
  </div>
</div>
</template>
<style scoped>
#tooltip[data-show] {
  display: block;
}
</style>